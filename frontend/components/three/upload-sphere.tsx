"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei"
import type * as THREE from "three"

function DocumentSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[2.5, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#6d28d9"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
          emissive="#4c1d95"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  )
}

function InnerGlow() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <Sphere ref={meshRef} args={[2.2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#8b5cf6" transparent opacity={0.3} emissive="#8b5cf6" emissiveIntensity={0.5} />
    </Sphere>
  )
}

export function UploadSphere() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[5, 5, -5]} intensity={0.3} color="#22d3ee" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#a78bfa" angle={0.5} penumbra={1} />

        <DocumentSphere />
        <InnerGlow />

        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
