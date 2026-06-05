'use client'

import Link from 'next/link'
import BrandLogo from '@/components/brand/BrandLogo'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { navigation } from '@/constants/navigation'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="border-b border-border-default">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" aria-label="BloxAtlas home">
          <BrandLogo priority />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-4 md:gap-6 lg:flex">
          <nav className="flex gap-4 text-sm text-content-muted md:gap-6">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-content">
                {item.name}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="text-content" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border-default lg:hidden">
          <div className="flex flex-col px-4 py-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="py-3 text-content-muted" onClick={() => setOpen(false)}>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
