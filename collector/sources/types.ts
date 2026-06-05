import type { CollectedGame } from '../types/game'

export interface GameSource {
  search(query: string): Promise<CollectedGame[]>
  getGame(universeId: number): Promise<CollectedGame | null>
}

export interface MultiSourceConfig {
  name: string
  fetchGameIds: (limit?: number) => Promise<number[]>
  fetchGameStats: (ids: number[]) => Promise<Record<string, unknown>[]>
}

export interface RobloxSearchResult {
  universeId: number
}

export interface RobloxGameStats {
  id: number
  rootPlaceId: number

  name: string
  description: string

  playing: number
  visits: number

  favoritedCount: number

  creator?: {
    name: string
  }
}

export interface RobloxThumbnail {
  targetId: number
  imageUrl: string
}