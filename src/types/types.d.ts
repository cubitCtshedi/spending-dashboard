// ─── Types ────────────────────────────────────────────────────────
declare global {
  // ─── Shared / Reusable ────────────────────────────────────────────
  type Period = '7d' | '30d' | '90d' | '1y'

  type SortBy = 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'

  type GoalStatus = 'on_track' | 'warning' | 'exceeded'

  type AccountType = 'basic' | 'premium' | 'business'
  interface Category {
    name: string
    color: string
    icon: string
  }

  interface DateRange {
    startDate: string
    endDate: string
  }

  interface DateRangePreset {
    label: string
    value: Period
  }

  // ─── 1. Customer Profile ──────────────────────────────────────────
  interface CustomerProfile {
    customerId: string
    name: string
    email: string
    joinDate: string
    accountType: AccountType
    totalSpent: number
    currency: string
  }

  // ─── 2. Spending Summary ──────────────────────────────────────────
  interface SpendingSummary {
    period: Period
    totalSpent: number
    transactionCount: number
    averageTransaction: number
    topCategory: string
    comparedToPrevious: {
      spentChange: number
      transactionChange: number
    }
  }

  // ─── 3. Spending by Category ──────────────────────────────────────
  interface CategorySpending {
    name: string
    amount: number
    percentage: number
    transactionCount: number
    color: string
    icon: string
  }

  interface SpendingByCategory {
    dateRange: DateRange
    totalAmount: number
    categories: CategorySpending[]
  }

  // ─── 4. Monthly Spending Trends ───────────────────────────────────
  interface MonthlyTrend {
    month: string
    totalSpent: number
    transactionCount: number
    averageTransaction: number
  }

  interface SpendingTrends {
    trends: MonthlyTrend[]
  }

  // ─── 5. Transactions ──────────────────────────────────────────────
  interface Transaction {
    id: string
    date: string
    merchant: string
    category: string
    amount: number
    description: string
    paymentMethod: string
    icon: string
    categoryColor: string
  }

  interface Pagination {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }

  interface TransactionsResponse {
    transactions: Transaction[]
    pagination: Pagination
  }

  interface TransactionFilters {
    limit?: number
    offset?: number
    category?: string
    startDate?: string
    endDate?: string
    sortBy?: SortBy
  }

  // ─── 6. Spending Goals ────────────────────────────────────────────
  interface SpendingGoal {
    id: string
    category: string
    monthlyBudget: number
    currentSpent: number
    percentageUsed: number
    daysRemaining: number
    status: GoalStatus
  }

  interface SpendingGoalsResponse {
    goals: SpendingGoal[]
  }

  // ─── 7. Filters ───────────────────────────────────────────────────
  interface FiltersResponse {
    categories: Category[]
    dateRangePresets: DateRangePreset[]
  }
}

export {}
