import { useCallback } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Smooth-scrolls to a selector.
 *
 * Lenis drives smooth scrolling on desktop (pointer-driven). On touch devices
 * Lenis does NOT control native touch scrolling by default, so `lenis.scrollTo`
 * silently fails there — we scroll natively instead, which is reliable on
 * iOS/Android. Native scrolling is also used when Lenis isn't mounted (reduced
 * motion).
 */
export function useScrollTo(offset = -72) {
  const lenis = useLenis()

  return useCallback(
    (target: string) => {
      const el = document.querySelector(target)
      if (!el) return

      const coarsePointer = window.matchMedia('(pointer: coarse)').matches

      if (lenis && !coarsePointer) {
        lenis.scrollTo(target, { offset, force: true })
      } else {
        const y = el.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    },
    [lenis, offset],
  )
}
