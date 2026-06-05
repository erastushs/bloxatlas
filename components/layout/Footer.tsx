import BrandLogo from '@/components/brand/BrandLogo'
import { siteConfig } from '@/constants/site'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border-default">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <BrandLogo size="sm" />

        <p className="text-sm text-content-subtle">© 2026 {siteConfig.name}</p>
      </div>
    </footer>
  )
}
