"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Server, Cloud } from "lucide-react";

const INFRA_NODES = [
  { icon: Monitor, label: "POSTES", x: 160 },
  { icon: Server, label: "SERVEURS", x: 400 },
  { icon: Cloud, label: "CLOUD", x: 640 },
];

const THREAT_NODES = [
  { label: "RANSOMWARE", x: 100 },
  { label: "PHISHING", x: 300 },
  { label: "INTRUSION", x: 500 },
  { label: "DDOS", x: 700 },
];

const SHIELD_Y = 180;
const SHIELD_CX = 400;
const INFRA_Y = 50;
const THREAT_Y = 320;

export default function ArchitectureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <span className="font-vt text-[16px] text-cyber-green/60 uppercase block mb-4">
          {"// ARCHITECTURE_PROTECTION"}
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-grotesk font-bold text-text mb-16"
          style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.04em" }}
        >
          Votre infrastructure, protégée en profondeur.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full overflow-x-auto"
        >
          <svg
            viewBox="0 0 800 400"
            className="w-full max-w-[800px] mx-auto"
            style={{ minWidth: "600px" }}
          >
            {INFRA_NODES.map((node, i) => (
              <g key={`conn-infra-${i}`}>
                <line
                  x1={node.x} y1={INFRA_Y + 45}
                  x2={SHIELD_CX} y2={SHIELD_Y - 10}
                  stroke="rgba(255,255,255,0.08)" strokeWidth="1"
                />
                <circle r="3" fill="rgba(0,255,65,0.6)">
                  <animateMotion
                    dur={`${1.8 + i * 0.4}s`}
                    repeatCount="indefinite"
                    path={`M${node.x},${INFRA_Y + 45} L${SHIELD_CX},${SHIELD_Y - 10}`}
                  />
                </circle>
              </g>
            ))}

            {THREAT_NODES.map((node, i) => (
              <g key={`conn-threat-${i}`}>
                <line
                  x1={SHIELD_CX} y1={SHIELD_Y + 50}
                  x2={node.x} y2={THREAT_Y - 5}
                  stroke="rgba(255,95,87,0.08)" strokeWidth="1"
                />
                <circle r="3" fill="rgba(255,95,87,0.6)">
                  <animateMotion
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M${SHIELD_CX},${SHIELD_Y + 50} L${node.x},${THREAT_Y - 5}`}
                  />
                </circle>
              </g>
            ))}

            <text x="400" y="20" textAnchor="middle" fill="#555555" fontSize="9" fontFamily="'VT323', monospace" letterSpacing="0.15em">
              VOTRE INFRASTRUCTURE
            </text>

            {INFRA_NODES.map((node, i) => (
              <g key={`infra-${i}`}>
                <rect x={node.x - 20} y={INFRA_Y - 5} width="40" height="40" fill="none" stroke="#333333" strokeWidth="1" />
                <foreignObject x={node.x - 10} y={INFRA_Y + 3} width="20" height="20">
                  <div className="flex items-center justify-center w-5 h-5">
                    <node.icon size={14} color="#888888" />
                  </div>
                </foreignObject>
                <text x={node.x} y={INFRA_Y + 55} textAnchor="middle" fill="#888888" fontSize="10" fontFamily="'VT323', monospace">
                  {node.label}
                </text>
              </g>
            ))}

            <rect
              x={SHIELD_CX - 160} y={SHIELD_Y - 25}
              width="320" height="65" rx="0"
              fill="rgba(0,255,65,0.03)" stroke="rgba(0,255,65,0.2)" strokeWidth="1"
            >
              <animate attributeName="stroke-opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x={SHIELD_CX} y={SHIELD_Y + 2} textAnchor="middle" fill="#00FF41" fontSize="14" fontFamily="'VT323', monospace" fontWeight="700">
              PRISME SHIELD
            </text>
            <text x={SHIELD_CX} y={SHIELD_Y + 22} textAnchor="middle" fill="#555555" fontSize="10" fontFamily="'VT323', monospace">
              EDR · FIREWALL · SIEM · SOC MANAGÉ
            </text>

            <text x="400" y={THREAT_Y - 20} textAnchor="middle" fill="#555555" fontSize="9" fontFamily="'VT323', monospace" letterSpacing="0.15em">
              MENACES NEUTRALISÉES
            </text>

            {THREAT_NODES.map((node, i) => (
              <g key={`threat-${i}`}>
                <rect x={node.x - 50} y={THREAT_Y} width="100" height="34" fill="rgba(255,95,87,0.05)" stroke="rgba(255,95,87,0.2)" strokeWidth="1" />
                <text x={node.x} y={THREAT_Y + 20} textAnchor="middle" fill="#4A2020" fontSize="10" fontFamily="'VT323', monospace">
                  {node.label}
                </text>
                <text x={node.x + 38} y={THREAT_Y + 14} textAnchor="middle" fill="rgba(255,95,87,0.4)" fontSize="12" fontFamily="monospace">
                  ✕
                </text>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
