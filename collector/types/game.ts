export interface CollectedGame {
  universeId: number
  placeId?: number

  name: string
  creator: string

  thumbnail?: string

  playing: number
  visits: number
  favorites?: number

  description?: string

  updatedAt?: string
}
