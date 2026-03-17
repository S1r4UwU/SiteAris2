"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Globe, Cpu, Database } from "lucide-react";
import ScrambleText from "./ScrambleText";

const INFRA_ITEMS = [
  {
    icon: Server,
    title: "INFRASTRUCTURE SOUVERAINE",
    description:
      "Hébergement 100% français sur datacenters certifiés Tier III+. Aucune donnée ne quitte le territoire national.",
    tag: "FR-ONLY",
  },
  {
    icon: Globe,
    title: "RÉSEAU ANYCAST",
    description:
      "Points de présence distribués pour une latence minimale. Protection DDoS intégrée sur toute la bande passante.",
    tag: "< 5MS",
  },
  {
    icon: Cpu,
    title: "MOTEUR IA PROPRIÉTAIRE",
    description:
      "Détection comportementale par machine learning entraîné sur des milliards de signaux de menace. Mise à jour en continu.",
    tag: "ML/AI",
  },
  {
    icon: Database,
    title: "CHIFFREMENT E2E",
    description:
      "AES-256 au repos, TLS 1.3 en transit. Clés managées en HSM certifié FIPS 140-2 Level 3.",
    tag: "AES-256",
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
          <span className="font-mono text-[11px] tracking-[0.2em] text-text-tertiary uppercase block mb-4">
            {"// INFRASTRUCTURE"}
          </span>
          <ScrambleText
            text="Conçu pour résister."
            as="h2"
            className="font-geist text-3xl md:text-5xl font-semibold text-text tracking-tight"
            delay={200}
          />
          <p className="mt-4 font-geist text-base text-text-secondary leading-relaxed max-w-lg">
            Notre stack technique est pensée pour les environnements critiques.
            Souveraineté, performance, résilience.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {INFRA_ITEMS.map((item, i) => (
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
                <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary/60 uppercase">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-mono text-sm font-bold tracking-[0.08em] text-text">
                {item.title}
              </h3>
              <p className="font-geist text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
