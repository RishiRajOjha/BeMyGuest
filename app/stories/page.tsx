import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
const groups = [
  { label: "DISCOVER", title: "Festivals worth travelling for", text: "Find celebrations you may never have searched for by name.", href: "/festivals" },
  { label: "UNDERSTAND", title: "What happens at an Indian wedding?", text: "A practical introduction to the rituals, people and rhythm of a wedding day.", href: "/weddings" },
  { label: "PREPARE", title: "What should you wear to a traditional ceremony?", text: "Context before clothing: what is respectful, comfortable and appropriate.", href: "/guest-guides" },
  { label: "CULTURE", title: "Why does this ritual matter?", text: "The deeper layer: meaning, origins, regional differences and etiquette.", href: "/culture" },
];
export default function StoriesPage(){return <main className="min-h-screen bg-[color:var(--paper)]"><Header overlay={false}/><section className="container pb-24 pt-32 md:pt-44"><p className="eyebrow text-[color:var(--stone)]">Stories & Guides</p><h1 className="display mt-4 max-w-5xl text-[clamp(3rem,8vw,7.5rem)] leading-[.92]">Discover. Understand. Experience.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--stone)]">Editorial content that supports event discovery — helping you understand why a celebration matters and how to prepare for it.</p><div className="mt-16 grid gap-x-12 gap-y-0 md:grid-cols-2">{groups.map((g,i)=><Link key={g.title} href={g.href} className="group border-t border-[color:var(--line)] py-8"><p className="eyebrow text-[color:var(--terracotta)]">{g.label}</p><h2 className="display mt-3 text-3xl md:text-4xl">{g.title}</h2><p className="mt-3 max-w-md text-sm leading-6 text-[color:var(--stone)]">{g.text}</p><span className="mt-5 inline-block text-xs uppercase tracking-[.12em]">Read / explore →</span></Link>)}</div></section><SiteFooter/></main>}
