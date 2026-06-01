'use client'

import { useEffect, useState } from 'react'

export function useSearch(query?: string) {
  const [games, setGames] = useState([])

  useEffect(() => {
    const url = query ? `/api/search?q=${query}` : '/api/search'

    fetch(url)
      .then((res) => res.json())
      .then((data) => setGames(data.games))
  }, [query])

  return { games }
}
