import { Reveal } from '@/components/Reveal/Reveal'
import styles from './SectionHeading.module.css'

interface Props {
  /** two-digit section number, e.g. "01" */
  index: string
  eyebrow: string
  title: string
  /** id used by aria-labelledby on the parent <section> */
  titleId: string
  intro?: string
}

export function SectionHeading({ index, eyebrow, title, titleId, intro }: Props) {
  return (
    <Reveal as="header" className={styles.heading}>
      <div className={styles.top}>
        <span className={styles.num} aria-hidden="true">
          §{index}
        </span>
        <span className={styles.eyebrow}>{eyebrow}</span>
      </div>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </Reveal>
  )
}
