# Samaroh Experiences — MVP Architecture

## Product model

The system is centered on one `Experience` domain, not wedding-specific products. Category-specific details live in `categoryData`, while shared fields cover title, host, location, schedule, capacity, discovery, privacy and trust.

## Route map

- `/` — cinematic editorial homepage
- `/explore` — search + category discovery
- `/experiences/[slug]` — experience detail, schedule, host, privacy, request-to-join
- `/host` — host experience wizard
- `/host/requests` — host request management demonstration
- `/admin` — moderation/approval demonstration

## Core user flows

Guest: Home → Explore → Experience → Request to Join → Request sent → Host acceptance.

Host: Home → Host an Experience → Type → Details → Schedule → Review → Pending Review.

Admin: Admin → Application → Request changes / Approve / Publish / Reject.

## Component architecture

- `ExperienceCard`: listing representation
- `Header`: shared navigation
- `RequestToJoin`: guest request form + local MVP state
- `HostWizard`: conditional-style host onboarding
- Route pages compose those reusable pieces rather than duplicating listing/detail logic.

## Data layer

`lib/types.ts` is the domain contract. `lib/data.ts` is a mock repository. The production migration point is to replace `getExperience()` and the `experiences` collection with server-side repository/service calls.

## Trust + privacy

The public experience object contains city/region but not private address or personal direct contact fields. Request and moderation states are separate concerns and should move to authenticated server persistence before production.

## MVP boundary

The current reference implementation demonstrates the end-to-end UX and state transitions using localStorage. It does not yet include real authentication, a database, object storage, production moderation authorization, messaging, notifications or payments.
