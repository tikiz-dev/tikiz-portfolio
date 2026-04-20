"use server";

import { Resend } from "resend";
import { funnelSubmissionSchema, labelFor, type FunnelSubmission } from "@/lib/funnel";
import { COMPANY, SITE } from "@/lib/utils";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const FROM_EMAIL = process.env.FUNNEL_FROM_EMAIL ?? "Tikiz <hallo@tikiz.dev>";
const OWNER_EMAIL = process.env.FUNNEL_OWNER_EMAIL ?? COMPANY.email;

export async function submitFunnel(raw: unknown): Promise<SubmitResult> {
  const parsed = funnelSubmissionSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path.join(".")] = issue.message;
    }
    return { ok: false, error: "Bitte prüfe die markierten Felder.", fieldErrors };
  }

  const data = parsed.data;

  // Honeypot — silently drop bots, return success.
  if (data.website && data.website.length > 0) {
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[funnel] RESEND_API_KEY not set");
    return {
      ok: false,
      error:
        "Der Versand ist gerade nicht möglich. Bitte schreib mir direkt an " +
        COMPANY.email +
        " — danke!",
    };
  }

  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        replyTo: data.contact.email,
        subject: `Neue Projekt-Anfrage von ${data.contact.name}`,
        html: renderOwnerEmail(data),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: data.contact.email,
        replyTo: OWNER_EMAIL,
        subject: `Deine Anfrage ist angekommen, ${data.contact.name.split(" ")[0] || data.contact.name} — so geht's weiter`,
        html: renderCustomerEmail(data),
      }),
    ]);
  } catch (err) {
    console.error("[funnel] Resend error", err);
    return {
      ok: false,
      error:
        "Der Versand ist fehlgeschlagen. Bitte versuch es später erneut oder schreib direkt an " +
        COMPANY.email +
        ".",
    };
  }

  return { ok: true };
}

/* ------------------------------------------------------------------ *
 * Email templates                                                     *
 * ------------------------------------------------------------------ */

function renderOwnerEmail(data: FunnelSubmission): string {
  const rows: [string, string][] = [
    ["Projekttyp", labelFor("projectType", data.projectType)],
  ];

  if (data.currentSystem) rows.push(["Aktuelles System", labelFor("currentSystem", data.currentSystem)]);
  if (data.currentUrl) rows.push(["Aktuelle URL", data.currentUrl]);
  if (data.goals.length) rows.push(["Ziele", data.goals.map((g) => labelFor("goals", g)).join(", ")]);
  if (data.industry) rows.push(["Branche", labelFor("industry", data.industry)]);
  if (data.scope) rows.push(["Umfang", labelFor("scope", data.scope)]);
  if (data.features.length) rows.push(["Funktionen", data.features.map((f) => labelFor("features", f)).join(", ")]);
  if (data.designState) rows.push(["Design & Content", labelFor("designState", data.designState)]);
  if (data.inspirations) rows.push(["Inspirationen", data.inspirations]);
  if (data.timeline) rows.push(["Zeitrahmen", labelFor("timeline", data.timeline)]);
  if (data.budget) rows.push(["Budget", labelFor("budget", data.budget)]);
  if (data.maintenance) rows.push(["Wartung", labelFor("maintenance", data.maintenance)]);

  rows.push(["", ""]);
  rows.push(["Name", data.contact.name]);
  rows.push(["E-Mail", data.contact.email]);
  if (data.contact.phone) rows.push(["Telefon", data.contact.phone]);
  if (data.contact.company) rows.push(["Firma", data.contact.company]);
  if (data.contact.message) rows.push(["Nachricht", data.contact.message]);

  const tableRows = rows
    .map(([label, value]) => {
      if (!label && !value) return `<tr><td colspan="2" style="padding:12px 0;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0" /></td></tr>`;
      return `<tr>
        <td style="padding:8px 16px 8px 0;color:#6b7280;font-size:14px;vertical-align:top;width:180px;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;color:#111827;font-size:14px;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`;
    })
    .join("");

  return wrap(`
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827;">Neue Projekt-Anfrage</h1>
    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">
      von <strong style="color:#111827;">${escapeHtml(data.contact.name)}</strong>
      — direkte Antwort per Reply an <a style="color:#1fa7ff;" href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a>
    </p>
    <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
  `);
}

