"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CERTIFICATIONS = [
  { name: "ISO 27001", desc: "Système de management de la sécurité" },
  { name: "RGPD", desc: "Conformité protection des données" },
  { name: "SOC 2", desc: "Contrôles de sécurité audités" },
  { name: "SecNumCloud", desc: "Qualification ANSSI" },
  { name: "HDS", desc: "Hébergement données de santé" },
  { name: "CYBER+", desc: "Label France Num" },
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
            <span className="font-mono text-[11px] tracking-[0.2em] text-text-tertiary uppercase block mb-2">
              {"// CERTIFICATIONS & NORMES"}
            </span>
            <p className="font-geist text-sm text-text-secondary max-w-md">
              Toutes nos opérations sont auditées et certifiées par des
              organismes indépendants.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.1em] text-text-tertiary">
              TOUS AUDITS À JOUR — 2026
            </span>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-card flex flex-col items-center justify-center py-8 px-4 gap-2 hover:bg-surface-light transition-colors duration-300"
            >
              <span className="font-mono text-sm font-bold text-text-secondary/70 tracking-[0.1em]">
                {cert.name}
              </span>
              <span className="font-mono text-[9px] tracking-[0.1em] text-text-tertiary/50 uppercase text-center">
                {cert.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
