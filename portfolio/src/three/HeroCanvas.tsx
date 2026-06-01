import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { HeroScene } from './HeroScene'
import { HeroFallback } from './HeroFallback'

/**
 * WebGL hero canvas. Lazy-loaded so the three.js payload stays out of the
 * initial bundle. Pauses its render loop when scrolled out of view or when the
 * tab is hidden, clamps DPR, and degrades on performance decline.
 */
export default function HeroCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [dpr, setDpr] = useState(1.5)
  const [active, setActive] = useState(true)
  const [lost, setLost] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0.05 },
    )
    io.observe(el)

    const onVisibility = () => setActive(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  if (lost) return <HeroFallback />

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        dpr={dpr}
        frameloop={active ? 'always' : 'demand'}
        camera={{ fov: 35, position: [0, 0, 5] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', () => setLost(true))
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)}>
          <AdaptiveDpr pixelated />
          <HeroScene />
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}
