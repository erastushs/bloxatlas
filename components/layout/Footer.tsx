import BrandLogo from '@/components/brand/BrandLogo'
import { siteConfig } from '@/constants/site'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <BrandLogo size="sm" />

        <p className="text-sm text-zinc-500">© 2026 {siteConfig.name}</p>
      </div>
    </footer>
  )
}
