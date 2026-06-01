import { useEffect, useRef, useState } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
  /** keep observing and toggle back to false when out of view (default: false) */
  repeat?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  repeat = false,
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (!repeat) obs.unobserve(el)
        } else if (repeat) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, repeat])

  return { ref, inView }
}
