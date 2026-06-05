import Link from 'next/link'
import BrandLogo from '@/components/brand/BrandLogo'
import { siteConfig } from '@/constants/site'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border-default bg-background/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <BrandLogo size="sm" />
          <p className="text-sm text-content-subtle">© 2026 {siteConfig.name}. Roblox analytics and discovery intelligence.</p>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm text-content-muted" aria-label="Footer navigation">
          <Link href="/developers" className="transition hover:text-content">
            Developers
          </Link>
          <Link href="/api/docs" className="transition hover:text-content">
            API Docs
          </Link>
          <Link href="/search" className="transition hover:text-content">
            Search
          </Link>
        </nav>
      </div>
    </footer>
  )
}
