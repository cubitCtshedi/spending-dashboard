import { useQuery } from '@tanstack/react-query'

import {
  fetchCustomerProfile,
  fetchFilters,
  fetchSpendingByCategory,
  fetchSpendingGoals,
  fetchSpendingSummary,
  fetchSpendingTrends,
  fetchTransactions
} from '@/api/endpoints'

const STALE_TIME = 5 * 60 * 1000 // 5 minutes

export function useCustomerProfile() {
  return useQuery({
    queryKey: ['customerProfile'],
    queryFn: fetchCustomerProfile,
    staleTime: STALE_TIME
  })
}

export function useSpendingSummary(period: Period) {
  return useQuery({
    queryKey: ['spendingSummary', period],
    queryFn: () => fetchSpendingSummary(period),
    staleTime: STALE_TIME
  })
}

export function useSpendingCategories(
  period: Period,
  startDate?: string,
  endDate?: string
) {
  return useQuery({
    queryKey: ['spendingCategories', period, startDate, endDate],
    queryFn: () => fetchSpendingByCategory(period, startDate, endDate),
    staleTime: STALE_TIME
  })
}

export function useSpendingTrends(months = 12) {
  return useQuery({
    queryKey: ['spendingTrends', months],
    queryFn: () => fetchSpendingTrends(months),
    staleTime: STALE_TIME
  })
}

export function useTransactions(filters: TransactionFilters) {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => fetchTransactions(filters),
    staleTime: STALE_TIME
  })
}

export function useSpendingGoals() {
  return useQuery({
    queryKey: ['spendingGoals'],
    queryFn: fetchSpendingGoals,
    staleTime: STALE_TIME
  })
}

export function useFilters() {
  return useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters,
    staleTime: STALE_TIME
  })
}
