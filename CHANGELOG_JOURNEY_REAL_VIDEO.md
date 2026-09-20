# Mandap Journey — Switched to Real Video

## The problem
The hero was a hand-built React Three Fiber scene (cylinders/boxes/cones standing in for
pillars, canopy, flowers). No amount of lighting/color tuning gets primitive WebGL geometry to
photorealism — that's a rendering-technology gap, not a settings gap. The Gemini-generated video
you shared (`gemini_generated_video_8ae0771a.mp4`) already *is* the exact shot you described:
golden-hour exterior → floral gateway → interior aisle → full mandap reveal, photorealistic,
architecturally continuous, no people.

## What changed
- The real video is now the hero's actual background, at `public/video/mandap-journey.mp4`
  (~10s, muted, autoplaying, looping-on-replay), with `public/video/mandap-journey-poster.jpg`
  (first frame) as the `<video poster>` for the instant before it loads.
- `MandapJourneyHero.tsx` no longer mounts the Three.js `<Canvas>`. It renders a plain `<video>`
  element and uses `video.currentTime` (not `performance.now()`) as the single source of truth
  for progress, so captions/progress-bar/skip/replay all stay frame-accurate to the footage.
- `journeyTimeline.ts`: `JOURNEY_DURATION` is now `10` (the real clip length) and the caption
  phases were retimed to the footage's actual beats — 0–2.2s exterior establishing, 2.2–4s
  through the gateway, 4–6.4s the interior aisle ("Some celebrations are meant to be
  experienced"), 7.6–9.6s the mandap reveal ("WHERE VOWS ARE MADE").
- Skip Intro / Replay now seek the video (`currentTime = 0` or `= duration`) instead of faking a
  timer offset.
- Reduced-motion behavior is unchanged: no autoplay, straight to the resting end state on the
  poster frame.
- The old procedural scene files (`MandapScene.tsx`, `JourneyCamera.tsx`, `MandapLighting.tsx`,
  `MandapEnvironment.tsx`) are left in the repo untouched (still type-check) in case you ever
  want a lightweight non-video fallback, but nothing imports them anymore — the real video is
  the only thing rendered.

## If you want a different length or better-quality source
- Anything longer than ~10s or a variant with different pacing/shots needs a new generation from
  the video model (or the shot brief run again) — this is a straight video swap, not something
  this codebase can re-cut on its own.
- For crisper on-screen quality, replace `public/video/mandap-journey.mp4` with the highest
  bitrate/resolution export you have (ideally H.264 or H.265 MP4, 1080p+) — the current file is
  the one you uploaded, ~7.5MB for 10s.
