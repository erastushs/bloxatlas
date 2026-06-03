type Props = {
  title: string
  value: string
}

export default function StatCard({ title, value }: Props) {
  return (
    <div className="rounded-card border border-border-default bg-surface shadow-card p-4">
      <p className="text-sm text-content-muted">{title}</p>

      <h2 className="mt-2 text-2xl font-bold">{value}</h2>
    </div>
  )
}
