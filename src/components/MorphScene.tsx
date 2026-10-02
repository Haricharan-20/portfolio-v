import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'

function SecurityCore() {
  const mesh = useRef<Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const { x, y } = state.pointer
    mesh.current.rotation.x += (y * 0.12 - mesh.current.rotation.x) * 0.035
    mesh.current.rotation.y += (x * 0.22 - mesh.current.rotation.y) * 0.035
    mesh.current.rotation.z += 0.0015
  })

  return (
    <Float speed={1.2} rotationIntensity={0.28} floatIntensity={0.45}>
      <mesh ref={mesh} scale={1.15}>
        <icosahedronGeometry args={[1.45, 5]} />
        <MeshDistortMaterial
          color="#d65d48"
          roughness={0.28}
          metalness={0.72}
          distort={0.34}
          speed={1.6}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  )
}

export default function MorphScene() {
  return (
    <div className="morph-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 5.2], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.35} />
        <pointLight position={[2.8, 2.5, 4]} intensity={18} color="#ffd2ad" />
        <pointLight position={[-3, -2, 1]} intensity={7} color="#8da5bf" />
        <SecurityCore />
      </Canvas>
      <span className="morph-scene__label">MORPH / 07</span>
    </div>
  )
}
