"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

export default function PackCard({
  pack,
  onShowDetails,
}: {
  pack: Pack;
  onShowDetails?: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
        width: "min(380px, 82vw)",
        height: "520px",
        scrollSnapAlign: "start",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={(e) => {
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
          <button
            onClick={() => onShowDetails?.(pack.id)}
            className="text-left"
          >
            <h3 className="font-grotesk text-[15px] font-semibold text-text uppercase hover:text-white transition-colors">
              {pack.name}
            </h3>
            <p className="font-grotesk text-[12px] text-text-tertiary uppercase mt-0.5">
              {pack.tagline}
            </p>
          </button>
        </div>
        {pack.featured && (
          <span
            className="font-grotesk text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 text-cyber-green shrink-0"
            style={{ border: "1px solid rgba(0,255,65,0.4)" }}
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
            <span className="block font-mono text-[18px] font-bold text-text">
              {metric.value}
            </span>
            <span className="block font-grotesk text-[11px] text-text-tertiary uppercase tracking-[0.05em]">
              {metric.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 space-y-2 mb-5">
        {pack.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="font-mono text-[12px] text-text-muted mt-0.5 shrink-0">
              +
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
        <div
          className="flex items-baseline gap-0.5 shrink-0"
          style={{ whiteSpace: "nowrap" }}
        >
          <span
            className="font-mono text-2xl font-bold text-white tracking-tight"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {pack.price}
          </span>
          <span className="font-grotesk text-[13px] text-text-tertiary ml-1">
            {pack.period}
          </span>
        </div>
        <button
          onClick={() => window.dispatchEvent(new Event("open-wizard"))}
          className="group/btn inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase shrink-0 bg-transparent text-text hover:text-white transition-all duration-200"
          style={{
            border: "1px solid rgba(255,255,255,0.25)",
            padding: "10px 20px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#EDEDED";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.25)";
          }}
        >
          DÉPLOYER
          <ArrowRight
            size={12}
            className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
          />
        </button>
      </div>
    </motion.div>
  );
}
