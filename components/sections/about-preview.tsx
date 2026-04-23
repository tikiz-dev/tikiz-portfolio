import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Badge } from "@/components/ui/badge";

const SKILLS = [
  "Next.js · App Router",
  "React 19 · Server Components",
  "TypeScript · Zod",
  "Tailwind v4",
  "Motion / Framer Motion",
  "Supabase · Postgres · RLS",
  "Stripe Billing",
  "Resend · Webhooks",
  "Core Web Vitals",
  "Accessibility · i18n",
  "Vercel · Edge",
  "SEO · Schema.org",
];

export function AboutPreview() {
  return (
    <section id="about" className="relative py-28 sm:py-36 scroll-mt-24">
      <Container>
        <div className="grid gap-14 md:grid-cols-[1fr_1.15fr] md:gap-20 items-start">
          <ScrollReveal>
            <p className="eyebrow mb-4">Über mich</p>
            <h2 className="display-2 mb-6">
              Unternehmer, der seinen{" "}
              <span className="text-gradient-warm">Code selbst schreibt</span>.
            </h2>
            <div className="space-y-5 text-lg text-[color:var(--color-text-muted)] leading-relaxed">
              <p>
                Ich bin Inhaber von Weserbergland Dienstleistungen — einer
                Gebäudereinigungsfirma, die ich von Grund auf aufgebaut habe.
                Kundenakquise, Prozesse, Qualitätskontrolle — alles eigene
                Arbeit, alles hart erlernt.
              </p>
              <p>
                Parallel dazu entwickle ich Software, inzwischen hauptberuflich
                als Freelancer. Mit{" "}
                <span className="text-[color:var(--color-text)]">
                  Next.js&nbsp;16
                </span>
                ,{" "}
                <span className="text-[color:var(--color-text)]">
                  TypeScript
                </span>{" "}
                und einem klaren Versprechen: keine Plugin-Hölle, keine
                aufgeblasenen Builder — sondern Code, den man in fünf Jahren
                noch lesen kann.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <p className="eyebrow">Skills & Tools</p>
                <Badge tone="brand">2026</Badge>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {SKILLS.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2.5 text-sm text-[color:var(--color-text-muted)]"
                  >
                    <span className="mt-[7px] block size-1 shrink-0 rounded-full bg-[color:var(--color-brand-400)]" />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <p className="font-mono text-xs text-[color:var(--color-text-subtle)] mb-2">
                  Arbeitsweise
                </p>
                <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                  Kleine Projekte von A bis Z. Größere Projekte im engen Austausch —
                  Preview-Deploys nach jedem Meilenstein, damit du jederzeit
                  siehst, was entsteht.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
