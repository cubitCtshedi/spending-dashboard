import { apiClient } from './client'
import {
  mockCustomerProfile,
  mockFilters,
  mockSpendingByCategory,
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

  return apiClient(
    `/api/customers/${CUSTOMER_ID}/spending/categories?${params}`,
    mockSpendingByCategory
  )
}

export function fetchSpendingTrends(months = 12): Promise<SpendingTrends> {
  const data = {
    trends: mockSpendingTrends.trends.slice(-months)
  }
  return apiClient(
    `/api/customers/${CUSTOMER_ID}/spending/trends?months=${months}`,
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
    endDate
  } = filters

  // Apply filtering and sorting on mock data
  let filtered = [...mockTransactions]

  if (category) {
    filtered = filtered.filter((t) => t.category === category)
  }

  if (startDate) {
    filtered = filtered.filter((t) => t.date >= startDate)
  }

  if (endDate) {
    filtered = filtered.filter((t) => t.date <= endDate)
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
