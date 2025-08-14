import React, {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
export default function AGV(){const p=useRef(-20);useFrame((_,dt)=>{p.current+=dt*2; if(p.current>20) p.current=-20}); return (<mesh position={[p.current,0.4,-6]}><boxGeometry args={[1,0.3,1.2]}/><meshStandardMaterial color={'#60a5fa'}/></mesh>)}
