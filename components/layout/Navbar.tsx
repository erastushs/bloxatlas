import Link from 'next/link'
import BrandLogo from '@/components/brand/BrandLogo'
import { navigation } from '@/constants/navigation'

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="BloxAtlas home">
          <BrandLogo priority />
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
