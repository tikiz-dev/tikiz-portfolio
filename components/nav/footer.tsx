import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/utils";
import { ArrowUpRight, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Soft glow at top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[color:var(--color-brand-500)]/30 to-transparent"
      />

      <Container>
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-5">
            <Logo className="h-7 w-auto" />
            <p className="max-w-sm text-sm text-[color:var(--color-text-muted)]">
              Freelance-Webentwicklung mit Sitz in Hameln. Moderne
              Marken-Websites und Web-Apps mit Next.js, TypeScript und
              durchdachter Typografie.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-brand-300)] transition-colors"
            >
              <Mail className="size-4" />
              {SITE.email}
            </a>
          </div>

          <FooterColumn title="Seiten">
            <FooterLink href="/">Start</FooterLink>
            <FooterLink href="/work">Projekte</FooterLink>
            <FooterLink href="/#services">Services</FooterLink>
            <FooterLink href="/#about">Über mich</FooterLink>
            <FooterLink href="/#contact">Kontakt</FooterLink>
          </FooterColumn>

          <FooterColumn title="Rechtliches">
            <FooterLink href="/impressum">Impressum</FooterLink>
            <FooterLink href="/datenschutz">Datenschutz</FooterLink>
          </FooterColumn>

          <FooterColumn title="Sprachen">
            <FooterLink href="/">Deutsch</FooterLink>
            <FooterLink href="/en" external>
              English
            </FooterLink>
          </FooterColumn>
        </div>

        {/* Big wordmark, decoratively oversized */}
        <div
          aria-hidden
          className="mt-16 select-none overflow-hidden text-[clamp(5rem,18vw,14rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-white/[0.04]"
        >
          TIKIZ.DEV
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-[color:var(--color-text-subtle)] md:flex-row md:items-center">
          <p>© {year} Tikiz · Webentwicklung. Alle Rechte vorbehalten.</p>
          <p className="font-mono">
            Gebaut mit Next.js 16, React 19, Tailwind v4 & Motion.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1 text-sm text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] transition-colors"
      >
        {children}
        {external ? (
          <ArrowUpRight className="size-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : null}
      </Link>
    </li>
  );
}
