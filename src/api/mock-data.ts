// ─── 1. Customer Profile ──────────────────────────────────────────
export const mockCustomerProfile: CustomerProfile = {
  customerId: '12345',
  name: 'John Doe',
  email: 'john.doe@email.com',
  joinDate: '2023-01-15',
  accountType: 'premium',
  totalSpent: 15420.5,
  currency: 'ZAR'
}

// ─── 2. Spending Summaries (by period) ────────────────────────────
export const mockSpendingSummaries: Record<string, SpendingSummary> = {
  '7d': {
    period: '7d',
    totalSpent: 1120.35,
    transactionCount: 12,
    averageTransaction: 93.36,
    topCategory: 'Groceries',
    comparedToPrevious: {
      spentChange: 5.2,
      transactionChange: -1.5
    }
  },
  '30d': {
    period: '30d',
    totalSpent: 4250.75,
    transactionCount: 47,
    averageTransaction: 90.44,
    topCategory: 'Groceries',
    comparedToPrevious: {
      spentChange: 12.5,
      transactionChange: -3.2
    }
  },
  '90d': {
    period: '90d',
    totalSpent: 11850.6,
    transactionCount: 132,
    averageTransaction: 89.78,
    topCategory: 'Groceries',
    comparedToPrevious: {
      spentChange: 8.1,
      transactionChange: 2.4
    }
  },
  '1y': {
    period: '1y',
    totalSpent: 15420.5,
    transactionCount: 520,
    averageTransaction: 29.65,
    topCategory: 'Groceries',
    comparedToPrevious: {
      spentChange: -2.3,
      transactionChange: 6.8
    }
  }
}

// ─── 3. Spending by Category ──────────────────────────────────────
export const mockCategories = [
  {
    name: 'Groceries',
    amount: 1250.3,
    percentage: 29.4,
    transactionCount: 15,
    color: '#FF6B6B',
    icon: 'shopping-cart'
  },
  {
    name: 'Entertainment',
    amount: 890.2,
    percentage: 20.9,
    transactionCount: 8,
    color: '#4ECDC4',
    icon: 'film'
  },
  {
    name: 'Transportation',
    amount: 680.45,
    percentage: 16.0,
    transactionCount: 12,
    color: '#45B7D1',
    icon: 'car'
  },
  {
    name: 'Dining',
    amount: 520.3,
    percentage: 12.2,
    transactionCount: 9,
    color: '#F7DC6F',
    icon: 'utensils'
  },
  {
    name: 'Shopping',
    amount: 450.8,
    percentage: 10.6,
    transactionCount: 6,
    color: '#BB8FCE',
    icon: 'shopping-bag'
  },
  {
    name: 'Utilities',
    amount: 458.7,
    percentage: 10.8,
    transactionCount: 3,
    color: '#85C1E9',
    icon: 'zap'
  }
]

export const mockSpendingByCategory: SpendingByCategory = {
  dateRange: {
    startDate: '2024-08-16',
    endDate: '2024-09-16'
  },
  totalAmount: 4250.75,
  categories: mockCategories
}

// ─── 4. Monthly Spending Trends ───────────────────────────────────
export const mockSpendingTrends: SpendingTrends = {
  trends: [
    {
      month: '2024-01',
      totalSpent: 3890.25,
      transactionCount: 42,
      averageTransaction: 92.62
    },
    {
      month: '2024-02',
      totalSpent: 4150.8,
      transactionCount: 38,
      averageTransaction: 109.23
    },
    {
      month: '2024-03',
      totalSpent: 3750.6,
      transactionCount: 45,
      averageTransaction: 83.35
    },
    {
      month: '2024-04',
      totalSpent: 4200.45,
      transactionCount: 39,
      averageTransaction: 107.7
    },
    {
      month: '2024-05',
      totalSpent: 3980.3,
      transactionCount: 44,
      averageTransaction: 90.46
    },
    {
      month: '2024-06',
      totalSpent: 4250.75,
      transactionCount: 47,
      averageTransaction: 90.44
    },
    {
      month: '2024-07',
      totalSpent: 3620.15,
      transactionCount: 41,
      averageTransaction: 88.3
    },
    {
      month: '2024-08',
      totalSpent: 4480.9,
      transactionCount: 50,
      averageTransaction: 89.62
    },
    {
      month: '2024-09',
      totalSpent: 3950.4,
      transactionCount: 43,
      averageTransaction: 91.87
    },
    {
      month: '2024-10',
      totalSpent: 4120.65,
      transactionCount: 46,
      averageTransaction: 89.58
    },
    {
      month: '2024-11',
      totalSpent: 4590.2,
      transactionCount: 52,
      averageTransaction: 88.27
    },
    {
      month: '2024-12',
      totalSpent: 5230.45,
      transactionCount: 58,
      averageTransaction: 90.18
    }
  ]
}

