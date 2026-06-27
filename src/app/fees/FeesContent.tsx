"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLang } from "@/i18n/LanguageContext";

export default function FeesContent() {
  const { t } = useLang();
  const f = t.fees;

  const feeItems = [
    { service: f.feeAcknowledgments, fee: "$10.00", note: f.perSignature },
    { service: f.feeJurats, fee: "$10.00", note: f.perSignature },
    { service: f.feeProtests, fee: "$10.00", note: f.perSignature },
    { service: f.feeCopies, fee: "$10.00", note: f.perCopy },
    { service: f.feeMarriage, fee: "$30.00", note: f.minimumFee },
    { service: f.feeVIN, fee: "$10.00", note: "" },
    ];

  const additionalFees = [
    { service: f.weddingAdditional, note: f.weddingAdditionalNote },
  ];

  const travelZones = [
    { zone: f.travelZone1, distance: f.travelZone1Dist, baseFee: f.travelZone1Fee },
    { zone: f.travelZone2, distance: f.travelZone2Dist, baseFee: f.travelZone2Fee },
    { zone: f.travelZone3, distance: f.travelZone3Dist, baseFee: f.travelZone3Fee },
    { zone: f.travelZone4, distance: f.travelZone4Dist, baseFee: f.travelZone4Fee },
  ];

  const trafficTiers = [
    { tier: f.trafficOffPeak, time: f.trafficOffPeakTime, fee: f.trafficOffPeakMultiplier, highlight: false },
    { tier: f.trafficRush, time: f.trafficRushTime, fee: f.trafficRushMultiplier, highlight: false },
    { tier: f.trafficEvent, time: f.trafficEventTime, fee: f.trafficEventMultiplier, highlight: true },
  ];

  const afterHoursTiers = [
    { tier: f.afterHoursStandard, time: f.afterHoursStandardTime, fee: f.afterHoursStandardFee, highlight: false },
    { tier: f.afterHoursEvening, time: f.afterHoursEveningTime, fee: f.afterHoursEveningFee, highlight: false },
    { tier: f.afterHoursLateNight, time: f.afterHoursLateNightTime, fee: f.afterHoursLateNightFee, highlight: false },
    { tier: f.afterHoursOvernight, time: f.afterHoursOvernightTime, fee: f.afterHoursOvernightFee, highlight: true },
  ];

  const weekendHolidayItems = [
    { tier: f.weekendSurcharge, time: f.weekendSurchargeTime, fee: f.weekendSurchargeFee, highlight: false },
    { tier: f.holidaySurcharge, time: f.holidaySurchargeTime, fee: f.holidaySurchargeFee, highlight: true },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a]">{f.title}</h1>
            <p className="mt-4 text-slate-600">{f.desc}</p>
          </div>

          {/* Standard Fees */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-[#1a1a1a] border-b border-slate-800">
              <h2 className="font-semibold text-white">{f.standardTitle}</h2>
              <p className="text-sm text-slate-400 mt-1">{f.standardSub}</p>
            </div>
            <div className="divide-y divide-slate-100">
              {feeItems.map((item) => (
                <div key={item.service} className="px-6 py-4 flex items-center justify-between hover:bg-[#F9F2DF] transition">
                  <div>
                    <p className="font-medium text-[#1a1a1a]">{item.service}</p>
                    {item.note && <p className="text-sm text-slate-500 mt-0.5">{item.note}</p>}
                  </div>
                  <span className="text-lg font-semibold text-[#8B1A2B] whitespace-nowrap ml-4">{item.fee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Services */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-100 border-b border-slate-200">
              <h2 className="font-semibold text-[#1a1a1a]">{f.additionalTitle}</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {additionalFees.map((item) => (
                <div key={item.service} className="px-6 py-4 hover:bg-[#F9F2DF] transition">
                  <p className="font-medium text-[#1a1a1a]">{item.service}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Zones */}
          <div className="mt-8 bg-white rounded-2xl border border-[#B8963E]/30 overflow-hidden">
            <div className="px-6 py-4 bg-[#F9F2DF] border-b border-[#B8963E]/20">
              <h2 className="font-semibold text-[#1a1a1a]">{f.travelFees}</h2>
              <p className="text-sm text-slate-600 mt-1">{f.travelFeesNote}</p>
            </div>
            <div className="divide-y divide-slate-100">
              {travelZones.map((item) => (
                <div key={item.zone} className="px-6 py-4 flex items-center justify-between hover:bg-[#F9F2DF] transition">
                  <div>
                    <p className="font-medium text-[#1a1a1a]">{item.zone}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.distance}</p>
                  </div>
                  <span className="text-lg font-semibold text-[#B8963E] whitespace-nowrap ml-4">{item.baseFee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Multiplier */}
          <div className="mt-8 bg-white rounded-2xl border border-amber-200 overflow-hidden">
            <div className="px-6 py-4 bg-amber-50 border-b border-amber-200">
              <h2 className="font-semibold text-amber-900">{f.trafficMultiplier}</h2>
              <p className="text-sm text-amber-700 mt-1">{f.trafficMultiplierNote}</p>
            </div>
            <div className="divide-y divide-slate-100">
              {trafficTiers.map((item) => (
                <div
                  key={item.tier}
                  className={`px-6 py-4 flex items-center justify-between transition ${
                    item.highlight ? "bg-amber-50 hover:bg-amber-100" : "hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <p className={`font-medium ${item.highlight ? "text-amber-900" : "text-[#1a1a1a]"}`}>
                      {item.tier}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.time}</p>
                  </div>
                  <span
                    className={`text-lg font-semibold whitespace-nowrap ml-4 ${
                      item.highlight ? "text-amber-600" : item.fee === "1x" ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {item.fee}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* After-Hours & Overnight */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-amber-50 border-b border-amber-200">
              <h2 className="font-semibold text-amber-900">{f.afterHours}</h2>
              <p className="text-sm text-amber-700 mt-1">{f.afterHoursNote}</p>
            </div>
            <div className="divide-y divide-slate-100">
              {afterHoursTiers.map((item) => (
                <div
                  key={item.tier}
                  className={`px-6 py-4 flex items-center justify-between transition ${
                    item.highlight ? "bg-amber-50 hover:bg-amber-100" : "hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <p className={`font-medium ${item.highlight ? "text-amber-900" : "text-[#1a1a1a]"}`}>
                      {item.tier}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.time}</p>
                  </div>
                  <span
                    className={`text-lg font-semibold whitespace-nowrap ml-4 ${
                      item.highlight ? "text-amber-600" : item.fee === f.afterHoursStandardFee ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {item.fee}
                  </span>
                </div>
              ))}
            </div>
            {f.afterHoursNoteFooter && (
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
                <p className="text-sm text-slate-500 italic">{f.afterHoursNoteFooter}</p>
              </div>
            )}
          </div>

          {/* Weekend & Holiday */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-purple-50 border-b border-purple-200">
              <h2 className="font-semibold text-purple-900">{f.weekendSurcharge}</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {weekendHolidayItems.map((item) => (
                <div
                  key={item.tier}
                  className={`px-6 py-4 flex items-center justify-between transition ${
                    item.highlight ? "bg-purple-50 hover:bg-purple-100" : "hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <p className={`font-medium ${item.highlight ? "text-purple-900" : "text-[#1a1a1a]"}`}>
                      {item.tier}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.time}</p>
                  </div>
                  <span className="text-lg font-semibold text-purple-600 whitespace-nowrap ml-4">{item.fee}</span>
                </div>
              ))}
            </div>
            {f.surchargeNote && (
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
                <p className="text-sm text-slate-500 italic">{f.surchargeNote}</p>
              </div>
            )}
          </div>

          {/* Mobile & Travel */}
          <div className="mt-8 p-6 bg-[#F9F2DF] border border-[#B8963E]/20 rounded-2xl">
            <h3 className="font-semibold text-[#1a1a1a] mb-2">{f.mobileTitle}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{f.mobileDesc}</p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-6">{f.readyToBook}</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#8B1A2B] text-white font-medium rounded-full hover:bg-[#6e1522] transition shadow-lg shadow-[#8B1A2B]/20"
            >
              {f.bookAppointment}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}