/**
 * Vercel serverless function — aggregates public GitHub data for the portfolio.
 *
 * Env:
 *   GITHUB_TOKEN     — Personal Access Token (read-only: public_repo / read:user)
 *   GITHUB_USERNAME  — defaults to "jotave8119"
 *
 * Returns profile stats, top repositories, language breakdown and the
 * contribution calendar (last year). Cached at the edge for an hour.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'

const USER = process.env.GITHUB_USERNAME ?? 'jotave8119'
const TOKEN = process.env.GITHUB_TOKEN

interface RepoApi {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  fork: boolean
  archived: boolean
  pushed_at: string
}

const headers = (): Record<string, string> => {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-app',
  }
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`
  return h
}

async function getProfileAndRepos() {
  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}`, { headers: headers() }),
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed`, {
      headers: headers(),
    }),
  ])

  if (!profileRes.ok || !reposRes.ok) throw new Error('github_rest_failed')

  const profile = (await profileRes.json()) as {
    public_repos: number
    followers: number
    following: number
  }
  const reposRaw = (await reposRes.json()) as RepoApi[]

  const owned = reposRaw.filter((r) => !r.fork && !r.archived)
  const totalStars = owned.reduce((sum, r) => sum + r.stargazers_count, 0)

  const topRepos = [...owned]
    .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
    }))

  const langCount = new Map<string, number>()
  for (const r of owned) {
    if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1)
  }
  const languages = [...langCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }))

  return {
    profile: {
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      totalStars,
    },
    topRepos,
    languages,
  }
}

async function getContributions() {
  if (!TOKEN) return null // GraphQL requires auth
  const query = `query($login:String!){
    user(login:$login){
      contributionsCollection{
        contributionCalendar{
          totalContributions
          weeks{ contributionDays{ date contributionCount contributionLevel } }
        }
      }
    }
  }`

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: USER } }),
  })
  if (!res.ok) return null

  const json = (await res.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number
            weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[]
          }
        }
      }
    }
  }

  const cal = json.data?.user?.contributionsCollection?.contributionCalendar
  if (!cal) return null

  const levelMap: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  }

  return {
    total: cal.totalContributions,
    weeks: cal.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: levelMap[d.contributionLevel] ?? 0,
      })),
    ),
  }
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const [base, contributions] = await Promise.all([getProfileAndRepos(), getContributions()])
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.status(200).json({ ...base, contributions, username: USER })
  } catch {
    res.status(502).json({ error: 'github_failed' })
  }
}
