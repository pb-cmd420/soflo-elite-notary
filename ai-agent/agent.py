"""
AI Notary Agent — Main Server
==============================
Handles incoming SMS (via Twilio webhook) and Email (via IMAP polling).
Uses OpenAI to generate intelligent responses from the notary knowledge base.

Setup:
  1. Copy .env.example to .env and fill in your credentials
  2. pip install -r requirements.txt
  3. python agent.py

For SMS: Expose port 5000 via ngrok, configure Twilio webhook URL
For Email: Polls IMAP inbox every 30 seconds for new messages
"""

import os
import re
import time
import imaplib
import email
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import parseaddr, formataddr
from threading import Thread
from dotenv import load_dotenv
from flask import Flask, request, Response
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
import openai

from knowledge_base import SYSTEM_PROMPT, FAQ_KNOWLEDGE, QUICK_ANSWERS

# ---------------------------------------------------------------------------
# Load config
# ---------------------------------------------------------------------------
load_dotenv()

TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_PHONE = os.getenv("TWILIO_PHONE_NUMBER", "")
OPENAI_KEY = os.getenv("OPENAI_API_KEY", "")
EMAIL_ADDR = os.getenv("EMAIL_ADDRESS", "")
EMAIL_PASS = os.getenv("EMAIL_PASSWORD", "")
IMAP_SERVER = os.getenv("IMAP_SERVER", "imap.gmail.com")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
BUSINESS_NAME = os.getenv("BUSINESS_NAME", "SoFlo Elite Notary & Business Services")
BUSINESS_PHONE = os.getenv("BUSINESS_PHONE", "")
SERVICE_AREA = os.getenv("SERVICE_AREA", "South Florida")

# Conversation memory (phone/email -> list of messages)
conversations: dict[str, list[dict]] = {}

# Initialize OpenAI
openai_client = openai.OpenAI(api_key=OPENAI_KEY) if OPENAI_KEY else None

# Initialize Twilio
twilio_client = Client(TWILIO_SID, TWILIO_AUTH) if TWILIO_SID and TWILIO_AUTH else None

app = Flask(__name__)

# ---------------------------------------------------------------------------
# AI Response Generation
# ---------------------------------------------------------------------------

def get_ai_response(sender_id: str, user_message: str, channel: str = "sms") -> str:
    """Generate a response using OpenAI with the notary knowledge base."""

    # Quick keyword match first (for speed / cost savings on SMS)
    lower = user_message.lower().strip()
    for keyword, answer in QUICK_ANSWERS.items():
        if keyword in lower:
            return answer

    # If no OpenAI key, fall back to keyword-only
    if not openai_client:
        return (
            f"Thanks for reaching out to {BUSINESS_NAME}! "
            f"For details on fees, services, or to schedule an appointment, "
            f"please call or text {BUSINESS_PHONE}. We serve {SERVICE_AREA}."
        )

    # Build conversation history
    if sender_id not in conversations:
        conversations[sender_id] = []

    history = conversations[sender_id]
    history.append({"role": "user", "content": user_message})

    # Keep last 10 messages to stay within token limits
    if len(history) > 10:
        history[:] = history[-10:]

    # Channel-specific instructions
    channel_note = (
        "This is an SMS text message — keep your response under 300 characters if possible."
        if channel == "sms"
        else "This is an email response — you can be more detailed and professional."
    )

    # Call OpenAI
    try:
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": f"{SYSTEM_PROMPT}\n\n{channel_note}\n\nKNOWLEDGE BASE:\n{FAQ_KNOWLEDGE}"},
                *history,
            ],
            max_tokens=300 if channel == "sms" else 600,
            temperature=0.3,
        )
        reply = response.choices[0].message.content.strip()
    except Exception as e:
        print(f"[AI ERROR] {e}")
        reply = (
            f"Thanks for your message! I'm having trouble processing it right now. "
            f"Please call or text {BUSINESS_PHONE} for immediate assistance."
        )

    history.append({"role": "assistant", "content": reply})
    return reply


# ---------------------------------------------------------------------------
# SMS Handler (Twilio Webhook)
# ---------------------------------------------------------------------------

@app.route("/sms", methods=["POST"])
def sms_webhook():
    """Handle incoming SMS from Twilio."""
    from_number = request.form.get("From", "")
    body = request.form.get("Body", "").strip()

    if not body:
        resp = MessagingResponse()
        resp.message(f"Thanks for texting {BUSINESS_NAME}! How can I help you today?")
        return str(resp)

    print(f"[SMS] From {from_number}: {body}")

    # Get AI response
    reply = get_ai_response(from_number, body, channel="sms")

    # Send response via Twilio (more reliable than TwiML for long conversations)
    if twilio_client and TWILIO_PHONE:
        try:
            twilio_client.messages.create(
                to=from_number,
                from_=TWILIO_PHONE,
                body=reply,
            )
        except Exception as e:
            print(f"[TWILIO SEND ERROR] {e}")
            # Fall back to TwiML response
            resp = MessagingResponse()
            resp.message(reply)
            return str(resp), 200, {"Content-Type": "application/xml"}

    # Return empty response (we sent via REST API)
    return "", 204


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return {"status": "ok", "service": BUSINESS_NAME, "channels": ["sms", "email"]}


