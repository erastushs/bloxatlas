import type { GameSource } from './types'

export const robloxSource: GameSource = {
  async search() {
    throw new Error('Roblox source not implemented')
  },

  async getGame() {
    throw new Error('Roblox source not implemented')
  },
}
