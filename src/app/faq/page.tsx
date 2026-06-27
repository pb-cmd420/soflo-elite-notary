import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { WEBSITE, generateFAQSchema } from "@/lib/seo-config";

const faqs = [
  {
    question: "What areas do you serve for mobile notary services?",
    answer:
      "We provide mobile notary services across South Florida including Miami-Dade County (Miami, Miami Beach, Coral Gables, Hialeah, Doral), Broward County (Fort Lauderdale, Hollywood, Pembroke Pines), Palm Beach County (West Palm Beach, Boca Raton, Delray Beach), and Monroe County (Key West, Marathon, Key Largo). We travel to your location — home, office, hospital, or any convenient meeting spot.",
  },
  {
    question: "How much does a mobile notary cost in Florida?",
    answer:
      "Florida law sets maximum notary fees at $10 per notarial act (acknowledgment, jurat, etc.). Travel fees and after-hours fees are not regulated and are agreed upon in advance. We provide transparent, competitive pricing and will quote you a total before the appointment.",
  },
  {
    question: "What documents do I need to bring for notarization?",
    answer:
      "You must bring a valid, government-issued photo ID (driver's license, passport, state ID). You do not need to sign the document before the appointment — the notary must witness the signature. Make sure the document is complete but unsigned when the notary arrives.",
  },
  {
    question: "Can you notarize real estate closing documents?",
    answer:
      "Yes, we notarize a wide range of real estate documents including quit claim deeds, warranty deeds, deeds of trust, mortgages, refinance documents, lease agreements, construction lien waivers, and more. We are experienced with real estate closings and can coordinate with title companies and lenders.",
  },
  {
    question: "Do you perform wedding ceremonies?",
    answer:
      "Yes, SoFlo Notary is licensed to solemnize marriages in Florida. We can officiate your wedding ceremony at the location of your choice. Florida notary marriage fees must be at least $30. Contact us to discuss availability and ceremony details.",
  },
  {
    question: "What are your hours for mobile notary appointments?",
    answer:
      "We offer flexible appointment times including evenings and weekends. Same-day appointments are often available with advance notice. We understand that notarization needs don't always fit standard business hours, so we work around your schedule.",
  },
  {
    question: "Can you notarize estate planning documents like wills and trusts?",
    answer:
      "Yes, we notarize wills, trusts, powers of attorney, living wills (advance directives), healthcare surrogate designations, and other estate planning documents. We handle these sensitive documents with care and ensure proper execution. Note: we cannot provide legal advice or draft documents.",
  },
  {
    question: "What types of business documents can you notarize?",
    answer:
      "We notarize articles of incorporation, operating agreements, bylaws, partnership agreements, stock certificates, NDAs, non-compete agreements, employment contracts, settlement agreements, promissory notes, UCC filings, franchise agreements, and more. We also notarize minutes and resolutions for corporate meetings.",
  },
  {
    question: "Can you notarize documents for international use?",
    answer:
      "We can notarize documents bound for international use, but we cannot issue apostilles — that must be done through the Florida Secretary of State. We notarize diplomas, transcripts, powers of attorney, adoption documents, and passport consent forms (DS-3053) that may need apostille certification afterward.",
  },
  {
    question: "Do you notarize vehicle title transfers and boat bills of sale?",
    answer:
      "Yes, we notarize vehicle title transfers, bills of sale, lien releases, and VIN verifications. We also handle vessel and mobile home title transfers. Proper ID and the unsigned documents are required.",
  },
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can schedule by filling out our online contact form, calling or texting us, or emailing us. We will confirm your appointment, discuss any travel fees, and confirm the document type so we are prepared when we arrive.",
  },
];

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Mobile Notary in South Florida",
  description:
    "Answers to common questions about mobile notary services in South Florida. Cost, documents needed, service areas, wedding officiant, and more.",
  alternates: {
    canonical: `${WEBSITE}/faq`,
  },
  openGraph: {
    title: "Mobile Notary FAQ | SoFlo Notary",
    description:
      "Common questions about notary services in South Florida: pricing, documents, service areas, and more.",
    url: `${WEBSITE}/faq`,
  },
};

export default function FAQPage() {
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a]">Frequently Asked Questions</h1>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Common questions about our mobile notary services in South Florida. 
              Can't find what you are looking for? <Link href="/contact" className="text-[#8B1A2B] hover:underline">Contact us</Link>.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer open:bg-white open:shadow-md transition"
              >
                <summary className="flex items-center justify-between p-6 text-left font-semibold text-[#1a1a1a] list-none focus:outline-none focus:ring-2 focus:ring-[#B8963E] rounded-2xl">
                  <span className="pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#F9F2DF] text-[#B8963E] rounded-full text-sm transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 p-8 bg-[#F9F2DF] border border-[#B8963E]/20 rounded-2xl text-center">
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Still have questions?</h2>
            <p className="text-slate-600 mb-6">
              We are happy to answer any questions about notarization in South Florida.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#8B1A2B] text-white font-medium rounded-full hover:bg-[#6e1522] transition shadow-lg shadow-[#8B1A2B]/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}