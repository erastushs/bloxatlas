'use client'

import { useEffect, useState } from 'react'
import Skeleton from '@/components/ui/Skeleton'

type Stats = {
  totalGames: number
  totalPlayers: number
  totalVisits: number
}

export default function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data.stats))
      .catch(() => setError(true))
  }, [])

  if (error) {
    return null
  }

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats ? (
        <>
          <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
            <p className="text-content-muted">Indexed Games</p>
            <h2 className="type-section-title mt-2">{stats.totalGames.toLocaleString()}</h2>
          </div>
          <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
            <p className="text-content-muted">Active Players</p>
            <h2 className="type-section-title mt-2">{stats.totalPlayers.toLocaleString()}</h2>
          </div>
          <div className="rounded-card border border-border-default bg-surface shadow-card p-6">
            <p className="text-content-muted">Total Visits</p>
            <h2 className="type-section-title mt-2">{stats.totalVisits.toLocaleString()}</h2>
          </div>
        </>
      ) : (
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-card" />
        ))
      )}
    </div>
  )
}