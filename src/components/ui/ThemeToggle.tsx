import { Moon, Sun } from 'lucide-react'

import { useThemeStore } from '@/stores/theme-store'

const THEMES = [
  { value: 'light' as const, icon: Sun, label: 'Light' },
  { value: 'dark' as const, icon: Moon, label: 'Dark' }
]

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.value === theme)
    const next = THEMES[(currentIndex + 1) % THEMES.length]
    setTheme(next.value)
  }

  const current = THEMES.find((t) => t.value === theme) ?? THEMES[0]
  const Icon = current.icon

  return (
    <button
      onClick={cycleTheme}
      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
      title={`Theme: ${current.label}`}
      aria-label={`Switch theme, current: ${current.label}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}
