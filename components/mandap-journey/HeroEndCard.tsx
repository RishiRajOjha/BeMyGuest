"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export function HeroEndCard({ visible, reducedMotion }: { visible: boolean; reducedMotion: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.7, ease: [0.16, 0.84, 0.24, 1] }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgba(38,15,13,.55)_0%,rgba(19,8,7,.86)_55%,rgba(10,4,4,.96)_100%)] px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.3, duration: reducedMotion ? 0.12 : 0.65, ease: [0.16, 0.84, 0.24, 1] }}
            className="mx-auto max-w-3xl"
          >
            <p className="eyebrow mb-5 text-[#e5bd78]">Samaroh Experiences</p>
            <h2 className="display text-[clamp(2.6rem,7vw,5.5rem)] leading-[.94] tracking-[-.04em] text-white">
              Don&rsquo;t just visit.
              <br />
              Join something.
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/78 md:text-lg">
              Experience Indian weddings, celebrations, music, culture and traditions with the people who live them.
            </p>
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 px-2 sm:mt-9 sm:flex-row sm:items-center sm:px-0">
              <Link href="/explore" className="focus-ring inline-flex items-center justify-center bg-[#d7a34a] w-full px-5 py-3.5 text-xs sm:w-auto sm:px-7 sm:py-4 font-bold uppercase tracking-[.15em] text-[#23100d] transition hover:bg-[#e6b65c]">
                Explore Experiences
              </Link>
              <Link href="/host" className="focus-ring inline-flex items-center justify-center border border-white/55 w-full px-5 py-3.5 text-xs sm:w-auto sm:px-7 sm:py-4 font-bold uppercase tracking-[.15em] text-white transition hover:bg-white/10">
                Host an Experience
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
