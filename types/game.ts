export interface Game {
  id: number
  universe_id?: number

  name: string
  creator: string

  description?: string

  playing: number
  visits: number
  favorites: number

  thumbnail?: string
}
