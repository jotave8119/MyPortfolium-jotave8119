import { Suspense, lazy, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowDown } from 'react-icons/fi'
import { gsap } from '@/lib/gsap'
import { useShould3D } from '@/hooks/useShould3D'
import { useScrollTo } from '@/hooks/useScrollTo'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { HeroFallback } from '@/three/HeroFallback'
import styles from './Hero.module.css'

const HeroCanvas = lazy(() => import('@/three/HeroCanvas'))

export function Hero() {
  const { t } = useTranslation()
  const should3D = useShould3D()
  const scrollTo = useScrollTo()
  const reducedMotion = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-anim]', {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.15,
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="top" className={styles.hero} ref={rootRef} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true">
        {should3D ? (
          <Suspense fallback={<HeroFallback />}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <HeroFallback />
        )}
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={styles.greeting} data-hero-anim>
          {t('hero.greeting')}
        </p>
        <h1 id="hero-title" className={styles.name}>
          <span data-hero-anim>João Vitor</span>
          <span data-hero-anim>Teixeira</span>
        </h1>
        <p className={styles.role} data-hero-anim>
          <span className={styles.roleMark}>—</span> {t('hero.role')}
        </p>
        <p className={styles.tagline} data-hero-anim>
          {t('hero.tagline')}
        </p>
        <div className={styles.ctas} data-hero-anim>
          <a
            href="#work"
            className={styles.primary}
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#work')
            }}
          >
            {t('hero.ctaWork')}
          </a>
          <a
            href="#contact"
            className={styles.ghost}
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#contact')
            }}
          >
            {t('hero.ctaContact')}
          </a>
        </div>
      </div>

      <a
        href="#about"
        className={styles.scrollCue}
        onClick={(e) => {
          e.preventDefault()
          scrollTo('#about')
        }}
      >
        <span className="mono">{t('hero.scroll')}</span>
        <FiArrowDown aria-hidden />
      </a>
    </section>
  )
}
