import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, MeshTransmissionMaterial, Float } from "@react-three/drei";

import CanvasLoader from "../Loader";

const TorusRing = ({ radius, tube, color, speed, tiltX = 0 }) => {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += speed;
      ref.current.rotation.x = tiltX + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <mesh ref={ref} rotation={[tiltX, 0, 0]}>
      <torusGeometry args={[radius, tube, 32, 80]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.18}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
};

const GlassSphere = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.6, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0}
          transmissionSampler
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
    </Float>
  );
};

const FloatingRingScene = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#915EFF" />
      <pointLight position={[-3, -3, -3]} intensity={1} color="#00cea8" />

      <TorusRing radius={3} tube={0.06} color="#915EFF" speed={0.004} tiltX={0.4} />
      <TorusRing radius={2.2} tube={0.04} color="#00cea8" speed={-0.007} tiltX={-0.6} />
      <TorusRing radius={4} tube={0.03} color="#bf61ff" speed={0.003} tiltX={1.2} />
      <GlassSphere />
    </>
  );
};

const FloatingRingCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <FloatingRingScene />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default FloatingRingCanvas;
