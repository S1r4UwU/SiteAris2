"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EXPERTISE = [
  { name: "PENTEST", desc: "Test d'intrusion & hacking éthique" },
  { name: "INCIDENT RESPONSE", desc: "Réponse aux incidents cyber" },
  { name: "AUDIT IT", desc: "Audit de sécurité & conformité" },
  { name: "OSINT", desc: "Renseignement en sources ouvertes" },
  { name: "RÉSEAU", desc: "Sécurisation d'infrastructures réseau" },
  { name: "DEV SÉCURISÉ", desc: "Développement & intégration sécurisée" },
];

export default function TrustSignals() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <span className="font-vt text-[16px] text-text-tertiary uppercase block mb-2">
              {"// DOMAINES D'EXPERTISE"}
            </span>
            <p className="font-grotesk text-[14px] text-text-secondary max-w-md">
              3 ans d&apos;expérience en entreprise privée. Compétences
              opérationnelles, pas des slides.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="font-vt text-[14px] text-text-tertiary">
              OPÉRATEUR INDÉPENDANT — FRANCE
            </span>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {EXPERTISE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-card flex flex-col items-center justify-center py-8 px-4 gap-2 hover:bg-surface-light transition-colors duration-300"
            >
              <span className="font-vt text-[18px] text-text-secondary/70">
                {item.name}
              </span>
              <span className="font-vt text-[14px] text-text-tertiary/50 uppercase text-center">
                {item.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
