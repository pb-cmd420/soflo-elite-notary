import type { Metadata } from "next";
import { WEBSITE } from "@/lib/seo-config";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Mobile Notary Services in South Florida",
  description:
    "SoFlo Elite Notary provides professional mobile notary services across Miami-Dade, Broward, Palm Beach & Monroe counties. Evening & weekend appointments available.",
  alternates: {
    canonical: WEBSITE,
  },
};

export default function HomePage() {
  return <HomeContent />;
}
