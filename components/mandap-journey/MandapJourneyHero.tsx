"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { JourneyContext } from "./JourneyContext";
import { JourneyCaption } from "./JourneyCaption";
import { HeroEndCard } from "./HeroEndCard";
import { JOURNEY_DURATION, getPhase, type JourneyPhaseId } from "./journeyTimeline";

export function MandapJourneyHero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [phaseId, setPhaseId] = useState<JourneyPhaseId>("establishing");
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const elapsedRef = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [isMobile]);

  // Reduced motion: never autoplay. Jump straight to the resting end state on the poster frame.
  useEffect(() => {
    if (!reducedMotion) return;
    elapsedRef.current = JOURNEY_DURATION;
    setPhaseId("end");
    if (progressBarRef.current) progressBarRef.current.style.width = "100%";
    videoRef.current?.pause();
  }, [reducedMotion]);

  // The video element is the authoritative clock — captions, progress bar and phase are all
  // driven from video.currentTime via rAF, so they never drift out of sync with the footage.
  useEffect(() => {
    if (reducedMotion || !videoReady) return;
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    const tick = () => {
      const elapsed = video.ended ? JOURNEY_DURATION : video.currentTime;
      elapsedRef.current = elapsed;

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.min(1, Math.max(0, elapsed / JOURNEY_DURATION)) * 100}%`;
      }

      const phase = getPhase(elapsed);
      setPhaseId((prev) => (prev === phase.id ? prev : phase.id));

      if (!video.ended) raf = requestAnimationFrame(tick);
    };

    video.currentTime = 0;
    video.play().catch(() => {
      // Autoplay can be blocked (rare, since the video is muted+inline); fall back to the
      // resting end state so the hero still reads as a finished, intentional frame.
      setPhaseId("end");
    });
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, videoReady]);

  const skipIntro = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = JOURNEY_DURATION;
      video.pause();
    }
    elapsedRef.current = JOURNEY_DURATION;
    if (progressBarRef.current) progressBarRef.current.style.width = "100%";
    setPhaseId("end");
  }, []);

  const replay = useCallback(() => {
    const video = videoRef.current;
    elapsedRef.current = 0;
    if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    setPhaseId("establishing");
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[560px] sm:min-h-[620px] overflow-hidden bg-[#140b09] text-white">
      <Header />

      <JourneyContext.Provider value={{ elapsedRef, reducedMotion, isMobile }}>
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/video/mandap-journey.mp4"
            poster="/images/udaipur-wedding-welcome.webp"
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onEnded={() => setPhaseId("end")}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_15%,rgba(20,11,9,.10)_55%,rgba(8,4,4,.54)_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-[25] bg-[#090504] animate-[heroReveal_900ms_ease-out_forwards]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/15 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <JourneyCaption phaseId={phaseId} reducedMotion={reducedMotion} />
        <HeroEndCard visible={phaseId === "end"} reducedMotion={reducedMotion} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-5 sm:px-5 sm:pb-6 md:px-10 lg:px-14">
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6">
            <div className="hidden items-center gap-3 sm:flex">
              <span className="eyebrow text-white/55">Samaroh Experiences</span>
              <span className="h-px w-20 bg-white/25" />
              <span className="text-[10px] uppercase tracking-[.18em] text-white/45">People · Place · Experience</span>
            </div>
            <div className="pointer-events-auto ml-auto flex items-center gap-3">
              {phaseId === "end" ? (
                <button onClick={replay} className="focus-ring border border-white/25 px-4 py-2 text-[10px] uppercase tracking-[.16em] text-white/70 transition hover:bg-white/10">
                  Replay Journey
                </button>
              ) : (
                !reducedMotion && (
                  <button onClick={skipIntro} className="focus-ring border border-white/25 px-4 py-2 text-[10px] uppercase tracking-[.16em] text-white/70 transition hover:bg-white/10">
                    Skip Intro
                  </button>
                )
              )}
            </div>
          </div>
          <div className="journey-progress mx-auto mt-3 h-px w-full max-w-[1440px] overflow-hidden bg-white/10">
            <div ref={progressBarRef} className="h-full w-0 bg-[#d7a34a]" />
          </div>
        </div>
      </JourneyContext.Provider>
    </section>
  );
}
