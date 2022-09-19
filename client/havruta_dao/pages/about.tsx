// Threejs example: threejs.org/examples/?q=asc#webgl_effects_ascii

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, useCursor } from '@react-three/drei';
import { AsciiEffect } from 'three-stdlib';
import { Col, Row } from 'antd';
import Image from 'next/image';
import roadmap from '../assets/images/roadmap.png';

export default function App() {
  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Canvas style={{ width: '100%', height: '50vh' }} onScroll={(e) => e.stopPropagation}>
          {/* <color attach="background" args={['rgba(0,0,0,0)']} /> */}
          <spotLight position={[15, 0, 5]} angle={0.15} penumbra={1} />
          <pointLight position={[10, 10, 15]} />
          <Torusknot />

          <AsciiRenderer invert />
          <Text
            position={[0, -3, 0]}
            fontSize={2}
            color="#bae637"
            material-fog={false}
            letterSpacing={0}
          >
            Havruta DAO
            <meshStandardMaterial color="gray" opacity={0.01} transparent />
          </Text>
        </Canvas>
      </Col>
      <Col span={24}>
        <Image src={roadmap} alt="roadmap"></Image>
      </Col>
    </Row>
  );
}

function Torusknot(props: any) {
  const ref = useRef<any>();
  //   useCursor(hovered);
  useFrame((state, delta) => (ref.current.rotation.y += delta / 1));
  return (
    <mesh {...props} ref={ref} scale={1.0}>
      <octahedronGeometry args={[2, 0]} />
      <meshStandardMaterial color="gray" opacity={0.01} transparent />
    </mesh>
  );
}

function AsciiRenderer({ renderIndex = 1, characters = '   .:-+*=%@# ', ...options }) {
  // Reactive state
  const { size, gl, scene, camera } = useThree();

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, options);
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0px';
    effect.domElement.style.left = '0px';
    effect.domElement.style.color = '#bae637';
    // effect.domElement.style.backgroundColor = '#262626';
    effect.domElement.style.pointerEvents = 'none';
    return effect;
  }, [characters, options.invert]);

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.parentNode.appendChild(effect.domElement);
    return () => gl.domElement.parentNode.removeChild(effect.domElement);
  }, [effect]);

  //   // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  //   // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera);
  }, renderIndex);

  // This component returns nothing, it has no view, it is a purely logical
}
