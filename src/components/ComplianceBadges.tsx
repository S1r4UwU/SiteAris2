"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BADGES = [
  "ISO 27001",
  "RGPD Compliant",
  "ANSSI Recommandé",
  "DORA Ready",
];

export default function ComplianceBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <span className="font-mono text-[10px] tracking-[0.15em] text-text-muted uppercase block mb-6">
          {"// CONFORMITÉ & CERTIFICATIONS"}
        </span>

        <div className="flex flex-wrap gap-3">
          {BADGES.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="font-mono text-[11px] tracking-[0.1em] text-text-tertiary px-5 py-3 transition-all duration-200 hover:text-[#AAAAAA] cursor-default"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.1)";
              }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
