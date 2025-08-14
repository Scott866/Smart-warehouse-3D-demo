import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import useStore from '../store'

export default function CameraRig(){
  const { camera } = useThree()
  const { view } = useStore()
  useEffect(()=>{
    if(view==='iso'){ camera.position.set(18,18,24); camera.lookAt(0,0,0) }
    if(view==='top'){ camera.position.set(0,40,0); camera.lookAt(0,0,0) }
  },[view])
  return <OrbitControls enablePan enableRotate enableZoom />
}