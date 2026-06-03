export interface RepoSummary {
  name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language?: string | null
}

export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface GitHubData {
  username: string
  profile: {
    publicRepos: number
    followers: number
    following: number
    totalStars: number
  }
  topRepos: RepoSummary[]
  languages: { name: string; count: number }[]
  contributions: { total: number; weeks: ContributionDay[][] } | null
}

export interface GitLabData {
  configured: boolean
  username?: string
  contributions?: { total: number; weeks: ContributionDay[][] } | null
  projects: RepoSummary[]
  error?: string
}
