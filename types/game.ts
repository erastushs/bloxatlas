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
