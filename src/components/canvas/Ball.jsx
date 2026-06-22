import React, { Suspense, useMemo, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
  MeshTransmissionMaterial,
  Environment,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const meshRef = useRef();
  const [decal] = useTexture([props.imgUrl]);

  const decalConfig = useMemo(() => {
    if (!decal) return null;
    decal.flipY = false;
    return decal;
  }, [decal]);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle pulsing scale
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + props.index * 0.5) * 0.02;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#915EFF" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1.5} color="#00cea8" />

      <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1d1836"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          metalness={0.8}
          roughness={0.2}
          emissive="#0a0820"
          emissiveIntensity={0.5}
        />
        {decalConfig && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decalConfig}
            flatShading
          />
        )}
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, index = 0 }) => {
  const [hasError, setHasError] = useState(false);

  if (!icon || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-tertiary to-primary rounded-full p-2">
        <img
          src={icon}
          alt="tech"
          className="w-full h-full object-contain rounded-full"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop="always"
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1}
        gl={{
          preserveDrawingBuffer: false,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{
          position: [0, 0, 5],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        onCreated={(state) => {
          state.gl.setClearColor("#050816", 0);
        }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
            autoRotate
            autoRotateSpeed={4}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
          <Environment preset="city" />
          <Ball imgUrl={icon} index={index} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default BallCanvas;
