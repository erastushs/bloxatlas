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

### Phase 1 - Foundation

- [x] Next.js Setup
- [x] Tailwind Setup
- [x] App Router Setup
- [x] Project Structure
- [x] Navbar
- [x] Homepage Hero
- [x] Homepage analytics
- [x] Search Page
- [x] Game Detail Page
- [x] Supabase Connection

### Phase 2 - Search System

- [x] Search API
- [x] Search Results Page
- [x] Query Search
- [ ] Search Suggestions
- [ ] Search History

### Phase 3 - Database

- [x] Games Table
- [x] Snapshots Table
- [x] Historical Data
- [ ] Growth Tracking

### Phase 4 - Discovery

- [ ] Popular Games
- [ ] Trending Games
- [ ] Fastest Growing
- [ ] Recently Updated
- [ ] Top Active Games

### Phase 5 - Analytics

- [ ] Historical Charts
- [ ] Player Tracking
- [ ] Visits Tracking
- [ ] Favorites Tracking

### Phase 6 - Public API

- [ ] API Documentation
- [ ] Public Endpoints
- [ ] Rate Limiting
- [ ] API Keys

---

## Current Milestone

M3 - Database Foundation

Current Focus:

- Improve Game Detail Page
- Add Description Support
- Create Snapshots Table
- Prepare Historical Tracking

M4 - Historical Analytics Foundation

M5 - Homepage Analytics

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
