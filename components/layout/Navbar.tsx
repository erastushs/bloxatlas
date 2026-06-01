export default function Navbar() {
  return (
    <header className="border-b border-zinc-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-cyan-500">BloxAtlas</h1>

        <nav className="flex gap-6 text-sm text-zinc-400">
          <a href="/">Home</a>
          <a href="/trending">Trending</a>
          <a href="/search">Search</a>
        </nav>
      </div>
    </header>
  )
}
