import { create } from 'zustand'

interface DashboardState {
  // Period filter (shared across summary, categories, etc.)
  selectedPeriod: Period
  setPeriod: (period: Period) => void

  // Custom date range
  customStartDate: string
  customEndDate: string
  setCustomDateRange: (start: string, end: string) => void
  clearCustomDateRange: () => void

  // Transaction filters
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  transactionSort: SortBy
  setTransactionSort: (sort: SortBy) => void
  transactionPage: number
  setTransactionPage: (page: number) => void

  // Sidebar (mobile)
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedPeriod: '30d',
  setPeriod: (period) => set({ selectedPeriod: period, transactionPage: 0 }),

  customStartDate: '',
  customEndDate: '',
  setCustomDateRange: (start, end) =>
    set({ customStartDate: start, customEndDate: end, transactionPage: 0 }),
  clearCustomDateRange: () => set({ customStartDate: '', customEndDate: '' }),

  selectedCategory: '',
  setSelectedCategory: (category) =>
    set({ selectedCategory: category, transactionPage: 0 }),
  transactionSort: 'date_desc',
  setTransactionSort: (sort) =>
    set({ transactionSort: sort, transactionPage: 0 }),
  transactionPage: 0,
  setTransactionPage: (page) => set({ transactionPage: page }),

  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open })
}))
