import { format, parseISO } from 'date-fns'

/**
 * Format a number as ZAR currency.
 */
export function formatCurrency(
  amount: number,
  currency = 'ZAR'
): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount)
}

/**
 * Format a percentage value with sign indicator.
 * e.g. +12.5% or -3.2%
 */
export function formatPercentageChange(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

/**
 * Format an ISO date string for display.
 * e.g. "2024-09-16T14:30:00Z" → "16 Sep 2024"
 */
export function formatDate(dateStr: string, pattern = 'd MMM yyyy'): string {
  return format(parseISO(dateStr), pattern)
}

/**
 * Format a month string "YYYY-MM" for display.
 * e.g. "2024-01" → "Jan 2024"
 */
export function formatMonth(monthStr: string): string {
  return format(parseISO(`${monthStr}-01`), 'MMM yyyy')
}

/**
 * Combine Tailwind class names, filtering out falsy values.
 */
export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Convert a period preset to a concrete date range.
 * Uses a reference date (defaults to now) so mock data works correctly.
 */
export function periodToDateRange(
  period: Period,
  referenceDate: Date = new Date()
): { startDate: string; endDate: string } {
  const end = new Date(referenceDate)
  const start = new Date(referenceDate)

  switch (period) {
    case '7d':
      start.setDate(start.getDate() - 7)
      break
    case '30d':
      start.setDate(start.getDate() - 30)
      break
    case '90d':
      start.setDate(start.getDate() - 90)
      break
    case '1y':
      start.setFullYear(start.getFullYear() - 1)
      break
  }

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0]
  }
}

/**
 * Simulated network delay for mock API.
 */
export function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
