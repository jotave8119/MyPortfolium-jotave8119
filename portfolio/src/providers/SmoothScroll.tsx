import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Single scroll authority: Lenis owns scrolling, ScrollTrigger reads from it,
 * and GSAP's ticker is the ONE rAF loop driving Lenis — this is what prevents
 * the classic Lenis + ScrollTrigger jitter.
 *
 * When the user prefers reduced motion, Lenis is disabled and native scrolling
 * takes over.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Triggers depend on layout; recalc once fonts have loaded.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(update)
    }
  }, [reducedMotion])

  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  )
}
