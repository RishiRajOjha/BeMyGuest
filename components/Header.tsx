"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const primaryLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/weddings", label: "Weddings" },
  { href: "/festivals", label: "Festivals" },
  { href: "/ceremonies", label: "Ceremonies" },
  { href: "/concerts", label: "Concerts" },
];

const moreLinks = [
  { href: "/locations", label: "Locations" },
  { href: "/guest-guides", label: "Guest Guides" },
  { href: "/culture", label: "Culture & Traditions" },
  { href: "/stories", label: "Stories & Guides" },
  { href: "/about", label: "About Us" },
  { href: "/trust-safety", label: "Trust & Safety" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export function Header({ overlay = true }: { overlay?: boolean }) {
  const [solid, setSolid] = useState(!overlay);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (overlay) setSolid(latest > 50);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(250,247,240,0.94)" : "rgba(10,7,6,0.18)",
        color: solid ? "#1b1815" : "#ffffff",
        boxShadow: solid ? "0 1px 0 rgba(27,24,21,0.08)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.35, ease: [0.16, 0.84, 0.24, 1] }}
      className="fixed left-0 right-0 top-0 z-[80] border-b border-transparent backdrop-blur-md"
      onMouseLeave={() => setMoreOpen(false)}
    >
      <div className="container flex min-h-[64px] sm:min-h-[72px] items-center justify-between gap-6">
        <Link href="/" className="focus-ring display shrink-0 text-xl tracking-tight sm:text-2xl" onClick={() => setMenuOpen(false)}>
          samaroh
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryLinks.map((link) => (
            <Link key={link.label} href={link.href} className="link-underline focus-ring text-[12px] tracking-[.02em] opacity-90 transition hover:opacity-100">
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className="link-underline focus-ring inline-flex items-center gap-1 text-[12px] opacity-90 transition hover:opacity-100"
              aria-expanded={moreOpen}
            >
              More <span aria-hidden>{moreOpen ? "↑" : "↓"}</span>
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full mt-4 w-[280px] -translate-x-1/2 border border-[color:var(--line)] bg-[color:var(--paper)] p-3 text-[color:var(--ink)] shadow-xl"
                >
                  <div className="grid gap-1">
                    {moreLinks.map((link) => (
                      <Link key={link.label} href={link.href} onClick={() => setMoreOpen(false)} className="px-3 py-2.5 text-sm transition hover:bg-black/5">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/host" className="focus-ring text-[12px] opacity-90 transition hover:opacity-100">Host an Experience</Link>
          <Link href="/sign-in" className={`focus-ring border px-4 py-2 text-[10px] font-semibold uppercase tracking-[.14em] transition ${solid ? "border-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white" : "border-white/60 hover:bg-white hover:text-black"}`}>
            Sign in
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="focus-ring flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span className={`h-px w-6 bg-current transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-current transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 0.84, 0.24, 1] }}
            className="max-h-[calc(100svh-64px)] sm:max-h-[calc(100svh-72px)] overflow-y-auto bg-[color:var(--paper)] text-[color:var(--ink)] lg:hidden"
          >
            <nav className="container flex flex-col py-3">
              {primaryLinks.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="focus-ring border-b border-[color:var(--line)] py-4 text-xl display">
                  {link.label}
                </Link>
              ))}
              <details className="border-b border-[color:var(--line)] py-4">
                <summary className="cursor-pointer list-none text-xl display">More</summary>
                <div className="mt-3 grid gap-1 pl-1">
                  {moreLinks.map((link) => (
                    <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="py-2 text-sm text-[color:var(--stone)]">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
              <Link href="/host" onClick={() => setMenuOpen(false)} className="py-4 text-xl display">Host an Experience</Link>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="mb-2 border border-[color:var(--ink)] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[.14em]">Sign in</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
