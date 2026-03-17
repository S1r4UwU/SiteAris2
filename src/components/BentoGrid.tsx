"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ShieldAlert,
  ScanSearch,
  FileWarning,
  ServerCog,
  Lock,
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
      { label: "Endpoints", value: "∞" },
      { label: "SLA", value: "99.9%" },
    ],
    features: [
      "EDR/XDR managé sur tous les postes et serveurs",
      "Isolation automatique des machines compromises",
      "Analyse comportementale IA en temps réel",
      "Rapport d'incident mensuel détaillé",
      "Hotline SOC 24/7 dédiée",
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
      "Analyste dédié niveau 2/3",
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="offres" className="relative pt-8 md:pt-12 pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="mb-12 max-w-2xl">
          <span className="font-vt text-[16px] text-text-tertiary uppercase block mb-4">
            {"// CATALOGUE_SERVICES"}
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
            de risque. Déploiement garanti ou remboursé.
          </p>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-6 md:px-[calc((100vw-1280px)/2+24px)] pb-4"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {PACKS.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="mx-auto max-w-7xl px-6 mt-6 flex items-center justify-center gap-4">
        <span className="font-vt text-[14px] text-text-muted">
          ← GLISSER POUR VOIR TOUS LES PACKS →
        </span>
      </div>
      <div className="mx-auto max-w-[200px] mt-3 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-white/20 rounded-full transition-all duration-150"
          style={{ width: `${20 + scrollProgress * 80}%` }}
        />
      </div>
    </section>
  );
}
