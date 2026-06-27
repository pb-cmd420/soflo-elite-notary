import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/soflologo.jpg"
                alt="SoFlo Notary"
                width={36}
                height={36}
                className="rounded"
              />
              <p className="text-sm font-semibold text-white">SoFlo Notary</p>
            </div>
            <p className="text-sm text-slate-400 mt-1">Professional Florida Notary Public</p>
            <p className="text-sm text-slate-400 mt-1">Mobile & Remote Notary Services</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-3">Quick Links</p>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <Link href="/services" className="hover:text-[#B8963E] transition">Services</Link>
              <Link href="/fees" className="hover:text-[#B8963E] transition">Fees</Link>
              <Link href="/faq" className="hover:text-[#B8963E] transition">FAQ</Link>
              <Link href="/about" className="hover:text-[#B8963E] transition">About</Link>
              <Link href="/founder" className="hover:text-[#B8963E] transition">Founder</Link>
              <Link href="/contact" className="hover:text-[#B8963E] transition">Contact</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-3">Contact</p>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <a href="mailto:SOFLOELITENOTARY@proton.me" className="hover:text-[#B8963E] transition">SOFLOELITENOTARY@proton.me</a>
              <a href="tel:+178****0070" className="hover:text-[#B8963E] transition">786-634-0070</a>
              <span>South Florida</span>
              <span>Miami-Dade, Broward, Palm Beach, Monroe</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-xs text-slate-500">
          {new Date().getFullYear()} SoFlo Notary. Licensed Florida Notary Public. Serving South Florida.
        </div>
      </div>
    </footer>
  );
}