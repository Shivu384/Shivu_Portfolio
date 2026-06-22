import React, { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Decal, useTexture, Preload, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import CanvasLoader from "../Loader";

const BadgeMedal = ({ imgUrl }) => {
  const ref = useRef();
  const [decal] = useTexture([imgUrl]);

  if (decal) decal.flipY = false;

  useFrame((state) => {
    if (ref.current) {
      // Gentle wobble
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#ffd700" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#915EFF" />

      {/* Outer rim (gold ring) */}
      <mesh>
        <torusGeometry args={[1.4, 0.18, 32, 64]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#b8860b"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Medal disc */}
      <mesh ref={ref}>
        <cylinderGeometry args={[1.2, 1.2, 0.18, 64]} />
        <meshStandardMaterial
          color="#1d1836"
          metalness={0.9}
          roughness={0.2}
          emissive="#2a1f6e"
          emissiveIntensity={0.3}
        />
        {decal && (
          <Decal
            position={[0, 0.1, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.4}
            map={decal}
            flatShading
          />
        )}
      </mesh>

      {/* Ribbon */}
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.05]} />
        <meshStandardMaterial color="#915EFF" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#bf61ff" metalness={0.5} roughness={0.3} />
      </mesh>
    </Float>
  );
};

const BadgeCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 2 + 0.3}
          minPolarAngle={Math.PI / 2 - 0.3}
        />
        <BadgeMedal imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BadgeCanvas;
