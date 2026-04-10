import type { Metadata } from "next";
import "./globals.css";
import GlobalGrid from "@/components/GlobalGrid";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "PRISME-ONE — Cybersécurité & Services IT pour TPE/PME",
  description:
    "Pentest, audit de sécurité, réponse aux incidents et services informatiques. Protection sur mesure pour TPE/PME françaises.",
  keywords: [
    "cybersécurité",
    "pentest",
    "audit sécurité",
    "TPE",
    "PME",
    "RGPD",
    "OSINT",
    "réponse incidents",
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
        <CustomCursor />
        {children}
        <FilmGrain />
      </body>
    </html>
  );
}
