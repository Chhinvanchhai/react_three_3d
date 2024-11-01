import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SpaceStation() {
  const stationRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (stationRef.current) {
      stationRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={stationRef} position={[15, 5, 15]}>
      {/* Main station body */}
      <mesh>
        <cylinderGeometry args={[1, 1, 4, 8]} />
        <meshStandardMaterial color="#707070" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Solar panels */}
      <mesh position={[0, 0, 2.5]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.1, 4, 1]} />
        <meshStandardMaterial color="#4169e1" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, -2.5]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.1, 4, 1]} />
        <meshStandardMaterial color="#4169e1" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#303030" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}