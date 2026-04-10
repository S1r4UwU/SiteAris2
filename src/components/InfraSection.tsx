"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Shield, Eye, Zap } from "lucide-react";

const APPROACH_ITEMS = [
  {
    icon: Search,
    title: "AUDIT & DIAGNOSTIC",
    description:
      "Analyse complète de votre surface d'attaque. Scan de vulnérabilités, test d'intrusion, cartographie réseau. Rapport clair avec plan d'action priorisé.",
    tag: "PHASE 1",
  },
  {
    icon: Shield,
    title: "PROTECTION ACTIVE",
    description:
      "Déploiement d'outils de sécurité adaptés à votre infrastructure. Solutions open-source et professionnelles, configurées sur mesure.",
    tag: "PHASE 2",
  },
  {
    icon: Eye,
    title: "VEILLE & OSINT",
    description:
      "Surveillance continue de vos actifs exposés. Renseignement en sources ouvertes pour anticiper les menaces ciblant votre secteur.",
    tag: "CONTINU",
  },
  {
    icon: Zap,
    title: "RÉPONSE AUX INCIDENTS",
    description:
      "Plan d'intervention en cas de compromission. Investigation, confinement, remédiation et rapport post-incident détaillé.",
    tag: "URGENCE",
  },
];

export default function InfraSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="infrastructure"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-[at_center] from-white/[0.02] to-transparent rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <span className="font-grotesk text-[11px] tracking-[0.12em] text-text-tertiary uppercase block mb-4">
            Notre approche
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-grotesk text-3xl md:text-5xl font-bold text-text"
            style={{ letterSpacing: "-0.04em" }}
          >
            Méthodique. Pragmatique.
          </motion.h2>
          <p className="mt-4 font-grotesk text-[15px] text-text-secondary leading-[1.7] max-w-lg">
            Une approche structurée en phases, adaptée à la taille et aux
            risques réels de votre entreprise.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {APPROACH_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.12,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group bg-card p-8 md:p-10 flex flex-col gap-5 hover:bg-surface-light transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 flex items-center justify-center text-text-tertiary group-hover:text-text transition-all duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <span className="font-grotesk text-[11px] tracking-[0.08em] text-text-tertiary/60 uppercase">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-grotesk text-[14px] font-semibold text-text">
                {item.title}
              </h3>
              <p className="font-grotesk text-[14px] text-text-secondary leading-[1.7]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
