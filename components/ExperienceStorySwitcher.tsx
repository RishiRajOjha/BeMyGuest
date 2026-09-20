"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type StoryScene = {
  label: string;
  title: string;
  description: string;
  image: string;
  href?: string;
};

type ExperienceStorySwitcherProps = {
  eyebrow: string;
  heading: ReactNode;
  intro: string;
  scenes: StoryScene[];
};

/**
 * Editorial scene selector without scroll-jacking.
 * All scene choices are visible together; the large visual changes in place.
 * This replaces the old four-viewport scroll story so the user can understand
 * the whole section without repeatedly scrolling through pinned scenes.
 */
export function ExperienceStorySwitcher({ eyebrow, heading, intro, scenes }: ExperienceStorySwitcherProps) {
  const [active, setActive] = useState(0);
  const scene = scenes[active];

  useEffect(() => {
    if (scenes.length === 0) return;
    if (active > scenes.length - 1) setActive(0);
  }, [active, scenes.length]);

  if (!scene) return null;

  return (
    <section className="bg-[#1d1714] py-20 text-white md:py-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div>
            <p className="eyebrow text-[#d8b77d]">{eyebrow}</p>
            <h2 className="display mt-5 max-w-3xl text-[clamp(2.5rem,9vw,6.5rem)] leading-[.9] tracking-[-.045em]">
              {heading}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/65 md:text-lg">{intro}</p>
          </div>

          <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto pb-1 lg:justify-end">
            {scenes.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={selected}
                  className={`focus-ring inline-flex shrink-0 items-center gap-3 border px-4 py-3 text-left transition ${
                    selected
                      ? "border-[#d9b979] bg-[#d9b979] text-[#231512]"
                      : "border-white/15 bg-white/[0.035] text-white/70 hover:border-white/35 hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-semibold tracking-[.18em] opacity-65">0{index + 1}</span>
                  <span className="text-xs uppercase tracking-[.16em]">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.65fr_.75fr] lg:items-stretch">
          <div className="relative min-h-[52svh] overflow-hidden bg-black sm:min-h-[460px] md:min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.title}
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.65, ease: [0.16, 0.84, 0.24, 1] }}
                className="absolute inset-0"
              >
                <Image src={scene.image} alt={scene.title} fill sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" priority={active === 0} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${scene.title}-copy`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.42, ease: [0.16, 0.84, 0.24, 1] }}
                  className="max-w-2xl"
                >
                  <p className="eyebrow text-white/60">{scene.label}</p>
                  <h3 className="display mt-3 text-[clamp(2.4rem,6vw,5.4rem)] leading-[.92]">{scene.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/78 md:text-base">{scene.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col border border-white/10 bg-white/[0.035] p-7 md:p-9">
            <div>
              <p className="eyebrow text-white/45">This is part of the experience</p>
              <p className="display mt-5 text-3xl leading-tight text-white/90 md:text-4xl">See what changes, not just what happens.</p>
              <p className="mt-5 text-sm leading-6 text-white/55">
                Choose a moment to understand the rhythm of the celebration. There is no long scroll sequence here — the story changes in place.
              </p>
            </div>

            <div className="mt-auto pt-10">
              <div className="mb-5 h-px bg-white/10">
                <motion.div
                  className="h-px bg-[#d9b979]"
                  animate={{ width: `${((active + 1) / scenes.length) * 100}%` }}
                  transition={{ duration: 0.45, ease: [0.16, 0.84, 0.24, 1] }}
                />
              </div>
              <p className="text-xs uppercase tracking-[.14em] text-white/45">{String(active + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</p>
              {scene.href && (
                <Link href={scene.href} className="focus-ring link-underline mt-5 inline-block text-sm text-white/90">
                  Explore this world →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
