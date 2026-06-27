import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { WEBSITE } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SoFlo Notary — a professional Florida Notary Public serving Miami-Dade, Broward, Palm Beach & Monroe counties with mobile and remote notary services.",
  alternates: {
    canonical: `${WEBSITE}/about`,
  },
  openGraph: {
    title: "About SoFlo Notary | South Florida Notary Services",
    description:
      "Professional Florida Notary Public serving South Florida with mobile notary, wedding officiant, and business services.",
    url: `${WEBSITE}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a]">About SoFlo Notary</h1>
            <p className="mt-4 text-slate-600">Dedicated to serving South Florida with professionalism and care.</p>
          </div>

          <div className="prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                We believe notarization should be simple, accessible, and stress-free. Whether you need 
                a document notarized for real estate, estate planning, business, or personal matters, 
                we bring the notary office to you — on your schedule, across South Florida.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">Credentials</h2>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#B8963E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Fully commissioned Florida Notary Public
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#B8963E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Completed mandatory Florida notary education course
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#B8963E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Licensed to perform marriage ceremonies in Florida
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#B8963E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Insured with $7,500 surety bond as required by Florida law
                  </li>
                  
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">Service Area</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Based in South Florida, we provide mobile notary services across:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {["Miami-Dade County", "Broward County", "Palm Beach County", "Monroe County (Key West area)"].map((county) => (
                  <div key={county} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <svg className="w-4 h-4 text-[#B8963E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-slate-700">{county}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">Get in Touch</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Have questions about a document or need to schedule an appointment? We are here to help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#B8963E] text-[#1a1a1a] font-medium rounded-full hover:bg-[#A5852E] transition shadow-lg shadow-[#B8963E]/30"
              >
                Contact Us
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}