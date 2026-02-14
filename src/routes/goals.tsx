import { GoalsPage } from '@/pages/GoalsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/goals')({
  component: GoalsPage
})
