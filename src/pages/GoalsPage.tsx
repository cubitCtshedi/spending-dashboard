import { SpendingGoals } from '@/components/dashboard/SpendingGoals'

export function GoalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Budget Goals</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your monthly spending limits by category
        </p>
      </div>
      <SpendingGoals />
    </div>
  )
}
