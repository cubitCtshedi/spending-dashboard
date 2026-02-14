import { PeriodSelector } from '@/components/dashboard/PeriodSelector'
import { TransactionsTable } from '@/components/dashboard/TransactionsTable'

export function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
        <p className="mt-1 text-sm text-gray-500">
          View and filter all your transaction history
        </p>
      </div>
      <PeriodSelector />
      <TransactionsTable />
    </div>
  )
}
