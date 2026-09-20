import Image from "next/image";
import Link from "next/link";
import { MandapJourneyHero } from "@/components/mandap-journey/MandapJourneyHero";
import { SectionHeading } from "@/components/SectionHeading";
import { EditorialExperienceCard } from "@/components/EditorialExperienceCard";
import { HorizontalScrollRail } from "@/components/HorizontalScrollRail";
import { ExperienceStorySwitcher } from "@/components/ExperienceStorySwitcher";
import { WhatThisIs } from "@/components/WhatThisIs";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { experiences } from "@/lib/data";

const weddings = experiences.filter((e) => e.type === "Wedding");
const feature = weddings[0];
const restWeddings = weddings.slice(1, 3);

const worlds = [
  { name: "Weddings", phrase: "Indian weddings, from the inside.", href: "/weddings", image: "/images/udaipur-wedding-welcome.webp", wide: true },
  { name: "Festivals", phrase: "Celebrations with context.", href: "/festivals", image: "/images/varanasi-dev-deepawali.webp" },
  { name: "Ceremonies", phrase: "The rituals inside the celebration.", href: "/ceremonies", image: "/images/bridal-mehendi-detail.webp" },
  { name: "Concerts", phrase: "Small rooms, live music.", href: "/concerts", image: "/images/varanasi-classical-music.webp", wide: true },
  { name: "Locations", phrase: "Find experiences by place.", href: "/locations", image: "/images/jaipur-hawa-mahal.webp" },
  { name: "Guest Guides", phrase: "Know what you're stepping into.", href: "/guest-guides", image: "/images/jaipur-sangeet.webp" },
];

const weddingStory = [
  { label: "Before the ceremony", title: "Mehendi", description: "Henna, courtyard songs, chai and introductions before the room gets loud.", image: "/images/bridal-mehendi-detail.webp" },
  { label: "The night before", title: "Sangeet", description: "Family performances, dancing and a dinner table that keeps growing.", image: "/images/punjabi-sangeet.webp" },
  { label: "At the mandap", title: "Wedding", description: "The vows, sacred fire and the small rituals that make the ceremony feel personal.", image: "/images/udaipur-wedding-welcome.webp" },
  { label: "After the vows", title: "Dinner", description: "Long conversations, shared food and the part of the night when strangers start to feel familiar.", image: "/images/udaipur-lakeside-table.webp" },
];

const categoryStory = [
  { label: "Beyond weddings", title: "Music", description: "Independent artists, small rooms, and a crowd close enough to hear every note.", image: "/images/varanasi-classical-music.webp" },
  { label: "Beyond weddings", title: "Festivals", description: "Riverfront lamps, processions and community rituals seen with context.", image: "/images/varanasi-dev-deepawali.webp" },
  { label: "Beyond weddings", title: "Craft", description: "Learn block printing directly from an artisan in Jaipur.", image: "/images/jaipur-block-printing.webp" },
  { label: "Beyond weddings", title: "Wellness", description: "A quiet riverside practice in Rishikesh before the town wakes up.", image: "/images/rishikesh-riverside-yoga.webp" },
];

const hosts = [
  { name: feature?.hostName, city: feature?.city, story: feature?.hostStory, image: feature?.images[1] ?? feature?.images[0] },
  { name: experiences.find((e) => e.type === "Workshop")?.hostName, city: experiences.find((e) => e.type === "Workshop")?.city, story: experiences.find((e) => e.type === "Workshop")?.hostStory, image: experiences.find((e) => e.type === "Workshop")?.images[0] },
  { name: experiences.find((e) => e.type === "Yoga")?.hostName, city: experiences.find((e) => e.type === "Yoga")?.city, story: experiences.find((e) => e.type === "Yoga")?.hostStory, image: experiences.find((e) => e.type === "Yoga")?.images[0] },
];

const destinations = [
  { city: "Jaipur", region: "Rajasthan", image: "/images/jaipur-hawa-mahal.webp", count: experiences.filter((e) => e.city === "Jaipur").length },
  { city: "Udaipur", region: "Rajasthan", image: "/images/udaipur-palace-lake.webp", count: experiences.filter((e) => e.city === "Udaipur").length },
  { city: "Varanasi", region: "Uttar Pradesh", image: "/images/varanasi-ghats.webp", count: experiences.filter((e) => e.city === "Varanasi").length },
  { city: "Rishikesh", region: "Uttarakhand", image: "/images/rishikesh-bridge.webp", count: experiences.filter((e) => e.city === "Rishikesh").length },
  { city: "Goa", region: "Goa", image: "/images/goa-colonial-lane.webp", count: experiences.filter((e) => e.city === "Goa").length },
  { city: "Kolkata", region: "West Bengal", image: "/images/kolkata-street.webp", count: experiences.filter((e) => e.city === "Kolkata").length },
];

