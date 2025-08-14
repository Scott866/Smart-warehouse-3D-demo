import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '../store'

function Pallet({ position=[-14,0.2,0], color='#f59e0b' }){
  return (
    <group position={position}>
      <mesh position={[0,0,0]}>
        <boxGeometry args={[1.1, 0.2, 1.1]} />
        <meshStandardMaterial color={'#a16207'} />
      </mesh>
      <mesh position={[0,0.6,0]}>
        <boxGeometry args={[1.0, 0.8, 1.0]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

function Box({ position=[0,0,0] }){
  return (
    <mesh position={position}>
      <boxGeometry args={[0.5,0.4,0.4]} />
      <meshStandardMaterial color="#fca5a5" />
    </mesh>
  )
}

function Arm({ base=[0,0,0], phase=0 }){
  // simple 2-link arm animation
  const j1 = useRef()
  const j2 = useRef()
  useFrame((_,dt)=>{
    if (j1.current) j1.current.rotation.y = Math.sin((performance.now()/1000) + phase) * 0.6
    if (j2.current) j2.current.rotation.z = Math.cos((performance.now()/1000)*1.2 + phase) * 0.4
  })
  return (
    <group position={base}>
      <mesh position={[0,0.3,0]}><cylinderGeometry args={[0.2,0.2,0.6,24]} /><meshStandardMaterial color="#64748b" /></mesh>
      <group ref={j1} position={[0,0.6,0]}>
        <mesh position={[0.6,0,0]}><boxGeometry args={[1.2,0.12,0.12]} /><meshStandardMaterial color="#94a3b8" /></mesh>
        <group ref={j2} position={[1.2,0,0]}>
          <mesh position={[0.6,0,0]}><boxGeometry args={[1.2,0.12,0.12]} /><meshStandardMaterial color="#cbd5e1" /></mesh>
          <mesh position={[1.3,0,0]}><boxGeometry args={[0.2,0.2,0.2]} /><meshStandardMaterial color="#334155" /></mesh>
        </group>
      </group>
    </group>
  )
}

function Conveyor({ start=[-2,0,0], length=12 }){
  const rollers = []
  for(let i=0;i<10;i++) rollers.push(i)
  return (
    <group position={start}>
      <mesh><boxGeometry args={[length,0.2,1.2]} /><meshStandardMaterial color="#94a3b8" /></mesh>
      {rollers.map((i)=>(
        <mesh key={i} position={[ -length/2 + 1 + i*(length-2)/9, 0.21, 0 ]}>
          <cylinderGeometry args={[0.15,0.15,1.2,16]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      ))}
    </group>
  )
}

function MultiShuttle({ position=[12,0,0] }){
  return (
    <group position={position}>
      <mesh position={[0,1.2,0]}>
        <boxGeometry args={[6,2.4,4]} />
        <meshStandardMaterial color="#dbeafe" />
      </mesh>
      <mesh position={[0,2.4,0]}>
        <boxGeometry args={[6,0.1,4]} />
        <meshStandardMaterial color="#93c5fd" />
      </mesh>
    </group>
  )
}

export default function InboundFlow(){
  const { playing, phase, addEvent, inc } = useStore()
  const palletPos = useRef(-14)
  const exitPos = useRef(-8)
  const boxes = useRef([])
  const totePos = useRef(4)
  const [spawned, setSpawned] = useState(false)
  const [toteLoaded, setToteLoaded] = useState(false)

  useFrame((_, dt)=>{
    if(!playing) return
    // Phase 1: Pallet moves into ASRS (x from -14 to -8), then count +1
    if (phase===1){
      if (palletPos.current < -8){
        palletPos.current += dt * 2.5
      } else {
        if (!spawned){
          addEvent('栈板入库 ASRS +1')
          inc('palletsInASRS', 1)
          setSpawned(true)
        }
      }
    }
    // Phase 2: Pallet exits ASRS to depalletize zone (x from -8 to -2), boxes spawn to conveyor
    if (phase===2){
      if (exitPos.current < -2){
        exitPos.current += dt * 2.0
      } else {
        // spawn cartons gradually onto conveyor
        if (boxes.current.length < 6 && Math.random() < dt * 2.0){
          const idx = boxes.current.length
          const z = idx%2===0 ? -0.3 : 0.3
          const bx = -1.5 + (idx%3)*1.0
          boxes.current.push([bx, 0.4, z])
          addEvent('拆垛 → 箱上线 +1')
          inc('cartonsOnConv', 1)
        }
      }
    }
    // Phase 3: pick carton into tote; tote moves to MS
    if (phase===3){
      // consume boxes into tote
      if (boxes.current.length > 0 && Math.random() < dt * 1.5){
        boxes.current.pop()
        addEvent('机械手装箱至 Tote')
      }
      if (boxes.current.length===0 && !toteLoaded){
        setToteLoaded(true)
        addEvent('Tote 装满 → 进入 Multi‑Shuttle +1')
        inc('totesInMS', 1)
      }
      if (toteLoaded && totePos.current < 12){
        totePos.current += dt * 2.0
      }
    }
  })

  return (
    <group>
      {/* ASRS entry at x=-8 */}
      <Pallet position={[palletPos.current,0.2,0]} />
      {/* Pallet exit for depalletize */}
      <Pallet position={[exitPos.current,0.2,2.2]} color={'#fbbf24'} />
      {/* Two depalletizing arms */}
      <Arm base={[-3,0,1.6]} phase={0} />
      <Arm base={[-3,0,2.8]} phase={1.2} />
      <Conveyor start={[0,0,2.2]} length={12} />
      {/* Boxes on conveyor */}
      {boxes.current.map((p,i)=>(<Box key={i} position={[p[0]+0.5, p[1], p[2]+2.2]} />))}
      {/* Pick robot to tote */}
      <Arm base={[6,0,2.2]} phase={0.3} />
      {/* Tote box */}
      <mesh position={[totePos.current,0.35,2.2]}>
        <boxGeometry args={[0.9,0.3,0.6]} />
        <meshStandardMaterial color="#86efac" />
      </mesh>
      <MultiShuttle position={[12,0,2.2]} />
    </group>
  )
}