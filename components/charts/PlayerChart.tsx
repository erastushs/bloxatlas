'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type Props = {
  data: {
    playing: number
    label: string
  }[]
}

export default function PlayerChart({ data }: Props) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />

          <YAxis width={60} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
            }}
          />

          <Line type="monotone" dataKey="playing" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
