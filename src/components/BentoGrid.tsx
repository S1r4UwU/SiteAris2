"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  ShieldAlert,
  ScanSearch,
  FileWarning,
  ServerCog,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PackCard from "./PackCard";
import type { Pack } from "./PackCard";

const PACKS: Pack[] = [
  {
    id: "anti-ransomware",
    name: "ANTI-RANSOMWARE",
    tagline: "Protection périmétrique",
    price: "490€",
    period: "/mois",
    icon: ShieldAlert,
    featured: true,
    metrics: [
      { label: "Déploiement", value: "24H" },
      { label: "Niveau menace", value: "ÉLEVÉ" },
      { label: "Postes inclus", value: "≤ 50" },
      { label: "Réactivité", value: "< 4H" },
    ],
    features: [
      "EDR/XDR managé sur tous les postes et serveurs",
      "Isolation automatique des machines compromises",
      "Analyse comportementale en temps réel",
      "Rapport d'incident mensuel détaillé",
      "Support ouvré + astreinte critique 7j/7",
    ],
  },
  {
    id: "audit-express",
    name: "AUDIT EXPRESS",
    tagline: "Analyse de surface d'attaque",
    price: "1200€",
    period: "unique",
    icon: ScanSearch,
    metrics: [
      { label: "Durée", value: "72H" },
      { label: "Profondeur", value: "L3" },
    ],
    features: [
      "Scan de vulnérabilités externe et interne",
      "Test d'intrusion automatisé (pentest light)",
      "Rapport exécutif + plan de remédiation",
      "Score de maturité cyber sur 100",
    ],
  },
  {
    id: "conformite-rgpd",
    name: "PACK RGPD",
    tagline: "Conformité réglementaire",
    price: "350€",
    period: "/mois",
    icon: FileWarning,
    metrics: [
      { label: "Déploiement", value: "48H" },
      { label: "Couverture", value: "100%" },
    ],
    features: [
      "DPO externalisé certifié",
      "Registre des traitements automatisé",
      "Gestion des consentements (CMP)",
      "Formation équipe incluse",
    ],
  },
  {
    id: "soc-manage",
    name: "SOC MANAGÉ",
    tagline: "Centre opérationnel de sécurité",
    price: "890€",
    period: "/mois",
    icon: ServerCog,
    metrics: [
      { label: "Déploiement", value: "48H" },
      { label: "Niveau menace", value: "CRITIQUE" },
      { label: "Rétention logs", value: "12 MOIS" },
      { label: "Alertes", value: "<15MIN" },
    ],
    features: [
      "SIEM cloud-native avec corrélation avancée",
      "Threat Intelligence feeds intégrés",
      "Réponse à incident automatisée (SOAR)",
      "Tableau de bord temps réel",
      "1 interlocuteur unique, opérateur certifié",
    ],
  },
  {
    id: "bastion",
    name: "BASTION",
    tagline: "Accès zero-trust",
    price: "290€",
    period: "/mois",
    icon: Lock,
    metrics: [
      { label: "Déploiement", value: "24H" },
      { label: "Protocoles", value: "ALL" },
    ],
    features: [
      "VPN Zero-Trust (remplacement VPN classique)",
      "MFA adaptatif sur tous les accès",
      "Gestion des accès privilégiés (PAM)",
      "Journalisation complète des sessions",
    ],
  },
];

export default function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < max - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 400;
    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="offres" className="relative pt-8 md:pt-12 pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="mb-12 max-w-2xl">
          <span className="font-grotesk text-[11px] tracking-[0.12em] text-text-tertiary uppercase block mb-4">
            Catalogue services
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-grotesk text-3xl md:text-5xl font-bold text-text"
            style={{ letterSpacing: "-0.04em" }}
          >
            Sécurité à la carte.
          </motion.h2>
          <p className="mt-4 font-grotesk text-[15px] text-text-secondary leading-[1.7] max-w-lg">
            Chaque pack est un module autonome. Combinez-les selon votre niveau
            de risque. Satisfait ou remboursé sous 7 jours.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 flex items-center justify-center transition-all duration-200 disabled:opacity-20"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            aria-label="Pack précédent"
          >
            <ChevronLeft size={18} className="text-text" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 flex items-center justify-center transition-all duration-200 disabled:opacity-20"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            aria-label="Pack suivant"
          >
            <ChevronRight size={18} className="text-text" />
          </button>
          <span className="ml-3 font-grotesk text-[12px] text-text-muted">
            {PACKS.length} packs disponibles
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-6 pb-4"
        style={{
          scrollSnapType: "x proximity",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {PACKS.map((pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            onShowDetails={(id) =>
              window.dispatchEvent(
                new CustomEvent("open-drawer", { detail: id })
              )
            }
          />
        ))}
      </div>
    </section>
  );
}
