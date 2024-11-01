import * as THREE from 'three';

interface OrbitLineProps {
  radius: number;
  color?: string;
}

export function OrbitLine({ radius, color = "#ffffff" }: OrbitLineProps) {
  const points = [];
  const segments = 64;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        radius * Math.cos(theta),
        0,
        radius * Math.sin(theta)
      )
    );
  }

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}