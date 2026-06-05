import Link from 'next/link'
import BrandLogo from '@/components/brand/BrandLogo'
import { siteConfig } from '@/constants/site'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border-default bg-background/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-8 sm:flex-row sm:justify-between">
        <BrandLogo size="sm" />

        <nav className="flex items-center gap-5 text-sm text-content-muted" aria-label="Footer navigation">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="transition hover:text-content">GitHub</a>
          <Link href="/api/docs" className="transition hover:text-content">API Docs</Link>
          <Link href="/developers" className="transition hover:text-content">Developers</Link>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-6">
        <div className="flex flex-col items-center gap-3 border-t border-border-default pt-5 sm:flex-row sm:justify-between">
          <p className="text-xs text-content-subtle">
            © {new Date().getFullYear()} {siteConfig.name}.
          </p>
          <a
            href={siteConfig.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-content-muted transition hover:text-brand"
          >
            Made with
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="animate-heartbeat text-brand">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            by {siteConfig.author.name}
          </a>
        </div>
      </div>
    </footer>
  )
}