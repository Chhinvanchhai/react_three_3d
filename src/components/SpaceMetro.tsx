import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitLine } from './OrbitLine';

export function SpaceMetro() {
  const metroRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const orbitRadius = 25;
  const orbitSpeed = 0.003;

  useFrame((state) => {
    if (orbitRef.current && metroRef.current) {
      // Orbit movement
      orbitRef.current.rotation.y += orbitSpeed;
      // Tilt the metro for dynamic movement
      metroRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group rotation={[0.3, 0, 0]}>
      {/* Metro orbit line */}
      <OrbitLine radius={orbitRadius} color="#4a9eff" />
      
      {/* Metro train group */}
      <group ref={orbitRef}>
        <group ref={metroRef} position={[orbitRadius, 0, 0]}>
          {/* Main cabin */}
          <mesh>
            <capsuleGeometry args={[0.8, 4, 8, 16]} />
            <meshStandardMaterial 
              color="#88ccff"
              metalness={0.8}
              roughness={0.2}
              envMapIntensity={1}
            />
          </mesh>

          {/* Front window */}
          <mesh position={[0, 0, 2.2]}>
            <sphereGeometry args={[0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial
              color="#aaddff"
              metalness={0.9}
              roughness={0.1}
              opacity={0.7}
              transparent
            />
          </mesh>

          {/* Engine glow */}
          <pointLight
            position={[0, 0, -2.5]}
            distance={4}
            intensity={2}
            color="#4a9eff"
          />

          {/* Side windows */}
          {[-1, 0, 1].map((x) => (
            <mesh key={x} position={[0.82, 0.3, x]}>
              <boxGeometry args={[0.1, 0.4, 0.6]} />
              <meshStandardMaterial
                color="#aaddff"
                metalness={0.9}
                roughness={0.1}
                opacity={0.7}
                transparent
              />
            </mesh>
          ))}

          {/* Bottom thrusters */}
          {[-1.5, 0, 1.5].map((z) => (
            <mesh key={z} position={[0, -0.7, z]}>
              <cylinderGeometry args={[0.2, 0.3, 0.4]} />
              <meshStandardMaterial
                color="#4444ff"
                emissive="#0000ff"
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          ))}

          {/* Top antenna */}
          <mesh position={[0, 1.2, -1.5]} rotation={[0.3, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
        </group>
      </group>
    </group>
  );
}