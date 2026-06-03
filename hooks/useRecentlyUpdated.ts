'use client'

import { useEffect, useState } from 'react'
import type { RecentlyUpdatedGame } from '@/types/game'

type RecentlyUpdatedState = {
  games: RecentlyUpdatedGame[]
  isLoading: boolean
  error: string | null
}

type RecentlyUpdatedResponse = {
  success: boolean
  games: RecentlyUpdatedGame[]
  error?: string
}

export function useRecentlyUpdated() {
  const [state, setState] = useState<RecentlyUpdatedState>({
    games: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    async function loadRecentlyUpdatedGames() {
      try {
        const response = await fetch('/api/recently-updated')
        const data = (await response.json()) as RecentlyUpdatedResponse

        if (!response.ok || !data.success) {
          throw new Error(data.error ?? 'Failed to load recently updated games')
        }

        if (isMounted) {
          setState({
            games: data.games,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        if (isMounted) {
          setState({
            games: [],
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to load recently updated games',
          })
        }
      }
    }

    loadRecentlyUpdatedGames()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