// ─── 5. Transactions ──────────────────────────────────────────────
export const mockTransactions: Transaction[] = [
  {
    id: 'txn_123456',
    date: '2024-09-16T14:30:00Z',
    merchant: 'Pick n Pay',
    category: 'Groceries',
    amount: 245.8,
    description: 'Weekly groceries',
    paymentMethod: 'Credit Card',
    icon: 'shopping-cart',
    categoryColor: '#FF6B6B'
  },
  {
    id: 'txn_123457',
    date: '2024-09-15T10:15:00Z',
    merchant: 'Netflix',
    category: 'Entertainment',
    amount: 199.0,
    description: 'Monthly subscription',
    paymentMethod: 'Debit Order',
    icon: 'film',
    categoryColor: '#4ECDC4'
  },
  {
    id: 'txn_123458',
    date: '2024-09-14T08:45:00Z',
    merchant: 'Uber',
    category: 'Transportation',
    amount: 85.5,
    description: 'Ride to office',
    paymentMethod: 'Credit Card',
    icon: 'car',
    categoryColor: '#45B7D1'
  },
  {
    id: 'txn_123459',
    date: '2024-09-13T19:20:00Z',
    merchant: 'Woolworths Food',
    category: 'Groceries',
    amount: 312.45,
    description: 'Grocery shopping',
    paymentMethod: 'Credit Card',
    icon: 'shopping-cart',
    categoryColor: '#FF6B6B'
  },
  {
    id: 'txn_123460',
    date: '2024-09-12T12:00:00Z',
    merchant: 'Nandos',
    category: 'Dining',
    amount: 185.0,
    description: 'Lunch with colleagues',
    paymentMethod: 'Credit Card',
    icon: 'utensils',
    categoryColor: '#F7DC6F'
  },
  {
    id: 'txn_123461',
    date: '2024-09-11T16:30:00Z',
    merchant: 'Eskom',
    category: 'Utilities',
    amount: 458.7,
    description: 'Electricity bill',
    paymentMethod: 'Debit Order',
    icon: 'zap',
    categoryColor: '#85C1E9'
  },
  {
    id: 'txn_123462',
    date: '2024-09-10T09:00:00Z',
    merchant: 'Zara',
    category: 'Shopping',
    amount: 450.8,
    description: 'New jacket',
    paymentMethod: 'Credit Card',
    icon: 'shopping-bag',
    categoryColor: '#BB8FCE'
  },
  {
    id: 'txn_123463',
    date: '2024-09-09T20:15:00Z',
    merchant: 'Checkers',
    category: 'Groceries',
    amount: 178.9,
    description: 'Snacks and beverages',
    paymentMethod: 'Debit Card',
    icon: 'shopping-cart',
    categoryColor: '#FF6B6B'
  },
  {
    id: 'txn_123464',
    date: '2024-09-08T07:30:00Z',
    merchant: 'Shell Garage',
    category: 'Transportation',
    amount: 350.0,
    description: 'Fuel',
    paymentMethod: 'Credit Card',
    icon: 'car',
    categoryColor: '#45B7D1'
  },
  {
    id: 'txn_123465',
    date: '2024-09-07T13:45:00Z',
    merchant: 'Spur Steak Ranches',
    category: 'Dining',
    amount: 220.5,
    description: 'Family dinner',
    paymentMethod: 'Credit Card',
    icon: 'utensils',
    categoryColor: '#F7DC6F'
  },
  {
    id: 'txn_123466',
    date: '2024-09-06T15:00:00Z',
    merchant: 'Spotify',
    category: 'Entertainment',
    amount: 79.99,
    description: 'Music subscription',
    paymentMethod: 'Debit Order',
    icon: 'film',
    categoryColor: '#4ECDC4'
  },
  {
    id: 'txn_123467',
    date: '2024-09-05T11:20:00Z',
    merchant: 'Gautrain',
    category: 'Transportation',
    amount: 120.0,
    description: 'Monthly train pass',
    paymentMethod: 'Debit Card',
    icon: 'car',
    categoryColor: '#45B7D1'
  },
  {
    id: 'txn_123468',
    date: '2024-09-04T17:00:00Z',
    merchant: 'Mr Price',
    category: 'Shopping',
    amount: 299.99,
    description: 'Casual wear',
    paymentMethod: 'Credit Card',
    icon: 'shopping-bag',
    categoryColor: '#BB8FCE'
  },
  {
    id: 'txn_123469',
    date: '2024-09-03T09:30:00Z',
    merchant: 'Vida e Caffè',
    category: 'Dining',
    amount: 65.0,
    description: 'Morning coffee',
    paymentMethod: 'Credit Card',
    icon: 'utensils',
    categoryColor: '#F7DC6F'
  },
  {
    id: 'txn_123470',
    date: '2024-09-02T14:00:00Z',
    merchant: 'Pick n Pay',
    category: 'Groceries',
    amount: 198.75,
    description: 'Midweek top-up',
    paymentMethod: 'Credit Card',
    icon: 'shopping-cart',
    categoryColor: '#FF6B6B'
  },
  {
    id: 'txn_123471',
    date: '2024-09-01T10:00:00Z',
    merchant: 'Ster-Kinekor',
    category: 'Entertainment',
    amount: 150.0,
    description: 'Movie tickets',
    paymentMethod: 'Credit Card',
    icon: 'film',
    categoryColor: '#4ECDC4'
  },
  {
    id: 'txn_123472',
    date: '2024-08-31T08:00:00Z',
    merchant: 'Engen',
    category: 'Transportation',
    amount: 124.95,
    description: 'Fuel top-up',
    paymentMethod: 'Debit Card',
    icon: 'car',
    categoryColor: '#45B7D1'
  },
  {
    id: 'txn_123473',
    date: '2024-08-30T19:00:00Z',
    merchant: 'Ocean Basket',
    category: 'Dining',
    amount: 310.0,
    description: 'Date night dinner',
    paymentMethod: 'Credit Card',
    icon: 'utensils',
    categoryColor: '#F7DC6F'
  },
  {
    id: 'txn_123474',
    date: '2024-08-29T12:00:00Z',
    merchant: 'Woolworths',
    category: 'Groceries',
    amount: 410.25,
    description: 'Weekly shop',
    paymentMethod: 'Credit Card',
    icon: 'shopping-cart',
    categoryColor: '#FF6B6B'
  },
  {
    id: 'txn_123475',
    date: '2024-08-28T16:45:00Z',
    merchant: 'DStv',
    category: 'Entertainment',
    amount: 459.0,
    description: 'Satellite TV subscription',
    paymentMethod: 'Debit Order',
    icon: 'film',
    categoryColor: '#4ECDC4'
  }
]

