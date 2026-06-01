import { useTranslation } from 'react-i18next'
import { FiArrowUpRight } from 'react-icons/fi'
import type { Project } from '@/data/types'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()

  return (
    <article className={styles.card}>
      <a
        className={styles.media}
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${t('work.viewProject')}: ${project.title}`}
      >
        <img
          src={project.image}
          alt={`${project.title} — screenshot`}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.cta}>
          {t('work.viewProject')}
          <FiArrowUpRight aria-hidden />
        </span>
      </a>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={`mono ${styles.year}`}>{project.year}</span>
        </div>
        <p className={styles.desc}>{t(project.descKey)}</p>
        <ul className={styles.stack} role="list">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
