# Samaroh / BeMyGuest — Homepage Content & UX Update

## What changed

- Replaced the long, scroll-pinned `ScrollStory` sections on the homepage with `ExperienceStorySwitcher`.
- Wedding storytelling is now a single section with visible moment selectors: Mehendi, Sangeet, Wedding, The celebration.
- The broader discovery story uses the same interaction for Music, Festivals, Craft and Wellness.
- Users can see all moments at once and change the large visual/copy panel in place; there is no multi-viewport scroll sequence.
- Rewrote the wedding story copy to focus on what a guest actually experiences rather than Day 1 / Day 2 / Day 3 labels.
- Rewrote the non-wedding story copy around live music, festival context, artisan craft and riverside wellness.
- Tightened the Experience Worlds copy so each category communicates a concrete reason to explore.
- Updated the homepage introduction to reinforce the Discover → Understand → Experience positioning.
- Updated the wedding section copy to emphasize context before attendance.
- Updated traveler/host copy to avoid unsupported "verified hosts" claims and to make the India-focused product proposition clearer.
- Removed visible "Verified" badges from experience cards/detail headers in this mock-data build and set mock verification status to `Pending`.
- Refined several mock experience descriptions to align with the supplied documentary/editorial photography direction (Mehendi, Sangeet, lakeside wedding, Varanasi ceremony, Bengali wedding, Punjabi wedding, intimate music, yoga, festival).

## Files changed

- `app/page.tsx`
- `components/ExperienceStorySwitcher.tsx`
- `components/WhatThisIs.tsx`
- `components/EditorialExperienceCard.tsx`
- `app/experiences/[slug]/page.tsx`
- `lib/data.ts`

## Validation

- TypeScript/TSX source syntax was checked with the installed TypeScript compiler's parser/transpiler path.
- Full `tsc --noEmit` could not run because this runtime does not have the project's dependency/type-definition installation.
- `npm ci` was attempted but timed out in the current environment.
