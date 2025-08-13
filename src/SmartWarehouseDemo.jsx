/*
Smart Warehouse 3D Demo (React + react-three-fiber)

How to use:
1. npm install
2. npm run dev
Notes:
- Abstract geometry to represent ASRS, Multi-Shuttle, AMR, conveyors, robotic arms, and scanning zones.
*/

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float, Bounds } from "@react-three/drei";
import { Leva, useControls } from "leva";

function Rack({ position = [0, 0, 0], size = [1, 4, 6], color = "#7dbbe6", columns = 6 }) {
  // simple rack built from stacked boxes
  const items = useMemo(() => {
    const arr = [];
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < 4; r++) {
        arr.push([c * (size[0] + 0.05) - (columns - 1) * (size[0] + 0.05) / 2, -size[1] / 2 + 0.6 + r * 0.9, c * 0.2]);
      }
    }
    return arr;
  }, [columns, size]);

  return (
    <group position={position}>
      {/* frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size[0] * columns + (columns - 1) * 0.05, size[1], size[2]]} />
        <meshStandardMaterial roughness={0.6} color="#dfeffd" />
      </mesh>
      {/* shelves items */}
      {items.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.9 * size[0], 0.6, 0.6]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function Conveyor({ position = [0, 0, 0], length = 6, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[length, 0.1, 0.8]} />
        <meshStandardMaterial color="#aaa" />
      </mesh>
      {/* rollers */}
      {Array.from({ length: Math.floor(length * 2) }).map((_, i) => (
        <mesh key={i} position={[-length / 2 + i * 0.5 + 0.25, 0.01, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.9, 16]} />
          <meshStandardMaterial color="#666" />
        </mesh>
      ))}
    </group>
  );
}

function RobotArm({ position = [0, 0, 0], speed = 1, active = true }) {
  const ref = useRef();
  useFrame((state) => {
    if (!active) return;
    ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * speed) * 0.6;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} ref={ref}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#ffb86b" />
      </mesh>
      <mesh position={[0, 0.9, 0.2]}> 
        <cylinderGeometry args={[0.06, 0.06, 0.4, 12]} />
        <meshStandardMaterial color="#ff8a00" />
      </mesh>
    </group>
  );
}

function MovingAGV({ path = [[-3, 0, 0], [3, 0, 0]], t = 0 }) {
  // simple linear path movement
  const ref = useRef();
  useFrame((state) => {
    const s = (state.clock.getElapsedTime() * 0.4 + t) % 1;
    const [x1, y1, z1] = path[0];
    const [x2, y2, z2] = path[1];
    const x = x1 + (x2 - x1) * s;
    const z = z1 + (z2 - z1) * s;
    const y = 0.1;
    ref.current.position.set(x, y, z);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.6, 0.2, 0.6]} />
      <meshStandardMaterial color="#36c" />
    </mesh>
  );
}

function ScanZone({ position = [0, 0, 0], label = "Scan" }) {
  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[0, 0.05, 0]}> 
          <boxGeometry args={[1, 0.02, 1]} />
          <meshStandardMaterial transparent opacity={0.25} color="#33ff7a" />
        </mesh>
      </Float>
      <Html position={[0, 0.8, 0]} center>
        <div style={{ background: "rgba(0,0,0,0.6)", color: "#fff", padding: 6, borderRadius: 6, fontSize: 12 }}>{label}</div>
      </Html>
    </group>
  );
}

function Floor1({ play = true }) {
  return (
    <group>
      {/* ASRS area - left */}
      <Rack position={[-6, 1.5, -2]} size={[0.6, 6, 6]} columns={6} color="#7ad0a8" />

      {/* Multi-Shuttle - center */}
      <Rack position={[-0.5, 1.3, -2]} size={[0.5, 4.5, 5]} columns={4} color="#f7d76f" />

      {/* PPS / Cut-to-Fit area - right */}
      <group position={[5, 0, -1]}>
        <mesh position={[0, 0.1, 0]}> 
          <boxGeometry args={[3.2, 0.2, 4]} />
          <meshStandardMaterial color="#e6f7ff" />
        </mesh>
        <Html position={[0, 1.2, 0]} center>
          <div style={{ background: "rgba(0,0,0,0.6)", color: "#fff", padding: 6, borderRadius: 6, fontSize: 12 }}>PPS / Cut-to-Fit</div>
        </Html>
      </group>

      {/* Conveyors */}
      <Conveyor position={[-3, 0, 2]} length={6} />
      <Conveyor position={[2.5, 0, 1.2]} length={5} rotation={-0.5} />

      {/* Robotic arms */}
      <RobotArm position={[-4, 0, 2]} speed={1.6} active={play} />
      <RobotArm position={[4.8, 0, 0.5]} speed={1.2} active={play} />

      {/* Scan zones */}
      <ScanZone position={[-3, 0.12, 2]} label={"Four-side scan"} />
      <ScanZone position={[1.5, 0.12, 1.2]} label={"Box scan"} />

      {/* AGV paths */}
      <MovingAGV path={[[-6, 0, 3], [6, 0, 3]]} t={0} />
      <MovingAGV path={[[-6, 0, -1], [6, 0, -1]]} t={0.45} />
    </group>
  );
}

