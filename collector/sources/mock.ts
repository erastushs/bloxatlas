import type { GameSource } from './types'

export const mockSource: GameSource = {
  async search() {
    return []
  },

  async getGame() {
    return null
  },
}
