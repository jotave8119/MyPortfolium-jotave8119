/**
 * Vercel serverless function — public GitLab projects for the portfolio.
 *
 * Env:
 *   GITLAB_USERNAME  — required; without it the function reports `configured:false`
 *   GITLAB_TOKEN     — optional (read_api) for higher rate limits
 *
 * Cached at the edge for an hour.
 */

const USER = process.env.GITLAB_USERNAME
const TOKEN = process.env.GITLAB_TOKEN
const BASE = 'https://gitlab.com/api/v4'

const headers = (): Record<string, string> => {
  const h: Record<string, string> = { 'User-Agent': 'portfolio-app' }
  if (TOKEN) h['PRIVATE-TOKEN'] = TOKEN
  return h
}

interface GitlabUser {
  id: number
  public_repos?: number
}
interface GitlabProject {
  name: string
  description: string | null
  web_url: string
  star_count: number
  forks_count: number
  topics?: string[]
}

export default async function handler(): Promise<Response> {
  if (!USER) {
    return new Response(JSON.stringify({ configured: false }), {
      status: 200,
      headers: { 'content-type': 'application/json', 'cache-control': 'public, s-maxage=3600' },
    })
  }

  try {
    const userRes = await fetch(`${BASE}/users?username=${encodeURIComponent(USER)}`, {
      headers: headers(),
    })
    if (!userRes.ok) throw new Error('gitlab_user_failed')
    const users = (await userRes.json()) as GitlabUser[]
    const user = users[0]
    if (!user) throw new Error('gitlab_user_not_found')

    const projRes = await fetch(
      `${BASE}/users/${user.id}/projects?order_by=star_count&sort=desc&per_page=6&visibility=public`,
      { headers: headers() },
    )
    if (!projRes.ok) throw new Error('gitlab_projects_failed')
    const projectsRaw = (await projRes.json()) as GitlabProject[]

    const projects = projectsRaw.map((p) => ({
      name: p.name,
      description: p.description,
      url: p.web_url,
      stars: p.star_count,
      forks: p.forks_count,
      topics: p.topics ?? [],
    }))

    return new Response(JSON.stringify({ configured: true, username: USER, projects }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch {
    return new Response(JSON.stringify({ configured: true, error: 'gitlab_failed', projects: [] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }
}
