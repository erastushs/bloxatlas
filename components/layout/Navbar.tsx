'use client'

import Link from 'next/link'
import BrandLogo from '@/components/brand/BrandLogo'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import CommandPalette from '@/components/layout/CommandPalette'
import { navigation } from '@/constants/navigation'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-background/72 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" aria-label="BloxAtlas home" className="rounded-control transition hover:scale-[1.02]">
          <BrandLogo priority />
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <nav className="flex rounded-control border border-border-default bg-surface/55 p-1 text-sm text-content-muted shadow-card backdrop-blur">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[10px] px-3 py-2 transition hover:bg-surface-muted hover:text-content"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <CommandPalette />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-border-default bg-surface/70 text-content shadow-card transition hover:border-brand/70"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border-default bg-background-elevated/95 lg:hidden">
          <div className="grid gap-1 px-4 py-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-control px-3 py-3 text-content-muted transition hover:bg-surface-muted hover:text-content"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
