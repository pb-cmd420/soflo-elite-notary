"""
Notary Knowledge Base
=====================
All the FAQ and service info the AI agent uses to answer customer questions.
Extracted from the Florida Notary Complete Reference Guide.
"""

SYSTEM_PROMPT = """You are the friendly, professional AI assistant for SoFlo Elite Notary & Business Services, a Florida mobile notary business. Your job is to answer customer questions about notary services, fees, scheduling, and requirements.

RULES:
- Be warm, helpful, and concise
- Always mention that services are MOBILE — we come to the customer
- If someone wants to book, tell them to call, text, or email to schedule
- Never give legal advice — only notary information
- If you're unsure about something, say so and suggest they call for details
- Keep responses short enough for SMS (under 320 characters when possible)
- For email responses, you can be more detailed

KEY FACTS:
- Service area: Miami-Dade, Broward, Palm Beach, Monroe Counties (South Florida)
- We are a MOBILE notary — we come to your home, office, hospital, etc.
- Hours: Mon-Sat 8AM-8PM, same-day appointments often available
- Florida sets maximum notary fees by law
"""

FAQ_KNOWLEDGE = """
== FLORIDA NOTARY FEES (Maximum by Law) ==

Acknowledgments: $10.00 per signature/notarial act
Jurat (oath/affirmation): $10.00 per signature
Protest (notice of dishonor): $10.00
Copy Certification: $10.00 per copy certified
Marriage Ceremonies: $30.00 minimum fee
Verifying Vehicle Identification Number (VIN): $10.00
Certifying Contents of Safe-Deposit Box: $10.00
Administering Oath: $10.00
Taking Deposition: $10.00 per witness + actual travel costs
Proof of Execution by Subscribing Witness: $10.00

Note: Travel fees, after-hours fees, and wait-time fees are negotiated in advance and are NOT set by the state.

== TRAVEL & DISTANCE FEES ==

Travel fees are calculated as: Distance Zone Rate x Traffic Multiplier

DISTANCE ZONES:
Zone 1 — Local (0-10 miles): $15
Zone 2 — Mid-Range (10-20 miles): $25
Zone 3 — Extended (20-30 miles): $40
Zone 4 — Long Distance (30+ miles): $50+ (quoted per trip)

TRAFFIC MULTIPLIERS:
Off-Peak (9:00 AM - 3:30 PM, non-holiday weekdays): 1x (no surcharge)
Rush Hour (7:00-9:00 AM & 3:30-7:00 PM, weekdays): 1.5x
Event/Holiday (Art Basel, Spring Break, major events, holidays): 2x

EXAMPLES:
- 8-mile appointment at 11 AM: Zone 1 ($15) x 1x = $15 travel fee
- 15-mile appointment at 4:30 PM (rush hour): Zone 2 ($25) x 1.5x = $37.50 travel fee
- 25-mile appointment during Art Basel: Zone 3 ($40) x 2x = $80 travel fee

Traffic multipliers only apply to the travel fee, not the notarial fee. Travel fees are always quoted before the appointment — no surprises.

WEEKEND & HOLIDAY SURCHARGES (per appointment):
- Weekend Surcharge (Saturday & Sunday): +$50
- Holiday Surcharge (Federal & state holidays): +$100
These surcharges stack with time-of-day after-hours fees. Example: Saturday 10 PM = standard fee + $50 (late night) + $50 (weekend) = $100 extra.

== CORE NOTARIAL ACTS ==

1. ACKNOWLEDGMENT — Signer appears in person, declares they signed voluntarily. Document can be signed beforehand. Most common act for deeds, POAs, contracts.

2. JURAT — Signer appears in person, swears/affirms the content is true, signs IN the notary's presence. Used for affidavits, sworn statements, depositions.

3. OATH OR AFFIRMATION — Verbal sworn statement. $10 fee. Used for court proceedings, depositions, sworn testimony.

4. PROTEST — Formal notice that a negotiable instrument (check, draft, promissory note) was dishonored. $10 fee.

5. COPY CERTIFICATION — Notary certifies a photocopy is a true copy of the original. $10. CANNOT certify vital records (birth/death/marriage certificates) or public records — those must come from the custodian.

6. PROOF OF EXECUTION BY SUBSCRIBING WITNESS — Used when principal cannot appear before notary. A subscribing witness appears instead. $10. Restricted — only for conveyances and some other documents.

7. MARRIAGE CEREMONY — Florida notaries can perform marriages! Must have valid Florida marriage license first. $30 minimum. One of only 3 states that allows this.

== REAL ESTATE DOCUMENTS ==

Quit Claim Deed — requires 2 witnesses + notary acknowledgment
Warranty Deed — requires 2 witnesses + notary acknowledgment
Mortgage/Satisfaction of Mortgage — notarized
Easement Agreement — notarized
Lien Waiver — notarized
Construction Lien — notarized
Contract for Deed — notarized
Title Affidavit — notarized (jurat)

== POWERS OF ATTORNEY ==

Durable Power of Attorney — requires 2 witnesses + notary (most common)
Limited/Special Power of Attorney — 2 witnesses + notary
Healthcare Surrogate/Proxy — 2 witnesses + notary
Living Will — 2 witnesses + notary

== ESTATE PLANNING ==

Last Will and Testament — 2 witnesses + notary (self-proving)
Trust Agreement — notarized
Codicil to Will — 2 witnesses + notary
Designation of Pre-Need Guardian — 2 witnesses + notary

== VEHICLE & VESSEL ==

VIN Verification (HSMV 82042) — notary physically inspects vehicle, $10
Vehicle Title Transfer — notarized
Vessel Title Transfer — notarized
Bill of Sale — notarized

== IMMIGRATION DOCUMENTS ==

I-864 Affidavit of Support — notarized (jurat)
I-134 Affidavit of Support — notarized (jurat)
Translation Certifications — notarized

== ADOPTION ==

Adoption Petition — notarized
Consent to Adopt — notarized
Home Study Affidavits — notarized

== BUSINESS DOCUMENTS ==

Corporate Resolutions — notarized
Partnership Agreements — notarized
DBA (Fictitious Name) Registration — notarized
Trademark Applications — notarized

== LOAN SIGNINGS ==

Mortgage closings, refinance packages, HELOCs, reverse mortgages, loan modifications. Fee varies by package size — negotiated in advance.

== REMOTE ONLINE NOTARIZATION (RON) ==

Available! Same $10 per act fee. Requires approved RON technology platform. Signer must be identified through identity proofing and credential analysis. Audio/video recording required.

== WITNESS REQUIREMENTS ==

Florida documents requiring 2 witnesses: wills, deeds, POAs, healthcare directives. The notary CAN serve as one witness if not a party to the transaction. We can help arrange witnesses if needed.

== WHAT TO BRING TO A NOTARY APPOINTMENT ==

1. Valid government-issued photo ID (driver's license, passport, state ID, military ID)
2. The unsigned document(s) — do NOT sign beforehand unless it's a jurat
3. Any required witnesses (we'll confirm if needed)
4. The signer MUST appear in person (except for RON)

== WHAT A FLORIDA NOTARY CANNOT DO ==

- Issue apostilles (only FL Secretary of State can — $10 fee)
- Translate documents
- Process passport applications
- Issue permits or licenses
- Practice law or draft legal documents
- Notarize their own signature
- Certify vital records (birth/death/marriage certificates)
- Certify copies of public records
- Perform marriages outside Florida
- Notarize a document if signer is not present (except RON)
- Post-date or ante-date a notarial certificate
- Use a notary seal on a blank document

== APOSTILLES ==

We notarize the document first. Then the customer submits to Florida Secretary of State: $10 per apostille, $1.50 per additional copy. Processing: 5-7 business days (regular), 1-2 business days (expedited — extra fee). Secretary of State address: CL E04, Tallahassee, FL 32314.

== MARRIAGE INFO ==

Florida is one of only 3 states where notaries can officiate weddings. Requirements:
- Valid Florida marriage license (issued by any FL Clerk of Court)
- License is valid 60 days from issue date
- 3-day waiting period for FL residents (unless premarital course completed)
- No waiting period for out-of-state residents
- Both parties must appear for the license
- Must return completed license to Clerk within 10 days of ceremony
"""

