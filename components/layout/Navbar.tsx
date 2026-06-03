import Link from 'next/link'
import Image from 'next/image'
import { navigation } from '@/constants/navigation'
import { siteConfig } from '@/constants/site'

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src={siteConfig.brand.icon} alt="" width={36} height={36} className="rounded-lg" priority />
          <div>
            <p className="text-xl font-bold text-white">{siteConfig.name}</p>
            <p className="text-xs font-medium text-cyan-400">{siteConfig.tagline}</p>
          </div>
        </Link>

        <nav className="flex gap-6 text-sm text-zinc-400">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
