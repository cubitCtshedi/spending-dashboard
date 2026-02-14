import { useSpendingGoals } from '@/hooks/use-spending'
import { formatCurrency } from '@/lib/utils'
import { Card, CardHeader } from '../ui/Card'
import { ProgressBar } from '../ui/ProgressBar'
import { Skeleton } from '../ui/Skeleton'

const STATUS_LABEL: Record<GoalStatus, string> = {
  on_track: 'On Track',
  warning: 'Warning',
  exceeded: 'Exceeded'
}

const STATUS_TEXT_COLOR: Record<GoalStatus, string> = {
  on_track: 'text-emerald-600',
  warning: 'text-amber-600',
  exceeded: 'text-red-600'
}

export function SpendingGoals() {
  const { data, isLoading } = useSpendingGoals()

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader title="Budget Goals" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader title="Budget Goals" subtitle="Monthly spending limits" />
      <ul className="space-y-5">
        {data.goals.map((goal) => (
          <li key={goal.id}>
            <div className="mb-1.5 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  {goal.category}
                </span>
                <span
                  className={`ml-2 text-xs font-medium ${STATUS_TEXT_COLOR[goal.status]}`}
                >
                  {STATUS_LABEL[goal.status]}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {goal.daysRemaining} days left
              </span>
            </div>
            <ProgressBar
              percentage={goal.percentageUsed}
              status={goal.status}
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>{formatCurrency(goal.currentSpent)} spent</span>
              <span>{formatCurrency(goal.monthlyBudget)} budget</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
