import { FiArrowUpRight } from 'react-icons/fi'
import { FaRegStar, FaCodeBranch } from 'react-icons/fa6'
import type { RepoSummary } from '@/data/activity'
import styles from './RepoCard.module.css'

export function RepoCard({ repo }: { repo: RepoSummary }) {
  return (
    <a className={styles.card} href={repo.url} target="_blank" rel="noreferrer noopener">
      <div className={styles.head}>
        <h4 className={styles.name}>{repo.name}</h4>
        <FiArrowUpRight aria-hidden className={styles.arrow} />
      </div>
      {repo.description ? <p className={styles.desc}>{repo.description}</p> : null}
      <div className={styles.meta}>
        {repo.language ? (
          <span className={styles.lang}>
            <span className={styles.dot} aria-hidden />
            {repo.language}
          </span>
        ) : null}
        <span className={styles.metaItem}>
          <FaRegStar aria-hidden /> {repo.stars}
        </span>
        <span className={styles.metaItem}>
          <FaCodeBranch aria-hidden /> {repo.forks}
        </span>
      </div>
    </a>
  )
}
