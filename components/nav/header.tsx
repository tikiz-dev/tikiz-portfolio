"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/nav/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

const NAV = [
  { label: "Projekte", href: "/work" },
  { label: "Pakete", href: "/pakete" },
  { label: "Services", href: "/#services" },
  { label: "Über mich", href: "/#about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--color-surface)]/75 border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-tx flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="Tikiz · Startseite"
        >
          <Logo className="h-7 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text)] hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/anfrage" size="sm" variant="primary" withArrow>
            Projekt starten
          </ButtonLink>
        </div>
      </div>
    </motion.header>
  );
}
