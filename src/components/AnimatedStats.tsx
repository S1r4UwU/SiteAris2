"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

interface StatProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  inView: boolean;
}

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  inView,
}: StatProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  );

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, target]);

  return (
    <div className="flex flex-col items-center gap-3 py-10 px-4">
      <div className="flex items-baseline">
        {prefix && (
          <span className="font-mono text-[64px] font-bold text-white leading-none">
            {prefix}
          </span>
        )}
        <motion.span className="font-mono text-[64px] font-bold text-white leading-none tabular-nums">
          {rounded}
        </motion.span>
        {suffix && (
          <span className="font-mono text-[64px] font-bold text-white leading-none">
            {suffix}
          </span>
        )}
      </div>
      <span className="font-mono text-[11px] tracking-[0.12em] text-text-muted uppercase text-center">
        {label}
      </span>
    </div>
  );
}

const STATS = [
  { target: 247, suffix: "", label: "Entreprises protégées en France" },
  { target: 99.97, suffix: "%", label: "Taux de détection", decimals: 2 },
  { target: 2, suffix: "h", prefix: "<", label: "Déploiement complet" },
  { target: 24, suffix: "/7", label: "Monitoring actif" },
];

export default function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="mt-14 w-full max-w-4xl"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="relative"
            style={
              i < STATS.length - 1
                ? { borderRight: "1px solid rgba(255,255,255,0.06)" }
                : undefined
            }
          >
            <AnimatedNumber
              target={stat.target}
              suffix={stat.suffix}
              prefix={stat.prefix}
              decimals={stat.decimals ?? 0}
              label={stat.label}
              inView={isInView}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
