# Samaroh Experiences — MVP

A from-scratch reference implementation of the supplied Samaroh Experiences brief. The repository was not attached, so this version intentionally does not claim to reuse an existing Samaroh auth/admin/component system.

## What is implemented

- Editorial homepage centered on **People + Place + Experience**
- Reusable `Experience` model with `categoryData`
- 12 realistic mock experiences across weddings, concerts, wellness, culture and festivals/community
- Explore page with search + category filtering
- Experience detail pages with flexible timeline, trust/privacy copy and request-to-join flow
- Host an Experience conditional-style wizard covering the core submission journey
- Mobile-first layouts, sticky request module on desktop, reduced-motion handling
- Privacy-by-default public location language
- Modular components and data layer

## Architecture

`app/` contains routes and pages. `components/` contains reusable UX primitives. `lib/types.ts` defines the domain. `lib/data.ts` is the current mock repository and is the migration point for a real database/service layer.

## Routes

- `/` — homepage
- `/explore` — discovery/search/filter
- `/experiences/[slug]` — experience detail + request flow
- `/host` — host submission wizard

## Run

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For production:

```bash
npm run build
npm start
```

## Environment variables

None required for the mock MVP. A database/auth/media layer can be added without changing the core `Experience` UI contracts.

## Changelog

### Already existed
- Nothing from an existing Samaroh repository was available in the attachment.

### Added
- Complete MVP reference app and design system
- Experience domain model
- Mock experience catalog
- Homepage, explore, detail, host routes
- Guest request UI
- Host submission UI
- Responsive/editorial visual system

### Changed
- N/A — this is a new reference implementation, not an in-place modification.

### Remaining for production integration
- Real authentication and role-based access
- Persistent database and migrations
- Object storage for host images/videos
- Admin moderation dashboard + workflow
- Email/WhatsApp/in-app notifications
- Real request persistence and messaging
- Reviews
- Payments/contributions
- Rate limiting, audit logging and reporting
- Secure private location/contact release rules

## Future migration points

### Database
Replace `lib/data.ts` with repository/service functions backed by PostgreSQL (or the existing Samaroh database). Keep the `Experience` shape as the domain contract.

### Payments
Introduce a payment intent after host acceptance for paid experiences. Keep contribution/payment state separate from experience status and guest request status.

### Authentication
Map `GUEST`, `HOST`, `ADMIN` to the existing auth provider. Do not embed authorization decisions in presentational components.
