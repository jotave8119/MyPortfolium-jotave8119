/**
 * Vercel serverless function — public GitLab activity + projects.
 *
 * Env:
 *   GITLAB_USERNAME  — required; without it the function reports `configured:false`
 *   GITLAB_TOKEN     — optional (read_api) for higher limits / private projects
 *
 * The contribution calendar comes from GitLab's public `calendar.json`. It only
 * has data if the user enabled "Include private contributions on my profile"
 * (or has public activity). Cached at the edge for an hour.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'

const USER = process.env.GITLAB_USERNAME
const TOKEN = process.env.GITLAB_TOKEN
const BASE = 'https://gitlab.com/api/v4'

const apiHeaders = (): Record<string, string> => {
  const h: Record<string, string> = { 'User-Agent': 'portfolio-app' }
  if (TOKEN) h['PRIVATE-TOKEN'] = TOKEN
  return h
}

function levelFor(count: number): number {
  if (count <= 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

/** Build a 53-week grid (aligned to Sundays) from a {date: count} map. */
function buildWeeks(calendar: Record<string, number>) {
  const today = new Date()
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 364)
  start.setUTCDate(start.getUTCDate() - start.getUTCDay()) // back to Sunday

  const weeks: { date: string; count: number; level: number }[][] = []
  let total = 0
  const cur = new Date(start)
  while (cur <= end) {
    const week: { date: string; count: number; level: number }[] = []
    for (let d = 0; d < 7; d++) {
      const iso = cur.toISOString().slice(0, 10)
      const count = calendar[iso] ?? 0
      total += count
      week.push({ date: iso, count, level: levelFor(count) })
      cur.setUTCDate(cur.getUTCDate() + 1)
    }
    weeks.push(week)
  }
  return { total, weeks }
}

async function getCalendar() {
  const res = await fetch(`https://gitlab.com/users/${USER}/calendar.json`, {
    headers: { 'User-Agent': 'portfolio-app' },
  })
  if (!res.ok) return null
  const cal = (await res.json()) as Record<string, number>
  if (!cal || Object.keys(cal).length === 0) return null
  return buildWeeks(cal)
}

interface GitlabUser {
  id: number
}
interface GitlabProject {
  name: string
  description: string | null
  web_url: string
  star_count: number
  forks_count: number
}

async function getProjects() {
  const userRes = await fetch(`${BASE}/users?username=${encodeURIComponent(USER!)}`, {
    headers: apiHeaders(),
  })
  if (!userRes.ok) return []
  const users = (await userRes.json()) as GitlabUser[]
  const user = users[0]
  if (!user) return []

  const projRes = await fetch(
    `${BASE}/users/${user.id}/projects?order_by=star_count&sort=desc&per_page=6`,
    { headers: apiHeaders() },
  )
  if (!projRes.ok) return []
  const raw = (await projRes.json()) as GitlabProject[]
  return raw.map((p) => ({
    name: p.name,
    description: p.description,
    url: p.web_url,
    stars: p.star_count,
    forks: p.forks_count,
  }))
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (!USER) {
    res.setHeader('Cache-Control', 'public, s-maxage=3600')
    res.status(200).json({ configured: false })
    return
  }

  try {
    const [contributions, projects] = await Promise.all([getCalendar(), getProjects()])
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.status(200).json({ configured: true, username: USER, contributions, projects })
  } catch (err) {
    res.status(200).json({
      configured: true,
      error: 'gitlab_failed',
      detail: err instanceof Error ? err.message : String(err),
      contributions: null,
      projects: [],
    })
  }
}
