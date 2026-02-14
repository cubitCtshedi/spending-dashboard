import { z } from 'zod/v4'

// ─── Shared ───────────────────────────────────────────────────────
export const PeriodSchema = z.enum(['7d', '30d', '90d', '1y'])

export const SortBySchema = z.enum([
  'date_desc',
  'date_asc',
  'amount_desc',
  'amount_asc'
])

export const GoalStatusSchema = z.enum(['on_track', 'warning', 'exceeded'])

export const CategorySchema = z.object({
  name: z.string(),
  color: z.string(),
  icon: z.string()
})

export const DateRangeSchema = z.object({
  startDate: z.string(),
  endDate: z.string()
})

export const DateRangePresetSchema = z.object({
  label: z.string(),
  value: PeriodSchema
})

// ─── 1. Customer Profile ──────────────────────────────────────────
export const CustomerProfileSchema = z.object({
  customerId: z.string(),
  name: z.string(),
  email: z.string().email(),
  joinDate: z.string(),
  accountType: z.enum(['basic', 'premium', 'business']),
  totalSpent: z.number(),
  currency: z.string()
})

// ─── 2. Spending Summary ──────────────────────────────────────────
export const SpendingSummarySchema = z.object({
  period: PeriodSchema,
  totalSpent: z.number(),
  transactionCount: z.number().int(),
  averageTransaction: z.number(),
  topCategory: z.string(),
  comparedToPrevious: z.object({
    spentChange: z.number(),
    transactionChange: z.number()
  })
})

// ─── 3. Spending by Category ──────────────────────────────────────
export const CategorySpendingSchema = z.object({
  name: z.string(),
  amount: z.number(),
  percentage: z.number(),
  transactionCount: z.number().int(),
  color: z.string(),
  icon: z.string()
})

export const SpendingByCategorySchema = z.object({
  dateRange: DateRangeSchema,
  totalAmount: z.number(),
  categories: z.array(CategorySpendingSchema)
})

// ─── 4. Monthly Spending Trends ───────────────────────────────────
export const MonthlyTrendSchema = z.object({
  month: z.string(),
  totalSpent: z.number(),
  transactionCount: z.number().int(),
  averageTransaction: z.number()
})

export const SpendingTrendsSchema = z.object({
  trends: z.array(MonthlyTrendSchema)
})

// ─── 5. Transactions ──────────────────────────────────────────────
export const TransactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  merchant: z.string(),
  category: z.string(),
  amount: z.number(),
  description: z.string(),
  paymentMethod: z.string(),
  icon: z.string(),
  categoryColor: z.string()
})

export const PaginationSchema = z.object({
  total: z.number().int(),
  limit: z.number().int(),
  offset: z.number().int(),
  hasMore: z.boolean()
})

export const TransactionsResponseSchema = z.object({
  transactions: z.array(TransactionSchema),
  pagination: PaginationSchema
})

// ─── 6. Spending Goals ────────────────────────────────────────────
export const SpendingGoalSchema = z.object({
  id: z.string(),
  category: z.string(),
  monthlyBudget: z.number(),
  currentSpent: z.number(),
  percentageUsed: z.number(),
  daysRemaining: z.number().int(),
  status: GoalStatusSchema
})

export const SpendingGoalsResponseSchema = z.object({
  goals: z.array(SpendingGoalSchema)
})

// ─── 7. Filters ───────────────────────────────────────────────────
export const FiltersResponseSchema = z.object({
  categories: z.array(CategorySchema),
  dateRangePresets: z.array(DateRangePresetSchema)
})