// ─── 6. Spending Goals ────────────────────────────────────────────
export const mockSpendingGoals: SpendingGoalsResponse = {
  goals: [
    {
      id: 'goal_001',
      category: 'Entertainment',
      monthlyBudget: 1000.0,
      currentSpent: 650.3,
      percentageUsed: 65.03,
      daysRemaining: 12,
      status: 'on_track'
    },
    {
      id: 'goal_002',
      category: 'Groceries',
      monthlyBudget: 1500.0,
      currentSpent: 1450.8,
      percentageUsed: 96.72,
      daysRemaining: 12,
      status: 'warning'
    },
    {
      id: 'goal_003',
      category: 'Dining',
      monthlyBudget: 600.0,
      currentSpent: 520.3,
      percentageUsed: 86.72,
      daysRemaining: 12,
      status: 'on_track'
    },
    {
      id: 'goal_004',
      category: 'Transportation',
      monthlyBudget: 800.0,
      currentSpent: 680.45,
      percentageUsed: 85.06,
      daysRemaining: 12,
      status: 'on_track'
    }
  ]
}

// ─── 7. Filters ───────────────────────────────────────────────────
export const mockFilters: FiltersResponse = {
  categories: [
    { name: 'Groceries', color: '#FF6B6B', icon: 'shopping-cart' },
    { name: 'Entertainment', color: '#4ECDC4', icon: 'film' },
    { name: 'Transportation', color: '#45B7D1', icon: 'car' },
    { name: 'Dining', color: '#F7DC6F', icon: 'utensils' },
    { name: 'Shopping', color: '#BB8FCE', icon: 'shopping-bag' },
    { name: 'Utilities', color: '#85C1E9', icon: 'zap' }
  ],
  dateRangePresets: [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Last year', value: '1y' }
  ]
}
