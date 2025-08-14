import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Ground from './actors/Ground'
import Racks from './actors/Racks'
import StackerCranes from './actors/StackerCranes'
import InboundFlow from './flows/InboundFlow'

export default function Scene(){
  return (
    <Canvas shadows camera={{ position:[14,12,20], fov:45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10,20,10]} intensity={1} castShadow />
      <Ground />
      <Racks />
      <StackerCranes />
      <InboundFlow />
      <PerspectiveCamera makeDefault position={[16,14,22]} fov={45} />
      <OrbitControls enablePan enableRotate enableZoom />
    </Canvas>
  )
}