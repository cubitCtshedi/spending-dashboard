import { describe, expect, it } from 'vitest'

import {
  fetchCustomerProfile,
  fetchFilters,
  fetchSpendingByCategory,
  fetchSpendingGoals,
  fetchSpendingSummary,
  fetchSpendingTrends,
  fetchTransactions
} from './endpoints'

describe('fetchCustomerProfile', () => {
  /**
   * Simplest endpoint – no parameters, just returns profile data.
   * We check the shape and key fields to make sure the mock data
   * is structured correctly.
   */
  it('returns the customer profile with expected fields', async () => {
    const profile = await fetchCustomerProfile()

    expect(profile).toHaveProperty('customerId', '12345')
    expect(profile).toHaveProperty('name', 'John Doe')
    expect(profile).toHaveProperty('email')
    expect(profile).toHaveProperty('currency', 'ZAR')
    expect(profile).toHaveProperty('accountType')
  })
})

describe('fetchSpendingSummary', () => {
  /**
   * The spending summary changes based on the period.
   * We test the default (30d) and verify the shape of the response.
   */
  it('returns summary for the default 30d period', async () => {
    const summary = await fetchSpendingSummary('30d')

    expect(summary.period).toBe('30d')
    expect(summary.totalSpent).toBe(4250.75)
    expect(summary.transactionCount).toBe(47)
    expect(summary).toHaveProperty('averageTransaction')
    expect(summary).toHaveProperty('topCategory')
    expect(summary).toHaveProperty('comparedToPrevious')
  })

  /**
   * Each period should return different data – this proves the
   * endpoint actually uses the period parameter and doesn't just
   * return the same data every time.
   */
  it('returns different data for different periods', async () => {
    const week = await fetchSpendingSummary('7d')
    const year = await fetchSpendingSummary('1y')

    expect(week.totalSpent).not.toBe(year.totalSpent)
    expect(week.period).toBe('7d')
    expect(year.period).toBe('1y')
  })

  /**
   * The "comparedToPrevious" object drives the up/down arrows on
   * the summary cards.  We need it to always be present.
   */
  it('includes comparison data', async () => {
    const summary = await fetchSpendingSummary('30d')

    expect(summary.comparedToPrevious).toHaveProperty('spentChange')
    expect(summary.comparedToPrevious).toHaveProperty('transactionChange')
    expect(typeof summary.comparedToPrevious.spentChange).toBe('number')
  })
})

describe('fetchSpendingByCategory', () => {
  /**
   * This endpoint does real computation: it filters mock transactions
   * by date range, groups them by category, and calculates percentages.
   * We verify the output shape and that percentages add up reasonably.
   */
  it('returns categories with amounts and percentages', async () => {
    const result = await fetchSpendingByCategory('30d')

    expect(result).toHaveProperty('dateRange')
    expect(result).toHaveProperty('totalAmount')
    expect(result).toHaveProperty('categories')
    expect(Array.isArray(result.categories)).toBe(true)

    // Each category should have the required fields
    for (const cat of result.categories) {
      expect(cat).toHaveProperty('name')
      expect(cat).toHaveProperty('amount')
      expect(cat).toHaveProperty('percentage')
      expect(cat).toHaveProperty('transactionCount')
      expect(cat.amount).toBeGreaterThan(0)
    }
  })

  /**
   * Percentages should roughly add up to 100%.  "Roughly" because
   * of floating-point rounding (each is rounded to 1 decimal).
   */
  it('category percentages approximately sum to 100', async () => {
    const result = await fetchSpendingByCategory('30d')

    const totalPercentage = result.categories.reduce(
      (sum, cat) => sum + cat.percentage,
      0
    )

    // Allow for rounding: should be between 99 and 101
    expect(totalPercentage).toBeGreaterThan(98)
    expect(totalPercentage).toBeLessThan(102)
  })

  /**
   * Categories should come sorted by amount descending – the
   * highest-spending category first.  This order drives the
   * CategoryBreakdown chart display.
   */
  it('returns categories sorted by amount descending', async () => {
    const result = await fetchSpendingByCategory('30d')

    for (let i = 1; i < result.categories.length; i++) {
      expect(result.categories[i - 1].amount).toBeGreaterThanOrEqual(
        result.categories[i].amount
      )
    }
  })

  /**
   * When custom date range is provided, it should use those dates
   * instead of computing from the period.
   */
  it('respects custom date range parameters', async () => {
    const result = await fetchSpendingByCategory(
      '30d',
      '2024-09-10',
      '2024-09-16'
    )

    expect(result.dateRange.startDate).toBe('2024-09-10')
    expect(result.dateRange.endDate).toBe('2024-09-16')
    // Fewer transactions in a shorter range
    expect(result.totalAmount).toBeGreaterThan(0)
  })
})

