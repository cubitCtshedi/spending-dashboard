import { periodToDateRange } from '@/lib/utils'

import { apiClient } from './client'
import {
  MOCK_REFERENCE_DATE,
  mockCategories,
  mockCustomerProfile,
  mockFilters,
  mockSpendingGoals,
  mockSpendingSummaries,
  mockSpendingTrends,
  mockTransactions
} from './mock-data'

const CUSTOMER_ID = '12345'

export function fetchCustomerProfile(): Promise<CustomerProfile> {
  return apiClient(`/api/customers/${CUSTOMER_ID}/profile`, mockCustomerProfile)
}

export function fetchSpendingSummary(
  period: Period = '30d'
): Promise<SpendingSummary> {
  return apiClient(
    `/api/customers/${CUSTOMER_ID}/spending/summary?period=${period}`,
    mockSpendingSummaries[period] ?? mockSpendingSummaries['30d']
  )
}

export function fetchSpendingByCategory(
  period: Period = '30d',
  startDate?: string,
  endDate?: string
): Promise<SpendingByCategory> {
  const params = new URLSearchParams({ period })
  if (startDate) params.set('startDate', startDate)
  if (endDate) params.set('endDate', endDate)

  // Compute date range from period or custom dates
  const range =
    startDate && endDate
      ? { startDate, endDate }
      : periodToDateRange(period, MOCK_REFERENCE_DATE)

  // Filter transactions within the date range
  const filtered = mockTransactions.filter((t) => {
    const date = t.date.split('T')[0]
    return date >= range.startDate && date <= range.endDate
  })

  // Build category breakdown from filtered transactions
  const categoryMap = new Map<string, { amount: number; count: number }>()
  let totalAmount = 0

  for (const txn of filtered) {
    const existing = categoryMap.get(txn.category) ?? { amount: 0, count: 0 }
    existing.amount += txn.amount
    existing.count += 1
    categoryMap.set(txn.category, existing)
    totalAmount += txn.amount
  }

  const categories = mockCategories
    .filter((c) => categoryMap.has(c.name))
    .map((c) => {
      const data = categoryMap.get(c.name)!
      return {
        ...c,
        amount: Math.round(data.amount * 100) / 100,
        percentage:
          totalAmount > 0
            ? Math.round((data.amount / totalAmount) * 1000) / 10
            : 0,
        transactionCount: data.count
      }
    })
    .sort((a, b) => b.amount - a.amount)

  return apiClient(
    `/api/customers/${CUSTOMER_ID}/spending/categories?${params}`,
    {
      dateRange: range,
      totalAmount: Math.round(totalAmount * 100) / 100,
      categories
    }
  )
}

export function fetchSpendingTrends(
  months = 12,
  period?: Period
): Promise<SpendingTrends> {
  let count = months
  if (period) {
    switch (period) {
      case '7d':
      case '30d':
        count = 1
        break
      case '90d':
        count = 3
        break
      case '1y':
        count = 12
        break
    }
  }

  const data = {
    trends: mockSpendingTrends.trends.slice(-count)
  }
  return apiClient(
    `/api/customers/${CUSTOMER_ID}/spending/trends?months=${count}`,
    data
  )
}

export function fetchTransactions(
  filters: TransactionFilters = {}
): Promise<TransactionsResponse> {
  const {
    limit = 20,
    offset = 0,
    category,
    sortBy = 'date_desc',
    startDate,
    endDate,
    period
  } = filters

  const range =
    startDate && endDate
      ? { startDate, endDate }
      : period
      ? periodToDateRange(period, MOCK_REFERENCE_DATE)
      : null

  let filtered = [...mockTransactions]

  if (category) {
    filtered = filtered.filter((t) => t.category === category)
  }

  if (range) {
    filtered = filtered.filter((t) => {
      const date = t.date.split('T')[0]
      return date >= range.startDate && date <= range.endDate
    })
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'date_asc':
        return a.date.localeCompare(b.date)
      case 'amount_desc':
        return b.amount - a.amount
      case 'amount_asc':
        return a.amount - b.amount
      case 'date_desc':
      default:
        return b.date.localeCompare(a.date)
    }
  })

  const total = filtered.length
  const paginated = filtered.slice(offset, offset + limit)

  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
    sortBy
  })
  if (category) params.set('category', category)
  if (startDate) params.set('startDate', startDate)
  if (endDate) params.set('endDate', endDate)

  return apiClient(`/api/customers/${CUSTOMER_ID}/transactions?${params}`, {
    transactions: paginated,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    }
  })
}

export function fetchSpendingGoals(): Promise<SpendingGoalsResponse> {
  return apiClient(`/api/customers/${CUSTOMER_ID}/goals`, mockSpendingGoals)
}

export function fetchFilters(): Promise<FiltersResponse> {
  return apiClient(`/api/customers/${CUSTOMER_ID}/filters`, mockFilters)
}
