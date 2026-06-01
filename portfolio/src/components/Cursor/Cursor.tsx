import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './Cursor.module.css'

const INTERACTIVE = 'a, button, input, textarea, select, label, [data-cursor="hover"]'

/**
 * Custom pointer: a trailing ring + precise dot, plus a soft glow that follows
 * the cursor and lightly lifts the background in empty areas. Desktop / fine
 * pointers only. Under prefers-reduced-motion the ring snaps instantly (no
 * smooth trailing) but the cursor and glow still render.
 */
export function Cursor() {
  const reducedMotion = usePrefersReducedMotion()
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Touch / coarse pointers keep the native (absent) cursor.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    const glow = glowRef.current
    if (!ring || !dot || !glow) return

    document.body.classList.add('has-custom-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0
    const lerp = reducedMotion ? 1 : 0.18

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      glow.style.setProperty('--mx', `${mx}px`)
      glow.style.setProperty('--my', `${my}px`)
    }

    const loop = () => {
      rx += (mx - rx) * lerp
      ry += (my - ry) * lerp
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      ring.classList.toggle(styles.hover, !!target?.closest?.(INTERACTIVE))
    }

    const onDown = () => ring.classList.add(styles.down)
    const onUp = () => ring.classList.remove(styles.down)
    const onLeave = () => document.body.classList.add('cursor-hidden')
    const onEnter = () => document.body.classList.remove('cursor-hidden')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('has-custom-cursor', 'cursor-hidden')
    }
  }, [reducedMotion])

  return (
    <>
      <div ref={glowRef} className={styles.glow} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  )
}
