// Shared SEO configuration for SoFlo Notary

export const BUSINESS_NAME = "SoFlo Notary";
export const BUSINESS_TAGLINE = "Professional Mobile Notary & Business Services in South Florida";
export const PHONE = "786-634-0070";
export const EMAIL = "SOFLOELITENOTARY@proton.me";
export const WEBSITE = "https://sofloelitenotary.com";
export const ADDRESS = {
  streetAddress: "",
  addressLocality: "South Florida",
  addressRegion: "FL",
  addressCountry: "US",
};
export const SERVICE_AREA = [
  "Miami",
  "Miami-Dade County",
  "Fort Lauderdale",
  "Broward County",
  "West Palm Beach",
  "Palm Beach County",
  "Key West",
  "Monroe County",
  "South Florida",
];

export const SHARED_METADATA = {
  title: BUSINESS_NAME,
  defaultTitle: BUSINESS_NAME,
  titleTemplate: `%s | ${BUSINESS_NAME}`,
  description:
    "Professional Florida Notary Public offering mobile notary services, wedding officiation, real estate closings, powers of attorney, and more across South Florida — Miami-Dade, Broward, Palm Beach & Monroe counties.",
  keywords: [
    "notary public",
    "mobile notary",
    "Florida notary",
    "South Florida notary",
    "Miami notary",
    "Fort Lauderdale notary",
    "Palm Beach notary",
    "wedding officiant",
    "real estate notary",
    "power of attorney notary",
    "apostille",
    "document notarization",
    "traveling notary",
    "evening notary",
    "late night notary",
    "overnight notary",
    "24 hour notary",
    "after hours notary",
    "weekend notary",
    "holiday notary",
    "hospital notary",
    "notary near me",
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BUSINESS_NAME,
    url: WEBSITE,
    images: [
      {
        url: `${WEBSITE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: BUSINESS_TAGLINE,
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
  verification: {
    // Add your Google Search Console verification string here later
  },
};

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NotaryService",
    name: BUSINESS_NAME,
    description:
      "Professional Florida Notary Public offering mobile notary services, wedding officiation, real estate closings, and powers of attorney across South Florida.",
    url: WEBSITE,
    telephone: PHONE,
    email: EMAIL,
    areaServed: SERVICE_AREA.map((area) => ({
      "@type": "City",
      name: area,
    })),
    serviceType: [
      "Notary Public",
      "Mobile Notary Service",
      "Wedding Officiant",
      "Document Notarization",
      "Real Estate Closings",
      "Power of Attorney Notarization",
      "Apostille Services",
      "Loan Signing Agent",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Notary Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Acknowledgments",
            description: "Official act of verifying identity and willingness to sign.",
          },
          price: "10.00",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jurats (Oaths & Affirmations)",
            description: "Administration of oaths and affirmations for sworn statements.",
          },
          price: "10.00",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Notarizing Real Estate Documents",
            description: "Notarization for deeds, mortgages, title transfers, and refinance closings.",
          },
          price: "10.00",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Power of Attorney & Estate Planning Notarization",
            description: "Notarization for durable, limited, and special powers of attorney, trusts, and wills.",
          },
          price: "10.00",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Solemnizing Marriage",
            description: "Licensed Florida wedding officiant ceremonies.",
          },
          price: "30.00",
          priceCurrency: "USD",
        },
      ],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
        description: "Mobile notary services available 24/7 by appointment. Standard rates 8AM-5PM, evening/late-night/overnight surcharges apply.",
      },
    ],
    sameAs: [],
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}