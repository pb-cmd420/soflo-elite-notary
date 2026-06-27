import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Book a Notary Appointment | Contact Us",
  description:
    "Book a mobile notary appointment in South Florida. Available for Miami-Dade, Broward, Palm Beach & Monroe counties. Evening and weekend appointments accepted.",
  alternates: {
    canonical: "https://sofloelitenotary.com/contact",
  },
  openGraph: {
    title: "Book a Notary Appointment | SoFlo Notary",
    description:
      "Schedule a mobile notary appointment in South Florida. Home, office, hospital, or your preferred location.",
    url: "https://sofloelitenotary.com/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}