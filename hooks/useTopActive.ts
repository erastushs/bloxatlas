'use client'

import { useEffect, useState } from 'react'
import type { TopActiveGame } from '@/types/game'

type TopActiveState = {
  games: TopActiveGame[]
  isLoading: boolean
  error: string | null
}

type TopActiveResponse = {
  success: boolean
  games: TopActiveGame[]
  error?: string
}

export function useTopActive() {
  const [state, setState] = useState<TopActiveState>({
    games: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    async function loadTopActiveGames() {
      try {
        const response = await fetch('/api/top-active')
        const data = (await response.json()) as TopActiveResponse

        if (!response.ok || !data.success) {
          throw new Error(data.error ?? 'Failed to load top active games')
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
            error: error instanceof Error ? error.message : 'Failed to load top active games',
          })
        }
      }
    }

    loadTopActiveGames()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
