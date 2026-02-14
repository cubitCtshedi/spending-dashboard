import { delay } from '@/lib/utils'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const USE_MOCK = !API_BASE_URL

/**
 * Generic API client that can serve mock data or call a real API.
 * When VITE_API_BASE_URL is set, it fetches from the real API.
 * Otherwise, it returns the provided mock data with a simulated delay.
 */
export async function apiClient<T>(_endpoint: string, mockData: T): Promise<T> {
  if (USE_MOCK) {
    await delay(250)
    return structuredClone(mockData)
  }

  const response = await fetch(`${API_BASE_URL}${_endpoint}`)

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
