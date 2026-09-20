// Timing/easing data for the mandap journey. The visual track is now the real cinematic
// video (public/video/mandap-journey.mp4, ~10s) rather than a synthetic 3D camera path, so
// these phases exist purely to time the caption overlay against the footage's actual beats:
// 0–2.2s exterior/entrance establishing, 2.2–4s passing through the gateway, 4–7s the interior
// aisle, 7–10s the mandap reveal.

export type JourneyPhaseId =
  | "establishing"
  | "entrance"
  | "threshold"
  | "aisle"
  | "arrival"
  | "hold"
  | "end";

export interface JourneyPhase {
  id: JourneyPhaseId;
  start: number;
  end: number;
  eyebrow?: string;
  heading?: string[];
  sub?: string;
}

export const JOURNEY_PHASES: JourneyPhase[] = [
  {
    id: "establishing",
    start: 0,
    end: 2.2,
    eyebrow: "Samaroh Experiences",
    heading: ["SEE INDIA", "DIFFERENTLY."],
    sub: "Come closer to the celebrations people live."
  },
  { id: "entrance", start: 2.2, end: 4 },
  {
    id: "threshold",
    start: 4,
    end: 6.4,
    eyebrow: "The Journey",
    heading: ["Some celebrations", "are meant to be experienced."]
  },
  { id: "aisle", start: 6.4, end: 7.6 },
  {
    id: "arrival",
    start: 7.6,
    end: 9.6,
    eyebrow: "The Mandap",
    heading: ["WHERE", "VOWS ARE MADE."]
  },
  { id: "hold", start: 9.6, end: 10 },
  { id: "end", start: 10, end: Infinity }
];

// Real video duration (public/video/mandap-journey.mp4).
export const JOURNEY_DURATION = 10;

export function getPhase(tSeconds: number): JourneyPhase {
  return JOURNEY_PHASES.find((p) => tSeconds >= p.start && tSeconds < p.end) ?? JOURNEY_PHASES[JOURNEY_PHASES.length - 1];
}

// --- Legacy 3D-camera-path helpers -----------------------------------------------------
// No longer used by the hero (which now plays the real video directly), but kept so the
// earlier procedural-scene components (MandapScene/JourneyCamera/MandapLighting) still
// compile if you ever want to fall back to them.
const CAMERA_KEYFRAMES: [number, number][] = [
  [0, 0],
  [2.2, 0.12],
  [4, 0.33],
  [6.4, 0.57],
  [7.6, 0.8],
  [9.6, 0.95],
  [10, 1]
];

export function easeInOutCubic(x: number) {
  const c = Math.min(1, Math.max(0, x));
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

export function getSplineU(tSeconds: number): number {
  const kf = CAMERA_KEYFRAMES;
  if (tSeconds <= kf[0][0]) return kf[0][1];
  const last = kf[kf.length - 1];
  if (tSeconds >= last[0]) return last[1];
  for (let i = 0; i < kf.length - 1; i++) {
    const [t0, u0] = kf[i];
    const [t1, u1] = kf[i + 1];
    if (tSeconds >= t0 && tSeconds <= t1) {
      const local = (tSeconds - t0) / (t1 - t0);
      return u0 + (u1 - u0) * easeInOutCubic(local);
    }
  }
  return 1;
}
