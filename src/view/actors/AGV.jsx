import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '../store'
import paths from '../paths'

export default function AGV({ id, color='#60a5fa', path='loopA' }) {
  const ref = useRef()
  const { playing, step, addEvent, incThroughput } = useStore()
  const pts = useMemo(()=>paths[path], [path])
  const speed = useRef(1.6 + Math.random()*0.6)
  const tRef = useRef(Math.random())
  const stopped = useRef(false)

  // Simple neighbor avoidance: slow down if another AGV is too close
  useFrame((_, dt) => {
    const s = useStore.getState()
    const doAdvance = s.playing || s.step
    if(!doAdvance) return
    if(s.step){ s.step = false }

    // compute current position
    const N = pts.length
    // basic speed easing
    const targetSpeed = stopped.current ? 0 : speed.current
    tRef.current += (targetSpeed * dt) / N
    if (tRef.current >= 1) tRef.current -= 1
    const i0 = Math.floor(tRef.current * N) % N
    const i1 = (i0 + 1) % N
    const p0 = pts[i0], p1 = pts[i1]
    const alpha = tRef.current * N - i0
    const x = p0[0] + (p1[0]-p0[0]) * alpha
    const z = p0[2] + (p1[2]-p0[2]) * alpha
    const y = p0[1]

    // neighbor check
    const others = s.__agvPositions || {}
    s.__agvPositions = { ...others, [id]: [x,y,z] }
    let tooClose = false
    for (const [oid, pos] of Object.entries(others)) {
      if (oid===id) continue
      const dx = pos[0]-x, dz = pos[2]-z
      const d2 = dx*dx + dz*dz
      if (d2 < 2.0*2.0) { tooClose = true; break }
    }
    stopped.current = tooClose

    if (ref.current) {
      ref.current.position.set(x, 0.4, z)
      const angle = Math.atan2(p1[2]-p0[2], p1[0]-p0[0])
      ref.current.rotation.y = -angle + Math.PI/2
    }
  })

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.2, 1.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* mast */}
      <mesh position={[0,0.5,0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  )
}