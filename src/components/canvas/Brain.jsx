import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

// Dense orbiting particle ring
const ParticleRing = ({ radius, count, color, speed, tilt = 0 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.35;
      pos[i * 3] = Math.cos(angle) * (radius + jitter);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * (radius + jitter);
    }
    return pos;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += speed;
      ref.current.rotation.x = tilt + Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.045} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
    </points>
  );
};

// Core animated neural sphere
const NeuralSphere = () => {
  const meshRef = useRef();
  const wireRef = useRef();
  const outerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = t * 0.09;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.12;
      wireRef.current.rotation.z = t * 0.06;
    }
    if (outerRef.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.06;
      outerRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.6}>
      {/* Dense icosahedron core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 4]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#5b21b6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* Outer wireframe — cyan */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.65, 3]} />
        <meshBasicMaterial color="#00d4aa" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Second wireframe — violet */}
      <mesh>
        <icosahedronGeometry args={[1.75, 2]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Outer atmospheric glow */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshStandardMaterial color="#7c3aed" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* Orbiting particle rings */}
      <ParticleRing radius={2.5} count={150} color="#a855f7" speed={0.009} />
      <ParticleRing radius={3.2} count={100} color="#00d4aa" speed={-0.006} tilt={0.3} />
      <ParticleRing radius={2.0} count={80} color="#f472b6" speed={0.013} tilt={-0.4} />
    </Float>
  );
};

// Background star field
const StarField = () => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 25;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 25;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.02} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </points>
  );
};

const BrainCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[6, 6, 6]} intensity={4} color="#a855f7" />
      <pointLight position={[-6, -4, -6]} intensity={2} color="#00d4aa" />
      <pointLight position={[0, 8, 2]} intensity={2} color="#f472b6" />

      <Suspense fallback={<CanvasLoader />}>
        <NeuralSphere />
        <StarField />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BrainCanvas;
