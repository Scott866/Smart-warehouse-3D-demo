import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '../store'

export default function Conveyor({ position=[0,0,0] }) {
  const belts = useRef([])
  useFrame((_, dt) => {
    belts.current.forEach((m,i)=>{
      if (m) { m.rotation.x += dt * (i%2===0? 1.2 : -1.2) }
    })
  })
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[6, 0.2, 1.2]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {[...Array(6)].map((_,i)=>(
        <mesh key={i} position={[-2.5 + i*1, 0.21, 0]} ref={m=>belts.current[i]=m}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      ))}
    </group>
  )
}