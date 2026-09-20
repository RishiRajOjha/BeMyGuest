# Samaroh Mandap Journey — Visual & Motion Fix

## What changed

- Reworked the opening camera path to begin as a wider, higher establishing shot before approaching the wedding entrance.
- Added a second outer venue gateway so the journey has a readable exterior → entrance → interior progression.
- Removed the distracting green foliage blobs from the opening scene.
- Replaced the foliage with Indian wedding details: brass urlis, floral clusters, lanterns, petals and warm practical lights.
- Added a central ceremony runner and brass edge inlays to strengthen the camera's visual axis.
- Increased lighting quality and tone-mapping exposure while reducing the heavy fog/darkness.
- Increased soft-shadow quality and render resolution targets.
- Shortened the autoplay journey from 23s to 15s.
- Increased camera interpolation responsiveness so the movement feels like a deliberate cinematic dolly/crane move rather than a slow floating camera.
- Adjusted the lens from a wider establishing FOV into a tighter arrival FOV.
- Added a short black-to-scene reveal on page load so the first frame does not pop in visually.
- Removed the green debug overlay from normal development runs. Debug readout is now only shown with `?debugJourney`.
- Reduced caption and end-card transition durations to match the faster journey.
- Kept normal page scrolling independent from the autoplay animation.

## New timing

- 0.0–2.6s — wide establishing shot
- 2.6–5.0s — outer wedding entrance
- 5.0–7.8s — floral threshold / entry
- 7.8–10.7s — aisle travel
- 10.7–13.0s — mandap arrival
- 13.0–15.0s — mandap hold
- 15.0s+ — final Samaroh CTA

## Validation

All changed TS/TSX files were syntax-parsed successfully with the installed TypeScript parser.

A full Next.js type/build validation could not run because this working copy does not have its npm dependencies installed and the environment's npm registry access/cache is incomplete.
