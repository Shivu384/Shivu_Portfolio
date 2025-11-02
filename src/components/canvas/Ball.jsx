import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  
  const decalConfig = useMemo(() => {
    if (!decal) return null;
    decal.flipY = false;
    return decal;
  }, [decal]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[0, 0, 0.05]} intensity={0.5} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
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

const BallCanvas = ({ icon }) => {
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
    <div className="w-full h-full relative" style={{ width: '100%', height: '100%' }}>
      <Canvas
        frameloop='always'
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        gl={{ 
          preserveDrawingBuffer: false,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        camera={{ 
          position: [0, 0, 5], 
          fov: 50,
          near: 0.1,
          far: 100
        }}
        onCreated={(state) => {
          state.gl.setClearColor('#050816', 0);
        }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI} 
            minPolarAngle={0}
            autoRotate
            autoRotateSpeed={3}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default BallCanvas;
