"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    gridArea: "ar",
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
    gridArea: "ae",
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
    gridArea: "rg",
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
    gridArea: "sc",
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
    gridArea: "bt",
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="offres" className="relative pt-8 md:pt-12 pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="mb-16 max-w-2xl">
          <span className="font-mono text-[11px] tracking-[0.2em] text-text-tertiary uppercase block mb-4">
            {"// CATALOGUE_SERVICES"}
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-geist text-3xl md:text-5xl font-semibold text-text tracking-tight"
          >
            Sécurité à la carte.
          </motion.h2>
          <p className="mt-4 font-geist text-base text-text-secondary leading-relaxed max-w-lg">
            Chaque pack est un module autonome. Combinez-les selon votre niveau
            de risque. Déploiement garanti ou remboursé.
          </p>
        </div>

        <div className="bento-grid">
          {PACKS.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  );
}
