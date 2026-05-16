import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const lerp = (start, end, t) => start + (end - start) * t;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Three accent nodes that orbit the crystal.
const ORBIT_NODES = [
  { id: 'gold', color: '#d6b56d', angle: 0 },
  { id: 'cyan', color: '#22d3ee', angle: (2 * Math.PI) / 3 },
  { id: 'violet', color: '#8b5cf6', angle: (4 * Math.PI) / 3 },
];

/**
 * Soft studio environment — gives the metallic surfaces realistic,
 * refined reflections instead of a flat look.
 */
function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    return () => {
      scene.environment = null;
      envMap.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

/**
 * The scroll-driven 3D structure — a faceted metallic crystal inside a
 * wireframe lattice, with orbiting accent nodes. Scroll position drives
 * the revolve; a slow idle drift keeps it alive when the page is still.
 */
function CrystalStructure() {
  const groupRef = useRef(null);
  const idle = useRef(0);
  const reduced = useRef(prefersReducedMotion());

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (reduced.current) {
      group.rotation.set(0.4, 0.6, 0);
      return;
    }

    idle.current += delta * 0.05;
    const scrollRotation = (window.scrollY || 0) * 0.0022;
    const targetY = idle.current + scrollRotation;

    group.rotation.y = lerp(group.rotation.y, targetY, 0.08);
    group.rotation.x = lerp(group.rotation.x, 0.4 + scrollRotation * 0.22, 0.06);
  });

  return (
    <group ref={groupRef}>
      {/* Outer structural lattice */}
      <mesh scale={1.62}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.13} />
      </mesh>

      {/* Faceted metallic crystal core */}
      <mesh>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshStandardMaterial
          color="#0d0b16"
          metalness={1}
          roughness={0.16}
          envMapIntensity={1.15}
          emissive="#1d1740"
          emissiveIntensity={0.32}
          flatShading
        />
      </mesh>

      {/* Orbiting accent nodes */}
      {ORBIT_NODES.map((node) => (
        <mesh
          key={node.id}
          position={[
            Math.cos(node.angle) * 2.15,
            Math.sin(node.angle * 1.5) * 0.55,
            Math.sin(node.angle) * 2.15,
          ]}
          scale={0.085}
        >
          <sphereGeometry args={[1, 18, 18]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Scene3D — a fixed, full-screen 3D background layer.
 *
 * Inspired by scroll-driven 3D sites (e.g. lenis.dev), built entirely
 * with our own procedural geometry — no third-party 3D assets.
 */
const Scene3D = () => (
  <div className="absolute inset-0">
    <Canvas
      style={{ pointerEvents: 'none' }}
      camera={{ position: [0, 0, 4.9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.8]}
    >
      <StudioEnvironment />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 5]} intensity={2.6} color="#8b5cf6" />
      <directionalLight position={[-5, -2, 3]} intensity={1.8} color="#22d3ee" />
      <directionalLight position={[0, 4, -4]} intensity={1.6} color="#d6b56d" />
      <CrystalStructure />
    </Canvas>
  </div>
);

export default Scene3D;
