import type { Metadata } from "next";
import { WEBSITE } from "@/lib/seo-config";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Notary Services | Real Estate, Estate Planning, Business Documents",
  description:
    "Comprehensive notary services in South Florida: real estate closings, estate planning, powers of attorney, business documents, wedding officiant, and more.",
  alternates: {
    canonical: `${WEBSITE}/services`,
  },
  openGraph: {
    title: "Notary Services | SoFlo Notary",
    description:
      "Full range of notary services in South Florida: real estate, estate planning, business, personal documents, and wedding officiant.",
    url: `${WEBSITE}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}