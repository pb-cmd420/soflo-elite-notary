# AI Notary Agent

An AI-powered agent that handles incoming SMS (text messages) and emails for your Florida notary business. It answers customer questions about fees, services, scheduling, and requirements using the full Florida Notary Reference Guide as its knowledge base.

## How It Works

1. **SMS** — Customer texts your Twilio number → Twilio sends webhook to this agent → AI responds
2. **Email** — Agent polls your inbox every 30 seconds → reads new emails → AI auto-replies

## Setup

### 1. Install dependencies

```bash
cd /mnt/c/Users/admin/Desktop/notary-site/ai-agent
pip install -r requirements.txt
```

### 2. Configure credentials

```bash
cp .env.example .env
```

Edit `.env` and fill in:

| Variable | Where to get it |
|---|---|
| `TWILIO_ACCOUNT_SID` | [console.twilio.com](https://console.twilio.com) |
| `TWILIO_AUTH_TOKEN` | [console.twilio.com](https://console.twilio.com) |
| `TWILIO_PHONE_NUMBER` | Buy a number in Twilio console |
| `OPENAI_API_KEY` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| `EMAIL_ADDRESS` | Your business Gmail (or other) |
| `EMAIL_PASSWORD` | Gmail App Password (not your regular password) |

### 3. Gmail App Password setup

If using Gmail:
1. Enable 2-Factor Authentication on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create a new app password for "Mail"
4. Use that 16-character password as `EMAIL_PASSWORD`

### 4. Expose local server for Twilio (SMS)

Twilio needs a public URL to send webhooks to. Use ngrok:

```bash
# Install ngrok if you don't have it
# Then:
ngrok http 5000
```

Copy the HTTPS URL (e.g. `https://abc123.ngrok-free.app`) and configure it in Twilio:

1. Go to [console.twilio.com](https://console.twilio.com)
2. Phone Numbers → Manage → Active numbers → Click your number
3. Under "A MESSAGE COMES IN", set:
   - **Webhook URL**: `https://your-ngrok-url.ngrok-free.app/sms`
   - **HTTP Method**: POST
4. Save

### 5. Run the agent

```bash
python agent.py
```

You should see:
```
=== Notary Pro AI Agent ===
SMS webhook: http://localhost:5000/sms
Email polling: ENABLED
OpenAI: CONNECTED
Twilio: CONNECTED
```

## Testing

### SMS
Text your Twilio number from any phone. The AI will respond within a few seconds.

### Email
Send an email to your configured business email. The agent checks every 30 seconds and will auto-reply.

### Health check
```bash
curl http://localhost:5000/health
```

## Customization

- **Knowledge base**: Edit `knowledge_base.py` to add/update FAQ answers and service info
- **Quick answers**: The `QUICK_ANSWERS` dict in `knowledge_base.py` provides instant keyword matches (no AI call = no cost)
- **AI model**: Change `gpt-4o-mini` in `agent.py` to any OpenAI model (gpt-4o, gpt-3.5-turbo, etc.)
- **Business name**: Set `BUSINESS_NAME` in `.env`
- **Polling interval**: Change `time.sleep(30)` in `poll_emails()` to adjust email check frequency

## Architecture

```
Customer SMS ──► Twilio ──► /sms webhook ──► AI (OpenAI) ──► Reply SMS
Customer Email ─► Gmail ──► IMAP poll (30s) ──► AI (OpenAI) ──► SMTP reply
                                     │
                              knowledge_base.py
                              (Florida Notary Guide)
```

## Cost

- **OpenAI gpt-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens (very cheap)
- **Twilio**: Phone number ~$1.15/mo, SMS ~$0.0079/message in/out
- **Keyword matches**: FREE — quick answers bypass OpenAI entirely

## Files

- `agent.py` — Main server (Flask + IMAP + AI)
- `knowledge_base.py` — All notary FAQ data and system prompts
- `requirements.txt` — Python dependencies
- `.env.example` — Config template (copy to .env)
- `README.md` — This file
