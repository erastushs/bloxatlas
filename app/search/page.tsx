'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import SearchBar from '@/components/search/SearchBar'
import GameCard from '@/components/cards/GameCard'
import { useSearch } from '@/hooks/useSearch'
import Container from '@/components/ui/Container'
import type { Game } from '@/types/game'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'playing', label: 'Most Active' },
  { value: 'visits', label: 'Most Visited' },
  { value: 'name', label: 'Name A-Z' },
]

const GENRE_OPTIONS = [
  { value: '', label: 'All Genres' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'fighting', label: 'Fighting' },
  { value: 'fps', label: 'FPS' },
  { value: 'horror', label: 'Horror' },
  { value: 'obby', label: 'Obby' },
  { value: 'roleplay', label: 'Roleplay' },
  { value: 'simulator', label: 'Simulator' },
  { value: 'tycoon', label: 'Tycoon' },
]

export default function SearchPage() {
  const params = useSearchParams()
  const router = useRouter()
  const query = params.get('q') || ''
  const urlSort = params.get('sort') || 'relevance'
  const urlGenre = params.get('genre') || ''
  const urlPage = Number(params.get('page')) || 1

  const [sort, setSort] = useState(urlSort)
  const [genre, setGenre] = useState(urlGenre)
  const [page, setPage] = useState(urlPage)

  const { games, total, hasMore, isLoading, error } = useSearch(query, sort, genre, page)

  const updateParams = useCallback((updates: Record<string, string>) => {
    const p = new URLSearchParams(window.location.search)
    Object.entries(updates).forEach(([k, v]) => {
      if (v) p.set(k, v)
      else p.delete(k)
    })
    router.push(`/search?${p.toString()}`)
  }, [router])

  const handleSortChange = (value: string) => {
    setSort(value)
    setPage(1)
    updateParams({ sort: value, page: '1' })
  }

  const handleGenreChange = (value: string) => {
    setGenre(value)
    setPage(1)
    updateParams({ genre: value, page: '1' })
  }

  const handleNextPage = () => {
    const next = page + 1
    setPage(next)
    updateParams({ page: String(next) })
  }

  const handlePrevPage = () => {
    const prev = Math.max(1, page - 1)
    setPage(prev)
    updateParams({ page: String(prev) })
  }

  return (
    <Container as="main" className="py-6">
      <div className="mb-8">
        <SearchBar />
      </div>

      {!query ? (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">Search BloxAtlas</h2>
          <p className="mt-2 text-content-muted">Enter a game name to find Roblox games.</p>
        </div>
      ) : isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-card border border-border-default bg-surface p-4">
              <div className="aspect-video rounded-md bg-surface-muted" />
              <div className="mt-3 h-4 w-3/4 rounded bg-surface-muted" />
              <div className="mt-2 h-3 w-1/2 rounded bg-surface-muted" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
          <h2 className="type-card-title">Search failed</h2>
          <p className="mt-2 text-content-muted">{error}</p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-content-muted">
              {total} result{total !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>

            <div className="flex flex-wrap gap-3">
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="rounded-control border border-border-default bg-surface px-3 py-2 text-sm text-content outline-none focus:border-brand"
                aria-label="Sort by"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <select
                value={genre}
                onChange={(e) => handleGenreChange(e.target.value)}
                className="rounded-control border border-border-default bg-surface px-3 py-2 text-sm text-content outline-none focus:border-brand"
                aria-label="Filter by genre"
              >
                {GENRE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {games.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {games.map((game: Game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    creator={game.creator}
                    playing={game.playing}
                    thumbnail={game.thumbnail}
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page <= 1}
                  className="rounded-control border border-border-default bg-surface px-4 py-2 text-sm text-content-muted transition hover:text-content disabled:opacity-30"
                >
                  Previous
                </button>
                <span className="text-sm text-content-muted">Page {page}</span>
                <button
                  onClick={handleNextPage}
                  disabled={!hasMore}
                  className="rounded-control border border-border-default bg-surface px-4 py-2 text-sm text-content-muted transition hover:text-content disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="rounded-card border border-border-default bg-surface shadow-card p-10 text-center">
              <h2 className="type-card-title">No games found</h2>
              <p className="mt-2 text-content-muted">Try another search keyword or adjust your filters.</p>
            </div>
          )}
        </>
      )}
    </Container>
  )
}