import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Planet } from './Planet';

export function SolarSystem() {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Sun with enhanced lighting */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          color="#ffa500"
          emissive="#ff4500"
          emissiveIntensity={2}
          toneMapped={false}
        />
        <pointLight intensity={2} distance={100} decay={2} />
      </mesh>

      {/* Mercury - closest to sun */}
      <Planet
        radius={0.4}
        position={[5, 0, 0]}
        color="#A0522D"
        orbitRadius={5}
        orbitSpeed={0.02}
        rotationSpeed={0.03}
        orbitColor="#666666"
      />

      {/* Venus - second planet */}
      <Planet
        radius={0.6}
        position={[7, 0, 0]}
        color="#DEB887"
        orbitRadius={7}
        orbitSpeed={0.015}
        rotationSpeed={0.02}
        orbitColor="#888888"
        atmosphereColor="#FFE4B5"
      />

      {/* Earth - third planet */}
      <Planet
        radius={0.8}
        position={[10, 0, 0]}
        color="#4169E1"
        orbitRadius={10}
        orbitSpeed={0.01}
        rotationSpeed={0.025}
        orbitColor="#AAAAAA"
        atmosphereColor="#87CEEB"
      />

      {/* Mars - fourth planet */}
      <Planet
        radius={0.5}
        position={[13, 0, 0]}
        color="#CD5C5C"
        orbitRadius={13}
        orbitSpeed={0.008}
        rotationSpeed={0.02}
        orbitColor="#CCCCCC"
        atmosphereColor="#FFE4E1"
      />

      {/* Jupiter - fifth planet */}
      <Planet
        radius={1.2}
        position={[17, 0, 0]}
        color="#DEB887"
        orbitRadius={17}
        orbitSpeed={0.005}
        rotationSpeed={0.04}
        orbitColor="#DDDDDD"
        atmosphereColor="#F4A460"
      />
    </group>
  );
}