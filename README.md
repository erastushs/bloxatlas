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
- [x] Loading Skeletons

### M5 - Data Collection System ✅

- [x] Roblox Source Layer
- [x] Game Discovery
- [x] Snapshot Collection
- [x] Collector Runner
- [x] Collector Metrics
- [x] Collector Pagination
- [x] Refresh Games During Snapshot
- [x] 2000+ Games Indexed
- [x] 4000+ Snapshots Collected

### M6 - Analytics & Rankings ✅

- [x] Growth API
- [x] Historical Charts
- [x] Popular Games Ranking
- [x] Trending Games
- [x] Fastest Growing Games
- [x] Top Active Games
- [x] Recently Updated Games

### M6.5 - Infrastructure & Operations

- [x] Production Database
- [x] Vercel Deployment
- [x] Vercel Cron Setup
- [x] Cron Verification
- [x] Snapshot Pagination
- [x] Analytics Pagination
- [ ] Collector Optimization
- [ ] Vercel Analytics
- [ ] Vercel Speed Insights
- [ ] Error Monitoring

### M7 - UI/UX Foundation

- [x] Brand Identity
- [x] Final Logo System
- [x] Favicon
- [x] Design Tokens
- [x] Color System
- [x] Typography System
- [x] Reusable UI Components
- [x] Loading Skeletons
- [x] Empty States
- [x] Error States
- [ ] Dark Theme Refinement
- [ ] Card Variants

### M8 - Responsive & Performance

- [x] Mobile Navigation
- [x] Mobile Homepage
- [x] Mobile Rankings
- [x] Mobile Search
- [ ] Tablet Optimization
- [ ] Responsive Charts
- [ ] Image Optimization
- [ ] Route Prefetching
- [ ] Core Web Vitals Optimization
- [ ] Lighthouse 90+

### M11 - SEO & Release Preparation

- [x] Metadata Optimization
- [x] Sitemap
- [x] Robots.txt
- [x] Dynamic Game Sitemap
- [x] Structured Data
- [x] Open Graph Images
- [ ] Error Monitoring

### M12 - Launch Readiness

- [x] Deploy to Vercel
- [x] Enable Automated Collection
- [x] Mobile Ready
- [x] SEO Ready
- [x] Monitoring Ready
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
