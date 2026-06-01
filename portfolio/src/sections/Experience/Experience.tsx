import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/SectionHeading/SectionHeading'
import { Reveal } from '@/components/Reveal/Reveal'
import styles from './Experience.module.css'

const JOBS = ['datehome', 'grquest', 'a7', 'onda', 'devoler'] as const

export function Experience() {
  const { t } = useTranslation()

  return (
    <section
      id="experience"
      className={`section ${styles.experience}`}
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow={t('experience.eyebrow')}
          title={t('experience.title')}
          titleId="experience-title"
        />

        <ol className={styles.timeline} role="list">
          {JOBS.map((job, i) => (
            <Reveal as="li" key={job} className={styles.item} delay={i * 0.06}>
              <span className={styles.marker} aria-hidden="true" />
              <div className={styles.content}>
                <span className={`mono ${styles.period}`}>
                  {t(`experience.jobs.${job}.period`)}
                </span>
                <h3 className={styles.itemTitle}>{t(`experience.jobs.${job}.role`)}</h3>
                <p className={styles.company}>{t(`experience.jobs.${job}.company`)}</p>
                <p className={styles.itemDesc}>{t(`experience.jobs.${job}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
