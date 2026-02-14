import { Menu, User } from 'lucide-react'

import { useCustomerProfile } from '@/hooks/use-spending'
import { useDashboardStore } from '@/stores/dashboard-store'

import { Badge } from '../ui/Badge'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Header() {
  const toggleSidebar = useDashboardStore((s) => s.toggleSidebar)
  const { data: profile } = useCustomerProfile()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Spending Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {profile && (
          <>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {profile.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {profile.email}
              </p>
            </div>
            <Badge
              label={profile.accountType}
              className="hidden bg-blue-100 capitalize text-blue-700 dark:bg-blue-900 dark:text-blue-300 sm:inline-flex"
            />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
              <User className="h-4 w-4 text-white" />
            </div>
          </>
        )}
      </div>
    </header>
  )
}