function Floor2({ play = true }) {
  return (
    <group>
      {/* AMR area - right */}
      <group position={[4, 0, 3]}> 
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[5, 0.2, 6]} />
          <meshStandardMaterial color="#eef9f3" />
        </mesh>
        <Html position={[0, 1, 0]} center>
          <div style={{ background: "rgba(0,0,0,0.6)", color: "#fff", padding: 6, borderRadius: 6, fontSize: 12 }}>AMR Pick Area</div>
        </Html>
        {/* AMR moving */}
        <MovingAGV path={[[2, 0, 5], [6, 0, 2]]} t={0.2} />
      </group>

      {/* Price labeling & sorting */}
      <group position={[-1.5, 0, 0.5]}>
        <mesh position={[0, 0.1, 0]}> 
          <boxGeometry args={[3.5, 0.2, 3]} />
          <meshStandardMaterial color="#fff1e6" />
        </mesh>
        <Html position={[0, 0.9, 0]} center>
          <div style={{ background: "rgba(0,0,0,0.6)", color: "#fff", padding: 6, borderRadius: 6, fontSize: 12 }}>Price Labeling</div>
        </Html>
      </group>

      <ScanZone position={[3.5, 0.12, 2.8]} label={"Replenish"} />
    </group>
  );
}

export default function SmartWarehouseDemo() {
  const [floor, setFloor] = useState(1);
  const [play, setPlay] = useState(true);

  const { camX, camY, camZ } = useControls({ camX: { value: 0, min: -10, max: 10 }, camY: { value: 5, min: 1, max: 20 }, camZ: { value: 12, min: 2, max: 30 } });

  return (
    <div className="w-full h-screen relative">
      <Leva collapsed />
      <div style={{ position: "absolute", zIndex: 2, left: 16, top: 12 }}>
        <button className="px-4 py-2 mr-2 rounded bg-indigo-600 text-white" onClick={() => setFloor(1)}>Floor 1</button>
        <button className="px-4 py-2 mr-2 rounded bg-indigo-600 text-white" onClick={() => setFloor(2)}>Floor 2</button>
        <button className="px-4 py-2 mr-2 rounded bg-green-600 text-white" onClick={() => setPlay(p => !p)}>{play ? 'Pause' : 'Play'}</button>
      </div>

      <Canvas camera={{ position: [camX, camY, camZ], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />

        <Bounds fit observe margin={1.2}>
          <group position={[0, 0, 0]}>
            {/* ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}> 
              <planeGeometry args={[40, 28]} />
              <meshStandardMaterial color="#f7f9fb" />
            </mesh>

            {/* Render floors */}
            {floor === 1 ? <Floor1 play={play} /> : <Floor2 play={play} />}

            {/* Labels */}
            <Html position={[-6, 4.2, -2]} center>
              <div style={{ background: "rgba(0,0,0,0.7)", color: "#fff", padding: 8, borderRadius: 6 }}>ASRS (Pallet)</div>
            </Html>
            <Html position={[-0.5, 3, -2]} center>
              <div style={{ background: "rgba(0,0,0,0.7)", color: "#fff", padding: 8, borderRadius: 6 }}>Multi-Shuttle (Carton)</div>
            </Html>
            <Html position={[4, 1.8, 3]} center>
              <div style={{ background: "rgba(0,0,0,0.7)", color: "#fff", padding: 8, borderRadius: 6 }}>AMR Area</div>
            </Html>
          </group>
        </Bounds>

        <OrbitControls makeDefault />
      </Canvas>

      <div style={{ position: 'absolute', right: 18, top: 12, zIndex: 2, width: 260, background: 'rgba(255,255,255,0.9)', padding: 12, borderRadius: 8 }}>
        <h3 style={{ margin: 0, marginBottom: 6 }}>Legend</h3>
        <div style={{ fontSize: 13 }}>- Green zones: Scan areas
<br />- Tall green racks: ASRS (pallet)
<br />- Yellow-mid racks: Multi-shuttle
<br />- Blue moving boxes: AGV / AMR</div>
      </div>
    </div>
  );
}
