import { createElement, type ElementType, type ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

interface RevealProps {
  children: ReactNode
  /** stagger delay in seconds */
  delay?: number
  as?: ElementType
  className?: string
}

/**
 * Fades + lifts its children into view once. Initial/animated state lives in
 * the global `.reveal` class, which is a no-op under prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, as = 'div', className }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  return createElement(
    as,
    {
      ref,
      className: ['reveal', inView && 'is-visible', className].filter(Boolean).join(' '),
      style: delay ? { transitionDelay: `${delay}s` } : undefined,
    },
    children,
  )
}
