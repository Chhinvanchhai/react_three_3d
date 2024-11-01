import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Ground() {
  const groundRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groundRef.current) {
      const time = state.clock.getElapsedTime();
      groundRef.current.material.uniforms.time.value = time;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv * 20.0;
      float pattern = sin(uv.x + time * 0.5) * sin(uv.y + time * 0.5) * 0.1;
      vec3 color = mix(
        vec3(0.2, 0.5, 0.2),
        vec3(0.3, 0.6, 0.3),
        pattern + 0.5
      );
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh 
      ref={groundRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -0.1, 0]}
    >
      <planeGeometry args={[100, 100, 32, 32]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}