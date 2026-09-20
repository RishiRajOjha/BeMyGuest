"use client";
import { useRef } from "react";
import type { ReactNode } from "react";

/** Snap-scrolling horizontal rail with edge fades and desktop arrow controls. */
export function HorizontalScrollRail({ children, className }: { children: ReactNode; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 640), behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div
        ref={trackRef}
        className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-[min(6vw,40px)] pl-[min(6vw,40px)] ${className ?? ""}`}
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-[color:var(--paper)] to-transparent md:block" />
      <div className="mt-6 hidden items-center gap-3 px-[min(6vw,40px)] md:flex">
        <button aria-label="Scroll left" onClick={() => scrollBy(-1)} className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[color:var(--line)] transition hover:border-[color:var(--ink)]">←</button>
        <button aria-label="Scroll right" onClick={() => scrollBy(1)} className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[color:var(--line)] transition hover:border-[color:var(--ink)]">→</button>
      </div>
    </div>
  );
}
