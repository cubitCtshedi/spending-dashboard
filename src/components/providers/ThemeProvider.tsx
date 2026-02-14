import { useEffect } from 'react'

import { useThemeStore } from '@/stores/theme-store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    const resolved = resolvedTheme()

    root.classList.remove('light', 'dark')
    root.classList.add(resolved)

    // Listen for system theme changes when in "system" mode
    if (theme !== 'dark') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme())
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme, resolvedTheme])

  return <>{children}</>
}
