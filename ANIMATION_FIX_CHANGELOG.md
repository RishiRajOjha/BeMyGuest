# Samaroh Animation Fix

## Fixed
- Removed the unintended Z-axis stretch from `MandapEnvironment`, which caused the 3D world and the camera spline to use different coordinate systems.
- Changed the Canvas startup camera to match the authored journey start position.
- Delayed the autoplay clock until the WebGL scene reports that it is ready, preventing the hero from loading halfway through the journey on slower devices.
- Reduced camera RAF garbage by reusing `THREE.Vector3` instances instead of allocating several vectors every frame.
- Hardened elapsed-time handling against invalid values.
- Stopped the page-level requestAnimationFrame loop after the final 23-second state; the R3F camera continues to render the final composition.
- Kept replay/skip behavior and normal page scrolling intact.

## Validation
- `npx tsc --noEmit`: passed.
- `next build`: could not complete because this environment could not download the Next.js SWC package from npm (`getaddrinfo EAI_AGAIN registry.npmjs.org`).

## Run locally
```bash
npm install
npm run dev
```
