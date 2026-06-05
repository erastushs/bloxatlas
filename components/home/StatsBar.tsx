'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import AnimatedCounter from '@/components/motion/AnimatedCounter'
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

  const items = stats
    ? [
        { label: 'Indexed Games', value: stats.totalGames, detail: 'tracked across discovery indexes' },
        { label: 'Active Players', value: stats.totalPlayers, detail: 'live audience signal' },
        { label: 'Total Visits', value: stats.totalVisits, detail: 'historical demand footprint' },
      ]
    : []

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats ? (
        items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="premium-panel rounded-card p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase text-content-subtle">{item.label}</p>
              <span className="h-2 w-2 rounded-full bg-positive shadow-[0_0_20px_rgb(52_211_153/.8)]" />
            </div>
            <h2 className="type-section-title mt-3">
              <AnimatedCounter value={item.value} />
            </h2>
            <p className="mt-2 text-sm text-content-muted">{item.detail}</p>
          </motion.div>
        ))
      ) : (
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-card" />
        ))
      )}
    </div>
  )
}
