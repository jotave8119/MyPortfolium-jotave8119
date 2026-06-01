import { useCallback } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Smooth-scrolls to a selector. Uses Lenis when mounted, falling back to native
 * scrolling (e.g. under prefers-reduced-motion, where Lenis is disabled).
 */
export function useScrollTo(offset = -72) {
  const lenis = useLenis()

  return useCallback(
    (target: string) => {
      if (lenis) {
        lenis.scrollTo(target, { offset })
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [lenis, offset],
  )
}
