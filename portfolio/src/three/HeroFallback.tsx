import styles from './HeroFallback.module.css'

/**
 * Static, intentional-looking backdrop used when WebGL is unavailable, on
 * mobile/low-power devices, under prefers-reduced-motion, and as the Suspense
 * fallback while the canvas chunk loads. Pure CSS — zero JS/WebGL cost.
 */
export function HeroFallback() {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <div className={styles.orb} />
      <div className={styles.grain} />
    </div>
  )
}
