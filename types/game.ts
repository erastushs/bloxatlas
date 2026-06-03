export interface Game {
  id: number
  name: string
  creator: string
  playing: number
  visits: number
  description?: string
  thumbnail?: string
}

export interface PopularGame extends Game {
  rank: number
  popularityScore: number
}

export interface TrendingGame extends Game {
  rank: number
  playerDelta: number
  visitDelta: number
  growthPercent: number
  trendScore: number
  snapshotCount: number
  measuredFrom: string
  measuredTo: string
}

export interface FastestGrowingGame extends Game {
  rank: number
  playerDelta: number
  visitDelta: number
  growthPercent: number
  growthScore: number
  snapshotCount: number
  measuredFrom: string
  measuredTo: string
}
