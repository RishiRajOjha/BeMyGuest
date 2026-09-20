# Hydration Fix

## Fixed
- Added `suppressHydrationWarning` to the root `<body>` so browser extensions that inject attributes (for example Grammarly-style `data-*` attributes) do not produce a false React hydration warning.
- Added `data-scroll-behavior="smooth"` to `<html>` to satisfy the Next.js warning about CSS `scroll-behavior: smooth` during route transitions.

## Root cause
The screenshot shows attributes such as `data-new-gr-c-s-check-loaded` and `data-gr-ext-installed` being injected into `<body>` by a browser extension. These attributes are not rendered by the Samaroh server, so React reports a server/client attribute mismatch during hydration.

## Expected result
The app should hydrate without the shown console error even when the browser extension is enabled.
