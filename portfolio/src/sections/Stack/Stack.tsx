import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/SectionHeading/SectionHeading'
import { Reveal } from '@/components/Reveal/Reveal'
import { skills } from '@/data/skills'
import type { SkillCategory } from '@/data/types'
import styles from './Stack.module.css'

const CATEGORIES: SkillCategory[] = ['frontend', 'backend', 'integrations', 'tooling']

export function Stack() {
  const { t } = useTranslation()

  return (
    <section id="stack" className={`section ${styles.stack}`} aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow={t('stack.eyebrow')}
          title={t('stack.title')}
          titleId="stack-title"
          intro={t('stack.intro')}
        />

        <div className={styles.groups}>
          {CATEGORIES.map((cat) => {
            const items = skills.filter((s) => s.category === cat)
            if (!items.length) return null
            return (
              <Reveal key={cat} className={styles.group}>
                <h3 className={styles.groupTitle}>{t(`stack.${cat}`)}</h3>
                <ul className={styles.list} role="list">
                  {items.map(({ id, label, icon: Icon }) => (
                    <li key={id} className={styles.item}>
                      {Icon ? <Icon aria-hidden className={styles.icon} /> : null}
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
