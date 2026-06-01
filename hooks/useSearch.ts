import { useEffect, useState } from 'react'

export function useSearch() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch('/api/search')
      .then((res) => res.json())
      .then((data) => setGames(data.games))
  }, [])

  return { games }
}
