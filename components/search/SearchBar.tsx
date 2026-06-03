'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!query.trim()) return

    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search Roblox games..."
        className="
          min-w-0
          w-full
          rounded-card
          border
          border-border-default
          bg-surface
          px-4
          py-3
          outline-none
          focus:border-brand
        "
      />
      <Button type="submit">Search</Button>
    </form>
  )
}
