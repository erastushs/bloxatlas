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
- [x] Growth API
- [x] Historical Data Foundation

### M4 - Polish MVP (Current)

- [x] Fix Thumbnail System
- [x] Improve Game Detail Page
- [x] Add Footer
- [ ] Add Empty States
- [ ] Add Loading Skeletons

### M5 - Real Data Ingestion

- [ ] Roblox Game Lookup
- [ ] Auto Thumbnail Retrieval
- [ ] Auto Save Game To Database
- [ ] Background Sync

### M6 - Discovery

- [ ] Popular Games Ranking
- [ ] Trending Games
- [ ] Fastest Growing Games
- [ ] Recently Updated
- [ ] Top Active Games

### M7 - Advanced Analytics

- [ ] Historical Charts
- [ ] Growth Leaderboard
- [ ] Trending Algorithm
- [ ] Favorites Tracking

### M8 - Public API

- [ ] API Documentation
- [ ] Public Endpoints
- [ ] Rate Limiting
- [ ] API Keys

---

## Current Milestone

M4 - Polish MVP

Current Task:

- Fix Thumbnail System

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
