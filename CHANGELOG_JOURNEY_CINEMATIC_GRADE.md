# Mandap Journey — Cinematic Grade Pass

Updates to `components/mandap-journey/` to align the existing 3D camera-journey hero with the
"ultra-premium cinematic Indian wedding" creative brief (arrival → gateway → aisle → mandap
reveal, no people, golden-hour-to-blue-hour light, editorial color grade).

## What was already in place
The scene was already built as a single continuous React Three Fiber camera path (not a
slideshow) through one procedural venue: exterior approach, floral gateway arch, garlanded
aisle, and a four-pillar mandap with canopy, rangoli, sacred fire and no human figures — this
already matched the shot list (Shots 1–6) and the "one continuous journey" / "no people"
requirements closely.

## What changed in this pass
- **Sky & fog progression** (`MandapScene.tsx`): added `SkyAndFogProgression`, a per-frame color
  lerp keyed to the same `getSplineU` camera progress used everywhere else. The background and
  fog now move warm golden-hour amber → sunset → deep blue-hour across the journey, instead of
  staying one flat brown the whole time.
- **Warm/cool lighting contrast** (`MandapLighting.tsx`): the sky-side lights (hemisphere, key
  directional, rim directional) now cool from amber toward a dusk lavender-blue as the camera
  approaches the mandap, while the practical wedding lighting (lanterns, warm fill, sacred fire)
  keeps warming up as before. This is what should make the final mandap reveal read as "lit
  against the evening" rather than uniformly bright.
- **Editorial color grade**: nudged maroon/brass/marigold/rose/ivory a touch less saturated and
  toned down `toneMappingExposure` slightly (1.28 → 1.22) — closer to the brief's "slightly
  desaturated, cinematic and editorial" direction than a saturated festive palette.

## Note on the brief's technical spec (4K/24fps/10–12s/MP4)
This project renders the journey live in the browser with WebGL/Three.js — it's an interactive
site hero, not an exportable video file. It does not produce a `.mp4`. If you need an actual
video asset (for ads, social, or anywhere outside this site), that has to be generated with a
text-to-video tool (Runway, Kling, Sora, etc.) using the shot-by-shot description you provided,
or captured by screen-recording this hero and encoding it afterward.
