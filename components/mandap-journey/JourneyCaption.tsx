"use client";

import { AnimatePresence, motion } from "framer-motion";
import { JOURNEY_PHASES, type JourneyPhaseId } from "./journeyTimeline";

const arrival = JOURNEY_PHASES.find((p) => p.id === "arrival")!;

// Only the three "resting" beats of the journey carry copy — everything else is pure camera movement.
function captionFor(phaseId: JourneyPhaseId) {
  if (phaseId === "hold") return arrival;
  return JOURNEY_PHASES.find((p) => p.id === phaseId && p.heading);
}

export function JourneyCaption({ phaseId, reducedMotion }: { phaseId: JourneyPhaseId; reducedMotion: boolean }) {
  const content = captionFor(phaseId);

  return (
    <div className="hero-journey-copy pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pb-20 sm:px-5 sm:pb-24 md:px-10 md:pb-16 lg:px-14">
      <div className="mx-auto w-full max-w-[1440px]">
        <AnimatePresence mode="wait">
          {content && (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.52, ease: [0.16, 0.84, 0.24, 1] }}
              className="max-w-3xl"
            >
              <p className="eyebrow mb-4 text-[#e5bd78]">{content.eyebrow}</p>
              <h1 className="display text-[clamp(2.2rem,10.5vw,6rem)] sm:text-[clamp(2.6rem,7.2vw,6rem)] leading-[.92] tracking-[-.04em] text-white">
                {content.heading?.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              {content.sub && <p className="mt-6 max-w-xl text-base leading-7 text-white/78 md:text-lg">{content.sub}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
