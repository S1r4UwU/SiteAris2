"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FRAMEWORKS = [
  "Framework ANSSI",
  "Méthodologie OWASP",
  "MITRE ATT&CK",
  "NIST Cybersecurity",
];

export default function ComplianceBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-light relative py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <span
          className="font-grotesk text-[11px] tracking-[0.12em] uppercase block mb-6"
          style={{ color: "#999" }}
        >
          Frameworks & méthodologies appliqués
        </span>

        <div className="flex flex-wrap gap-3">
          {FRAMEWORKS.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="font-grotesk text-[14px] font-medium px-5 py-3 transition-all duration-200"
              style={{ color: "#333", border: "1px solid rgba(0,0,0,0.12)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(0,0,0,0.12)";
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
