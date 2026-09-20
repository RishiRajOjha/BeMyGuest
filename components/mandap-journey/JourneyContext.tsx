"use client";

import { createContext, useContext, type MutableRefObject } from "react";

// Shared clock so the R3F camera (inside <Canvas>) and the plain HTML captions
// (outside <Canvas>) read the exact same elapsed time — no scroll, no drift.
export interface JourneyContextValue {
  elapsedRef: MutableRefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
  debugRef?: MutableRefObject<HTMLPreElement | null>;
}

export const JourneyContext = createContext<JourneyContextValue | null>(null);

export function useJourneyContext(): JourneyContextValue {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourneyContext must be used within a JourneyContext.Provider");
  return ctx;
}
