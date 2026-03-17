"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Pack {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  icon: LucideIcon;
  featured?: boolean;
  metrics: { label: string; value: string }[];
  features: string[];
  gridArea?: string;
}

export default function PackCard({ pack }: { pack: Pack }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col bg-card card-glow-hover shrink-0"
      style={{
        border: pack.featured
          ? "1px solid rgba(255,255,255,0.15)"
          : "1px solid rgba(255,255,255,0.08)",
        padding: "24px",
        width: "380px",
        height: "520px",
        scrollSnapAlign: "start",
      }}
      onMouseEnter={(e) => {
        setHovered(true);
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        (e.currentTarget as HTMLElement).style.borderColor = pack.featured
          ? "rgba(255,255,255,0.15)"
          : "rgba(255,255,255,0.08)";
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center text-text-tertiary shrink-0"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <pack.icon size={16} />
          </div>
          <div>
            <h3 className="font-vt text-[18px] text-text uppercase">
              {pack.name}
            </h3>
            <p className="font-vt text-[16px] text-text-tertiary uppercase mt-0.5">
              {pack.tagline}
            </p>
          </div>
        </div>
        {pack.featured && (
          <span
            className="font-vt text-[14px] uppercase px-2 py-1 text-cyber-green shrink-0"
            style={{ border: "1px solid #00FF41" }}
          >
            RECOMMANDÉ
          </span>
        )}
      </div>

      <div
        className="grid grid-cols-2 gap-px mb-5 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        {pack.metrics.map((metric, i) => (
          <div key={i} className="bg-bg px-4 py-2.5">
            <span
              className="block font-vt text-[22px] text-text transition-colors duration-300"
              style={{ color: hovered ? "#E8FFE8" : "#FFFFFF" }}
            >
              {metric.value}
            </span>
            <span className="block font-vt text-[14px] text-text-tertiary uppercase">
              {metric.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 space-y-2 mb-5">
        {pack.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="font-vt text-[14px] text-[#3A3A3A] mt-0.5 shrink-0">
              [+]
            </span>
            <span className="font-grotesk text-[13px] text-text-secondary leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-auto pt-5 flex items-baseline justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-baseline gap-0.5 shrink-0" style={{ whiteSpace: "nowrap" }}>
          <span
            className="font-mono text-2xl font-bold text-white tracking-tight"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {pack.price}
          </span>
          <span className="font-vt text-[16px] text-text-tertiary ml-1">
            {pack.period}
          </span>
        </div>
        <a
          href="#contact"
          className="deploy-btn group/btn inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase shrink-0 bg-transparent text-text hover:text-white transition-all duration-200"
          style={{ border: "1px solid rgba(255,255,255,0.25)", padding: "10px 20px" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#EDEDED";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
          }}
        >
          <span
            className="hidden group-hover/btn:inline-block text-cyber-green mr-0.5"
            style={{ animation: "blink-cursor 1s step-end infinite" }}
          >
            ▋
          </span>
          DÉPLOYER
          <ArrowRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  );
}
