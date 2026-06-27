import type { Metadata } from "next";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import BackgroundLogo from "@/components/BackgroundLogo";
import { SHARED_METADATA, generateLocalBusinessSchema, WEBSITE } from "@/lib/seo-config";
import { LanguageProvider } from "@/i18n/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: SHARED_METADATA.defaultTitle,
    template: "%s | SoFlo Notary",
  },
  description: SHARED_METADATA.description,
  keywords: SHARED_METADATA.keywords,
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SoFlo Notary",
    images: [
      {
        url: "https://sofloelitenotary.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SoFlo Notary - Professional Mobile Notary Services in South Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sofloelitenotary",
    creator: "@sofloelitenotary",
  },
  alternates: {
    canonical: WEBSITE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = generateLocalBusinessSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="antialiased bg-white text-slate-900">
        <BackgroundLogo />
        <div className="relative z-10">
          <LanguageProvider>
            {children}
            <ChatBot />
          </LanguageProvider>
        </div>
      </body>
    </html>
  );
}