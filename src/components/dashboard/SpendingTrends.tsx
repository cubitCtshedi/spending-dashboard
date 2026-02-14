import { useSpendingTrends } from '@/hooks/use-spending'
import { formatCurrency, formatMonth } from '@/lib/utils'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { Card, CardHeader } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'

export function SpendingTrends() {
  const { data, isLoading } = useSpendingTrends(12)

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader title="Monthly Spending Trends" />
        <Skeleton className="h-64 w-full" />
      </Card>
    )
  }

  const chartData = data.trends.map((t) => ({
    ...t,
    label: formatMonth(t.month)
  }))

  return (
    <Card>
      <CardHeader title="Monthly Spending Trends" subtitle="Last 12 months" />
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `R${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value)),
                'Spent'
              ]}
              labelStyle={{ fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="totalSpent"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#spendGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
