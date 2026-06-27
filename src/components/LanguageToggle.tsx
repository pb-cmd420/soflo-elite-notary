"use client";

import { useLang } from "@/i18n/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition text-xs font-semibold tracking-wide"
      aria-label={lang === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <span className={`px-1.5 py-0.5 rounded-full transition-all ${lang === "en" ? "bg-sky-600 text-white" : "text-slate-500"}`}>
        EN
      </span>
      <span className={`px-1.5 py-0.5 rounded-full transition-all ${lang === "es" ? "bg-sky-600 text-white" : "text-slate-500"}`}>
        ES
      </span>
    </button>
  );
}
