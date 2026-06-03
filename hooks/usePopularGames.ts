'use client'

import { useEffect, useState } from 'react'
import type { PopularGame } from '@/types/game'

type PopularGamesState = {
  games: PopularGame[]
  isLoading: boolean
  error: string | null
}

type PopularGamesResponse = {
  success: boolean
  games: PopularGame[]
  error?: string
}

export function usePopularGames() {
  const [state, setState] = useState<PopularGamesState>({
    games: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    async function loadPopularGames() {
      try {
        const response = await fetch('/api/popular')
        const data = (await response.json()) as PopularGamesResponse

        if (!response.ok || !data.success) {
          throw new Error(data.error ?? 'Failed to load popular games')
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
            error: error instanceof Error ? error.message : 'Failed to load popular games',
          })
        }
      }
    }

    loadPopularGames()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
