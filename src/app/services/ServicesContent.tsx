"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/i18n/LanguageContext";

export default function ServicesContent() {
  const { t } = useLang();
  const s = t.services;
  const si = t.serviceItems;

  const categories = [
    { title: s.coreNotarial, items: si.coreNotarial },
    { title: s.realEstate, items: si.realEstate },
    { title: s.estatePlanning, items: si.estatePlanning },
    { title: s.familyLaw, items: si.familyLaw },
    { title: s.business, items: si.business },
    { title: s.vehicle, items: si.vehicle },
    { title: s.government, items: si.government },
    { title: s.medical, items: si.medical },
    { title: s.international, items: si.international },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a]">{s.title}</h1>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">{s.desc}</p>
          </div>

          <div className="space-y-12">
            {categories.map((category) => (
              <section key={category.title} className="border-t border-slate-100 pt-8">
                <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">{category.title}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {category.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-[#F9F2DF] transition"
                    >
                      <svg
                        className="w-5 h-5 text-[#B8963E] mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 p-6 bg-[#F9F2DF] border border-[#B8963E]/20 rounded-2xl">
            <h3 className="text-lg font-semibold text-[#8B1A2B] mb-2">{s.limitationsTitle}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{s.limitationsDesc}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}