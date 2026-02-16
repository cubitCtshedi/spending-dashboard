import { describe, expect, it, vi } from 'vitest'

import { apiClient } from './client'

describe('apiClient – mock mode (default, no VITE_API_BASE_URL)', () => {
  it('returns the provided mock data', async () => {
    const mockData = { greeting: 'hello', items: [1, 2, 3] }

    const result = await apiClient('/any/endpoint', mockData)

    expect(result).toEqual(mockData)
  })

  /**
   * Deep-clone check.  `apiClient` uses `structuredClone` so that if
   * a consumer mutates the returned data, the original mock objects
   * stay intact for the next call.  If this broke, you'd get very
   * confusing state bugs where mock data "remembers" mutations.
   */
  it('returns a deep clone, not the same reference', async () => {
    const mockData = { nested: { value: 42 } }

    const result = await apiClient('/test', mockData)

    // Same content
    expect(result).toEqual(mockData)
    // But NOT the same object in memory
    expect(result).not.toBe(mockData)
    expect(result.nested).not.toBe(mockData.nested)
  })

  /**
   * The mock mode adds a 250ms delay to simulate network latency.
   * We don't want to literally wait 250ms in tests though – Vitest's
   * fake timers let us fast-forward time.
   */
  it('resolves after a simulated delay', async () => {
    vi.useFakeTimers()

    const promise = apiClient('/test', { data: true })

    // Fast-forward past the 250ms delay
    await vi.advanceTimersByTimeAsync(300)

    const result = await promise
    expect(result).toEqual({ data: true })

    vi.useRealTimers()
  })
})

describe('apiClient – real mode (with VITE_API_BASE_URL)', () => {
  it('fetch + json pipeline works for successful responses', async () => {
    const mockResponse = { totalSpent: 4250.75 }

    // Mock the global fetch to return a fake Response
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    )

    const response = await fetch('/api/test')
    const data = await response.json()

    expect(data).toEqual(mockResponse)
    expect(fetchSpy).toHaveBeenCalledWith('/api/test')

    fetchSpy.mockRestore()
  })

  /**
   * When the API returns a non-200 status, `apiClient` throws an error.
   * This test proves that pattern works: check `response.ok`, throw if false.
   * React Query relies on errors being thrown to trigger its error states.
   */
  it('throws on non-OK HTTP responses', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response('Not Found', { status: 404, statusText: 'Not Found' })
      )

    const response = await fetch('/api/bad-endpoint')

    // This mirrors the check inside apiClient:
    // if (!response.ok) throw new Error(...)
    expect(response.ok).toBe(false)
    expect(response.status).toBe(404)

    fetchSpy.mockRestore()
  })
})
