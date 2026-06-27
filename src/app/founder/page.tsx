import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { WEBSITE } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Our Founder | SoFlo Notary",
  description:
    "Meet Pete Quintero, founder of SoFlo Notary. Over 19 years in banking and 7+ years as a Florida Notary Public serving South Florida.",
  alternates: {
    canonical: `${WEBSITE}/founder`,
  },
  openGraph: {
    title: "Meet Pete Quintero | SoFlo Notary Founder",
    description:
      "Former banking professional with 19+ years of experience, now providing trusted mobile notary services across South Florida.",
    url: `${WEBSITE}/founder`,
  },
};

export default function FounderPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-[#1a1a1a] text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#B8963E]">
              <Image
                src="/founder.jpg"
                alt="Pete Quintero - Founder of SoFlo Notary"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Meet <span className="text-[#B8963E]">Pete Quintero</span>
            </h1>
            <p className="mt-3 text-slate-300 text-lg">
              Founder of SoFlo Elite Notary & Business Services LLC
            </p>
          </div>
        </section>

        {/* Bio */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="prose prose-slate max-w-none space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                My name is Pedro Quintero, but most people know me as <strong className="text-[#1a1a1a]">Pete</strong>.
              </p>

              <p className="text-slate-600 leading-relaxed">
                For more than <strong className="text-[#1a1a1a]">19 years</strong>, I built my career in the banking industry, helping individuals, families, and business owners navigate important financial decisions. Throughout that journey, I spent over <strong className="text-[#1a1a1a]">seven years serving as a notary public</strong>, witnessing and notarizing thousands of documents that carried significant legal and financial importance.
              </p>

              <p className="text-slate-600 leading-relaxed">
                Being a notary is about much more than applying a stamp and signature. It requires attention to detail, a thorough understanding of document execution requirements, and a commitment to ensuring every signing is handled professionally and correctly.
              </p>

              <p className="text-slate-600 leading-relaxed">
                Over the years, I worked with a wide range of documents, including mortgage closings, home equity lines of credit (HELOCs), refinance packages, business loan agreements, powers of attorney, affidavits, trust documents, and other legal and financial instruments. These experiences provided me with firsthand knowledge of the importance of accuracy, compliance, confidentiality, and customer service.
              </p>

              <div className="p-6 bg-[#F9F2DF] border border-[#B8963E]/20 rounded-2xl my-8">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">Why I Founded SoFlo Notary</h3>
                <p className="text-slate-700 leading-relaxed">
                  I founded SoFlo Elite Notary & Business Services LLC because I recognized the need for reliable, knowledgeable, and professional notary services that clients can trust. Too often, individuals and businesses are left searching for someone who understands not only the notarization process but also the significance of the documents being signed.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-[#1a1a1a] pt-4">The Banking Difference</h2>

              <p className="text-slate-600 leading-relaxed">
                My banking background gives me a unique perspective that many notaries simply do not have. Having worked directly with financial institutions, lending documents, and complex transactions for nearly two decades, I understand the level of care and precision required when handling critical paperwork.
              </p>

              <h2 className="text-2xl font-bold text-[#1a1a1a] pt-4">Our Mission</h2>

              <p className="text-slate-600 leading-relaxed">
                At SoFlo Elite Notary & Business Services LLC, our mission is simple: provide dependable, professional, and convenient notary and business services while treating every client with integrity, respect, and attention to detail.
              </p>

              <p className="text-slate-600 leading-relaxed">
                Whether you are signing real estate documents, business agreements, powers of attorney, or personal legal documents, you can have confidence knowing your documents are being handled by someone with years of experience in both banking and notarization.
              </p>

              <div className="p-6 bg-[#1a1a1a] text-white rounded-2xl my-8 text-center">
                <p className="text-lg font-semibold text-[#B8963E] italic">
                  Because when it comes to important documents, experience matters.
                </p>
              </div>

              <div className="border-t border-slate-200 pt-8 mt-8">
                <p className="font-semibold text-[#1a1a1a]">Pete Quintero</p>
                <p className="text-sm text-slate-500">Founder & Managing Member</p>
                <p className="text-sm text-slate-500">SoFlo Elite Notary & Business Services LLC</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#8B1A2B] text-white font-medium rounded-full hover:bg-[#6e1522] transition shadow-lg shadow-[#8B1A2B]/20"
              >
                Schedule an Appointment with Pete
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}