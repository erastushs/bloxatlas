import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="type-page-title">Page Not Found</h1>

      <p className="mt-4 text-content-muted">The page you requested does not exist.</p>

      <Link href="/" className="mt-6 rounded-control bg-brand px-4 py-2 text-black font-semibold">
        Back Home
      </Link>
    </main>
  )
}
