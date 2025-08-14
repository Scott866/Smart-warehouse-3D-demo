import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, OrthographicCamera, Html } from '@react-three/drei'
import useStore from './store'
import AGV from './actors/AGV'
import Scanner from './actors/Scanner'
import Conveyor from './actors/Conveyor'
import Systems from './systems/Systems'
import CameraRig from './systems/CameraRig'

function Floor({ which=1 }) {
  return (
    <group position={[0,(which-1)*10,0]}>
      <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[40, 24]} />
        <meshStandardMaterial color={which===1? '#f8fafc' : '#f1f5f9'} />
      </mesh>
      {/* lanes */}
      <gridHelper args={[40, 40, '#cbd5e1', '#e2e8f0']} position={[0,0.01,0]} />
    </group>
  )
}

function Warehouse() {
  const { floor } = useStore()
  return (
    <group>
      <Floor which={1} />
      <Floor which={2} />
      {/* Simple ASRS tower */}
      <group position={[12,0,0]}>
        <mesh position={[0,2,0]}>
          <boxGeometry args={[6, 4, 6]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      </group>
      {/* Simple Multi-Shuttle */}
      <group position={[-12,0,0]}>
        <mesh position={[0,1.2,0]}>
          <boxGeometry args={[6, 2.4, 6]} />
          <meshStandardMaterial color="#dbeafe" />
        </mesh>
      </group>
    </group>
  )
}

export default function Scene() {
  const { view } = useStore()
  useEffect(()=>{
    const onKey = (e)=>{
      const s = useStore.getState()
      if(e.code==='Space'){ s.togglePlay() }
      if(e.key==='n' || e.key==='N'){ s.stepOnce() }
      if(e.key==='1'){ s.setView('top') }
      if(e.key==='2'){ s.setView('iso') }
      if(e.key==='3'){ s.setView('free') }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  },[])
  return (
    <Canvas shadows camera={{ position: [12, 12, 18], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10,20,10]} intensity={1} castShadow />
      <Warehouse />
      <Systems />
      <AGV id="A1" color="#60a5fa" path="loopA" />
      <AGV id="A2" color="#22c55e" path="loopB" />
      <AGV id="A3" color="#f59e0b" path="loopC" />
      <Conveyor position={[-4,0,0]} />
      <Scanner type="pallet" position={[0,0,6]} />
      <Scanner type="carton" position={[0,0,-6]} />
      <CameraRig />
      {view==='top' && <OrthographicCamera makeDefault position={[0,40,0]} zoom={30} />}
      {view==='iso' && <PerspectiveCamera makeDefault position={[18,18,24]} fov={45} />}
      {view==='free' && <OrbitControls makeDefault />}
    </Canvas>
  )
}