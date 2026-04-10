"use client";

const STACK = [
  "Kali Linux",
  "Burp Suite",
  "Nmap",
  "Wireshark",
  "Metasploit",
  "Python",
  "Wazuh",
  "Elastic SIEM",
  "Next.js",
  "TypeScript",
  "Linux",
  "Suricata",
];

export default function Marquee() {
  const list = [...STACK, ...STACK];

  return (
    <section
      className="relative py-8 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span
        className="block text-center font-vt text-[14px] uppercase mb-6"
        style={{ color: "#333333", letterSpacing: "0.2em" }}
      >
        STACK & OUTILS
      </span>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-20 w-max"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {list.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-vt text-[18px] shrink-0 transition-opacity duration-300 select-none"
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
