import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/SectionHeading/SectionHeading'
import { Reveal } from '@/components/Reveal/Reveal'
import profile from '@/assets/images/profile.png'
import styles from './About.module.css'

const FACTS = ['location', 'role', 'focus', 'education'] as const

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow={t('about.eyebrow')}
          title={t('about.title')}
          titleId="about-title"
        />

        <div className={styles.grid}>
          <Reveal className={styles.bio}>
            <p className={styles.lead}>{t('about.bioLead')}</p>
            <p className={styles.body}>{t('about.bioBody')}</p>
          </Reveal>

          <Reveal className={styles.aside} delay={0.12}>
            <div className={styles.photoWrap}>
              <img
                src={profile}
                alt="João Vitor Teixeira"
                className={styles.photo}
                loading="lazy"
                decoding="async"
              />
            </div>
            <dl className={styles.facts}>
              {FACTS.map((f) => (
                <div key={f} className={styles.fact}>
                  <dt>{t(`about.facts.${f}Label`)}</dt>
                  <dd>{t(`about.facts.${f}Value`)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
