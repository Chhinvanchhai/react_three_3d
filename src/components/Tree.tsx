import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Tree({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const treeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y += 0.001;
      treeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={treeRef} position={position}>
      {/* Tree trunk */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 2]} />
        <meshStandardMaterial color="#4a3728" roughness={0.8} />
      </mesh>
      
      {/* Tree leaves */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[0.8, 1.5, 8]} />
        <meshStandardMaterial color="#3a7034" roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.8, 0]}>
        <coneGeometry args={[0.6, 1, 8]} />
        <meshStandardMaterial color="#467d3f" roughness={0.6} />
      </mesh>
    </group>
  );
}