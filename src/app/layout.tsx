import type { Metadata } from "next";
import "./globals.css";
import GlobalGrid from "@/components/GlobalGrid";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "ARIS — Cybersécurité Plug & Play pour TPE/PME",
  description:
    "Sécurité de classe entreprise en packs e-commerce. Protection anti-ransomware, audits express, conformité RGPD. Déploiement en 24h.",
  keywords: [
    "cybersécurité",
    "TPE",
    "PME",
    "anti-ransomware",
    "audit sécurité",
    "RGPD",
    "France",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <GlobalGrid />
        <FilmGrain />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
