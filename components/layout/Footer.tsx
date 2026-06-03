import Image from 'next/image'
import { siteConfig } from '@/constants/site'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src={siteConfig.brand.icon} alt="" width={32} height={32} className="rounded-md" />
          <div>
            <p className="text-sm font-semibold text-zinc-300">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-zinc-600">{siteConfig.tagline}</p>
          </div>
        </div>

        <p className="text-sm text-zinc-500">© 2026 {siteConfig.name}</p>
      </div>
    </footer>
  )
}
