'use client'

import Link from 'next/link'
import BrandLogo from '@/components/brand/BrandLogo'
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
        <nav className="hidden gap-6 text-sm text-content-muted md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-content">
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="text-content md:hidden" aria-label="Open menu">
          ☰
        </button>
      </div>
      {open && (
        <nav className="border-t border-border-default md:hidden">
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
