export interface GameStats {
  playing: number
  visits: number
  favorites: number
}

export interface HistoricalSnapshot {
  timestamp: string
  playing: number
  visits: number
  favorites: number
}
