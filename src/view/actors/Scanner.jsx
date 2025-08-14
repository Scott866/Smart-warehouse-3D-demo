import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '../store'

export default function Scanner({ type='pallet', position=[0,0,0] }) {
  const ref = useRef()
  const beam = useRef()
  const [phase, setPhase] = useState(0)
  const { addEvent, incThroughput, incPallets, incCartons } = useStore()

  useFrame((_, dt) => {
    setPhase(p => (p + dt) % 2)
    if (beam.current) {
      const intensity = 0.2 + 0.8 * Math.abs(Math.sin(phase * Math.PI))
      beam.current.material.emissiveIntensity = intensity
      beam.current.material.opacity = 0.2 + 0.2 * intensity
    }
    // every ~6 seconds simulate a successful scan
    if (Math.random() < dt * 0.16) {
      const msg = type==='pallet' ? 'Pallet 4-side scan OK → ASRS +' : 'Carton scan OK → Multi-Shuttle +'
      addEvent(msg)
      incThroughput(0.6)
      if (type==='pallet') incPallets(1)
      if (type==='carton') incCartons(3)
    }
  })

  return (
    <group ref={ref} position={position}>
      <mesh position={[0,0.8,0]}>
        <boxGeometry args={[1.6,1.6,1.6]} />
        <meshStandardMaterial color={type==='pallet' ? '#fde68a' : '#a7f3d0'} transparent opacity={0.5} />
      </mesh>
      {/* scanning beam */}
      <mesh ref={beam} position={[0,1.6,0]}>
        <boxGeometry args={[2.2,0.06,2.2]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}