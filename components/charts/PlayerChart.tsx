'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

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
        <AreaChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="playersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgb(148 163 184 / 0.12)" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />

          <YAxis width={68} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(14 20 36 / 0.96)',
              border: '1px solid rgb(148 163 184 / 0.18)',
              borderRadius: 14,
              boxShadow: '0 18px 50px rgb(0 0 0 / 0.35)',
            }}
            labelStyle={{ color: '#f8fbff' }}
            itemStyle={{ color: '#22d3ee' }}
          />

          <Area type="monotone" dataKey="playing" stroke="#22d3ee" strokeWidth={3} fill="url(#playersGradient)" dot={false} activeDot={{ r: 5 }} animationDuration={700} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
