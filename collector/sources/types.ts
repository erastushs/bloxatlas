import type { CollectedGame } from '../types/game'

export interface GameSource {
  search(query: string): Promise<CollectedGame[]>

  getGame(universeId: number): Promise<CollectedGame | null>
}
