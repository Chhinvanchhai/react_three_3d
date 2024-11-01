import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { SolarSystem } from './SolarSystem';
import { SpaceStation } from './SpaceStation';
import { SpaceMetro } from './SpaceMetro';
import { FallingStars } from './FallingStars';

export function World() {
  return (
    <Canvas
      camera={{ position: [20, 15, 20], fov: 60 }}
      style={{ background: '#000000' }}
    >
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} distance={100} decay={2} />
      <hemisphereLight 
        intensity={0.3}
        groundColor="#000000"
        skyColor="#ffffff"
      />
      
      {/* Environment */}
      <Stars
        radius={100}
        depth={50}
        count={7000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <FallingStars />

      {/* Solar System */}
      <SolarSystem />

      {/* Space Station */}
      <SpaceStation />

      {/* Space Metro */}
      <SpaceMetro />

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={100}
      />
    </Canvas>
  );
}