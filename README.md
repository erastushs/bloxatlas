# BloxAtlas

BloxAtlas is a Roblox analytics and discovery platform for exploring games through live activity, growth signals, rankings, historical snapshots, and public API data.

Website: https://bloxatlas.vercel.app

## Overview

BloxAtlas helps players, creators, researchers, and developers understand Roblox games through data. It tracks indexed Roblox experiences, player activity, visits, growth momentum, creators, genres, collections, and related discovery signals.

The product is designed as a premium gaming analytics dashboard: dark-first, fast, responsive, data-focused, and built for discovery workflows.

## Core Features

- Roblox game search with suggestions and local search history.
- Popular games ranking by active players.
- Trending games ranking based on snapshot momentum.
- Fastest growing games ranking.
- Top active games ranking.
- Recently updated games.
- Game detail analytics dashboard.
- Historical player activity chart.
- Active player, visit, creator, and snapshot metrics.
- Similar games and related games discovery.
- Genre pages.
- Creator pages.
- Curated collection pages.
- Public API for developers.
- API documentation page.
- SEO-ready pages with metadata, sitemap, robots.txt, Open Graph, and structured data.
- Automated data collection through collector jobs and cron routes.
- Redis-backed caching for faster rankings, search, and game data.

## Product Experience

BloxAtlas uses a modern SaaS and gaming-inspired interface:

- Dark theme as the primary experience.
- Subtle glassmorphism.
- Premium gradients and depth.
- Sticky responsive navigation.
- Command palette for quick navigation.
- Animated statistics.
- Smooth reveal, dropdown, and card loading animations.
- Shimmer skeleton states.
- Mobile-first responsive layouts.
- Accessible focus states and reduced-motion support.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Recharts
- Supabase
- Upstash Redis
- Vercel Analytics
- Vercel Speed Insights
- ESLint
- tsx for collector jobs

## Architecture

```txt
app/                 Next.js App Router pages and API routes
components/          Reusable UI, layout, motion, search, cards, charts
constants/           Site, navigation, and API constants
hooks/               Client-side data fetching hooks
services/            Server-side business logic and data services
lib/                 Supabase, Redis, cache, queue, SEO, Roblox utilities
collector/           Roblox data collection sources and jobs
types/               Shared TypeScript types
docs/                Documentation and changelog
public/              Static assets and branding
```

## Public Pages

- `/` - homepage and discovery cockpit
- `/search` - game search and filters
- `/game/[id]` - game analytics dashboard
- `/trending` - trending games
- `/fastest-growing` - fastest growing games
- `/top-active` - top active games
- `/recently-updated` - recently updated games
- `/genres` - genre index
- `/genre/[slug]` - games by genre
- `/creator/[name]` - games by creator
- `/collections` - curated collection index
- `/collection/[slug]` - collection detail
- `/developers` - developer page
- `/api/docs` - API documentation

## Public API

Base URL:

```txt
https://bloxatlas.vercel.app
```

Available endpoints:

```txt
GET /api/v1/games
GET /api/v1/games/{id}
GET /api/v1/games/{id}/history
GET /api/v1/stats
GET /api/v1/rankings
```

Example:

```bash
curl "https://bloxatlas.vercel.app/api/v1/games?q=adopt&page=1&limit=10"
```

Rate limit:

```txt
60 requests per minute per IP
```

Response headers include:

```txt
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
```

## Data Collection

BloxAtlas includes a collector system for syncing Roblox game data and storing historical snapshots.

Collector capabilities:

- Roblox source layer.
- Seed-based game discovery.
- Game metadata sync.
- Active player and visit snapshots.
- Bulk stats fetching.
- Bulk thumbnail fetching.
- Batch game upserts.
- Batch snapshot inserts.
- Snapshot refresh flow.
- Job handlers for cache invalidation and queue processing.

Run collector jobs:

```bash
npm run collector
```

## Caching & Performance

BloxAtlas is optimized for fast perceived performance and production use:

- Redis-backed cache layer.
- Cached rankings.
- Cached search responses.
- Cached game data.
- Route-level revalidation.
- Lazy-loaded homepage sections.
- Dynamic chart loading.
- Optimized images through `next/image`.
- Skeleton loading states.
- Reduced layout shift through stable component sizing.

## SEO & Monitoring

Included production-readiness features:

- Metadata configuration.
- Dynamic game metadata.
- Organization and game structured data.
- Sitemap.
- Robots.txt.
- Open Graph image support.
- Google Search Console verification.
- Vercel Analytics.
- Vercel Speed Insights.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

If port `3000` is already in use, Next.js will choose another available port.

## Environment Variables

Create `.env.local` and configure the required services:

```txt
NEXT_PUBLIC_SITE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CRON_SECRET=
```

Exact variable usage may depend on deployment mode and collector configuration.

## Scripts

```bash
npm run dev        # Start local development server
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run collector  # Run collector jobs
```

## Verification

The publish UI release has been verified with:

```bash
npm run lint
npm run build
```

## Deployment

BloxAtlas is built for Vercel deployment with:

- Next.js App Router.
- Vercel cron routes.
- Supabase database.
- Upstash Redis cache.
- Vercel Analytics.
- Vercel Speed Insights.

Production URL:

```txt
https://bloxatlas.vercel.app
```

## Changelog

See [docs/changelog.md](docs/changelog.md) for release history.

## License

ISC
