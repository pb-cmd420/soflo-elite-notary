import type { Metadata } from "next";
import { WEBSITE } from "@/lib/seo-config";
import FeesContent from "./FeesContent";

export const metadata: Metadata = {
  title: "Notary Fees & Pricing | Florida Notary Rates",
  description:
    "Transparent notary fees for South Florida. Standard rates at $10 per signature, plus after-hours pricing: evening (+$25), late night (+$50), overnight (+$100). Weekend surcharge +$50, holiday surcharge +$100. Travel fees by distance zone ($15–$50+) with rush hour (1.5x) and event (2x) traffic multipliers.",
  alternates: {
    canonical: `${WEBSITE}/fees`,
  },
  openGraph: {
    title: "Notary Fees & Pricing | SoFlo Elite Notary",
    description:
      "Transparent pricing for mobile notary services in South Florida. Standard fees, after-hours rates (evening/late-night/overnight), weekend (+$50) & holiday (+$100) surcharges, travel fees by distance zone with rush hour & event traffic multipliers.",
    url: `${WEBSITE}/fees`,
  },
};

export default function FeesPage() {
  return <FeesContent />;
}
