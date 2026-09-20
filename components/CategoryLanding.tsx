import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { EditorialExperienceCard } from "@/components/EditorialExperienceCard";
import { Reveal } from "@/components/motion/Reveal";
import { experiences } from "@/lib/data";
import type { ExperienceType } from "@/lib/types";

type CategoryLandingProps = {
  title: string;
  eyebrow: string;
  intro: string;
  primary: string;
  secondary: string[];
  type?: ExperienceType;
  types?: ExperienceType[];
  questionLinks: string[];
};

export function CategoryLanding({ title, eyebrow, intro, primary, secondary, type, types, questionLinks }: CategoryLandingProps) {
  const matches = experiences.filter((experience) => {
    if (type) return experience.type === type;
    if (types) return types.includes(experience.type);
    return true;
  });

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      <Header overlay={false} />
      <section className="container pb-20 pt-32 md:pb-28 md:pt-44">
        <Reveal><p className="eyebrow mb-5 text-[color:var(--stone)]">{eyebrow}</p></Reveal>
        <Reveal delay={0.08}><h1 className="display max-w-5xl text-[clamp(3rem,8vw,7.5rem)] leading-[.92]">{title}</h1></Reveal>
        <Reveal delay={0.16}><p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--stone)]">{intro}</p></Reveal>
        <div className="mt-10 flex flex-wrap gap-2 text-xs uppercase tracking-[.12em]">
          <span className="border border-[color:var(--ink)] bg-[color:var(--ink)] px-4 py-2 text-white">{primary}</span>
          {secondary.map((item) => <span key={item} className="border border-[color:var(--line)] bg-white px-4 py-2">{item}</span>)}
        </div>
      </section>

      <section className="bg-[color:var(--cream)] py-20 md:py-28">
        <div className="container">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-[color:var(--stone)]">Explore</p>
              <h2 className="display mt-3 text-4xl md:text-6xl">Experiences you can actually understand.</h2>
            </div>
            <Link href="/explore" className="link-underline text-sm">Browse all experiences →</Link>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {matches.slice(0, 6).map((experience, index) => (
              <Reveal key={experience.id} delay={(index % 3) * 0.05}>
                <EditorialExperienceCard experience={experience} variant={index % 3 === 0 ? "landscape" : "portrait"} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow text-[color:var(--stone)]">Stories & questions</p>
            <h2 className="display mt-4 text-5xl leading-none md:text-7xl">Understand it before you go.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[color:var(--stone)]">
              Our editorial layer exists to explain what happens, why it matters, what to expect, and how to participate respectfully.
            </p>
          </div>
          <div className="border-t border-[color:var(--line)]">
            {questionLinks.map((question) => (
              <Link key={question} href="/stories" className="group flex items-center justify-between border-b border-[color:var(--line)] py-5 text-base">
                <span className="max-w-xl pr-6">{question}</span><span className="transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