describe('fetchSpendingTrends', () => {
  /**
   * By default, fetch 12 months of trend data.  Each month should
   * have spending totals and transaction counts.
   */
  it('returns 12 months of trends by default', async () => {
    const result = await fetchSpendingTrends(12)

    expect(result.trends).toHaveLength(12)
    expect(result.trends[0]).toHaveProperty('month')
    expect(result.trends[0]).toHaveProperty('totalSpent')
    expect(result.trends[0]).toHaveProperty('transactionCount')
    expect(result.trends[0]).toHaveProperty('averageTransaction')
  })

  /**
   * When a period is passed, the function maps it to a month count:
   *   '7d' or '30d' → 1 month, '90d' → 3 months, '1y' → 12 months.
   * This tests that mapping.
   */
  it('slices trends based on period parameter', async () => {
    const monthly = await fetchSpendingTrends(12, '30d')
    const quarterly = await fetchSpendingTrends(12, '90d')

    expect(monthly.trends).toHaveLength(1)
    expect(quarterly.trends).toHaveLength(3)
  })

  /**
   * Each trend entry's month should be a valid YYYY-MM string.
   */
  it('trend months are in YYYY-MM format', async () => {
    const result = await fetchSpendingTrends(12)

    for (const trend of result.trends) {
      expect(trend.month).toMatch(/^\d{4}-\d{2}$/)
    }
  })
})

describe('fetchTransactions', () => {
  /**
   * With no filters, we should get all transactions back (paginated).
   * The response includes both the transaction list and pagination metadata.
   */
  it('returns transactions with pagination info', async () => {
    const result = await fetchTransactions()

    expect(result).toHaveProperty('transactions')
    expect(result).toHaveProperty('pagination')
    expect(Array.isArray(result.transactions)).toBe(true)
    expect(result.pagination).toHaveProperty('total')
    expect(result.pagination).toHaveProperty('limit')
    expect(result.pagination).toHaveProperty('offset')
    expect(result.pagination).toHaveProperty('hasMore')
  })

  /**
   * Each transaction should have all the fields the TransactionsTable
   * component needs to render a row.
   */
  it('each transaction has the expected shape', async () => {
    const result = await fetchTransactions()

    for (const txn of result.transactions) {
      expect(txn).toHaveProperty('id')
      expect(txn).toHaveProperty('date')
      expect(txn).toHaveProperty('merchant')
      expect(txn).toHaveProperty('category')
      expect(txn).toHaveProperty('amount')
      expect(txn.amount).toBeGreaterThan(0)
    }
  })

  /**
   * Category filter: only transactions in the requested category
   * should come back.  This is used when a user clicks on a specific
   * category in the CategoryBreakdown chart.
   */
  it('filters by category', async () => {
    const result = await fetchTransactions({ category: 'Groceries' })

    expect(result.transactions.length).toBeGreaterThan(0)
    for (const txn of result.transactions) {
      expect(txn.category).toBe('Groceries')
    }
  })

  /**
   * Default sort is date_desc (newest first).  We verify that the
   * transactions come back in descending date order.
   */
  it('sorts by date descending by default', async () => {
    const result = await fetchTransactions()

    for (let i = 1; i < result.transactions.length; i++) {
      expect(result.transactions[i - 1].date >= result.transactions[i].date).toBe(true)
    }
  })

  /**
   * amount_asc sort: cheapest transactions first.  This tests that
   * the sort logic actually switches based on the sortBy parameter.
   */
  it('sorts by amount ascending when requested', async () => {
    const result = await fetchTransactions({ sortBy: 'amount_asc' })

    for (let i = 1; i < result.transactions.length; i++) {
      expect(result.transactions[i - 1].amount).toBeLessThanOrEqual(
        result.transactions[i].amount
      )
    }
  })

  /**
   * Pagination test: request only 5 items.  The response should say
   * hasMore is true (since there are 20 mock transactions total).
   */
  it('respects limit and offset for pagination', async () => {
    const page1 = await fetchTransactions({ limit: 5, offset: 0 })
    const page2 = await fetchTransactions({ limit: 5, offset: 5 })

    expect(page1.transactions).toHaveLength(5)
    expect(page2.transactions).toHaveLength(5)
    expect(page1.pagination.hasMore).toBe(true)

    // Pages should contain different transactions
    const page1Ids = page1.transactions.map((t) => t.id)
    const page2Ids = page2.transactions.map((t) => t.id)
    const overlap = page1Ids.filter((id) => page2Ids.includes(id))
    expect(overlap).toHaveLength(0)
  })
})

