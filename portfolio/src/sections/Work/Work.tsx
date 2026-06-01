import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/SectionHeading/SectionHeading'
import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import { projects } from '@/data/projects'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './Work.module.css'

export function Work() {
  const { t } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Always reveal; under reduced motion fade only (no movement/scale).
      gsap.from('[data-card]', {
        y: reducedMotion ? 0 : 64,
        opacity: 0,
        scale: reducedMotion ? 1 : 0.97,
        duration: reducedMotion ? 0.45 : 1.1,
        ease: 'power3.out',
        stagger: reducedMotion ? 0.06 : 0.14,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="work" className={`section ${styles.work}`} aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow={t('work.eyebrow')}
          title={t('work.title')}
          titleId="work-title"
          intro={t('work.intro')}
        />

        <div className={styles.grid} ref={gridRef}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
