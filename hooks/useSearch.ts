'use client'

import { useEffect, useState } from 'react'

export function useSearch(query?: string, sort?: string, genre?: string, page = 1) {
  const [games, setGames] = useState([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (sort) params.set('sort', sort)
    if (genre) params.set('genre', genre)
    params.set('page', String(page))

    const url = `/api/search?${params.toString()}`

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games)
        setTotal(data.total)
        setHasMore(data.hasMore)
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
  }, [query, sort, genre, page])

  return { games, total, hasMore, isLoading, error }
}