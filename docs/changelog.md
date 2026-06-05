# Changelog

Semua perubahan penting BloxAtlas dicatat di sini. Format mengikuti gaya rilis produk: versi terbaru selalu berada di atas.

## v1.0.0 - Publish Release

Tanggal: 2026-06-05

Rilis publish BloxAtlas sebagai platform analytics dan discovery Roblox dengan UI premium, data rankings, game analytics, public API, caching, dan sistem collector otomatis.

### Added

- Redesign penuh website menjadi modern gaming analytics platform berbasis dark theme.
- Premium homepage dengan hero analytics, interactive search, CTA discovery, animated statistics, dan popular games showcase.
- Command palette untuk quick navigation dan search intent melalui `Ctrl K`.
- Framer Motion untuk reveal animation, staggered loading, search dropdown transition, command palette transition, dan animated counters.
- Komponen motion reusable:
  - `AnimatedCounter`
  - `Reveal`
- Game analytics dashboard dengan hero thumbnail, live metrics, player activity chart, snapshot delta, profile context, similar games, dan related games.
- Area chart baru untuk player activity menggunakan Recharts dengan gradient fill, tooltip modern, dan animasi transisi.
- Public API untuk games, game detail, history, stats, dan rankings.
- API documentation page untuk developer.
- Genre pages, creator pages, collection pages, similar games, dan related games.
- Upstash Redis caching untuk data game, rankings, search, dan invalidation flow.
- Background queue dan collector jobs untuk sync game data dan snapshots.
- Vercel Analytics dan Speed Insights.
- SEO foundation: metadata, sitemap, robots.txt, dynamic game metadata, structured data, Open Graph, dan Google Search Console verification.

### Changed

- Navbar menjadi sticky glass navigation dengan desktop nav, mobile drawer, theme toggle, dan command palette.
- SearchBar ditingkatkan dengan glass container, suggestions, local search history, animated dropdown, clear action, dan faster perceived feedback.
- Game cards, ranking cards, stat cards, badges, buttons, skeletons, page headers, dan shared card primitives dibuat konsisten dengan design system baru.
- Homepage berubah dari landing sederhana menjadi discovery cockpit untuk Roblox analytics.
- Search page diperbarui dengan premium header, loading skeletons, filter controls, dan card grid yang lebih polished.
- Player chart berubah dari line chart sederhana ke area chart premium.
- Skeleton loading menggunakan shimmer treatment untuk perceived performance.
- Global design tokens diperbarui: dark-first palette, glass surfaces, responsive typography, radius system, shadows, focus ring, reduced motion support, dan mesh grid treatment.
- Footer diperbarui dengan copy publish-ready.

### Performance & UX

- Mempertahankan Next.js App Router dengan lazy-loaded sections untuk homepage dan charts.
- Menggunakan `next/image` untuk optimized thumbnails.
- Menjaga route prefetch behavior untuk navigasi internal.
- Menambahkan reduced motion fallback untuk pengguna yang mengaktifkan preferensi aksesibilitas.
- Menggunakan skeleton loading states untuk rankings, cards, search results, dan analytics sections.
- Build production berhasil dengan Next.js 16.2.6 dan Turbopack.

### Verification

- `npm run lint`
- `npm run build`

---

## v0.9.0 - Scale & Infrastructure

### Added

- Upstash Redis integration.
- Cached rankings.
- Cached search.
- Cached game data retrieval.
- Cache invalidation handlers.
- Background queue utilities.
- Multi-source collector architecture.

### Changed

- Ranking, search, and game services optimized around cached reads.
- Collector job handlers improved for production operations.

---

## v0.8.0 - Platform & Public API

### Added

- Public API routes:
  - `GET /api/v1/games`
  - `GET /api/v1/games/{id}`
  - `GET /api/v1/games/{id}/history`
  - `GET /api/v1/stats`
  - `GET /api/v1/rankings`
- API documentation page.
- API rate limiting.
- Developer-facing endpoint descriptions and response format.

---

## v0.7.0 - Discovery Features

### Added

- Similar games.
- Related games.
- Genre pages.
- Creator pages.
- Curated collection pages.
- Collection API routes.
- Advanced discovery routes for game exploration.

---

## v0.6.0 - Analytics & Rankings

### Added

- Growth API.
- Historical player charts.
- Popular games ranking.
- Trending games ranking.
- Fastest growing games ranking.
- Top active games ranking.
- Recently updated games ranking.
- Snapshot-based analytics services.

---

## v0.5.0 - Data Collection System

### Added

- Roblox source layer.
- Game discovery collector.
- Snapshot collector.
- Collector runner.
- Collector metrics.
- Collector pagination.
- Bulk Roblox stats fetching.
- Bulk Roblox thumbnail fetching.
- Batch snapshot insert.
- Batch game upsert.
- Snapshot refresh flow.

---

## v0.4.0 - SEO & Release Preparation

### Added

- Metadata optimization.
- Sitemap.
- Robots.txt.
- Dynamic route metadata.
- Structured data.
- Open Graph image support.
- Vercel Analytics.
- Vercel Speed Insights.
- Basic error handling and monitoring.

---

## v0.3.0 - UI/UX Foundation

### Added

- Brand identity.
- Logo and favicon system.
- Design tokens.
- Reusable UI components.
- Loading skeletons.
- Empty states.
- Error states.
- Dark theme refinement.
- Responsive navigation and layouts.

---

## v0.2.0 - Analytics Foundation

### Added

- Games table integration.
- Snapshots table foundation.
- Game stats API.
- Historical statistics storage.
- Homepage analytics.
- Game detail analytics foundation.

---

## v0.1.0 - Foundation

### Added

- Next.js App Router project setup.
- TypeScript setup.
- Tailwind CSS setup.
- Supabase integration.
- Homepage.
- Navbar.
- Search page.
- Search API.
- Game detail page.
