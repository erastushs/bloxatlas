'use client'

import { useEffect, useState } from 'react'
import type { TrendingGame } from '@/types/game'

type TrendingGamesState = {
  games: TrendingGame[]
  isLoading: boolean
  error: string | null
}

type TrendingGamesResponse = {
  success: boolean
  games: TrendingGame[]
  error?: string
}

export function useTrending() {
  const [state, setState] = useState<TrendingGamesState>({
    games: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    async function loadTrendingGames() {
      try {
        const response = await fetch('/api/trending')
        const data = (await response.json()) as TrendingGamesResponse

        if (!response.ok || !data.success) {
          throw new Error(data.error ?? 'Failed to load trending games')
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
            error: error instanceof Error ? error.message : 'Failed to load trending games',
          })
        }
      }
    }

    loadTrendingGames()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
