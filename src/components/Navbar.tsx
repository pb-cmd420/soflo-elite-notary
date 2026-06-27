"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/fees", label: t.nav.fees },
    { href: "/faq", label: t.nav.faq },
    { href: "/about", label: t.nav.about },
    { href: "/founder", label: "Founder" },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/soflologo.jpg"
            alt="SoFlo Notary"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            SoFlo<span className="text-[#B8963E]"> Notary</span>
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-[#8B1A2B] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-slate-700 hover:text-[#8B1A2B]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <LanguageToggle />
          </div>
        </div>
      )}
    </nav>
  );
}