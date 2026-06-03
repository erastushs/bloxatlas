# BloxAtlas

Explore Roblox Through Data

## Overview

BloxAtlas adalah platform analytics dan discovery Roblox yang berfokus pada pencarian game, statistik, pertumbuhan game, dan data historis.

Tujuan jangka panjang adalah menjadi pusat data Roblox yang menyediakan informasi game, analitik, serta Public API untuk developer dan komunitas.

---

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Supabase
- Upstash Redis (planned)
- Vercel

---

## Project Structure

```txt
app/
components/
hooks/
lib/
services/
types/
docs/
```

---

## Roadmap

## Roadmap

## Roadmap

### M1 - Foundation ✅

- [x] Next.js Setup
- [x] Tailwind Setup
- [x] App Router Setup
- [x] Project Structure
- [x] Navbar
- [x] Homepage Hero
- [x] Search Page
- [x] Game Detail Page
- [x] Supabase Integration

### M2 - Search System ✅

- [x] Search API
- [x] Search Results Page
- [x] Query Search

### M3 - Analytics Foundation ✅

- [x] Games Table
- [x] Snapshots Table
- [x] Homepage Analytics
- [x] Game Stats API
- [x] Historical Data Foundation

### M4 - MVP Polish ✅

- [x] Fix Thumbnail System
- [x] Improve Game Detail Page
- [x] Add Footer
- [x] Add Empty States
- [-] Loading Skeletons (Deferred)

### M5 - Data Collection System ✅

- [x] Validate Search Source
- [x] Validate Universe Lookup
- [x] Validate Statistics Endpoint
- [x] Validate Thumbnail Endpoint
- [x] Validate Full Pipeline
- [x] Implement Roblox Source Layer
- [x] Save First Real Game To Supabase
- [x] Sync Multiple Games
- [x] Massive Game Discovery
- [x] Snapshot Collection
- [x] Collector Runner
- [x] Refresh Games During Snapshot
- [x] 1600+ Games Indexed
- [x] 1800+ Snapshots Collected
- [-] Automated Scheduler (Planned for Release)

### M6 - Analytics & Rankings (Current)

- [x] Growth API
- [x] Historical Charts
- [x] Popular Games Ranking
- [x] Trending Games
- [x] Fastest Growing Games
- [x] Top Active Games
- [x] Recently Updated Games

### M7 - UI/UX Foundation

- [x] Brand Identity
- [x] Final Logo System
- [x] Favicon
- [ ] Design Tokens
- [ ] Color System
- [ ] Typography System
- [ ] Reusable UI Components
- [ ] Card Variants
- [ ] Loading Skeletons
- [ ] Empty States
- [ ] Error States
- [ ] Dark Theme Refinement

### M8 - Responsive & Performance

- [ ] Mobile Navigation
- [ ] Mobile Homepage
- [ ] Mobile Rankings
- [ ] Mobile Search
- [ ] Tablet Optimization
- [ ] Responsive Charts
- [ ] Image Optimization
- [ ] Route Prefetching
- [ ] Core Web Vitals Optimization
- [ ] Lighthouse 90+

### M9 - Discovery Features

- [ ] Genre System
- [ ] Category Pages
- [ ] Similar Games
- [ ] Creator Profiles
- [ ] Advanced Search Filters

### M10 - Public API

- [ ] API Documentation
- [ ] Public Endpoints
- [ ] Rate Limiting
- [ ] API Keys

### M11 - SEO & Release Preparation

- [ ] SEO Optimization
- [ ] Sitemap
- [ ] Robots.txt
- [ ] Open Graph Images
- [ ] Structured Data
- [ ] Error Monitoring
- [ ] Production Environment Validation
- [ ] Vercel Cron Scheduler

### M12 - Production Release

- [ ] Deploy to Vercel
- [ ] Enable Automated Collection
- [ ] Public Launch

---

## Database

### games

Stores indexed Roblox games.

Current fields:

- id
- name
- creator
- playing
- visits
- description
- thumbnail
- created_at

### snapshots

Planned table for historical statistics.

---

## Future Features

- Creator Profiles
- Game Analytics
- Similar Games
- Public API
- Trending Algorithms
- Fastest Growing Rankings

---

## Deployment

Planned:

- Vercel
- Supabase
- Upstash Redis
