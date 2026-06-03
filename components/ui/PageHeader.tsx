import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  description?: ReactNode
}

export default function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="mb-8">
      <p className="type-label text-brand">{eyebrow}</p>
      <h1 className="type-page-title mt-2">{title}</h1>
      {description ? <p className="mt-3 max-w-2xl text-content-muted">{description}</p> : null}
    </section>
  )
}
