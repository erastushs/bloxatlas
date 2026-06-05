'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { navigation } from '@/constants/navigation'

const quickSearches = ['Brookhaven', 'Blox Fruits', 'Dress to Impress', 'Adopt Me', 'Anime Vanguards']

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      }

      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const actions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return navigation.filter((item) => item.name.toLowerCase().includes(normalized))
  }, [query])

  const runSearch = (term: string) => {
    const trimmed = term.trim()
    if (!trimmed) return
    setOpen(false)
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const openRoute = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden min-h-10 items-center gap-3 rounded-control border border-border-default bg-surface/70 px-3 text-sm text-content-muted shadow-card backdrop-blur transition hover:border-border-strong hover:text-content lg:inline-flex"
        aria-label="Open command palette"
      >
        <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_18px_rgb(34_211_238/.8)]" />
        <span>Search or jump</span>
        <kbd className="rounded-md border border-border-default bg-background-elevated px-1.5 py-0.5 text-xs text-content-subtle">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] bg-background/70 px-4 py-20 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="mx-auto max-w-xl overflow-hidden rounded-[20px] border border-border-default bg-background-elevated/95 shadow-card"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="border-b border-border-default p-4">
                <label className="sr-only" htmlFor="command-search">Search commands</label>
                <input
                  id="command-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  autoFocus
                  placeholder="Search games, rankings, genres..."
                  className="w-full bg-transparent text-lg text-content outline-none placeholder:text-content-subtle"
                />
              </div>

              <div className="max-h-[420px] overflow-y-auto p-2">
                {query.trim() ? (
                  <button
                    type="button"
                    onClick={() => runSearch(query)}
                    className="flex w-full items-center justify-between rounded-control px-3 py-3 text-left text-sm text-content transition hover:bg-surface-muted"
                  >
                    <span>Search Roblox games for &ldquo;{query}&rdquo;</span>
                    <span className="text-content-subtle">Enter</span>
                  </button>
                ) : null}

                <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase text-content-subtle">Quick routes</p>
                {actions.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => openRoute(item.href)}
                    className="flex w-full items-center justify-between rounded-control px-3 py-3 text-left text-sm text-content-muted transition hover:bg-surface-muted hover:text-content"
                  >
                    <span>{item.name}</span>
                    <span className="text-content-subtle">{item.href}</span>
                  </button>
                ))}

                {!query.trim() ? (
                  <>
                    <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase text-content-subtle">Popular searches</p>
                    {quickSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => runSearch(term)}
                        className="w-full rounded-control px-3 py-3 text-left text-sm text-content-muted transition hover:bg-surface-muted hover:text-content"
                      >
                        {term}
                      </button>
                    ))}
                  </>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
