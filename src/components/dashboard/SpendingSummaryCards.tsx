import { useSpendingSummary } from '@/hooks/use-spending'
import { cn, formatCurrency, formatPercentageChange } from '@/lib/utils'
import { useDashboardStore } from '@/stores/dashboard-store'
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  ShoppingCart,
  TrendingUp
} from 'lucide-react'

import { Card } from '../ui/Card'
import { CardSkeleton } from '../ui/Skeleton'

export function SpendingSummaryCards() {
  const period = useDashboardStore((s) => s.selectedPeriod)
  const { data, isLoading } = useSpendingSummary(period)

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: 'Total Spent',
      value: formatCurrency(data.totalSpent),
      change: data.comparedToPrevious.spentChange,
      icon: DollarSign,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Transactions',
      value: data.transactionCount.toString(),
      change: data.comparedToPrevious.transactionChange,
      icon: CreditCard,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Average Transaction',
      value: formatCurrency(data.averageTransaction),
      change: null,
      icon: TrendingUp,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Top Category',
      value: data.topCategory,
      change: null,
      icon: ShoppingCart,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="flex items-start gap-4">
          <div className={cn('rounded-lg p-2.5', card.iconBg)}>
            <card.icon className={cn('h-5 w-5', card.iconColor)} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="mt-1 truncate text-xl font-bold text-gray-900">
              {card.value}
            </p>
            {card.change !== null && (
              <div className="mt-1 flex items-center gap-1">
                {card.change >= 0 ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-emerald-500" />
                )}
                <span
                  className={cn(
                    'text-xs font-medium',
                    card.change >= 0
                      ? 'text-red-500'
                      : 'text-emerald-500'
                  )}
                >
                  {formatPercentageChange(card.change)} vs prev
                </span>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
