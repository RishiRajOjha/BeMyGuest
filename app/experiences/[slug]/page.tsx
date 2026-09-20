import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExperience, experiences } from "@/lib/data";
import { RequestToJoin } from "@/components/RequestToJoin";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

function Info({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="eyebrow text-[color:var(--stone)]">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-[color:var(--charcoal)]">
        {items.map((x) => (
          <li key={x}>— {x}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) notFound();

  const goodToKnow = [
    e.food && { title: "Food", value: e.food },
    e.dressCode && { title: "Dress code", value: e.dressCode },
    e.etiquette && { title: "Etiquette", value: e.etiquette },
    e.accessibility && { title: "Accessibility", value: e.accessibility },
    e.ageRequirement && { title: "Age requirement", value: e.ageRequirement }
  ].filter(Boolean) as { title: string; value: string }[];

  return (
    <main className="bg-[color:var(--paper)]">
      <Header />

      <section className="relative min-h-[80svh] bg-black text-white">
        <Image src={e.images[0]} alt={e.title} fill priority className="hero-image opacity-80" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
        <div className="container relative z-10 flex min-h-[80svh] flex-col justify-end pb-14 pt-32 md:pb-20">
          <Reveal>
            <p className="eyebrow text-white/70">{e.city.toUpperCase()} · {e.region.toUpperCase()} — {e.type}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-4 text-[clamp(2.6rem,8vw,7.5rem)] leading-[.92]">{e.title}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span>{e.date}</span>
              <span>·</span>
              <span>{e.availableSpots} places left</span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container grid gap-16 py-16 pb-28 md:py-24 lg:grid-cols-[1.55fr_.75fr] lg:pb-24">
        <article className="min-w-0">
          <Reveal>
            <p className="max-w-3xl text-xl leading-9 text-[color:var(--charcoal)]">{e.description}</p>
          </Reveal>

          <section className="mt-16 border-t border-[color:var(--line)] pt-8">
            <h2 className="eyebrow text-[color:var(--stone)]">The experience</h2>
            <Reveal>
              <p className="mt-5 max-w-3xl text-2xl leading-9">{e.shortDescription}</p>
            </Reveal>
            {e.images[1] && (
              <ImageReveal className="mt-10 aspect-[16/9] bg-stone-200">
                <Image src={e.images[1]} alt={e.title} fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" />
              </ImageReveal>
            )}
          </section>

          <section className="mt-16 border-t border-[color:var(--line)] pt-8">
            <h2 className="eyebrow text-[color:var(--stone)]">Schedule</h2>
            <div className="mt-8 divide-y divide-[color:var(--line)]">
              {e.schedule.map((item, i) => (
                <Reveal key={item.time} delay={i * 0.06}>
                  <div className="grid gap-2 py-8 sm:grid-cols-[80px_1fr]">
                    <span className="numeral display text-3xl text-[color:var(--stone)]">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="eyebrow text-[color:var(--stone)]">{item.time}</p>
                      <h3 className="display mt-2 text-3xl leading-tight md:text-4xl">{item.title}</h3>
                      <p className="mt-2 max-w-xl text-[color:var(--charcoal)]">{item.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mt-16 border-t border-[color:var(--line)] pt-8">
            <h2 className="eyebrow text-[color:var(--stone)]">Your host</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-[220px_1fr] sm:items-start">
              {e.images[2] && (
                <ImageReveal className="aspect-[3/4] w-full max-w-[220px] bg-stone-200">
                  <Image src={e.images[2]} alt={e.hostName} fill sizes="220px" className="object-cover" />
                </ImageReveal>
              )}
              <Reveal>
                <h3 className="display text-3xl">{e.hostName}</h3>
                <p className="eyebrow mt-1 text-[color:var(--stone)]">{e.city}</p>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[color:var(--charcoal)]">&ldquo;{e.hostStory}&rdquo;</p>
              </Reveal>
            </div>
          </section>

          <section className="mt-16 border-t border-[color:var(--line)] pt-8">
            <h2 className="eyebrow text-[color:var(--stone)]">Good to know</h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              <Info title="Included" items={e.included} />
              <Info title="Not included" items={e.excluded} />
              <Info title="Language" items={e.language} />
              {goodToKnow.length > 0 && (
                <div>
                  <h3 className="eyebrow text-[color:var(--stone)]">Details</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-[color:var(--charcoal)]">
                    {goodToKnow.map((g) => (
                      <li key={g.title}>— <strong>{g.title}:</strong> {g.value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <p className="mt-10 max-w-xl text-xs leading-5 text-[color:var(--stone)]">
              Public listings show city-level location only. Private addresses and direct contact details are shared with accepted guests.
            </p>
          </section>
        </article>

        <RequestToJoin experience={e} />
      </div>

      <footer className="bg-[color:var(--ink)] py-10 text-white">
        <div className="container flex flex-col gap-4 border-t border-white/10 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <span className="display text-2xl">samaroh</span>
          <div className="flex gap-6 text-white/60">
            <Link href="/explore" className="link-underline">Explore</Link>
            <Link href="/host" className="link-underline">Host</Link>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
