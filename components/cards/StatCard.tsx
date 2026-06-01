type Props = {
  title: string
  value: string
}

export default function StatCard({ title, value }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className="mt-2 text-2xl font-bold">{value}</h2>
    </div>
  )
}
