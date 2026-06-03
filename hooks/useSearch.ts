'use client'

import { useEffect, useState } from 'react'

export function useSearch(query?: string) {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = query ? `/api/search?q=${query}` : '/api/search'

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games)
        setError(null)
      })
      .catch(() => {
        setError('Failed to search')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [query])

  return { games, isLoading, error }
}
