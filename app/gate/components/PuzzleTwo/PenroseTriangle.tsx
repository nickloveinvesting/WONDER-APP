'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ShadowShape } from '../../types';

interface PenroseTriangleProps {
  onShapeMatch: (shape: ShadowShape) => void;
  onRotate: () => void;
}

export default function PenroseTriangle({ onShapeMatch, onRotate }: PenroseTriangleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lastRotation = useRef({ x: 0, y: 0, z: 0 });
  
  // Create Penrose triangle geometry (simplified version)
  const geometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100, Math.PI * 2 / 3);
  
  useFrame(({ camera }) => {
    if (!meshRef.current) return;
    
    // Check if rotation changed
    const current = meshRef.current.rotation;
    const last = lastRotation.current;
    
    if (
      Math.abs(current.x - last.x) > 0.01 ||
      Math.abs(current.y - last.y) > 0.01 ||
      Math.abs(current.z - last.z) > 0.01
    ) {
      onRotate();
      lastRotation.current = { x: current.x, y: current.y, z: current.z };
    }
    
    // Simple shape matching based on rotation
    const rotY = ((current.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    
    // Match shapes based on rotation angles
    if (rotY > 0 && rotY < Math.PI / 3) {
      onShapeMatch('circle');
    } else if (rotY > Math.PI && rotY < Math.PI * 4 / 3) {
      onShapeMatch('square');
    } else if (rotY > Math.PI * 5 / 3) {
      onShapeMatch('triangle');
    }
  });
  
  return (
    <group>
      {/* Main triangle mesh */}
      <mesh ref={meshRef} castShadow position={[0, 0, 0]}>
        <primitive object={geometry} />
        <meshStandardMaterial
          color="#faf6f0"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Additional triangle parts for "impossible" effect */}
      <mesh castShadow position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
        <primitive object={geometry} />
        <meshStandardMaterial
          color="#faf6f0"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      <mesh castShadow position={[-0.8, 0, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <primitive object={geometry} />
        <meshStandardMaterial
          color="#faf6f0"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Shadow plane */}
      <mesh receiveShadow position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
}
