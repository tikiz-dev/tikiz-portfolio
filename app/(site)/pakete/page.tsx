import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import {
  ScrollReveal,
  ScrollRevealStagger,
  ScrollRevealItem,
} from "@/components/animations/scroll-reveal";
import {
  PACKAGES,
  PUBLIC_MODULES,
  WARTUNG,
  CATEGORY_LABELS,
  HOURLY_RATE_WITHOUT_CARE,
  BUNDLE_DISCOUNT,
  getPackageModules,
  type ModuleCategory,
} from "@/content/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pakete & Preise",
  description:
    "Transparente Preisstruktur für Websites: 3 Pakete (Starter, Standard, Premium), modular zusammenstellbar, inklusive Wartungs-Optionen. Alles netto.",
  alternates: { canonical: "/pakete" },
};

const eurFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const eur = (n: number) => eurFormatter.format(n);

const CATEGORY_ORDER: ModuleCategory[] = [
  "foundation",
  "pages",
  "features",
  "seo",
  "design",
  "compliance",
  "post-launch",
];

export default function PaketePage() {
  return (
    <>
      <PageHero
        eyebrow="Pakete & Preise"
        title={
          <>
            Transparente Preise.{" "}
            <span className="text-gradient-warm">Modular zusammenstellbar.</span>
          </>
        }
        description="Drei Pakete als Startpunkt, über 40 Module zum Anpassen. Jede Änderung reproduzierbar kalkulierbar: Paketpreis minus entferntes, plus hinzugebuchtes. Keine Überraschungen — weder jetzt noch beim Change Request."
        meta={[
          { label: "Pakete", value: "3 Stufen" },
          { label: "Module einzeln buchbar", value: String(PUBLIC_MODULES.length) },
          { label: "Bundle-Rabatt", value: "−15 %" },
          { label: "Alle Preise", value: "netto, zzgl. USt" },
        ]}
      />

      {/* Packages */}
      <section className="relative py-20 scroll-mt-24" id="pakete">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <Badge dot tone="brand">Pakete</Badge>
              <h2 className="display-2 mt-5">
                Drei Einstiegs-Pakete, auf typische Kunden zugeschnitten.
              </h2>
              <p className="mt-4 text-[color:var(--color-text-muted)]">
                Jedes Paket enthält eine Auswahl an Modulen, die zusammen
                fertige Websites ergeben. Der Bundle-Rabatt von −15 % kommt
                obendrauf, wenn alle Module als Paket gebucht werden.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg) => {
              const items = getPackageModules(pkg);
              const accentBorder =
                pkg.accent === "warm"
                  ? "border-[color:var(--color-glow-500)]/30"
                  : "border-[color:var(--color-brand-500)]/30";
              const accentGlow =
                pkg.accent === "warm"
                  ? "shadow-[0_0_0_1px_rgb(255_154_70_/_0.1),0_32px_80px_-20px_rgb(255_154_70_/_0.25)]"
                  : "shadow-[0_0_0_1px_rgb(31_167_255_/_0.1),0_32px_80px_-20px_rgb(31_167_255_/_0.25)]";
              return (
                <ScrollRevealItem key={pkg.slug}>
                  <article
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-[color:var(--color-surface-raised)] p-8 transition-shadow",
                      pkg.featured ? `${accentBorder} ${accentGlow}` : "border-white/10 hover:border-white/20"
                    )}
                  >
                    {pkg.featured && (
                      <div className="absolute right-4 top-4">
                        <Badge dot tone="warm">
                          <Sparkles className="size-3" /> Empfohlen
                        </Badge>
                      </div>
                    )}

                    <div className="text-3xl">{pkg.emoji}</div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                      {pkg.name}
                    </h3>
                    <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">
                      {pkg.tagline}
                    </p>
                    <p className="mt-4 text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                      {pkg.audience}
                    </p>

                    <div className="mt-8 flex items-baseline gap-2">
                      <span className="text-4xl font-bold tracking-tight">
                        {eur(pkg.price)}
                      </span>
                      <span className="text-sm text-[color:var(--color-text-muted)]">
                        netto
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[color:var(--color-text-subtle)]">
                      Modul-Summe {eur(pkg.modulesum)} · Bundle-Rabatt −
                      {Math.round(BUNDLE_DISCOUNT * 100)} %
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--color-text-subtle)]">
                      Dauer: {pkg.duration}
                    </p>

                    <ul className="mt-8 space-y-2.5 text-sm">
                      {items.map(({ module, count }) => (
                        <li
                          key={module.id}
                          className="flex items-start gap-2.5"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--color-brand-400)]" />
                          <span className="text-[color:var(--color-text)]">
                            {module.name}
                            {count > 1 && (
                              <span className="text-[color:var(--color-text-muted)]">
                                {" "}
                                × {count}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <ButtonLink
                        href="/anfrage"
                        variant={pkg.featured ? "primary" : "secondary"}
                        size="md"
                        withArrow
                        className="w-full"
                      >
                        {pkg.name} anfragen
                      </ButtonLink>
                    </div>
                  </article>
                </ScrollRevealItem>
              );
            })}
          </ScrollRevealStagger>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-[color:var(--color-text-muted)]">
              Laufende Drittkosten (Hosting bei Vercel, Domain, ggf. Resend/Upstash){" "}
              trägt der Kunde direkt — getrennt vom Projekt-Honorar.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Module catalog */}
      <section className="relative py-20 border-t border-white/5 scroll-mt-24" id="module">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <Badge dot tone="warm">Einzel-Module</Badge>
              <h2 className="display-2 mt-5">
                Alle Module auf einen Blick.
              </h2>
              <p className="mt-4 text-[color:var(--color-text-muted)]">
                Jedes Modul ist einzeln buchbar. Im Angebot werden sie
                transparent aufgeschlüsselt — so lässt sich jede Änderung
                nachvollziehen und neu berechnen.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-10">
            {CATEGORY_ORDER.map((cat) => {
              const mods = PUBLIC_MODULES.filter((m) => m.category === cat);
              if (mods.length === 0) return null;
              return (
                <ScrollReveal key={cat}>
                  <div>
                    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {mods.map((m) => (
                        <div
                          key={m.id}
                          className="group relative rounded-xl border border-white/5 bg-[color:var(--color-surface-raised)]/60 p-5 transition-colors hover:border-white/15"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[11px] tracking-wider text-[color:var(--color-text-subtle)]">
                                  {m.id}
                                </span>
                                <h4 className="truncate text-[15px] font-semibold">
                                  {m.name}
                                </h4>
                              </div>
                              <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                                {m.description}
                              </p>
                              {m.note && (
                                <p className="mt-2 text-xs text-[color:var(--color-text-subtle)]">
                                  Hinweis: {m.note}
                                </p>
                              )}
                            </div>
                            <div className="shrink-0 text-right">
                              <div className="text-lg font-semibold tabular-nums">
                                {eur(m.price)}
                              </div>
                              {m.unit && (
                                <div className="text-[11px] text-[color:var(--color-text-subtle)]">
                                  {m.unit}
                                </div>
                              )}
                              <div className="mt-1 text-[11px] text-[color:var(--color-text-subtle)]">
                                {m.duration}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Wartung */}
      <section className="relative py-20 border-t border-white/5 scroll-mt-24" id="wartung">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <Badge dot tone="brand">Wartung</Badge>
              <h2 className="display-2 mt-5">
                Nach dem Launch — drei Wartungsstufen.
              </h2>
              <p className="mt-4 text-[color:var(--color-text-muted)]">
                Eine Website ohne Pflege verliert in 12 Monaten an Performance,
                Sicherheit und SEO-Ranking. Wer das nicht selbst managen will,
                bucht Care. Kündbar nach 6 Monaten.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="grid gap-6 md:grid-cols-3">
            {WARTUNG.map((tier) => (
              <ScrollRevealItem key={tier.slug}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[color:var(--color-surface-raised)] p-7">
                  <div className="text-2xl">{tier.icon}</div>
                  <h3 className="mt-3 text-xl font-semibold">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold tabular-nums">
                      {eur(tier.pricePerMonth)}
                    </span>
                    <span className="text-sm text-[color:var(--color-text-muted)]">
                      / Monat netto
                    </span>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--color-brand-400)]" />
                        <span className="text-[color:var(--color-text-muted)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-[color:var(--color-text-muted)]">
              Ohne Wartungsvertrag: Änderungen nach Aufwand mit{" "}
              {eur(HOURLY_RATE_WITHOUT_CARE)}/Stunde netto (Mindestabrechnung
              1 Stunde).
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* FAQ / Notes */}
      <section className="relative py-20 border-t border-white/5" id="hinweise">
        <Container>
          <ScrollReveal>
            <div className="mb-10 max-w-2xl">
              <Badge>Hinweise</Badge>
              <h2 className="display-2 mt-5">Wichtiges zur Preisstruktur.</h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {NOTES.map((n) => (
              <ScrollReveal key={n.title}>
                <div className="rounded-2xl border border-white/5 bg-[color:var(--color-surface-raised)]/60 p-6">
                  <h3 className="text-base font-semibold">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                    {n.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-10 sm:p-16 text-center">
              <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 30% 20%, rgb(31 167 255 / 0.18), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 100%, rgb(255 154 70 / 0.14), transparent 70%), var(--color-canvas-900)",
                }}
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-30" />
              <h2 className="display-2 mx-auto max-w-2xl">
                Bereit für ein Angebot mit konkreten Zahlen?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[color:var(--color-text-muted)]">
                In 5 Minuten das Briefing-Formular ausfüllen, danach bekommst du
                ein maßgeschneidertes Angebot inklusive transparenter
                Modul-Aufschlüsselung.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/anfrage" size="lg" withArrow>
                  Projekt starten
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary" size="lg">
                  Referenzen ansehen
                </ButtonLink>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}

const NOTES = [
  {
    title: "Alle Preise netto",
    body: "Die Beträge verstehen sich ohne Umsatzsteuer. Auf Rechnung kommt 19 % USt dazu (Einzelunternehmer nach § 13 UStG).",
  },
  {
    title: "Bundle-Rabatt nur bei Paket-Buchung",
    body: "Werden alle Module eines Pakets gemeinsam gebucht, gibt es −15 % auf die Modul-Summe. Einzeln zusammengekaufte Module kosten den vollen Preis.",
  },
  {
    title: "Tikiz-Honorar ≠ Drittkosten",
    body: "Hosting bei Vercel, Domain, ggf. Resend/Upstash laufen auf Accounts des Kunden und werden nicht über Tikiz abgerechnet. Transparent im Angebot ausgewiesen.",
  },
  {
    title: "Angebot 14 Tage gültig",
    body: "Nach Eingang aller Infos erstelle ich ein Festpreis-Angebot. Das bleibt 14 Tage gültig — genug Zeit zum Überlegen, kein Druck.",
  },
  {
    title: "Zahlungsmodalitäten",
    body: "Bis 5.000 € netto: 50 % bei Auftrag, 50 % bei Launch. Ab 5.000 €: 30 % bei Auftrag, 40 % bei Design-Freigabe, 30 % bei Launch.",
  },
  {
    title: "Änderungen nach Launch",
    body: "Mit Wartungsvertrag: aus dem monatlichen Kontingent. Ohne Vertrag: " +
      `${eur(HOURLY_RATE_WITHOUT_CARE)}/Stunde netto. Neue Module jederzeit zubuchbar zum Listenpreis.`,
  },
];
