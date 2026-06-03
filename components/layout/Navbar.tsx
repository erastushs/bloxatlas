import Link from 'next/link'
export default function Navbar() {
  return (
    <header className="border-b border-zinc-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-cyan-500">BloxAtlas</h1>

        <nav className="flex gap-6 text-sm text-zinc-400">
          <Link href="/">Home</Link>
          <Link href="/trending">Trending</Link>
          <Link href="/fastest-growing">Growth</Link>
          <Link href="/top-active">Active</Link>
          <Link href="/search">Search</Link>
        </nav>
      </div>
    </header>
  )
}
