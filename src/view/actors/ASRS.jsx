import React from 'react'
export default function ASRS(){return (<group position={[-8,0,6]}>{[0,1,2,3].map(i=>(<mesh key={i} position={[i*1.6,1,0]}><boxGeometry args={[1.4,2.4,1.2]}/><meshStandardMaterial color={'#e6eef8'}/></mesh>))}</group>)}
