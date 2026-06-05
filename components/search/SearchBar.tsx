'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useCallback } from 'react'
import Button from '@/components/ui/Button'

const HISTORY_KEY = 'bloxatlas_search_history'
const MAX_HISTORY = 8

function loadHistory(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveHistory(term: string): string[] {
  const history = loadHistory().filter((h) => h !== term)
  history.unshift(term)
  const trimmed = history.slice(0, MAX_HISTORY)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed))
  return trimmed
}

type Suggestion = { id: number; name: string }

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState<string[]>(() => loadHistory())
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([])
      return
    }
    try {
      const controller = new AbortController()
      const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}`, { signal: controller.signal })
      const data = await res.json()
      setSuggestions(data.suggestions ?? [])
    } catch {
      // aborted or failed
    }
  }, [])

  const handleChange = (value: string) => {
    setQuery(value)
    setShowDropdown(true)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 150)
  }

  const search = (term: string) => {
    const trimmed = term.trim()
    if (!trimmed) return
    setHistory(saveHistory(trimmed))
    setShowDropdown(false)
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    search(query)
  }

  const handleSelectSuggestion = (name: string) => {
    setQuery(name)
    setShowDropdown(false)
    inputRef.current?.focus()
  }

  const handleClearQuery = () => {
    setQuery('')
    setSuggestions([])
    setShowDropdown(false)
  }

  const handleFocus = () => {
    setShowDropdown(true)
    if (query.length < 2) setSuggestions([])
  }

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200)
  }

  const filteredHistory = history.filter((h) =>
    query ? h.toLowerCase().includes(query.toLowerCase()) : true,
  )

  const showSuggestions = suggestions.length > 0
  const showHistory = !showSuggestions && filteredHistory.length > 0

  return (
    <div className="relative mx-auto mt-8 max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            placeholder="Search Roblox games..."
            aria-label="Search Roblox games"
            autoComplete="off"
            className="
              min-w-0 w-full rounded-card border border-border-default bg-surface px-4 py-3
              outline-none focus:border-brand
            "
          />
          {query && (
            <button
              type="button"
              onClick={handleClearQuery}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-content-subtle hover:text-content"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <Button type="submit">Search</Button>
      </form>

      {showDropdown && (showSuggestions || showHistory) && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-card border border-border-default bg-surface shadow-card">
          {showSuggestions && (
            <div className="py-2">
              <p className="px-4 py-1 text-xs text-content-subtle uppercase tracking-wide">Suggestions</p>
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelectSuggestion(s.name)}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-content-muted hover:bg-surface-muted transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span className="truncate">
                    {s.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {showHistory && !showSuggestions && (
            <div className="py-2">
              <div className="flex items-center justify-between px-4 py-1">
                <p className="text-xs text-content-subtle uppercase tracking-wide">Recent Searches</p>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    localStorage.removeItem(HISTORY_KEY)
                    setHistory([])
                  }}
                  className="text-xs text-content-subtle hover:text-content"
                >
                  Clear All
                </button>
              </div>
              {filteredHistory.map((term) => (
                <button
                  key={term}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setQuery(term)
                    search(term)
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-content-muted hover:bg-surface-muted transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span className="truncate">{term}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}