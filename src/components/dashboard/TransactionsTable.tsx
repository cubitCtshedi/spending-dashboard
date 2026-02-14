import { useFilters, useTransactions } from '@/hooks/use-spending'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useDashboardStore } from '@/stores/dashboard-store'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Badge } from '../ui/Badge'
import { Card, CardHeader } from '../ui/Card'
import { CategoryIcon } from '../ui/CategoryIcon'
import { Select } from '../ui/Select'
import { Skeleton } from '../ui/Skeleton'

const PAGE_SIZE = 10

const SORT_OPTIONS = [
  { label: 'Date (Newest)', value: 'date_desc' },
  { label: 'Date (Oldest)', value: 'date_asc' },
  { label: 'Amount (High)', value: 'amount_desc' },
  { label: 'Amount (Low)', value: 'amount_asc' }
]

export function TransactionsTable() {
  const {
    selectedCategory,
    setSelectedCategory,
    transactionSort,
    setTransactionSort,
    transactionPage,
    setTransactionPage
  } = useDashboardStore()

  const { data: filtersData } = useFilters()

  const { data, isLoading } = useTransactions({
    limit: PAGE_SIZE,
    offset: transactionPage * PAGE_SIZE,
    category: selectedCategory || undefined,
    sortBy: transactionSort
  })

  const categoryOptions =
    filtersData?.categories.map((c) => ({
      label: c.name,
      value: c.name
    })) ?? []

  const totalPages = data
    ? Math.ceil(data.pagination.total / PAGE_SIZE)
    : 0

  return (
    <Card>
      <CardHeader
        title="Recent Transactions"
        action={
          <div className="flex flex-wrap gap-2">
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="All Categories"
            />
            <Select
              options={SORT_OPTIONS}
              value={transactionSort}
              onChange={(v) => setTransactionSort(v as SortBy)}
            />
          </div>
        }
      />

      {isLoading || !data ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : (
        <>
          {/* Mobile list view */}
          <ul className="space-y-3 lg:hidden">
            {data.transactions.map((txn) => (
              <li
                key={txn.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${txn.categoryColor}20`
                    }}
                  >
                    <CategoryIcon
                      iconName={txn.icon}
                      size={16}
                      style={{ color: txn.categoryColor }}
                    />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {txn.merchant}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(txn.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(txn.amount)}
                  </p>
                  <Badge label={txn.category} color={txn.categoryColor} />
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop table view */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <th className="pb-3 pr-4">Merchant</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Payment</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {data.transactions.map((txn) => (
                  <tr key={txn.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: `${txn.categoryColor}20`
                          }}
                        >
                          <CategoryIcon
                            iconName={txn.icon}
                            size={14}
                            style={{ color: txn.categoryColor }}
                          />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {txn.merchant}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {txn.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        label={txn.category}
                        color={txn.categoryColor}
                      />
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(txn.date)}
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-600 dark:text-gray-400">
                      {txn.paymentMethod}
                    </td>
                    <td className="py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(txn.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {data.pagination.offset + 1}–
                {Math.min(
                  data.pagination.offset + PAGE_SIZE,
                  data.pagination.total
                )}{' '}
                of {data.pagination.total}
              </p>
              <div className="flex gap-1">
                <button
                  disabled={transactionPage === 0}
                  onClick={() =>
                    setTransactionPage(transactionPage - 1)
                  }
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  disabled={!data.pagination.hasMore}
                  onClick={() =>
                    setTransactionPage(transactionPage + 1)
                  }
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-gray-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  )
}
