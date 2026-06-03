import { useEffect, useState } from 'react'

type Status = 'loading' | 'ok' | 'error'

/**
 * Minimal data fetcher for our serverless endpoints. Note: these endpoints only
 * run on Vercel (or via `vercel dev`) — with plain `vite dev` they 404 and the
 * hook resolves to `error`.
 */
export function useApiData<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let active = true
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('request_failed')
        return r.json() as Promise<T>
      })
      .then((d) => {
        if (!active) return
        setData(d)
        setStatus('ok')
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [url])

  return { data, status }
}
