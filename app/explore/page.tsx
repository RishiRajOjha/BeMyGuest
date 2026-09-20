"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { EditorialExperienceCard, type CardVariant } from "@/components/EditorialExperienceCard";
import { Reveal } from "@/components/motion/Reveal";
import { experiences } from "@/lib/data";

const categories = ["All", "Wedding", "Festival", "Cultural", "Concert", "Yoga", "Wellness", "Workshop", "Community"];
const locations = ["All locations", ...Array.from(new Set(experiences.map((e) => e.city))).sort()];
const variantPattern: CardVariant[] = ["landscape", "portrait", "portrait", "split", "portrait", "compact"];
const spanPattern: Record<CardVariant, string> = {
  landscape: "sm:col-span-2",
  portrait: "",
  split: "sm:col-span-2 lg:col-span-2",
  compact: "sm:col-span-2 lg:col-span-3",
  overlay: "",
};

export default function ExplorePage() {
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All locations");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => experiences.filter((e) => {
    const categoryMatch = category === "All" || e.type === category || (category === "Cultural" && ["Workshop", "Religious"].includes(e.type));
    const locationMatch = location === "All locations" || e.city === location;
    const textMatch = `${e.title} ${e.city} ${e.region} ${e.shortDescription}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && locationMatch && textMatch;
  }), [category, location, query]);

  const featured = experiences.slice(0, 4);
  const travelWorthIt = experiences.filter((e) => e.privacyLevel !== "private").slice(0, 4);

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <Header overlay={false} />
      <section className="container pb-20 pt-32 md:pb-28 md:pt-40">
        <Reveal><p className="eyebrow mb-4 text-[color:var(--stone)]">Explore</p></Reveal>
        <Reveal delay={0.08}><h1 className="display text-[clamp(2.8rem,8vw,6.5rem)] leading-[.95]">Find something<br />worth travelling for.</h1></Reveal>
        <Reveal delay={0.16}><p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--stone)]">Discover celebrations and cultural experiences, then understand what you are stepping into before you go.</p></Reveal>

        <Reveal delay={0.22}>
          <div className="mt-12 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Jaipur, wedding, yoga, music…" className="border border-[color:var(--line)] bg-white px-5 py-4 outline-none transition focus:border-[color:var(--ink)]" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-[color:var(--line)] bg-white px-4 py-4 text-sm outline-none"><option value="All">All categories</option>{categories.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}</select>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="border border-[color:var(--line)] bg-white px-4 py-4 text-sm outline-none">{locations.map((c) => <option key={c} value={c}>{c}</option>)}</select>
          </div>
          <div className="mt-5 no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`focus-ring whitespace-nowrap border px-4 py-2 text-xs uppercase tracking-[.1em] transition ${category === c ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-white" : "border-[color:var(--line)] bg-white hover:border-[color:var(--ink)]"}`}>{c}</button>)}
          </div>
        </Reveal>

        <section className="mt-20"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow text-[color:var(--stone)]">Popular right now</p><h2 className="display mt-3 text-4xl md:text-5xl">A few places to start.</h2></div><span className="text-xs uppercase tracking-[.12em] text-[color:var(--stone)]">{filtered.length} matches</span></div><div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((e, i) => { const variant=variantPattern[i%variantPattern.length]; return <div key={e.id} className={spanPattern[variant]}><Reveal delay={(i%6)*.04}><EditorialExperienceCard experience={e} variant={variant}/></Reveal></div>; })}</div>{filtered.length===0&&<p className="mt-12 text-[color:var(--stone)]">Nothing matches yet — try another category, location or search.</p>}</section>

        <section className="mt-24 border-t border-[color:var(--line)] pt-12"><p className="eyebrow text-[color:var(--stone)]">Explore by location</p><div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">{locations.slice(1).map((city)=><Link key={city} href={`/explore?search=${encodeURIComponent(city)}`} className="link-underline display text-2xl">{city}</Link>)}</div></section>

        <section className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="bg-[color:var(--cream)] p-7"><p className="eyebrow text-[color:var(--terracotta)]">Events worth travelling for</p><h3 className="display mt-3 text-3xl">Not just what&rsquo;s near you.</h3><div className="mt-5 grid gap-3 text-sm">{travelWorthIt.slice(0,3).map(e=><Link key={e.id} href={`/experiences/${e.slug}`} className="link-underline">{e.title} →</Link>)}</div></div>
          <div className="bg-[color:var(--sand)] p-7"><p className="eyebrow text-[color:var(--terracotta)]">Stories & guides</p><h3 className="display mt-3 text-3xl">Understand before you attend.</h3><Link href="/stories" className="link-underline mt-5 inline-block text-sm">Browse the editorial hub →</Link></div>
          <div className="bg-[color:var(--ink)] p-7 text-white"><p className="eyebrow text-white/50">Host</p><h3 className="display mt-3 text-3xl">Have something worth sharing?</h3><Link href="/host" className="link-underline mt-5 inline-block text-sm">Host an Experience →</Link></div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
