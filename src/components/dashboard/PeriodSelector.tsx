import { useFilters } from '@/hooks/use-spending'
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/stores/dashboard-store'

export function PeriodSelector() {
  const { data } = useFilters()
  const {
    selectedPeriod,
    setPeriod,
    customStartDate,
    customEndDate,
    setCustomDateRange,
    clearCustomDateRange
  } = useDashboardStore()

  const presets = data?.dateRangePresets ?? [
    { label: 'Last 7 days', value: '7d' as Period },
    { label: 'Last 30 days', value: '30d' as Period },
    { label: 'Last 90 days', value: '90d' as Period },
    { label: 'Last year', value: '1y' as Period }
  ]

  const handlePresetClick = (value: Period) => {
    setPeriod(value)
    clearCustomDateRange()
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {presets.map((preset) => (
        <button
          key={preset.value}
          onClick={() => handlePresetClick(preset.value)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            selectedPeriod === preset.value && !customStartDate
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          {preset.label}
        </button>
      ))}

      <div className="flex items-center gap-1.5">
        <input
          type="date"
          value={customStartDate}
          onChange={(e) => setCustomDateRange(e.target.value, customEndDate)}
          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
        />
        <span className="text-sm text-gray-400">to</span>
        <input
          type="date"
          value={customEndDate}
          onChange={(e) => setCustomDateRange(customStartDate, e.target.value)}
          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
        />
      </div>
    </div>
  )
}