const editorialCards = [
  ["Discover", "Festivals worth travelling for", "Explore celebrations you may never have searched for by name.", "/festivals"],
  ["Understand", "What happens at an Indian wedding?", "Read context before you arrive.", "/weddings"],
  ["Prepare", "What should you wear to a traditional ceremony?", "Practical guest guidance for unfamiliar celebrations.", "/guest-guides"],
];

export default function Home() {
  return (
    <main className="grain overflow-hidden bg-[color:var(--paper)]">
      <MandapJourneyHero />

      <WhatThisIs />

      <section className="bg-[color:var(--cream)] py-24 md:py-32">
        <div className="container">
          <SectionHeading label="Experience worlds" heading={<>Pick a place.<br/>Find a reason to go.</>}>
            Start with a place, a celebration, or a question you did not know to ask. Samaroh connects discovery with context, so you understand what you are looking at before you decide to join it.</SectionHeading>
        </div>
        <div className="mt-14"><HorizontalScrollRail>{worlds.map((w) => (
          <Link key={w.name} href={w.href} className={`group focus-ring relative block shrink-0 snap-start overflow-hidden bg-stone-800 ${w.wide ? "h-[350px] w-[88vw] sm:h-[440px] sm:w-[70vw] md:w-[560px]" : "h-[350px] w-[82vw] sm:h-[440px] sm:w-[62vw] md:w-[400px]"}`}>
            {w.image && <Image src={w.image} alt={w.name} fill sizes="60vw" className="card-image object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10 transition group-hover:from-black/85" />
            <div className="absolute inset-0 flex flex-col justify-end p-7 text-white"><p className="eyebrow text-white/70">{w.name}</p><h3 className="display mt-2 text-3xl leading-tight transition-transform duration-500 group-hover:-translate-y-1">{w.phrase}</h3><span className="link-underline mt-4 text-xs uppercase tracking-[.14em] opacity-0 transition group-hover:opacity-100">Explore →</span></div>
          </Link>
        ))}</HorizontalScrollRail></div>
      </section>

      <section className="bg-[color:var(--paper)] py-24 md:py-32">
        <div className="container">
          <div className="flex items-end justify-between gap-8"><SectionHeading label="Weddings" heading={<>Indian weddings,<br/>without the guesswork.</>}>The photographs are only the beginning. See what the celebration looks like, read the context, then decide whether you want to be there.</SectionHeading><Link href="/weddings" className="link-underline hidden shrink-0 pb-1 text-sm md:block">View weddings →</Link></div>
          {feature && <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end"><EditorialExperienceCard experience={feature} variant="landscape" priority /><div className="lg:pb-2"><Reveal delay={0.15}><p className="eyebrow text-[color:var(--stone)]">Availability</p><p className="display mt-3 text-3xl">{feature.availableSpots} of {feature.capacity} spots left</p><p className="mt-4 max-w-sm text-sm leading-6 text-[color:var(--stone)]">{feature.shortDescription}</p><Link href={`/experiences/${feature.slug}`} className="focus-ring mt-6 inline-block border-b border-[color:var(--ink)] pb-1 text-sm">Read the full story →</Link></Reveal></div></div>}
          <div className="mt-16 grid gap-14 sm:grid-cols-2">{restWeddings.map((e)=><EditorialExperienceCard key={e.id} experience={e} variant="split" />)}</div>
        </div>
      </section>

      <ExperienceStorySwitcher eyebrow="Inside the celebration" heading={<>Not a day-by-day itinerary.<br/><span className="display-italic text-[#d9b979]">A closer look.</span></>} intro="Choose a moment of the wedding to understand it before you decide whether you want to experience it. The whole story sits in one place — no pinned scroll sequence." scenes={weddingStory} />

      <section className="bg-[color:var(--paper)] py-24 md:py-32"><div className="container"><SectionHeading label="The hosts" heading={<>The people<br/>make the place.</>} /><div className="mt-16 grid gap-16 md:grid-cols-3">{hosts.map((h,i)=>h.name && <Reveal key={h.name} delay={i*.1}><ImageReveal className="aspect-[3/4] bg-stone-200">{h.image && <Image src={h.image} alt={h.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover"/>}</ImageReveal><p className="display mt-5 text-2xl">{h.name}</p><p className="eyebrow mt-1 text-[color:var(--stone)]">{h.city}</p><p className="mt-3 text-sm leading-6 text-[color:var(--stone)]">&ldquo;{h.story}&rdquo;</p></Reveal>)}</div></div></section>

      <ExperienceStorySwitcher eyebrow="Beyond weddings" heading={<>There is more to discover<br/><span className="display-italic text-[#d9b979]">than one category.</span></>} intro="Music, festivals, craft and wellness are not side notes. They are other ways into the same idea: people, place and a reason to show up." scenes={categoryStory} />

      <section id="destinations" className="scroll-mt-24 bg-[color:var(--cream)] py-24 md:py-32"><div className="container"><SectionHeading label="Locations" heading={<>Find experiences<br/>by place.</>} /></div><div className="mt-14"><HorizontalScrollRail>{destinations.map((d)=>d.image&&<Link key={d.city} href={`/explore?search=${encodeURIComponent(d.city)}`} className="group focus-ring relative block h-[320px] w-[78vw] shrink-0 snap-start overflow-hidden bg-stone-800 sm:h-[380px] sm:w-[58vw] md:w-[340px]"><Image src={d.image} alt={d.city} fill sizes="40vw" className="card-image object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent"/><div className="absolute inset-0 flex flex-col justify-end p-6 text-white"><p className="eyebrow text-white/70">{d.region}</p><h3 className="display mt-2 text-3xl">{d.city}</h3><p className="mt-2 text-xs uppercase tracking-[.12em] text-white/70">{d.count} experience{d.count===1?"":"s"} →</p></div></Link>)}</HorizontalScrollRail></div></section>

      <section className="bg-[color:var(--paper)] py-24 md:py-32"><div className="container grid gap-12 md:grid-cols-2 md:items-start"><SectionHeading label="Stories & Guides" heading={<>Discover.<br/>Understand.<br/>Prepare.</>} /><div className="border-t border-[color:var(--line)]">{editorialCards.map(([label,title,desc,href])=><Link key={title} href={href} className="group block border-b border-[color:var(--line)] py-7"><p className="eyebrow text-[color:var(--terracotta)]">{label}</p><p className="display mt-2 text-3xl">{title}</p><p className="mt-2 max-w-md text-sm leading-6 text-[color:var(--stone)]">{desc}</p><span className="mt-4 inline-block text-xs uppercase tracking-[.12em]">Explore →</span></Link>)}</div></div></section>

      <section className="bg-[color:var(--paper)] py-24 md:py-32"><div className="container grid gap-12 md:grid-cols-2 md:items-start"><SectionHeading label="Host" heading={<>Have something<br/>worth sharing?</>} /><div className="pt-2"><Reveal><p className="max-w-lg text-lg leading-8 text-[color:var(--stone)]">Open your wedding, festival, ceremony, concert, workshop or local tradition to people who genuinely want to experience it.</p><Link href="/host" className="focus-ring mt-8 inline-block bg-[color:var(--ink)] px-6 py-4 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-[#3a352f]">Host an Experience →</Link></Reveal></div></div></section>

      <section className="bg-[color:var(--sand)] py-24 md:py-32"><div className="container grid gap-12 md:grid-cols-3"><Reveal><p className="eyebrow">How it works</p></Reveal><Reveal delay={.1}><h3 className="display text-4xl">For guests</h3><p className="mt-4 leading-7 text-[color:var(--charcoal)]">Discover → understand the experience → request to join → get accepted → show up ready to participate.</p></Reveal><Reveal delay={.2}><h3 className="display text-4xl">For hosts</h3><p className="mt-4 leading-7 text-[color:var(--charcoal)]">Tell us what you&rsquo;re hosting → add the details → submit → welcome the right guests.</p></Reveal></div></section>

      <section className="bg-[color:var(--cream)] py-20 md:py-24"><div className="container grid gap-10 md:grid-cols-3"><Reveal><p className="eyebrow text-[color:var(--stone)]">Trust & clarity</p><h2 className="display mt-3 text-5xl">Know before you go.</h2></Reveal><Reveal delay={.1}><p className="leading-7 text-[color:var(--stone)]">Clear event details, privacy-aware location sharing and practical guest information should come before the booking or RSVP decision.</p></Reveal><Reveal delay={.2}><Link href="/trust-safety" className="link-underline self-start text-sm">Read Trust & Safety →</Link></Reveal></div></section>

      <section className="bg-[color:var(--ink)] py-32 text-white md:py-48"><div className="container text-center"><Reveal><p className="eyebrow text-white/50">Last word</p></Reveal><Reveal delay={.1}><h2 className="display mt-6 text-[clamp(2.6rem,9vw,7rem)] leading-[.95]">Don&rsquo;t just visit.</h2></Reveal><Reveal delay={.2}><h2 className="display-italic text-[clamp(2.6rem,9vw,7rem)] leading-[.95] text-[color:var(--turmeric)]">Join something.</h2></Reveal><Reveal delay={.3}><Link href="/explore" className="focus-ring mt-12 inline-block bg-white px-8 py-4 text-xs font-bold uppercase tracking-[.15em] text-black">Explore Experiences</Link></Reveal></div></section>

      <SiteFooter />
    </main>
  );
}
