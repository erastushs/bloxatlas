'use client'

import { useEffect, useState } from 'react'
import type { FastestGrowingGame } from '@/types/game'

type FastestGrowingState = {
  games: FastestGrowingGame[]
  isLoading: boolean
  error: string | null
}

type FastestGrowingResponse = {
  success: boolean
  games: FastestGrowingGame[]
  error?: string
}

export function useFastestGrowing() {
  const [state, setState] = useState<FastestGrowingState>({
    games: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    async function loadFastestGrowingGames() {
      try {
        const response = await fetch('/api/fastest-growing')
        const data = (await response.json()) as FastestGrowingResponse

        if (!response.ok || !data.success) {
          throw new Error(data.error ?? 'Failed to load fastest growing games')
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
            error: error instanceof Error ? error.message : 'Failed to load fastest growing games',
          })
        }
      }
    }

    loadFastestGrowingGames()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
