import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitLine } from './OrbitLine';

interface PlanetProps {
  radius: number;
  position: [number, number, number];
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  orbitColor?: string;
  atmosphereColor?: string;
}

export function Planet({ 
  radius, 
  position, 
  color, 
  orbitRadius, 
  orbitSpeed, 
  rotationSpeed,
  orbitColor,
  atmosphereColor
}: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current && orbitRef.current) {
      // Rotate planet around its axis
      planetRef.current.rotation.y += rotationSpeed;
      
      // Orbit around the sun
      orbitRef.current.rotation.y += orbitSpeed;

      // Animate atmosphere if it exists
      if (atmosphereRef.current) {
        atmosphereRef.current.rotation.y -= rotationSpeed * 0.5;
      }
    }
  });

  return (
    <group ref={orbitRef}>
      <OrbitLine radius={orbitRadius} color={orbitColor} />
      <group position={[orbitRadius, 0, 0]}>
        {/* Planet core */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.7}
            metalness={0.3}
            map={null}
          />
        </mesh>

        {/* Atmosphere layer */}
        {atmosphereColor && (
          <mesh ref={atmosphereRef} scale={[1.2, 1.2, 1.2]}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial
              color={atmosphereColor}
              transparent
              opacity={0.3}
              side={THREE.BackSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}