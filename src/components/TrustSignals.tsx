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
    <section ref={ref} className="section-light relative py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <span
              className="font-grotesk text-[11px] tracking-[0.12em] uppercase block mb-2"
              style={{ color: "#999" }}
            >
              Domaines d&apos;expertise
            </span>
            <p className="font-grotesk text-[14px] max-w-md" style={{ color: "#555" }}>
              3 ans d&apos;expérience en entreprise privée. Compétences
              opérationnelles, pas des slides.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span
              className="font-grotesk text-[12px] tracking-[0.05em] uppercase"
              style={{ color: "#888" }}
            >
              Opérateur indépendant — France
            </span>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px"
          style={{ background: "rgba(0,0,0,0.08)" }}
        >
          {EXPERTISE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center justify-center py-8 px-4 gap-2 transition-colors duration-300"
              style={{ background: "#FAFAF8" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#F0F0EA";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FAFAF8";
              }}
            >
              <span
                className="font-grotesk text-[14px] font-semibold"
                style={{ color: "#333" }}
              >
                {item.name}
              </span>
              <span
                className="font-grotesk text-[12px] uppercase text-center"
                style={{ color: "#888" }}
              >
                {item.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
