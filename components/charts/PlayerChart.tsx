'use client'

import { useTheme } from 'next-themes'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type Props = {
  data: {
    playing: number
    label: string
  }[]
}

export default function PlayerChart({ data }: Props) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

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
          <CartesianGrid stroke={isDark ? 'rgb(148 163 184 / 0.12)' : 'rgb(148 163 184 / 0.2)'} vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: isDark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />

          <YAxis width={68} tick={{ fontSize: 12, fill: isDark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? 'rgb(14 20 36 / 0.96)' : 'rgb(255 255 255 / 0.96)',
              border: isDark ? '1px solid rgb(148 163 184 / 0.18)' : '1px solid rgb(203 213 225 / 0.8)',
              borderRadius: 14,
              boxShadow: isDark ? '0 18px 50px rgb(0 0 0 / 0.35)' : '0 12px 40px rgb(15 23 42 / 0.12)',
            }}
            labelStyle={{ color: isDark ? '#f8fbff' : '#090f1f' }}
            itemStyle={{ color: '#22d3ee' }}
          />

          <Area type="monotone" dataKey="playing" stroke="#22d3ee" strokeWidth={3} fill="url(#playersGradient)" dot={false} activeDot={{ r: 5 }} animationDuration={700} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
