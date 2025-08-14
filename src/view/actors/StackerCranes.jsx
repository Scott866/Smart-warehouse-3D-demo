import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '../store'

function Crane({ x=0, z=0 }){
  const mast = useRef()
  const cab = useRef()
  const fork = useRef()
  const dir = useRef(1)
  const up = useRef(1)

  useFrame((_, dt)=>{
    const s = useStore.getState()
    if(!s.playing) return
    // travel along aisle Z
    if (mast.current){
      mast.current.position.z += dir.current * dt * 2.0
      if (mast.current.position.z > 6) dir.current = -1
      if (mast.current.position.z < -6) dir.current = 1
    }
    // lift up/down
    if (fork.current){
      fork.current.position.y += up.current * dt * 1.2
      if (fork.current.position.y > 3.2) up.current = -1
      if (fork.current.position.y < 0.6) up.current = 1
    }
  })

  return (
    <group position={[x,0,z]}>
      {/* rail */}
      <mesh position={[0,0,0]}>
        <boxGeometry args={[0.2, 0.1, 14]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* mast */}
      <group ref={mast}>
        <mesh position={[0,2.4,0]}>
          <boxGeometry args={[0.2, 4.8, 0.2]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
        {/* fork */}
        <mesh ref={fork} position={[0,0.6,0]}>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </group>
    </group>
  )
}

export default function StackerCranes(){
  return (
    <group>
      <Crane x={0} z={-4} />
      <Crane x={0} z={4} />
    </group>
  )
}