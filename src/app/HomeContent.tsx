"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/i18n/LanguageContext";

export default function HomeContent() {
  const { t } = useLang();
  const h = t.home;

  const features = [
    { title: h.feature1Title, desc: h.feature1Desc, icon: "" },
    { title: h.feature2Title, desc: h.feature2Desc, icon: "" },
    { title: h.feature3Title, desc: h.feature3Desc, icon: "" },
  ];

  const serviceAreas = [
    { county: "Miami-Dade County", cities: "Miami, Miami Beach, Coral Gables, Hialeah, Doral, Kendall, Key Biscayne" },
    { county: "Broward County", cities: "Fort Lauderdale, Hollywood, Pembroke Pines, Davie, Weston, Sunrise" },
    { county: "Palm Beach County", cities: "West Palm Beach, Boca Raton, Delray Beach, Palm Beach, Jupiter, Boynton Beach" },
    { county: "Monroe County", cities: "Key West, Marathon, Key Largo, Islamorada, Big Pine Key" },
  ];

  const services = [
    { title: h.svcRealEstate, desc: h.svcRealEstateDesc },
    { title: h.svcEstate, desc: h.svcEstateDesc },
    { title: h.svcBusiness, desc: h.svcBusinessDesc },
    { title: h.svcPersonal, desc: h.svcPersonalDesc },
    { title: h.svcWedding, desc: h.svcWeddingDesc },
    ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-[#F9F2DF] to-white pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            {/* Logo as hero shot — large and prominent */}
            <div className="mb-8">
              <Image
                src="/hero-logo.jpg"
                alt="SoFlo Notary"
                width={280}
                height={140}
                className="mx-auto drop-shadow-xl"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1a1a1a] leading-tight">
              {h.heroTitle}
              <br />
              <span className="text-[#B8963E]">{h.heroTitleAccent}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {h.heroDesc}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#8B1A2B] text-white font-medium rounded-full hover:bg-[#6e1522] transition shadow-lg shadow-[#8B1A2B]/20"
              >
                {h.bookAppointment}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1a1a1a] font-medium rounded-full border border-[#B8963E] hover:bg-[#F9F2DF] transition"
              >
                {h.exploreServices}
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#1a1a1a]">{h.whyChooseTitle}</h2>
              <p className="mt-4 text-slate-600 max-w-xl mx-auto">{h.whyChooseDesc}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-lg hover:border-[#B8963E]/30 transition"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">{feature.title}</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-[#F9F2DF]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1a1a1a]">{h.serviceAreasTitle}</h2>
              <p className="mt-4 text-slate-600 max-w-xl mx-auto">{h.serviceAreasDesc}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {serviceAreas.map((area) => (
                <div
                  key={area.county}
                  className="p-6 bg-white rounded-2xl border border-[#B8963E]/20 hover:shadow-md hover:border-[#B8963E]/50 transition"
                >
                  <h3 className="font-semibold text-[#1a1a1a]">{area.county}</h3>
                  <p className="mt-2 text-sm text-slate-600">{area.cities}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1a1a1a]">{h.servicesOverviewTitle}</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">{h.servicesOverviewDesc}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="p-6 border border-slate-100 rounded-2xl hover:bg-[#F9F2DF] hover:border-[#B8963E]/30 transition"
                >
                  <h3 className="font-semibold text-[#1a1a1a]">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#8B1A2B] text-white font-medium rounded-full hover:bg-[#6e1522] transition shadow-lg shadow-[#8B1A2B]/20"
              >
                {h.viewFullServices}
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1a1a1a] text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold">{h.ctaTitle}</h2>
            <p className="mt-4 text-slate-300">{h.ctaDesc}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-8 py-3.5 bg-[#B8963E] text-[#1a1a1a] font-medium rounded-full hover:bg-[#A5852E] transition shadow-lg shadow-[#B8963E]/30"
            >
              {h.getInTouch}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}