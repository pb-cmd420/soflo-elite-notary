// SoFlo Notary - Client-side interactions
// Mobile nav toggle, FAQ accordion, contact form handling, chatbot

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    navMobile.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      this.parentElement.classList.toggle('open');
    });
  });

  // Contact form - basic client-side handling
  // Note: This form needs a backend (Netlify Forms, Formspree, etc.) to actually work
  const contactForm = document.querySelector('form[onsubmit]');
  if (contactForm) {
    contactForm.removeAttribute('onsubmit');
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const requiredFields = this.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#94182C';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Show success state (in production, submit to backend via fetch)
      const formSuccess = document.getElementById('form-success');
      if (formSuccess) {
        this.style.display = 'none';
        formSuccess.style.display = 'block';

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Close mobile nav on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMobile && navMobile.classList.contains('open')) {
      navMobile.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      navToggle?.focus();
    }
  });

  // ============ CHATBOT ============
  const chatBtn = document.querySelector('.chat-btn');
  const chatPanel = document.getElementById('chatbot-panel');
  const chatMessages = document.getElementById('chatbot-messages');
  const chatQuick = document.getElementById('chatbot-quick');
  const chatInput = document.getElementById('chatbot-input');
  const chatSend = document.getElementById('chatbot-send');

  if (chatBtn && chatPanel && chatMessages && chatQuick && chatInput && chatSend) {
    // FAQ knowledge base
    const faqData = [
      {
        keywords: ['fee', 'cost', 'price', 'charge', 'how much', 'pricing'],
        answer: 'Florida sets maximum notary fees: $10 per signature for acknowledgments, jurats, protests, and copy certifications. Marriage ceremonies have a $30 minimum. Travel and after-hours fees are negotiated in advance. Check our Fees page for full details!'
      },
      {
        keywords: ['travel', 'mobile', 'come to me', 'location', 'where'],
        answer: 'Yes! We are a mobile notary service — we come to your home, office, hospital, or any convenient location across South Florida (Miami-Dade, Broward, Palm Beach, and Monroe counties). Travel fees are agreed upon in advance.'
      },
      {
        keywords: ['appointment', 'schedule', 'book', 'available', 'hours', 'weekend', 'evening'],
        answer: 'We offer flexible scheduling including evenings and weekends. Same-day appointments are often available. Head to our Contact page to book, or call/text us directly!'
      },
      {
        keywords: ['need', 'bring', 'document', 'id', 'identification', 'what do i need'],
        answer: "You'll need: (1) A valid government-issued photo ID (driver's license, passport, or state ID), (2) The unsigned document(s) — do NOT sign beforehand unless it's a jurat, (3) Any required witnesses (we can help clarify if witnesses are needed). The signer must appear in person."
      },
      {
        keywords: ['witness', 'witnesses', 'who can witness'],
        answer: 'Some documents require 2 witnesses in Florida — including wills, deeds, powers of attorney, and healthcare directives. The notary can serve as one witness if they are not a party to the transaction. We can help arrange witnesses if needed.'
      },
      {
        keywords: ['marriage', 'wedding', 'marry', 'officiant', 'ceremony'],
        answer: 'Yes! Florida is one of only 3 states where notaries can perform marriage ceremonies. We must have your valid Florida marriage license in hand before the ceremony. Minimum fee is $30. We can also assist with the marriage license application.'
      },
      {
        keywords: ['apostille', 'apostil', 'foreign', 'international', 'abroad'],
        answer: 'We can notarize documents for international use, but apostilles are issued only by the Florida Secretary of State — not by notaries. We notarize your document first, then you submit it to the Secretary of State with a $10 fee for the apostille.'
      },
      {
        keywords: ['copy', 'certify', 'photocopy', 'certified copy'],
        answer: 'We can certify photocopies of most documents (diplomas, contracts, etc.). However, we CANNOT certify vital records (birth/death/marriage certificates) or court records — those must come from the official custodian.'
      },
      {
        keywords: ['power of attorney', 'poa', 'durable', 'legal'],
        answer: 'Yes, we notarize powers of attorney. Florida requires 2 witnesses AND a notary for durable POAs. Note: we cannot draft legal documents or give legal advice — we notarize signatures only.'
      },
      {
        keywords: ['real estate', 'deed', 'mortgage', 'refinance', 'closing', 'house'],
        answer: 'We notarize all real estate documents: quit claim deeds, warranty deeds, mortgages, satisfaction of mortgage, easements, lien waivers, and more. Florida deeds require 2 witnesses plus a notary.'
      },
      {
        keywords: ['vin', 'vehicle', 'car', 'title', 'auto'],
        answer: 'Yes! Florida specifically authorizes notaries to verify Vehicle Identification Numbers (VINs). We complete the DHSMV form (HSMV 82042) and physically inspect the vehicle. Fee is $10. We also notarize vehicle title transfers and bills of sale.'
      },
      {
        keywords: ['ron', 'remote', 'online', 'virtual', 'video'],
        answer: 'Remote Online Notarization (RON) allows documents to be notarized via video call. Fees are the same as in-person ($10 per act) plus any technology/platform fees. The signer must still be identified through approved RON technology.'
      },
      {
        keywords: ['can not', 'cannot', 'not allowed', 'limitation', "don't do", 'wont do'],
        answer: "Florida notaries cannot: issue apostilles, translate documents, process passport applications, issue permits/licenses, practice law or draft legal documents, notarize their own signature, certify vital records, or perform marriages outside Florida."
      },
      {
        keywords: ['hello', 'hi', 'hey', 'help', 'what can you do'],
        answer: "Hi! I'm the Notary FAQ Assistant. I can answer questions about our services, fees, what to bring, witness requirements, marriage ceremonies, and more. Just type your question!"
      }
    ];

    const quickQuestions = [
      'What are your fees?',
      'What do I need to bring?',
      'Can you perform marriages?',
      'Do you travel to me?'
    ];

    let isOpen = false;

    function findAnswer(input) {
      const lower = input.toLowerCase();
      let bestMatch = null;
      let bestScore = 0;

      for (const faq of faqData) {
        const score = faq.keywords.filter(kw => lower.includes(kw)).length;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = faq;
        }
      }

      if (bestMatch) return bestMatch.answer;
      return "I'm not sure about that one. Try asking about our fees, services, what to bring, witness requirements, marriage ceremonies, or appointment scheduling. You can also contact us directly for specific questions!";
    }

    function addMessage(text, isUser) {
      const msg = document.createElement('div');
      msg.className = 'chatbot-message ' + (isUser ? 'user' : 'bot');
      msg.textContent = text;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage(text) {
      if (!text.trim()) return;
      addMessage(text.trim(), true);
      const reply = findAnswer(text.trim());
      // Small delay for more natural feel
      setTimeout(() => addMessage(reply, false), 300);
      chatInput.value = '';
      // Hide quick questions after first user message
      if (chatQuick.children.length > 0) {
        chatQuick.innerHTML = '';
      }
    }

    function renderQuickQuestions() {
      chatQuick.innerHTML = '';
      quickQuestions.forEach(q => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = q;
        btn.addEventListener('click', () => sendMessage(q));
        chatQuick.appendChild(btn);
      });
    }

    // Toggle panel
    chatBtn.addEventListener('click', function() {
      isOpen = !isOpen;
      chatPanel.classList.toggle('open', isOpen);
      if (isOpen) {
        chatInput.focus();
        if (chatMessages.children.length === 0) {
          // Initial welcome message
          addMessage("Hi! I can answer questions about our notary services, fees, what to bring, and more. How can I help?", false);
          renderQuickQuestions();
        }
      }
    });

    // Send on button click
    chatSend.addEventListener('click', function() {
      sendMessage(chatInput.value);
    });

    // Send on Enter
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage(chatInput.value);
      }
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      if (isOpen && !chatPanel.contains(e.target) && !chatBtn.contains(e.target)) {
        isOpen = false;
        chatPanel.classList.remove('open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        chatPanel.classList.remove('open');
        chatBtn.focus();
      }
    });
  }
});