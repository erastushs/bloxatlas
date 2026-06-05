'use client'

import { useEffect, useState } from 'react'

export function useSearch(query?: string) {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const url = query ? `/api/search?q=${query}` : '/api/search'

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games)
        setError(null)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Failed to search')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [query])

  return { games, isLoading, error }
}