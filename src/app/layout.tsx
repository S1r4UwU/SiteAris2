import type { Metadata } from "next";
import "./globals.css";
import GlobalGrid from "@/components/GlobalGrid";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";

const BASE_URL = "https://prisme-one.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PRISME-ONE — Cybersécurité & Services IT pour PME & ETI",
    template: "%s | PRISME-ONE",
  },
  description:
    "Pentest, audit de sécurité, réponse aux incidents et services informatiques. Protection sur mesure pour PME & ETI françaises.",
  keywords: [
    "cybersécurité",
    "pentest",
    "audit sécurité",
    "PME",
    "ETI",
    "RGPD",
    "OSINT",
    "réponse incidents",
    "sécurité réseau",
    "France",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "PRISME-ONE",
    title: "PRISME-ONE — Cybersécurité & Services IT pour PME & ETI",
    description:
      "Pentest, audit de sécurité, réponse aux incidents et services informatiques. Protection sur mesure pour PME & ETI françaises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISME-ONE — Cybersécurité & Services IT",
    description:
      "Pentest, audit de sécurité, réponse aux incidents. Protection sur mesure pour PME & ETI françaises.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "PRISME-ONE",
  url: BASE_URL,
  description:
    "Cybersécurité et services informatiques sur mesure pour PME & ETI françaises. Test d'intrusion, audit de sécurité, réponse aux incidents, OSINT.",
  areaServed: { "@type": "Country", name: "France" },
  serviceType: [
    "Test d'intrusion",
    "Audit de sécurité",
    "Réponse aux incidents",
    "OSINT",
    "Sécurité réseau",
    "Services informatiques",
  ],
  email: "contact@prisme-one.com",
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <GlobalGrid />
        <CustomCursor />
        {children}
        <FilmGrain />
      </body>
    </html>
  );
}
