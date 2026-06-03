import type { ContributionDay } from '@/data/activity'
import styles from './ContributionHeatmap.module.css'

interface Props {
  weeks: ContributionDay[][]
  legendLess: string
  legendMore: string
}

export function ContributionHeatmap({ weeks, legendLess, legendMore }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.scroll}>
        <div className={styles.cols} role="img" aria-label="GitHub contributions">
          {weeks.map((week, wi) => (
            <div className={styles.col} key={wi}>
              {week.map((day) => (
                <span
                  key={day.date}
                  className={styles.cell}
                  data-level={day.level}
                  title={`${day.count} — ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.legend}>
        <span>{legendLess}</span>
        <span className={styles.cell} data-level={0} />
        <span className={styles.cell} data-level={1} />
        <span className={styles.cell} data-level={2} />
        <span className={styles.cell} data-level={3} />
        <span className={styles.cell} data-level={4} />
        <span>{legendMore}</span>
      </div>
    </div>
  )
}