# Short FAQ for quick SMS responses
QUICK_ANSWERS = {
    "fee": "FL max fees: $10/signature for most acts (acknowledgments, jurats, copies, VIN). Marriage ceremonies: $30 min. Weekend surcharge: +$50. Holiday surcharge: +$100. Travel fees quoted upfront.",
    "cost": "FL max fees: $10/signature for most acts. Marriage: $30 min. Weekend: +$50. Holiday: +$100. Travel fees depend on location — quoted before we come out.",
    "price": "Most notarizations: $10 per signature (FL state max). Marriage ceremonies: $30 minimum. Weekend: +$50. Holiday: +$100. Mobile travel fees quoted in advance.",
    "how much": "Most notarizations are $10 per signature by FL law. Travel fees depend on your location. Call/text for a quote!",
    "travel": "Yes! We're a mobile notary — we come to you anywhere in Miami-Dade, Broward, Palm Beach, or Monroe County. Travel fee quoted upfront.",
    "mobile": "We come to your home, office, hospital, or any location across South Florida. Travel fee depends on distance — quoted before we head out.",
    "come to": "Absolutely! Mobile notary service — we come to you in Miami-Dade, Broward, Palm Beach, or Monroe County.",
    "appointment": "We offer flexible scheduling Mon-Sat 8AM-8PM. Same-day appointments often available! Call or text to book.",
    "schedule": "Mon-Sat 8AM-8PM, same-day appointments often available. Call/text us to schedule!",
    "book": "To book: call or text us! Mon-Sat 8AM-8PM. Same-day appointments often available.",
    "hours": "Mon-Sat 8AM-8PM. Same-day appointments often available. Evening and weekend appointments available.",
    "weekend": "Yes! Saturday appointments available (+$50 weekend surcharge). Mon-Sat 8AM-8PM. Sunday also available with the weekend surcharge.",
    "holiday": "Holiday appointments available with a +$100 surcharge. Federal and state holidays apply. Call/text us to schedule!",
    "sunday": "Sunday appointments available! A +$50 weekend surcharge applies. Call/text to schedule.",
    "evening": "Yes! We offer evening appointments. Mon-Sat 8AM-8PM and we can accommodate after hours with advance notice.",
    "bring": "Bring: 1) Valid photo ID (license/passport), 2) Unsigned document(s) — don't sign beforehand, 3) Any witnesses if required (we'll confirm).",
    "need": "You need: valid photo ID, the unsigned document(s), and the signer must appear in person. We'll let you know if witnesses are needed.",
    "id": "Valid government-issued photo ID required: driver's license, passport, state ID, or military ID.",
    "witness": "Some docs need 2 witnesses in FL (wills, deeds, POAs). The notary can be one witness. We can help arrange witnesses if needed.",
    "marriage": "Yes! FL notaries can officiate weddings — one of only 3 states. $30 min. You need a valid FL marriage license first. We can help with the license too.",
    "wedding": "FL notaries can perform marriages! $30 minimum. Must have valid FL marriage license. 3-day waiting period for residents (waived with premarital course).",
    "marry": "Yes we can! FL allows notaries to officiate weddings. $30 minimum. Valid FL marriage license required.",
    "apostille": "We notarize the doc first, then you submit to FL Secretary of State ($10/apostille, 5-7 biz days). We can walk you through the process.",
    "copy": "We can certify photocopies of most documents ($10). Cannot certify vital records (birth/death/marriage certs) — those come from the issuing office.",
    "vin": "Yes! We verify VINs for FL DHSMV — $10. We physically inspect the vehicle and complete form HSMV 82042. We come to where the vehicle is.",
    "vehicle": "We notarize vehicle titles, bills of sale, and verify VINs ($10). We come to where the vehicle is located.",
    "real estate": "We notarize all real estate docs: deeds, mortgages, satisfactions, easements, lien waivers. FL deeds need 2 witnesses + notary.",
    "deed": "Deeds require 2 witnesses + notary acknowledgment in FL. $10 per signature. We come to you.",
    "power of attorney": "POAs need 2 witnesses + notary in FL. $10 per signature. We can help arrange witnesses.",
    "poa": "Power of Attorney: 2 witnesses + notary required in FL. $10 per signature. Durable POAs are the most common we handle.",
    "ron": "Remote Online Notarization available! Same $10/act fee. Requires video call with identity verification. Ask us for details.",
    "online": "Yes, Remote Online Notarization (RON) is available! Same $10/act fee plus platform fees. Video call with ID verification required.",
    "remote": "RON (Remote Online Notarization) available! $10/act + tech platform fee. Signer verified via video call. Ask for details.",
    "loan": "We handle mortgage closings, refinance packages, HELOCs, reverse mortgages. Fee varies by package — quoted in advance.",
    "closing": "Loan signing/closing services available. We come to you for the signing. Fee depends on package size — quoted upfront.",
    "hello": "Hi! I'm the AI assistant for your South Florida mobile notary. I can help with fees, services, scheduling, and requirements. What do you need?",
    "hi": "Hi there! I can answer questions about our notary services, fees, scheduling, and more. How can I help?",
    "help": "I can help with: notary fees, what to bring, witness requirements, marriage ceremonies, VIN verification, real estate docs, scheduling, and more. Just ask!",
}
