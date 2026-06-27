"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import en, { type Translations } from "@/i18n/en";
import es from "@/i18n/es";

type Language = "en" | "es";

const translations: Record<Language, Translations> = { en, es };

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "soflo-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Read persisted language on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "es") {
        setLangState(saved);
      }
    } catch {
      // SSR or localStorage unavailable — keep default
    }
    setMounted(true);
  }, []);

  // Update <html lang> attribute and persist
  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "es" : "en");
  }, [lang, setLang]);

  // Sync <html lang> on change
  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const t = translations[lang];

  // Avoid hydration mismatch — render default until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: "en", t: translations.en, setLang: () => {}, toggleLang: () => {} }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
