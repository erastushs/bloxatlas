'use client'

import { useEffect, useState } from 'react'

export function usePopularGames() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch('/api/popular')
      .then((res) => res.json())
      .then((data) => setGames(data.games))
  }, [])

  return { games }
}
