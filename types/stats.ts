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
export interface Snapshot {
  id: number
  game_id: number

  playing: number
  visits: number

  created_at: string
}
