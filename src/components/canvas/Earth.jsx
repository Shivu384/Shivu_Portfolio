import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Float } from "@react-three/drei";

import CanvasLoader from "../Loader";

// Orbiting node dots around the earth
const OrbitNode = ({ radius, speed, color, yOffset }) => {
  const ref = useRef();
  const angle = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    angle.current += delta * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(angle.current) * radius;
      ref.current.position.z = Math.sin(angle.current) * radius;
      ref.current.position.y = yOffset + Math.sin(angle.current * 2) * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </mesh>
  );
};

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  const earthRef = useRef();

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#4fc3f7" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7b1fa2" />
      <spotLight position={[0, 10, 5]} angle={0.4} penumbra={1} intensity={1.5} />

      <primitive
        ref={earthRef}
        object={earth.scene}
        scale={2.5}
        position-y={0}
        rotation-y={0}
      />

      {/* Orbiting network nodes */}
      <OrbitNode radius={3.2} speed={0.5} color="#00cea8" yOffset={0.2} />
      <OrbitNode radius={3.8} speed={-0.3} color="#915EFF" yOffset={-0.4} />
      <OrbitNode radius={3.5} speed={0.7} color="#f272c8" yOffset={0.5} />
      <OrbitNode radius={4.2} speed={-0.2} color="#ffffff" yOffset={0} />
      <OrbitNode radius={3.0} speed={0.9} color="#ffd700" yOffset={-0.2} />

      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[2.75, 32, 32]} />
        <meshStandardMaterial
          color="#4fc3f7"
          transparent
          opacity={0.04}
          side={2}
        />
      </mesh>
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
