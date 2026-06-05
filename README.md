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
- [x] Bulk Roblox Stats Fetch
- [x] Bulk Roblox Thumbnail Fetch
- [x] Batch Snapshot Insert
- [x] Batch Game Upsert
- [x] Sync Optimization
- [x] Snapshot Optimization
- [x] Refresh Games During Snapshot
- [x] 2300+ Games Indexed
- [x] 12000+ Snapshots Collected

### M6 - Analytics & Rankings ✅

- [x] Growth API
- [x] Historical Charts
- [x] Popular Games Ranking
- [x] Trending Games
- [x] Fastest Growing Games
- [x] Top Active Games
- [x] Recently Updated Games
- [x] Ranking Services
- [x] Snapshot-Based Analytics

### M6.5 - Infrastructure & Operations ✅

- [x] Production Database
- [x] Vercel Deployment
- [x] Vercel Cron Setup
- [x] Cron Verification
- [x] Snapshot Pagination
- [x] Analytics Pagination
- [x] Collector Optimization
- [x] Sync Optimization
- [x] Vercel Analytics
- [x] Vercel Speed Insights
- [x] Error Monitoring (Basic)

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
- [x] Dark Theme Refinement
- [x] fix Search
- [x] Card Variants

### M8 - Responsive & Performance

- [x] Mobile Navigation
- [x] Mobile Homepage
- [x] Mobile Rankings
- [x] Mobile Search
- [x] Responsive Charts
- [x] Image Optimization (Basic)
- [x] Tablet Optimization
- [x] Route Prefetching
- [x] Core Web Vitals Optimization
- [x] Lighthouse 90+

### M11 - SEO & Release Preparation

- [x] Metadata Optimization
- [x] Sitemap
- [x] Robots.txt
- [x] Dynamic Game Sitemap
- [x] Structured Data
- [x] Open Graph Images
- [x] Error Monitoring (Basic)
- [x] Google Search Console Verification

### M12 - Launch Readiness

- [x] Deploy to Vercel
- [x] Enable Automated Collection
- [x] Mobile Ready
- [x] SEO Ready
- [x] Monitoring Ready
- [ ] Public Launch

### M13 - Discovery Features

- [x] Similar Games
- [x] Related Games
- [x] Genre Pages
- [x] Creator Pages
- [x] Collection Pages
- [x] Advanced Discovery

### M14 - Platform Features

- [ ] Public API
- [ ] API Documentation
- [ ] API Rate Limiting
- [ ] Developer Dashboard

### M15 - Scale & Infrastructure

- [ ] Upstash Redis
- [ ] Cached Rankings
- [ ] Cached Search
- [ ] Background Queue
- [ ] Multi-Source Collection

---

OTW

1. Similar Games
2. Genre Pages
3. Public Launch

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
