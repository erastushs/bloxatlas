'use client'

import { useEffect, useState } from 'react'

export default function StatsBar() {
  const [stats, setStats] = useState({
    totalGames: 0,
    totalPlayers: 0,
    totalVisits: 0,
  })

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data.stats))
  }, [])

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
        <p className="text-content-muted">Indexed Games</p>

        <h2 className="mt-2 text-3xl font-bold">{stats.totalGames}</h2>
      </div>

      <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
        <p className="text-content-muted">Active Players</p>

        <h2 className="mt-2 text-3xl font-bold">{stats.totalPlayers.toLocaleString()}</h2>
      </div>

      <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
        <p className="text-content-muted">Total Visits</p>

        <h2 className="mt-2 text-3xl font-bold">{stats.totalVisits.toLocaleString()}</h2>
      </div>
    </div>
  )
}
