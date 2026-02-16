import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'

import {
  useCustomerProfile,
  useFilters,
  useSpendingCategories,
  useSpendingGoals,
  useSpendingSummary,
  useSpendingTrends,
  useTransactions
} from './use-spending'

/**
 * Create a wrapper component that provides React Query context.
 * Each test gets a FRESH QueryClient so tests don't share cached data.
 * We set retry: false so failed queries don't retry (faster tests).
 */
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 }
    }
  })

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}

describe('useCustomerProfile', () => {
  /**
   * This hook loads the user profile shown in the Header component.
   * It starts loading, then resolves with the profile data.
   */
  it('loads and returns customer profile data', async () => {
    const { result } = renderHook(() => useCustomerProfile(), {
      wrapper: createWrapper()
    })

    // Initially the hook is loading – no data yet
    expect(result.current.isLoading).toBe(true)

    // Wait for the async fetch to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Now we should have the profile data
    expect(result.current.data?.name).toBe('John Doe')
    expect(result.current.data?.customerId).toBe('12345')
    expect(result.current.data?.currency).toBe('ZAR')
  })
})

describe('useSpendingSummary', () => {
  /**
   * The SpendingSummaryCards component calls this hook with the
   * currently selected period.  It drives the "Total Spent",
   * "Transactions", "Average Transaction", and "Top Category" cards.
   */
  it('fetches summary for a given period', async () => {
    const { result } = renderHook(() => useSpendingSummary('30d'), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const data = result.current.data!
    expect(data.period).toBe('30d')
    expect(data.totalSpent).toBe(4250.75)
    expect(data.topCategory).toBe('Groceries')
    expect(data.comparedToPrevious).toBeDefined()
  })

  /**
   * Different periods should return different summary data.
   * This proves the period parameter is actually being passed through.
   */
  it('returns different data for different periods', async () => {
    const { result: weekResult } = renderHook(() => useSpendingSummary('7d'), {
      wrapper: createWrapper()
    })
    const { result: yearResult } = renderHook(() => useSpendingSummary('1y'), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(weekResult.current.isSuccess).toBe(true)
      expect(yearResult.current.isSuccess).toBe(true)
    })

    expect(weekResult.current.data!.totalSpent).not.toBe(
      yearResult.current.data!.totalSpent
    )
  })
})

describe('useSpendingCategories', () => {
  /**
   * The CategoryBreakdown component calls this to get the pie/donut
   * chart data showing spending per category.
   */
  it('returns category breakdown data', async () => {
    const { result } = renderHook(() => useSpendingCategories('30d'), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const data = result.current.data!
    expect(data.categories.length).toBeGreaterThan(0)
    expect(data.totalAmount).toBeGreaterThan(0)
    expect(data.dateRange).toHaveProperty('startDate')
    expect(data.dateRange).toHaveProperty('endDate')
  })
})

describe('useSpendingTrends', () => {
  /**
   * The SpendingTrends component calls this to render the line/bar
   * chart showing monthly spending over time.
   */
  it('returns trend data for the requested number of months', async () => {
    const { result } = renderHook(() => useSpendingTrends(12), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data!.trends).toHaveLength(12)
    expect(result.current.data!.trends[0]).toHaveProperty('month')
    expect(result.current.data!.trends[0]).toHaveProperty('totalSpent')
  })
})

describe('useTransactions', () => {
  /**
   * The TransactionsTable calls this hook with filter/sort/page params.
   * We test the default (no filters) and a filtered case.
   */
  it('returns paginated transactions', async () => {
    const { result } = renderHook(() => useTransactions({}), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const data = result.current.data!
    expect(data.transactions.length).toBeGreaterThan(0)
    expect(data.pagination.total).toBe(20) // 20 mock transactions
  })

  it('filters transactions by category', async () => {
    const { result } = renderHook(
      () => useTransactions({ category: 'Dining' }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const data = result.current.data!
    for (const txn of data.transactions) {
      expect(txn.category).toBe('Dining')
    }
  })
})

describe('useSpendingGoals', () => {
  /**
   * The SpendingGoals component shows budget progress bars.
   * This hook fetches the goal data.
   */
  it('returns spending goals', async () => {
    const { result } = renderHook(() => useSpendingGoals(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const goals = result.current.data!.goals
    expect(goals.length).toBeGreaterThan(0)
    expect(goals[0]).toHaveProperty('category')
    expect(goals[0]).toHaveProperty('monthlyBudget')
    expect(goals[0]).toHaveProperty('status')
  })
})

describe('useFilters', () => {
  /**
   * The PeriodSelector uses this to know what filter buttons to show.
   * It provides the list of categories and date range presets.
   */
  it('returns available filter options', async () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const data = result.current.data!
    expect(data.categories.length).toBeGreaterThan(0)
    expect(data.dateRangePresets).toHaveLength(4)
    expect(data.dateRangePresets.map((p) => p.value)).toEqual([
      '7d',
      '30d',
      '90d',
      '1y'
    ])
  })
})