describe('fetchSpendingGoals', () => {
  /**
   * Goals drive the "Budget Goals" card on the dashboard.
   * Each goal has a category, budget, spent amount, and status.
   */
  it('returns goals array with expected structure', async () => {
    const result = await fetchSpendingGoals()

    expect(result).toHaveProperty('goals')
    expect(result.goals.length).toBeGreaterThan(0)

    for (const goal of result.goals) {
      expect(goal).toHaveProperty('id')
      expect(goal).toHaveProperty('category')
      expect(goal).toHaveProperty('monthlyBudget')
      expect(goal).toHaveProperty('currentSpent')
      expect(goal).toHaveProperty('percentageUsed')
      expect(goal).toHaveProperty('status')
      expect(['on_track', 'warning', 'exceeded']).toContain(goal.status)
    }
  })

  /**
   * percentageUsed should be consistent with currentSpent / monthlyBudget.
   * This catches drift if someone edits mock data without updating the %.
   */
  it('percentageUsed matches currentSpent / monthlyBudget', async () => {
    const result = await fetchSpendingGoals()

    for (const goal of result.goals) {
      const expected = (goal.currentSpent / goal.monthlyBudget) * 100
      // Allow small floating-point tolerance
      expect(goal.percentageUsed).toBeCloseTo(expected, 0)
    }
  })
})

describe('fetchFilters', () => {
  /**
   * The filters endpoint returns available categories and date presets.
   * PeriodSelector uses this to render the filter buttons.
   */
  it('returns categories and date range presets', async () => {
    const result = await fetchFilters()

    expect(result).toHaveProperty('categories')
    expect(result).toHaveProperty('dateRangePresets')
    expect(result.categories.length).toBeGreaterThan(0)
    expect(result.dateRangePresets.length).toBe(4) // 7d, 30d, 90d, 1y
  })

  /**
   * Each category should have a name, color, and icon – these are
   * needed for rendering category chips and the breakdown chart.
   */
  it('each category has name, color, and icon', async () => {
    const result = await fetchFilters()

    for (const cat of result.categories) {
      expect(cat).toHaveProperty('name')
      expect(cat).toHaveProperty('color')
      expect(cat).toHaveProperty('icon')
      expect(cat.color).toMatch(/^#[0-9A-Fa-f]{6}$/) // valid hex color
    }
  })
})
