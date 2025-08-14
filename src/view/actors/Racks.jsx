import React from 'react'

function Rack({ x=0, z=0, levels=4, bays=6 }){
  const items = []
  for(let i=0;i<levels;i++){
    for(let j=0;j<bays;j++){
      items.push([j*1.2, i*1.2 + 0.6, 0])
    }
  }
  return (
    <group position={[x,0,z]}>
      {/* uprights */}
      {[...Array(bays+1)].map((_,i)=>(
        <mesh key={'u'+i} position={[i*1.2-0.6, 2.4, -0.45]}>
          <boxGeometry args={[0.1, 4.8, 0.1]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      ))}
      {/* beams */}
      {[...Array(levels)].map((_,l)=>(
        <mesh key={'b'+l} position={[0, l*1.2+0.6, -0.45]}>
          <boxGeometry args={[bays*1.2, 0.08, 0.08]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      ))}
      {/* placeholder pallets */}
      {items.map((p,i)=>(
        <mesh key={i} position={[p[0]-((bays-1)*1.2)/2, p[1], 0]}>
          <boxGeometry args={[0.9, 0.4, 0.9]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
      ))}
    </group>
  )
}

export default function Racks(){
  return (
    <group position={[0,0,0]}>
      <Rack x={-8} z={-4} />
      <Rack x={-8} z={4} />
      <Rack x={8} z={-4} />
      <Rack x={8} z={4} />
    </group>
  )
}