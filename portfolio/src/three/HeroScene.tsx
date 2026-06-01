import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { MathUtils, type Mesh } from 'three'

function Blob() {
  const ref = useRef<Mesh>(null)

  // Subtle pointer parallax (pointer is normalized -1..1 in R3F).
  useFrame((state) => {
    const mesh = ref.current
    if (!mesh) return
    mesh.rotation.y = MathUtils.lerp(mesh.rotation.y, state.pointer.x * 0.5, 0.04)
    mesh.rotation.x = MathUtils.lerp(mesh.rotation.x, -state.pointer.y * 0.5, 0.04)
  })

  return (
    <mesh ref={ref} scale={1.7}>
      <icosahedronGeometry args={[1, 32]} />
      <MeshDistortMaterial
        color="#e2543b"
        roughness={0.32}
        metalness={0.15}
        distort={0.4}
        speed={1.6}
      />
    </mesh>
  )
}

export function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#ff8e72" />
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.1}>
        <Blob />
      </Float>
    </>
  )
}
