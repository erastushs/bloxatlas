'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error)

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="type-page-title">Something went wrong</h1>

      <p className="mt-4 text-content-muted">An unexpected error occurred.</p>

      <button onClick={() => reset()} className="mt-6 rounded-control bg-brand px-4 py-2 text-black font-semibold">
        Try Again
      </button>
    </main>
  )
}
