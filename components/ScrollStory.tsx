"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

export type StoryScene = {
  label: string;
  title: string;
  description: string;
  image: string;
};

type Phase = "before" | "pinned" | "after";

/**
 * Scroll-pinned storytelling section: one scene crossfades into the next as the user scrolls.
 * Uses a JS-driven pin (fixed while active, absolute-at-edges otherwise) instead of CSS
 * `position: sticky`, because sticky always un-pins over exactly one viewport-height at the
 * end of its range — which reveals the section's flat background as a jarring gap.
 */
export function ScrollStory({ scenes, eyebrow }: { scenes: StoryScene[]; eyebrow: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("before");
  const progress = useMotionValue(0);
  const n = scenes.length;

  useEffect(() => {
    let raf = 0;
    let ticking = false;

    function measure() {
      ticking = false;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const nextPhase: Phase = rect.top > 0 ? "before" : rect.bottom <= vh ? "after" : "pinned";
      setPhase((p) => (p === nextPhase ? p : nextPhase));
      const total = rect.height - vh;
      progress.set(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [progress]);

  const pinStyle: CSSProperties =
    phase === "before"
      ? { position: "absolute", top: 0, left: 0, right: 0 }
      : phase === "after"
      ? { position: "absolute", bottom: 0, left: 0, right: 0 }
      : { position: "fixed", top: 0, left: 0, right: 0 };

  return (
    <section ref={containerRef} className="relative bg-[#181513]" style={{ height: `${n * 100}vh` }}>
      <div style={pinStyle} className="h-[100svh] overflow-hidden">
        {scenes.map((scene, i) => (
          <ScenePanel key={scene.title} scene={scene} index={i} count={n} eyebrow={eyebrow} progress={progress} />
        ))}

        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex md:right-10">
          {scenes.map((scene, i) => (
            <ProgressDot key={scene.title} index={i} count={n} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScenePanel({
  scene,
  index,
  count,
  eyebrow,
  progress
}: {
  scene: StoryScene;
  index: number;
  count: number;
  eyebrow: string;
  progress: MotionValue<number>;
}) {
  // Transitions are centered on each scene boundary so the outgoing and incoming
  // scenes overlap while crossfading — avoiding a black gap where both hit 0 at once.
  const half = 0.28 / count / 2;
  const boundaryIn = index / count;
  const boundaryOut = (index + 1) / count;

  let input: number[];
  let output: number[];
  if (index === 0) {
    input = [boundaryOut - half, boundaryOut + half];
    output = [1, 0];
  } else if (index === count - 1) {
    input = [boundaryIn - half, boundaryIn + half];
    output = [0, 1];
  } else {
    input = [boundaryIn - half, boundaryIn + half, boundaryOut - half, boundaryOut + half];
    output = [0, 1, 1, 0];
  }
  const opacity = useTransform(progress, input, output);
  const scale = useTransform(progress, [boundaryIn, boundaryOut], [1.06, 1]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image src={scene.image} alt={scene.title} fill priority={index === 0} sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
      <div className="container relative flex h-full flex-col justify-end pb-20 pt-32 text-white md:pb-28">
        <p className="eyebrow text-white/60">{eyebrow} · {index + 1}/{count}</p>
        <p className="mt-4 text-sm uppercase tracking-[.2em] text-white/70">{scene.label}</p>
        <h3 className="display mt-3 max-w-2xl text-[clamp(2.2rem,6vw,4.5rem)] leading-[.95]">{scene.title}</h3>
        <p className="mt-5 max-w-md text-white/75">{scene.description}</p>
      </div>
    </motion.div>
  );
}

function ProgressDot({ index, count, progress }: { index: number; count: number; progress: MotionValue<number> }) {
  const start = index / count;
  const mid = (index + 0.5) / count;
  const end = (index + 1) / count;
  const height = useTransform(progress, [start, mid, end], ["24px", "40px", "24px"]);
  const opacity = useTransform(progress, [start, mid, end], [0.35, 1, 0.35]);
  return <motion.span style={{ height, opacity }} className="w-[3px] rounded-full bg-white" />;
}
