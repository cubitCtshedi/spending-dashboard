import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown'
import { PeriodSelector } from '@/components/dashboard/PeriodSelector'
import { SpendingSummaryCards } from '@/components/dashboard/SpendingSummaryCards'
import { SpendingTrends } from '@/components/dashboard/SpendingTrends'

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="mt-1 text-sm text-gray-500">
          Detailed spending analysis and trends
        </p>
      </div>
      <PeriodSelector />
      <SpendingSummaryCards />
      <SpendingTrends />
      <CategoryBreakdown />
    </div>
  )
}
