import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const RECIPIENT = process.env.CONTACT_EMAIL ?? "contact@prisme-one.com";

export async function POST(request: Request) {
  try {
    const resend = getResend();
    if (!resend) {
      return NextResponse.json({ error: "Service email non configuré" }, { status: 503 });
    }

    const body = await request.json();
    const { parkSize, need, incident, email, message, type } = body;

    if (type === "freeform") {
      if (!message?.trim()) {
        return NextResponse.json({ error: "Message requis" }, { status: 400 });
      }

      await resend.emails.send({
        from: "PRISME-ONE <noreply@prisme-one.com>",
        to: RECIPIENT,
        subject: `[Contact libre] Nouveau message via prisme-one.com`,
        html: `
          <h2>Nouveau message — Formulaire libre</h2>
          <p><strong>Message :</strong></p>
          <pre style="background:#f5f5f5;padding:16px;border-radius:4px;white-space:pre-wrap;">${escapeHtml(message)}</pre>
          <hr/>
          <p style="color:#888;font-size:12px;">Envoyé depuis prisme-one.com</p>
        `,
      });

      return NextResponse.json({ success: true });
    }

    const needLabels: Record<string, string> = {
      audit: "Audit / Pentest",
      protection: "Protection continue",
      rgpd: "Conformité RGPD",
      unknown: "Je ne sais pas",
    };

    const parkLabels: Record<string, string> = {
      small: "1-10 postes",
      medium: "11-50 postes",
      large: "50+ postes",
    };

    await resend.emails.send({
      from: "PRISME-ONE <noreply@prisme-one.com>",
      to: RECIPIENT,
      subject: `[Diagnostic] ${needLabels[need] ?? need} — ${parkLabels[parkSize] ?? parkSize}`,
      html: `
        <h2>Nouveau diagnostic — Wizard CLI</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Taille du parc</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(parkLabels[parkSize] ?? parkSize)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Besoin</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(needLabels[need] ?? need)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Incident passé</td><td style="padding:8px;border-bottom:1px solid #eee;">${incident === "yes" ? "⚠️ Oui" : "Non"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email prospect</td><td style="padding:8px;border-bottom:1px solid #eee;">${email ? escapeHtml(email) : "<em>Non renseigné</em>"}</td></tr>
        </table>
        <hr/>
        <p style="color:#888;font-size:12px;">Envoyé depuis le wizard CLI — prisme-one.com</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
