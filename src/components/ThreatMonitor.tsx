"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const MODULES = [
  { name: "EDR", status: "ACTIF", active: true },
  { name: "FIREWALL", status: "ACTIF", active: true },
  { name: "SCAN", status: "EN COURS", active: false },
  { name: "VPN ZERO-TRUST", status: "ACTIF", active: true },
  { name: "SIEM", status: "ACTIF", active: true },
];

const LOGS = [
  { time: "14:32:01", type: "BLOCK", msg: "185.234.xx.xx → PORT 22" },
  { time: "14:32:03", type: "ALERT", msg: "svchost.exe — PID 4821" },
  { time: "14:32:07", type: "OK", msg: "Scan complete — 0 threats" },
  { time: "14:32:11", type: "BLOCK", msg: "Phishing URL — quarantined" },
  { time: "14:32:15", type: "INFO", msg: "47 endpoints synced" },
  { time: "14:32:19", type: "BLOCK", msg: "Ransomware sig — isolated" },
  { time: "14:32:23", type: "OK", msg: "Firewall — 312 rules active" },
  { time: "14:32:27", type: "ALERT", msg: "Brute force 10.0.0.44:3389" },
  { time: "14:32:31", type: "INFO", msg: "Backup 2.4TB encrypted" },
  { time: "14:32:35", type: "BLOCK", msg: "C2 beacon — isolated" },
];

const BAR_HEIGHTS = [45, 65, 30, 80, 55, 40, 70];
const BAR_ALERTS = [false, false, false, true, false, false, false];

const THREAT_POINTS = [
  { x: 72, y: 28, label: "RU" },
  { x: 82, y: 32, label: "CN" },
  { x: 85, y: 28, label: "KP" },
  { x: 62, y: 35, label: "IR" },
  { x: 15, y: 45, label: "BR" },
  { x: 52, y: 48, label: "NG" },
  { x: 78, y: 52, label: "IN" },
];

const WORLD_PATH =
  "M12,28 L18,22 L22,24 L28,20 L32,22 L35,18 L42,16 L48,18 L50,22 L54,20 L58,22 L62,18 L66,20 L72,16 L78,18 L82,22 L88,20 L92,24 L88,28 L84,32 L80,30 L76,34 L72,32 L68,36 L64,34 L60,38 L56,36 L52,40 L48,38 L44,42 L40,40 L36,44 L32,42 L28,46 L24,44 L20,48 L16,44 L12,40 L10,36 L12,32 Z M54,46 L58,44 L62,48 L66,46 L70,50 L74,48 L78,52 L82,50 L86,54 L82,58 L78,56 L74,60 L70,58 L66,62 L62,58 L58,56 L54,52 L52,48 Z";

function isAlert(type: string) {
  return type === "BLOCK" || type === "ALERT";
}

export default function ThreatMonitor() {
  const indexRef = useRef(0);
  const [visibleLogs, setVisibleLogs] = useState(LOGS.slice(0, 5));

  const tick = useCallback(() => {
    const newLog = LOGS[indexRef.current % LOGS.length];
    indexRef.current += 1;
    setVisibleLogs((prev) => [newLog, ...prev.slice(0, 4)]);
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 2500);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mt-16 w-full max-w-[960px] mx-auto"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          background: "#060606",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "8px",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.6), 0 0 120px rgba(0,255,65,0.03)",
          transform: "perspective(1200px) rotateX(4deg)",
          height: "300px",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-4 h-9 shrink-0"
          style={{
            background: "#0A0A0A",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
          </div>
          <span className="font-mono text-[10px] tracking-[0.1em] text-text-tertiary ml-2">
            PRISME — THREAT MONITOR
          </span>
          <span className="ml-auto font-vt text-[11px] tracking-[0.15em] text-text-tertiary/40 uppercase">
            SIMULATION // DÉMO
          </span>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-36px)]">
          {/* Col 1 — Sidebar */}
          <div
            className="w-[18%] shrink-0 p-3 flex flex-col gap-1.5 overflow-hidden"
            style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
          >
            {MODULES.map((mod) => (
              <div key={mod.name} className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="shrink-0 text-[10px]"
                    style={{
                      color: mod.active ? "#00FF41" : "#FFBD2E",
                      animation: "pulse-dot 2s ease-in-out infinite",
                    }}
                  >
                    {mod.active ? "●" : "◌"}
                  </span>
                  <span className="font-vt text-[14px] text-text-tertiary truncate">
                    {mod.name}
                  </span>
                </div>
                <span
                  className="font-vt text-[12px] shrink-0"
                  style={{ color: mod.active ? "rgba(255,255,255,0.3)" : "#FFBD2E" }}
                >
                  {mod.status}
                </span>
              </div>
            ))}
          </div>

          {/* Col 2 — Logs */}
          <div
            className="w-[38%] p-3 flex flex-col overflow-hidden"
            style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="font-vt text-[14px] text-cyber-green/70 mb-2 shrink-0">
              {"// SIMULATED_THREAT_FEED"}
            </span>
            <div className="flex-1 overflow-hidden">
              {visibleLogs.map((log, i) => (
                <div
                  key={`${log.time}-${i}`}
                  className="font-mono text-[9px] leading-[2] truncate"
                  style={{
                    color: isAlert(log.type) ? "#FF5F57" : "#888888",
                    opacity: 1 - i * 0.15,
                  }}
                >
                  {log.time}{" "}
                  <span style={{ color: isAlert(log.type) ? "#FF5F57" : "rgba(255,255,255,0.25)" }}>
                    [{log.type}]
                  </span>{" "}
                  {log.msg}
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Bars */}
          <div
            className="w-[20%] p-3 flex flex-col"
            style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="font-vt text-[12px] text-text-muted mb-2">
              THREAT LEVEL
            </span>
            <div className="flex items-end gap-1.5 flex-1 pb-1">
              {BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: BAR_ALERTS[i]
                      ? "rgba(255,95,87,0.7)"
                      : "rgba(0,255,65,0.5)",
                    animation:
                      i === BAR_HEIGHTS.length - 1
                        ? "pulse-bar 2s ease-in-out infinite"
                        : undefined,
                  }}
                />
              ))}
            </div>
            <div className="pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="font-vt text-[14px] text-cyber-green">
                RISQUE : 23/100
              </span>
            </div>
          </div>

          {/* Col 4 — World Map */}
          <div className="w-[24%] p-3 flex flex-col">
            <span className="font-vt text-[12px] text-cyber-green/70 mb-2">
              GEO_THREATS — DÉMO
            </span>
            <div className="flex-1 relative">
              <svg viewBox="0 0 100 70" className="w-full h-full">
                <path
                  d={WORLD_PATH}
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="0.5"
                />
                {THREAT_POINTS.map((pt, i) => (
                  <g key={pt.label}>
                    <circle cx={pt.x} cy={pt.y} r="1.2" fill="#FF5F57" opacity="0.9">
                      <animate
                        attributeName="opacity"
                        values="0.9;0.4;0.9"
                        dur={`${1.5 + i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx={pt.x} cy={pt.y} r="1.2" fill="none" stroke="#FF5F57" strokeWidth="0.3">
                      <animate
                        attributeName="r"
                        values="1.2;4;1.2"
                        dur={`${2 + i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;0;0.6"
                        dur={`${2 + i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
