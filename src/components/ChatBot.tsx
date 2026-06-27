"use client";

import { useState } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

const faqData: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["fee", "cost", "price", "charge", "how much", "pricing"],
    answer:
    "Florida sets maximum notary fees: $10 per signature for acknowledgments, jurats, protests, and copy certifications. Marriage ceremonies have a $30 minimum. Travel fees use distance zones ($15–$50+) with a traffic multiplier (1x off-peak, 1.5x rush hour, 2x events/holidays). After-hours, weekend, and holiday surcharges also apply. Check our Fees page for full details!",
  },
  {
    keywords: ["travel", "mobile", "come to me", "location", "where"],
    answer:
    "Yes! We are a mobile notary service — we come to your home, office, hospital, or any convenient location across South Florida (Miami-Dade, Broward, Palm Beach, and Monroe counties). Travel fees are based on distance zones ($15–$50+) with a traffic multiplier: 1x off-peak (9AM–3:30PM), 1.5x rush hour (7–9AM & 3:30–7PM), 2x during events/holidays. Always quoted before your appointment!",
  },
  {
    keywords: ["appointment", "schedule", "book", "available", "hours", "weekend", "evening"],
    answer:
      "We offer flexible scheduling including evenings and weekends. Same-day appointments are often available. Head to our Contact page to book, or call/text us directly!",
  },
  {
    keywords: ["need", "bring", "document", "id", "identification", "what do i need"],
    answer:
      "You'll need: (1) A valid government-issued photo ID (driver's license, passport, or state ID), (2) The unsigned document(s) — do NOT sign beforehand unless it's a jurat, (3) Any required witnesses (we can help clarify if witnesses are needed). The signer must appear in person.",
  },
  {
    keywords: ["witness", "witnesses", "who can witness"],
    answer:
      "Some documents require 2 witnesses in Florida — including wills, deeds, powers of attorney, and healthcare directives. The notary can serve as one witness if they are not a party to the transaction. We can help arrange witnesses if needed.",
  },
  {
    keywords: ["marriage", "wedding", "marry", "officiant", "ceremony"],
    answer:
      "Yes! Florida is one of only 3 states where notaries can perform marriage ceremonies. We must have your valid Florida marriage license in hand before the ceremony. Minimum fee is $30. We can also assist with the marriage license application.",
  },
  {
    keywords: ["apostille", "apostil", "foreign", "international", "abroad"],
    answer:
      "We can notarize documents for international use, but apostilles are issued only by the Florida Secretary of State — not by notaries. We notarize your document first, then you submit it to the Secretary of State with a $10 fee for the apostille.",
  },
  {
    keywords: ["copy", "certify", "photocopy", "certified copy"],
    answer:
      "We can certify photocopies of most documents (diplomas, contracts, etc.). However, we CANNOT certify vital records (birth/death/marriage certificates) or court records — those must come from the official custodian.",
  },
  {
    keywords: ["power of attorney", "poa", "durable", "legal"],
    answer:
      "Yes, we notarize powers of attorney. Florida requires 2 witnesses AND a notary for durable POAs. Note: we cannot draft legal documents or give legal advice — we notarize signatures only.",
  },
  {
    keywords: ["real estate", "deed", "mortgage", "refinance", "closing", "house"],
    answer:
      "We notarize all real estate documents: quit claim deeds, warranty deeds, mortgages, satisfaction of mortgage, easements, lien waivers, and more. Florida deeds require 2 witnesses plus a notary.",
  },
  {
    keywords: ["vin", "vehicle", "car", "title", "auto"],
    answer:
      "Yes! Florida specifically authorizes notaries to verify Vehicle Identification Numbers (VINs). We complete the DHSMV form (HSMV 82042) and physically inspect the vehicle. Fee is $10. We also notarize vehicle title transfers and bills of sale.",
  },
  {
    keywords: ["can not", "cannot", "not allowed", "limitation", "don't do", "wont do"],
    answer:
      "Florida notaries cannot: issue apostilles, translate documents, process passport applications, issue permits/licenses, practice law or draft legal documents, notarize their own signature, certify vital records, or perform marriages outside Florida.",
  },
  {
    keywords: ["hello", "hi", "hey", "help", "what can you do"],
    answer:
      "Hi! I'm the SoFlo Notary assistant. I can answer questions about our services, fees, what to bring, witness requirements, marriage ceremonies, and more. Just type your question!",
  },
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  let bestMatch: { keywords: string[]; answer: string } | null = null;
  let bestScore = 0;

  for (const faq of faqData) {
    const score = faq.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  if (bestMatch) {
    return bestMatch.answer;
  }

  return "I'm not sure about that one. Try asking about our fees, services, what to bring, witness requirements, marriage ceremonies, or appointment scheduling. You can also contact us directly for specific questions!";
}

const quickQuestions = [
  "What are your fees?",
  "What do I need to bring?",
  "Can you perform marriages?",
  "Do you travel to me?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I can answer questions about our notary services, fees, what to bring, and more. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    const botReply = findAnswer(text.trim());
    const botMsg: Message = { role: "bot", text: botReply };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#8B1A2B] text-white rounded-full shadow-lg shadow-[#8B1A2B]/20 hover:bg-[#6e1522] transition flex items-center justify-center"
        aria-label="Toggle chat"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          style={{ maxHeight: "70vh" }}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#1a1a1a] text-white flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-semibold text-sm">SoFlo Notary Assistant</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "200px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#8B1A2B] text-white rounded-br-sm"
                      : "bg-slate-100 text-slate-800 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick questions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full text-slate-700 hover:bg-[#F9F2DF] hover:border-[#B8963E]/30 hover:text-[#8B1A2B] transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-slate-200 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question..."
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B8963E] focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#B8963E] text-[#1a1a1a] text-sm rounded-lg hover:bg-[#A5852E] transition font-medium"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}