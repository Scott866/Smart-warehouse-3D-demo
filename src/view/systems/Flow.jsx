import React from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '../store'
export default function Flow(){const palletPos={x:-24}; let tick=0; useFrame((_,dt)=>{const s=useStore.getState(); if(!s.playing) return; tick+=dt; if(tick>1){ if(s.phase===0||s.phase===1){ s.addEvent('Incoming -> ASRS'); s.inc('palletsASRS',1) } if(s.phase===2){ s.addEvent('ASRS -> Depalletize'); s.inc('cartonsOnConv',3) } if(s.phase===3){ s.addEvent('Conveyor -> Tote -> MS'); s.inc('totesInMS',1) } tick=0 } s.throughput = (s.throughput||0)*0.9 + Math.random()*0.7 })
  return null
}
