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
  { time: "14:32:01", type: "BLOCK", msg: "185.234.xx.xx \u2192 PORT 22 ATTEMPT" },
  { time: "14:32:03", type: "ALERT", msg: "Suspicious: svchost.exe \u2014 PID 4821" },
  { time: "14:32:07", type: "OK", msg: "Endpoint scan complete \u2014 0 threats found" },
  { time: "14:32:11", type: "BLOCK", msg: "Phishing URL detected \u2014 user@domain.fr" },
  { time: "14:32:15", type: "INFO", msg: "Policy updated \u2014 47 endpoints synced" },
  { time: "14:32:19", type: "BLOCK", msg: "Ransomware signature \u2014 quarantined" },
  { time: "14:32:23", type: "OK", msg: "Firewall rules reloaded \u2014 312 active" },
  { time: "14:32:27", type: "ALERT", msg: "Brute force attempt \u2014 10.0.0.44:3389" },
  { time: "14:32:31", type: "INFO", msg: "Backup completed \u2014 2.4TB encrypted" },
  { time: "14:32:35", type: "BLOCK", msg: "C2 beacon detected \u2014 isolated endpoint" },
];

const BAR_HEIGHTS = [45, 65, 30, 80, 55, 40, 70];
const BAR_ALERTS = [false, false, false, true, false, false, false];

function isAlert(type: string) {
  return type === "BLOCK" || type === "ALERT";
}

export default function ThreatMonitor() {
  const indexRef = useRef(0);
  const [visibleLogs, setVisibleLogs] = useState(LOGS.slice(0, 6));

  const tick = useCallback(() => {
    const newLog = LOGS[indexRef.current % LOGS.length];
    indexRef.current += 1;
    setVisibleLogs((prev) => [newLog, ...prev.slice(0, 5)]);
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
          height: "280px",
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
            ARIS — THREAT MONITOR v2.1
          </span>
        </div>

        {/* Content columns */}
        <div className="flex h-[calc(100%-36px)]">
          {/* Column 1 — Sidebar (20%) */}
          <div
            className="w-[20%] shrink-0 p-3 flex flex-col gap-1.5 overflow-hidden"
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
                    {mod.active ? "\u25CF" : "\u25CC"}
                  </span>
                  <span className="font-mono text-[9px] text-text-tertiary truncate">
                    {mod.name}
                  </span>
                </div>
                <span
                  className="font-mono text-[8px] shrink-0"
                  style={{ color: mod.active ? "rgba(255,255,255,0.3)" : "#FFBD2E" }}
                >
                  {mod.status}
                </span>
              </div>
            ))}
          </div>

          {/* Column 2 — Logs (50%) */}
          <div
            className="w-[50%] p-3 flex flex-col overflow-hidden"
            style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="font-mono text-[9px] tracking-[0.15em] text-cyber-green/70 mb-2 shrink-0">
              {"// LIVE_THREAT_FEED"}
            </span>
            <div className="flex-1 overflow-hidden relative">
              {visibleLogs.map((log, i) => (
                <div
                  key={`${log.time}-${i}`}
                  className="font-mono text-[9px] leading-[1.8] truncate transition-opacity duration-300"
                  style={{
                    color: isAlert(log.type) ? "#FF5F57" : "#888888",
                    opacity: 1 - i * 0.12,
                  }}
                >
                  {log.time}{" "}
                  <span
                    style={{
                      color: isAlert(log.type)
                        ? "#FF5F57"
                        : "rgba(255,255,255,0.25)",
                    }}
                  >
                    [{log.type}]
                  </span>{" "}
                  {log.msg}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 — Threat Level (30%) */}
          <div className="w-[30%] p-3 flex flex-col">
            <span className="font-mono text-[9px] tracking-[0.15em] text-text-muted mb-3">
              THREAT LEVEL
            </span>

            <div className="flex items-end gap-2 flex-1 pb-2">
              {BAR_HEIGHTS.map((h, i) => {
                const isLast = i === BAR_HEIGHTS.length - 1;
                const isAlertBar = BAR_ALERTS[i];
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: isAlertBar
                        ? "rgba(255,95,87,0.7)"
                        : "rgba(0,255,65,0.5)",
                      animation: isLast
                        ? "pulse-bar 2s ease-in-out infinite"
                        : undefined,
                    }}
                  />
                );
              })}
            </div>

            <div
              className="pt-2 mt-auto"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="font-mono text-[10px] text-cyber-green tracking-[0.05em]">
                SCORE DE RISQUE : 23/100
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
