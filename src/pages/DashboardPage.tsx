import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown'
import { PeriodSelector } from '@/components/dashboard/PeriodSelector'
import { SpendingGoals } from '@/components/dashboard/SpendingGoals'
import { SpendingSummaryCards } from '@/components/dashboard/SpendingSummaryCards'
import { SpendingTrends } from '@/components/dashboard/SpendingTrends'
import { TransactionsTable } from '@/components/dashboard/TransactionsTable'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PeriodSelector />
      <SpendingSummaryCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SpendingTrends />
        <CategoryBreakdown />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <SpendingGoals />
        </div>
        <div className="xl:col-span-2">
          <TransactionsTable />
        </div>
      </div>
    </div>
  )
}
