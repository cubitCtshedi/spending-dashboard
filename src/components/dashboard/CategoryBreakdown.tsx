import { useSpendingCategories } from '@/hooks/use-spending'
import { formatCurrency } from '@/lib/utils'
import { useDashboardStore } from '@/stores/dashboard-store'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { Card, CardHeader } from '../ui/Card'
import { CategoryIcon } from '../ui/CategoryIcon'
import { Skeleton } from '../ui/Skeleton'

export function CategoryBreakdown() {
  const { selectedPeriod, customStartDate, customEndDate } =
    useDashboardStore()
  const { data, isLoading } = useSpendingCategories(
    selectedPeriod,
    customStartDate || undefined,
    customEndDate || undefined
  )

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader title="Spending by Category" />
        <Skeleton className="mx-auto h-52 w-52 rounded-full" />
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title="Spending by Category"
        subtitle={`${data.dateRange.startDate} — ${data.dateRange.endDate}`}
      />

      <div className="flex flex-col items-center gap-6 lg:flex-row">
        {/* Donut chart */}
        <div className="h-56 w-56 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.categories}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
                strokeWidth={0}
              >
                {data.categories.map((cat) => (
                  <Cell key={cat.name} fill={cat.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, #fff)',
                  borderColor: 'var(--tooltip-border, #e5e7eb)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category list */}
        <ul className="w-full space-y-3">
          {data.categories.map((cat) => (
            <li
              key={cat.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  <CategoryIcon
                    iconName={cat.icon}
                    size={16}
                    style={{ color: cat.color }}
                  />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {cat.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cat.transactionCount} transactions
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(cat.amount)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {cat.percentage}%
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
