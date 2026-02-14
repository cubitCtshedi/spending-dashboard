import { TransactionsPage } from '@/pages/TransactionsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transactions')({
  component: TransactionsPage
})
