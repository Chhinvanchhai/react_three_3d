import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Star {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  lifetime: number;
  maxLifetime: number;
}

export function FallingStars() {
  const starsRef = useRef<THREE.Points>(null);
  const starsData = useRef<Star[]>([]);

  // Initialize star data
  useMemo(() => {
    const createStar = () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        50 + Math.random() * 20,
        (Math.random() - 0.5) * 100
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        -2 - Math.random() * 2,
        (Math.random() - 0.5) * 0.5
      ),
      lifetime: 0,
      maxLifetime: 2 + Math.random() * 2
    });

    starsData.current = Array(20).fill(null).map(createStar);
  }, []);

  useFrame((state, delta) => {
    if (!starsRef.current) return;

    const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
    const colors = starsRef.current.geometry.attributes.color.array as Float32Array;

    starsData.current.forEach((star, i) => {
      // Update position
      star.position.add(star.velocity.clone().multiplyScalar(delta));
      star.lifetime += delta;

      // Reset star if it's too low or lifetime exceeded
      if (star.position.y < -50 || star.lifetime > star.maxLifetime) {
        Object.assign(star, {
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 100,
            50 + Math.random() * 20,
            (Math.random() - 0.5) * 100
          ),
          lifetime: 0
        });
      }

      // Update position in geometry
      const idx = i * 3;
      positions[idx] = star.position.x;
      positions[idx + 1] = star.position.y;
      positions[idx + 2] = star.position.z;

      // Update color based on lifetime
      const intensity = 1 - (star.lifetime / star.maxLifetime);
      colors[idx] = 1;
      colors[idx + 1] = intensity;
      colors[idx + 2] = intensity;
    });

    starsRef.current.geometry.attributes.position.needsUpdate = true;
    starsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(starsData.current.length * 3);
    const colors = new Float32Array(starsData.current.length * 3);

    starsData.current.forEach((star, i) => {
      const idx = i * 3;
      positions[idx] = star.position.x;
      positions[idx + 1] = star.position.y;
      positions[idx + 2] = star.position.z;

      colors[idx] = 1;
      colors[idx + 1] = 1;
      colors[idx + 2] = 1;
    });

    return [positions, colors];
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}