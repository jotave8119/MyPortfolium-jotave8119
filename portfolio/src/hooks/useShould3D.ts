import { useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Gate for mounting the WebGL hero. Returns false on mobile, when WebGL is
 * unavailable, or when the user prefers reduced motion — in which case the
 * static fallback is shown and no canvas is ever created.
 */
export function useShould3D(): boolean {
  const reducedMotion = usePrefersReducedMotion()
  // Capability is fixed for the session; compute once (client-only app).
  const [capable] = useState(() => {
    if (typeof window === 'undefined') return false
    const isSmallScreen = window.matchMedia('(max-width: 820px)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    return hasWebGL() && !isSmallScreen && !isCoarsePointer
  })

  return capable && !reducedMotion
}
