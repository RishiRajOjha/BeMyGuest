# Samaroh Journey Hero Update

## Changed
- Replaced the previous scroll-linked homepage hero with a timer-driven five-scene cinematic sequence.
- Scene timing: 0–4s establishing shot, 4–8s entrance, 8–13s aisle, 13–17s mandap arrival, 17s+ final CTA hold.
- Added automatic scene transitions with image crossfades and continuous camera-style scale movement.
- Added synchronized caption transitions and a five-step progress indicator.
- Added warm maroon/charcoal vignette overlays for readable white type.
- Added image preloading to reduce visual pop-in.
- Added reduced-motion handling.
- Added Replay Journey on the final scene.
- Kept the fixed navbar and normal page scrolling independent from the hero animation.

## Notes
The scene images use replaceable Unsplash assets. Replace the `image` values in `components/Hero.tsx` with final mandap photography/video stills when available.

The uploaded `house.webm` reference video is not bundled into the project because the requested implementation is the layered crossfade/timed-sequence approach rather than a stitched video.
