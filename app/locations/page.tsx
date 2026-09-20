import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { experiences } from "@/lib/data";
const cities = Array.from(new Set(experiences.map((e) => e.city))).sort();
export default function LocationsPage() {
  return <main className="min-h-screen bg-[color:var(--paper)]"><Header overlay={false}/><section className="container pb-24 pt-32 md:pt-44"><p className="eyebrow text-[color:var(--stone)]">Locations</p><h1 className="display mt-4 max-w-5xl text-[clamp(3rem,8vw,7.5rem)] leading-[.92]">Find experiences by place.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--stone)]">Browse cities and regions through the celebrations, rituals, food, music and communities that make them worth knowing.</p><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cities.map(city=><Link key={city} href={`/explore?search=${encodeURIComponent(city)}`} className="group border-t border-[color:var(--line)] py-6"><span className="display text-4xl group-hover:text-[color:var(--terracotta)]">{city}</span><span className="mt-2 block text-xs uppercase tracking-[.12em] text-[color:var(--stone)]">{experiences.filter(e=>e.city===city).length} listed experience(s) →</span></Link>)}</div></section><SiteFooter/></main>;
}
