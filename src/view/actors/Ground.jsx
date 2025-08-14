import React from 'react'

export default function Ground(){
  return (
    <group>
      <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[40, 22]} />
        <meshStandardMaterial color={'#f8fafc'} />
      </mesh>
      <gridHelper args={[40, 40, '#cbd5e1', '#e2e8f0']} position={[0,0.01,0]} />
    </group>
  )
}