import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pathyatra.com";

const TITLE = "PathYatra Partner — Bus Ticketing & Fleet Management App for Bus Owners";

// Kept near ~155 characters so Google shows it fully in search results.
const DESCRIPTION =
  "Bus ticketing & fleet management app for Indian bus owners. Zero hardware cost, 10-second QR shift handover, 100% cash leakage control. Early access open.";

// Longer version used for structured data, where length is not a constraint.
const LONG_DESCRIPTION =
  "PathYatra Partner is a smartphone-based bus ticketing and fleet management app for Indian bus owners. Zero hardware cost, 10-second QR shift handover between conductors, live GPS and real-time cash collection reports. Early access registration open — first 100 bus owners get 3 months zero commission.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | PathYatra Partner",
  },
  description: DESCRIPTION,
  applicationName: "PathYatra Partner",
  keywords: [
    "PathYatra",
    "PathYatra Partner",
    "PathYatra app",
    "bus ticketing app",
    "bus management app India",
    "bus owner app",
    "bus fleet management software",
    "digital bus ticketing",
    "conductor app",
    "bus cash collection tracking",
    "intercity bus software",
    "bus operator dashboard",
    "bus GPS tracking India",
    "Odisha bus ticketing",
  ],
  authors: [{ name: "PathYatra" }],
  creator: "PathYatra",
  publisher: "PathYatra",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.jpeg", type: "image/jpeg" }],
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    type: "website",
    siteName: "PathYatra Partner",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/banner.jpg",
        width: 1536,
        height: 1024,
        alt: "PathYatra Partner — smart bus ticketing and fleet management for bus owners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@PathYatra",
    creator: "@PathYatra",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/banner.jpg"],
  },
  formatDetection: {
    telephone: true,
    address: false,
    email: false,
  },
};

export const viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "PathYatra",
      alternateName: "PathYatra Partner",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.jpeg`,
      },
      description:
        "PathYatra builds digital ticketing and fleet management software for bus operators in India.",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      sameAs: [
        "https://www.instagram.com/pathyatra",
        "https://www.youtube.com/@pathyatraapp",
        "https://x.com/PathYatra",
        "https://www.facebook.com/share/1Bq6cjgMod/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "PathYatra Partner",
      description: LONG_DESCRIPTION,
      inLanguage: ["en-IN", "hi-IN"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE,
      description: LONG_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/banner.jpg`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "SoftwareApplication",
      name: "PathYatra Partner",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, iOS",
      url: SITE_URL,
      image: `${SITE_URL}/banner.jpg`,
      description:
        "Bus ticketing and fleet management app for bus owners — paperless tickets, QR shift handover between conductors, live GPS and real-time cash collection reports. No POS hardware required.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "Zero hardware cost — runs on any smartphone",
        "10-second QR shift handover for conductor and driver changes",
        "100% cash leakage control with real-time cloud reports",
        "Live GPS tracking of every bus",
        "Digital paperless ticketing",
        "Owner dashboard for bookings, buses and routes",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        description:
          "Early access: first 100 bus owners get 3 months zero commission / platform fee waiver.",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
