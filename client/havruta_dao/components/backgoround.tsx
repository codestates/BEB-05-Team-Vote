import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';

export default function Background() {
  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        left: '0',
        top: '0',
        zIndex: '-1000',
      }}
      camera={{ position: [0, 0, 1] }}
    >
      <Stars />
    </Canvas>
  );
}

function Stars(props: any) {
  const ref = useRef<any>();
  const [sphere] = useState(() => inSphere(new Float32Array(1000), { radius: 1.5 }));
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 40;
    ref.current.rotation.y -= delta / 60;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#bae637"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
