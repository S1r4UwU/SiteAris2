"use client";

const PARTNERS = [
  "Microsoft",
  "CrowdStrike",
  "Palo Alto Networks",
  "Fortinet",
  "SentinelOne",
  "Wazuh",
  "Acronis",
  "Veeam",
  "Elastic SIEM",
];

export default function Marquee() {
  const list = [...PARTNERS, ...PARTNERS];

  return (
    <section
      className="relative py-8 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span className="block text-center font-mono text-[9px] tracking-[0.2em] uppercase mb-6" style={{ color: "#333333" }}>
        PROPULSÉ PAR LES TECHNOLOGIES DE POINTE
      </span>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-20 w-max"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {list.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-mono text-[13px] tracking-[0.05em] shrink-0 transition-opacity duration-300 cursor-default select-none"
              style={{ color: "rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.2)";
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
