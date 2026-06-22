import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

// Main rotating star cloud
const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(8000), { radius: 1.4 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.0025}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Secondary star layer — different color & speed
const Stars2 = () => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(3000), { radius: 1.1 })
  );

  useFrame((_, delta) => {
    ref.current.rotation.x += delta / 20;
    ref.current.rotation.z -= delta / 25;
  });

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#915EFF"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Cyan accent stars
const Stars3 = () => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(1500), { radius: 1.3 })
  );

  useFrame((_, delta) => {
    ref.current.rotation.y += delta / 30;
    ref.current.rotation.x -= delta / 35;
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00cea8"
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <Stars />
          <Stars2 />
          <Stars3 />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