function renderCustomerEmail(data: FunnelSubmission): string {
  const firstName = data.contact.name.split(" ")[0] || data.contact.name;
  const phoneHref = COMPANY.mobile.replace(/\s/g, "");

  const summary: [string, string][] = [];
  if (data.projectType) summary.push(["Projekttyp", labelFor("projectType", data.projectType)]);
  if (data.scope) summary.push(["Umfang", labelFor("scope", data.scope)]);
  if (data.timeline) summary.push(["Zeitrahmen", labelFor("timeline", data.timeline)]);
  if (data.budget && data.budget !== "unsure") summary.push(["Budget", labelFor("budget", data.budget)]);

  const summaryRows = summary
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 16px 10px 0;color:#6b7280;font-size:13px;width:140px;vertical-align:top;">${escapeHtml(k)}</td>
        <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:500;">${escapeHtml(v)}</td>
      </tr>`
    )
    .join("");

  const inner = `
    <!-- Branded header -->
    <div style="background:linear-gradient(135deg,#1fa7ff 0%,#0e7fcc 100%);padding:40px 32px;text-align:center;">
      <div style="display:inline-block;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:28px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">
        Tikiz<span style="color:#ff9a46;">.</span>
      </div>
      <div style="margin-top:12px;color:rgba(255,255,255,0.85);font-size:14px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;">
        Deine Anfrage ist angekommen
      </div>
    </div>

    <!-- Content -->
    <div style="padding:40px 32px 32px;">
      <h1 style="margin:0 0 20px;font-size:24px;color:#111827;font-weight:600;letter-spacing:-0.01em;">
        Hallo ${escapeHtml(firstName)},
      </h1>

      <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.65;">
        danke, dass du dir die Zeit genommen hast, mir deine Vorstellungen zu schildern —
        richtig klasse! Ich habe deine Anfrage bereits erhalten und schaue sie mir jetzt in
        Ruhe an.
      </p>

      <p style="margin:0 0 32px;color:#374151;font-size:16px;line-height:1.65;">
        <strong style="color:#111827;">Innerhalb der nächsten 24 Stunden</strong> höre
        ich persönlich von dir — mit einer ersten Einschätzung und einem konkreten
        Vorschlag, wie wir dein Projekt angehen können.
      </p>

      ${
        summaryRows
          ? `
      <!-- Summary box -->
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px 24px;margin:0 0 32px;">
        <div style="color:#6b7280;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">
          Das habe ich von dir
        </div>
        <table style="width:100%;border-collapse:collapse;">${summaryRows}</table>
      </div>`
          : ""
      }

      <!-- Timeline -->
      <div style="margin:0 0 32px;">
        <div style="color:#6b7280;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:16px;">
          So geht es weiter
        </div>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="width:32px;vertical-align:top;padding:0 12px 16px 0;">
              <div style="width:28px;height:28px;border-radius:999px;background:#1fa7ff;color:#ffffff;text-align:center;line-height:28px;font-size:13px;font-weight:600;">1</div>
            </td>
            <td style="padding:0 0 16px;vertical-align:top;">
              <div style="color:#111827;font-size:15px;font-weight:600;margin-bottom:2px;">Ich sichte deine Antworten</div>
              <div style="color:#6b7280;font-size:14px;line-height:1.5;">Heute oder spätestens morgen früh</div>
            </td>
          </tr>
          <tr>
            <td style="width:32px;vertical-align:top;padding:0 12px 16px 0;">
              <div style="width:28px;height:28px;border-radius:999px;background:#1fa7ff;color:#ffffff;text-align:center;line-height:28px;font-size:13px;font-weight:600;">2</div>
            </td>
            <td style="padding:0 0 16px;vertical-align:top;">
              <div style="color:#111827;font-size:15px;font-weight:600;margin-bottom:2px;">Persönliche Antwort mit Konzept</div>
              <div style="color:#6b7280;font-size:14px;line-height:1.5;">Innerhalb von 24 Stunden per Mail</div>
            </td>
          </tr>
          <tr>
            <td style="width:32px;vertical-align:top;padding:0 12px 0 0;">
              <div style="width:28px;height:28px;border-radius:999px;background:#1fa7ff;color:#ffffff;text-align:center;line-height:28px;font-size:13px;font-weight:600;">3</div>
            </td>
            <td style="vertical-align:top;">
              <div style="color:#111827;font-size:15px;font-weight:600;margin-bottom:2px;">Kennenlern-Call (kostenlos)</div>
              <div style="color:#6b7280;font-size:14px;line-height:1.5;">30 Min. per Video oder Telefon — falls du willst</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Contact CTA -->
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin:0 0 32px;">
        <div style="color:#111827;font-size:15px;font-weight:600;margin-bottom:6px;">
          Fällt dir noch etwas ein?
        </div>
        <div style="color:#374151;font-size:14px;line-height:1.6;">
          Du kannst einfach auf diese E-Mail antworten, oder mich direkt anrufen:<br/>
          <a style="color:#0e7fcc;font-weight:600;text-decoration:none;" href="tel:${phoneHref}">${escapeHtml(COMPANY.mobile)}</a>
        </div>
      </div>

      <p style="margin:0 0 8px;color:#374151;font-size:16px;line-height:1.65;">
        Bis bald,
      </p>
      <p style="margin:0 0 4px;color:#111827;font-size:16px;font-weight:600;">
        Özgür Tikiz
      </p>
      <p style="margin:0 0 32px;color:#6b7280;font-size:14px;">
        Freelance Web Developer · <a style="color:#0e7fcc;text-decoration:none;" href="${SITE.url}">tikiz.dev</a>
      </p>

      <!-- Soft CTA -->
      <div style="border-top:1px solid #e5e7eb;padding-top:24px;margin-bottom:0;">
        <a href="${SITE.url}/work" style="display:inline-block;color:#0e7fcc;font-size:14px;font-weight:600;text-decoration:none;">
          → Aktuelle Projekte ansehen
        </a>
      </div>
    </div>

    <!-- Legal footer -->
    <div style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:11px;line-height:1.7;">
        ${escapeHtml(COMPANY.legalName)} · Inhaber ${escapeHtml(COMPANY.owner)} ·
        ${escapeHtml(COMPANY.street)}, ${escapeHtml(COMPANY.zip)} ${escapeHtml(COMPANY.city)} ·
        USt-ID ${escapeHtml(COMPANY.vatId)}
      </p>
    </div>
  `;

  return wrapBranded(inner);
}

function wrap(inner: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:32px;">${inner}</div>
  </body></html>`;
}

function wrapBranded(inner: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px -8px rgba(0,0,0,0.08);">${inner}</div>
  </body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
