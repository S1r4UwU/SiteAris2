import { notFound } from "next/navigation";
import { PACKS, getPackBySlug, getAllPackSlugs } from "@/data/packs";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return getAllPackSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const pack = getPackBySlug(slug);
    if (!pack) return { title: "Service introuvable" };
    return {
      title: `${pack.name} — PRISME-ONE`,
      description: pack.description,
      openGraph: {
        title: `${pack.name} — PRISME-ONE`,
        description: pack.description,
        type: "website",
      },
    };
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) notFound();

  const otherPacks = PACKS.filter((p) => p.id !== slug).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6"
        style={{ background: "rgba(0,0,0,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link href="/" className="font-vt text-[24px] text-[#EDEDED]">
          PRISME<span style={{ color: "#00FF41" }}>_</span>
        </Link>
        <Link
          href="/#offres"
          className="ml-auto font-mono text-[11px] tracking-[0.15em] uppercase text-[#888] hover:text-[#EDEDED] transition-colors"
        >
          ← TOUS LES PACKS
        </Link>
      </header>

      <main className="pt-32 pb-24 px-6 mx-auto max-w-3xl">
        {pack.featured && (
          <span
            className="inline-block font-vt text-[14px] uppercase px-3 py-1 mb-6"
            style={{ color: "#00FF41", border: "1px solid #00FF41" }}
          >
            RECOMMANDÉ
          </span>
        )}

        <span
          className="block font-vt text-[16px] uppercase mb-4"
          style={{ color: "#555" }}
        >
          {"// SERVICE"}
        </span>

        <h1
          className="font-vt text-[48px] leading-none mb-2"
          style={{ color: "#EDEDED" }}
        >
          {pack.name}
        </h1>
        <p className="font-vt text-[18px] mb-8" style={{ color: "#555" }}>
          {pack.tagline}
        </p>

        <div className="flex items-baseline gap-2 mb-10">
          <span className="font-mono text-[36px] font-bold" style={{ color: "#EDEDED" }}>
            {pack.price}
          </span>
          <span className="font-vt text-[18px]" style={{ color: "#555" }}>
            {pack.period}
          </span>
        </div>

        <p
          className="text-[15px] leading-[1.8] mb-12"
          style={{ color: "#888", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {pack.description}
        </p>

        {/* Metrics */}
        <div
          className="grid gap-px mb-12"
          style={{
            gridTemplateColumns: `repeat(${Math.min(pack.metrics.length, 4)}, 1fr)`,
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {pack.metrics.map((m) => (
            <div key={m.label} style={{ background: "#0D0D0D", padding: "16px" }}>
              <span className="block font-vt text-[22px]" style={{ color: "#EDEDED" }}>
                {m.value}
              </span>
              <span className="block font-vt text-[14px] uppercase" style={{ color: "#555" }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-12">
          <span className="block font-vt text-[16px] uppercase mb-4" style={{ color: "#555" }}>
            {"// FONCTIONNALITÉS"}
          </span>
          <div className="space-y-3">
            {pack.features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-vt text-[14px] mt-0.5 shrink-0" style={{ color: "#3A3A3A" }}>[+]</span>
                <span className="text-[14px] leading-relaxed" style={{ color: "#888", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mb-12">
          <span className="block font-vt text-[16px] uppercase mb-4" style={{ color: "#555" }}>
            {"// STACK TECHNIQUE"}
          </span>
          <div className="flex flex-wrap gap-2">
            {pack.stack.map((t) => (
              <span
                key={t}
                className="font-vt text-[14px] px-3 py-1.5"
                style={{ color: "#555", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="p-6"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0A0A0A" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-vt text-[16px] block" style={{ color: "#EDEDED" }}>
                Prêt à déployer ?
              </span>
              <span className="font-vt text-[14px]" style={{ color: "#555" }}>
                Diagnostic gratuit en 2 minutes
              </span>
            </div>
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3.5 transition-all duration-200"
              style={{ background: "#EDEDED", color: "#050505", border: "1px solid #EDEDED" }}
            >
              LANCER LE DIAGNOSTIC →
            </Link>
          </div>
        </div>

        {/* Other packs */}
        {otherPacks.length > 0 && (
          <div className="mt-16">
            <span className="block font-vt text-[16px] uppercase mb-6" style={{ color: "#555" }}>
              {"// AUTRES SERVICES"}
            </span>
            <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${otherPacks.length}, 1fr)`, background: "rgba(255,255,255,0.06)" }}>
              {otherPacks.map((p) => (
                <Link
                  key={p.id}
                  href={`/services/${p.id}`}
                  className="block p-5 transition-colors duration-200"
                  style={{ background: "#0D0D0D" }}
                >
                  <span className="block font-vt text-[16px] mb-1" style={{ color: "#EDEDED" }}>{p.name}</span>
                  <span className="block font-vt text-[14px] mb-2" style={{ color: "#555" }}>{p.tagline}</span>
                  <span className="font-mono text-[14px] font-bold" style={{ color: "#EDEDED" }}>
                    {p.price} <span style={{ color: "#555" }}>{p.period}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
