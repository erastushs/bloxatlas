type Props = {
  title: string
  value: string
  tone?: 'brand' | 'positive' | 'neutral'
}

const tones = {
  brand: 'from-brand/20 to-accent/10 text-brand',
  positive: 'from-positive/20 to-brand/10 text-positive',
  neutral: 'from-content/10 to-surface-muted text-content',
}

export default function StatCard({ title, value, tone = 'brand' }: Props) {
  return (
    <div className="premium-panel rounded-card p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase text-content-subtle">{title}</p>
        <span className={`h-9 w-9 rounded-control bg-gradient-to-br ${tones[tone]}`} />
      </div>

      <h2 className="mt-4 truncate text-2xl font-bold">{value}</h2>
    </div>
  )
}
