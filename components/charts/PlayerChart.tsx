'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type Props = {
  data: {
    playing: number
    created_at: string
  }[]
}

export default function PlayerChart({ data }: Props) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="created_at" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="playing" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