# ---------------------------------------------------------------------------
# Email Handler (IMAP Polling)
# ---------------------------------------------------------------------------

def send_email_reply(to_addr: str, subject: str, body: str, original_msg_id: str = ""):
    """Send an email reply via SMTP."""
    if not EMAIL_ADDR or not EMAIL_PASS:
        print("[EMAIL] Not configured — skipping send")
        return

    msg = MIMEMultipart()
    msg["From"] = formataddr((BUSINESS_NAME, EMAIL_ADDR))
    msg["To"] = to_addr
    msg["Subject"] = f"Re: {subject.replace('Re: ', '').replace('Re:', '')}"
    if original_msg_id:
        msg["In-Reply-To"] = original_msg_id
        msg["References"] = original_msg_id
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDR, EMAIL_PASS)
            server.send_message(msg)
        print(f"[EMAIL] Sent reply to {to_addr}")
    except Exception as e:
        print(f"[EMAIL SEND ERROR] {e}")


def process_email(msg_id: int, mail: imaplib.IMAP4_SSL):
    """Process a single email message."""
    _, msg_data = mail.fetch(str(msg_id), "(RFC822)")
    if not msg_data or not msg_data[0]:
        return

    raw = msg_data[0][1]
    if isinstance(raw, bytes):
        msg = email.message_from_bytes(raw)
    else:
        msg = email.message_from_string(raw)

    from_addr = parseaddr(msg.get("From", ""))[1]
    subject = msg.get("Subject", "(no subject)")
    msg_id_header = msg.get("Message-ID", "")

    # Extract body text
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                payload = part.get_payload(decode=True)
                if payload:
                    body = payload.decode(errors="replace")
                    break
    else:
        payload = msg.get_payload(decode=True)
        if payload:
            body = payload.decode(errors="replace")

    if not body.strip():
        return

    # Skip if it's from ourselves
    if from_addr.lower() == EMAIL_ADDR.lower():
        return

    print(f"[EMAIL] From {from_addr}: {subject}")

    # Get AI response
    reply = get_ai_response(from_addr, body.strip(), channel="email")

    # Send email reply
    send_email_reply(from_addr, subject, reply, msg_id_header)


def poll_emails():
    """Poll IMAP inbox for new unread emails every 30 seconds."""
    print("[EMAIL] Starting IMAP poller...")
    while True:
        try:
            if not EMAIL_ADDR or not EMAIL_PASS:
                time.sleep(30)
                continue

            mail = imaplib.IMAP4_SSL(IMAP_SERVER)
            mail.login(EMAIL_ADDR, EMAIL_PASS)
            mail.select("INBOX")

            # Search for unread emails
            _, msg_ids = mail.search(None, "UNSEEN")

            if msg_ids[0]:
                for msg_id in msg_ids[0].split():
                    try:
                        process_email(int(msg_id), mail)
                        # Mark as read
                        mail.store(str(msg_id), "+FLAGS", "\\Seen")
                    except Exception as e:
                        print(f"[EMAIL PROCESS ERROR] {e}")

            mail.logout()
        except Exception as e:
            print(f"[EMAIL POLL ERROR] {e}")

        time.sleep(30)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    print(f"=== {BUSINESS_NAME} AI Agent ===")
    print(f"SMS webhook: http://localhost:5000/sms")
    print(f"Email polling: {'ENABLED' if EMAIL_ADDR else 'NOT CONFIGURED'}")
    print(f"OpenAI: {'CONNECTED' if openai_client else 'NOT CONFIGURED'}")
    print(f"Twilio: {'CONNECTED' if twilio_client else 'NOT CONFIGURED'}")
    print()

    # Start email poller in background thread
    if EMAIL_ADDR and EMAIL_PASS:
        email_thread = Thread(target=poll_emails, daemon=True)
        email_thread.start()
        print("[EMAIL] Poller started (every 30s)")
    else:
        print("[EMAIL] No credentials — email polling disabled")
        print("        Set EMAIL_ADDRESS and EMAIL_PASSWORD in .env to enable")

    # Start Flask server for SMS webhook
    port = int(os.getenv("AGENT_PORT", "5000"))
    print(f"\n[SMS] Starting webhook server on port {port}")
    print(f"      Configure Twilio webhook: https://your-ngrok-url.ngrok-free.app/sms")
    print()

    app.run(host="0.0.0.0", port=port, debug=False)
