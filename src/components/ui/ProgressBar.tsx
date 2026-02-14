import { cn } from '@/lib/utils'

interface ProgressBarProps {
  percentage: number
  status?: GoalStatus
  className?: string
}

const STATUS_COLORS: Record<GoalStatus, string> = {
  on_track: 'bg-emerald-500',
  warning: 'bg-amber-500',
  exceeded: 'bg-red-500'
}

export function ProgressBar({
  percentage,
  status = 'on_track',
  className
}: ProgressBarProps) {
  const clamped = Math.min(percentage, 100)

  return (
    <div
      className={cn('h-2.5 w-full rounded-full bg-gray-200', className)}
    >
      <div
        className={cn(
          'h-2.5 rounded-full transition-all duration-500',
          STATUS_COLORS[status]
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
