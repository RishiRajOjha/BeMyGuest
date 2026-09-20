import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--ink)] py-14 text-white">
      <div className="container grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="display text-3xl tracking-tight">samaroh</Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            Discover celebrations and cultural experiences, understand what you are stepping into, and arrive ready to take part.
          </p>
        </div>
        <div>
          <p className="eyebrow text-white/40">Explore</p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <Link href="/explore">All experiences</Link>
            <Link href="/weddings">Weddings</Link>
            <Link href="/festivals">Festivals</Link>
            <Link href="/ceremonies">Ceremonies</Link>
            <Link href="/concerts">Concerts</Link>
            <Link href="/locations">Locations</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-white/40">Learn & trust</p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <Link href="/stories">Stories & Guides</Link>
            <Link href="/guest-guides">Guest Guides</Link>
            <Link href="/culture">Culture & Traditions</Link>
            <Link href="/about">About Us</Link>
            <Link href="/trust-safety">Trust & Safety</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
      <div className="container mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
        <span>People · Place · Experience</span>
        <span>© {new Date().getFullYear()} Samaroh</span>
      </div>
    </footer>
  );
}
