'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CarModel() {
  const bodyRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Floating animation
  useFrame((state) => {
    if (bodyRef.current) {
      bodyRef.current.rotation.y += 0.007;
      bodyRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <group>
      {/* Car Body */}
      <mesh
        ref={bodyRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.07 : 1}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.8, 0.4, 0.8]} />
        <meshPhysicalMaterial
          color={hovered ? "#0ea5e9" : "#10B981"}
          roughness={0.2}
          metalness={0.7}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
          transmission={0.1}
          ior={1.5}
        />
      </mesh>
      {/* Car Roof */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[1, 0.22, 0.7]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Wheels */}
      {[[-0.7, -0.23, 0.35], [0.7, -0.23, 0.35], [-0.7, -0.23, -0.35], [0.7, -0.23, -0.35]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.18, 32]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.4} />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      ))}
      {/* Headlights */}
      <mesh position={[0.95, 0, 0.22]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#fffde4" emissive="#fffde4" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.95, 0, -0.22]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#fffde4" emissive="#fffde4" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

export default function FloatingCarModel() {
  return (
    <>
      {/* Soft ambient and directional lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Car */}
      <CarModel />
      {/* Soft shadow under car */}
      <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="#000" opacity={0.18} transparent />
      </mesh>
      {/* Modern gradient background */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial color="#e0f7fa" />
      </mesh>
    </>
  );
}