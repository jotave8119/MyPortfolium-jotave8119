import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa6'
import { FiArrowUpRight } from 'react-icons/fi'
import { SectionHeading } from '@/components/SectionHeading/SectionHeading'
import { Reveal } from '@/components/Reveal/Reveal'
import { RepoCard } from '@/components/RepoCard/RepoCard'
import { ContributionHeatmap } from '@/components/ContributionHeatmap/ContributionHeatmap'
import { useApiData } from '@/hooks/useApiData'
import type { GitHubData, GitLabData } from '@/data/activity'
import styles from './OpenSource.module.css'

const GITHUB_PROFILE = 'https://github.com/jotave8119'

export function OpenSource() {
  const { t } = useTranslation()
  const gh = useApiData<GitHubData>('/api/github')
  const gl = useApiData<GitLabData>('/api/gitlab')

  const stats =
    gh.status === 'ok' && gh.data
      ? [
          gh.data.contributions
            ? { value: gh.data.contributions.total, label: t('activity.contributions') }
            : null,
          { value: gh.data.profile.publicRepos, label: t('activity.repos') },
          { value: gh.data.profile.followers, label: t('activity.followers') },
          { value: gh.data.profile.totalStars, label: t('activity.stars') },
        ].filter(Boolean)
      : []

  const glData = gl.status === 'ok' ? gl.data : null
  const showGitlab =
    !!glData?.configured && (!!glData.contributions || (glData.projects?.length ?? 0) > 0)

  return (
    <section id="opensource" className={`section ${styles.section}`} aria-labelledby="opensource-title">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow={t('activity.eyebrow')}
          title={t('activity.title')}
          titleId="opensource-title"
          intro={t('activity.intro')}
        />

        {gh.status === 'loading' && <p className={styles.note}>{t('activity.loading')}</p>}

        {gh.status === 'error' && (
          <Reveal className={styles.fallback}>
            <p className={styles.note}>{t('activity.unavailable')}</p>
            <a className={styles.profileLink} href={GITHUB_PROFILE} target="_blank" rel="noreferrer noopener">
              <FaGithub aria-hidden />
              {t('activity.viewProfile')}
              <FiArrowUpRight aria-hidden />
            </a>
          </Reveal>
        )}

        {gh.status === 'ok' && gh.data && (
          <div className={styles.content}>
            <Reveal>
              <ul className={styles.stats} role="list">
                {stats.map(
                  (s) =>
                    s && (
                      <li key={s.label} className={styles.stat}>
                        <span className={styles.statValue}>{s.value.toLocaleString()}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                      </li>
                    ),
                )}
              </ul>
            </Reveal>

            {gh.data.contributions && (
              <Reveal delay={0.06}>
                <ContributionHeatmap
                  weeks={gh.data.contributions.weeks}
                  legendLess={t('activity.less')}
                  legendMore={t('activity.more')}
                />
              </Reveal>
            )}

            {gh.data.topRepos.length > 0 && (
              <Reveal delay={0.1}>
                <h3 className={styles.subhead}>{t('activity.topRepos')}</h3>
                <div className={styles.grid}>
                  {gh.data.topRepos.map((repo) => (
                    <RepoCard key={repo.name} repo={repo} />
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        )}

        {showGitlab && glData && (
          <div className={styles.gitlab}>
            {glData.contributions && (
              <Reveal delay={0.06}>
                <h3 className={styles.subhead}>{t('activity.gitlabActivity')}</h3>
                <ContributionHeatmap
                  weeks={glData.contributions.weeks}
                  legendLess={t('activity.less')}
                  legendMore={t('activity.more')}
                />
              </Reveal>
            )}
            {glData.projects.length > 0 && (
              <Reveal delay={0.1} className={styles.gitlabProjects}>
                <h3 className={styles.subhead}>{t('activity.gitlabProjects')}</h3>
                <div className={styles.grid}>
                  {glData.projects.map((repo) => (
                    <RepoCard key={repo.url} repo={repo} />
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
