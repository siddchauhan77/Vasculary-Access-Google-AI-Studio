
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Cylinder, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Represents a Blood Cell (Erythrocyte)
const BloodCell = ({ position, color, scale = 1, rotationOffset = 0 }: { position: [number, number, number]; color: string; scale?: number, rotationOffset?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Flow movement
      ref.current.position.x = position[0] + Math.sin(t * 0.5 + position[1]) * 0.5;
      ref.current.position.y = position[1] + Math.cos(t * 0.3 + position[0]) * 0.2;
      
      // Gentle rotation
      ref.current.rotation.x = t * 0.2 + rotationOffset;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={[scale * 1.2, scale * 1.2, scale * 0.4]} rotation={[Math.PI / 2, 0, 0]}>
      <meshPhysicalMaterial
        color={color}
        roughness={0.4}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.2}
        thickness={1}
      />
    </Sphere>
  );
};

const VesselWall = () => {
    return (
        <Cylinder args={[8, 8, 20, 32, 1, true]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
             <meshBasicMaterial color="#fee2e2" side={THREE.BackSide} transparent opacity={0.05} />
        </Cylinder>
    );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none bg-slate-50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={0.8} />
        <hemisphereLight intensity={0.5} groundColor="#fee2e2" color="#ffffff" />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} color="#fff" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#0d9488" />
        
        <VesselWall />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Arterial Flow (Red) */}
          <BloodCell position={[-2, 1, 0]} color="#ef4444" scale={1.2} />
          <BloodCell position={[3, -1, -2]} color="#ef4444" scale={1.1} rotationOffset={1} />
          <BloodCell position={[-4, -2, -4]} color="#ef4444" scale={0.9} rotationOffset={2} />
          
          {/* Venous/Mixed Flow (Darker Red/Blue tint for contrast in visualization) */}
          <BloodCell position={[1, 2, -3]} color="#dc2626" scale={1} rotationOffset={3} />
          <BloodCell position={[4, 1, -1]} color="#ef4444" scale={0.8} rotationOffset={4} />
          
          {/* Abstract Particles (The "Protocol" or "Medicine" entering) */}
          <Sphere args={[0.3, 16, 16]} position={[0, 0, 2]}>
             <MeshDistortMaterial color="#0d9488" speed={3} distort={0.6} transparent opacity={0.8} />
          </Sphere>
          <Sphere args={[0.2, 16, 16]} position={[2, 2, 1]}>
             <MeshDistortMaterial color="#0d9488" speed={3} distort={0.6} transparent opacity={0.6} />
          </Sphere>
        </Float>

        {/* Subtle fog to blend into the white background of the site */}
        <fog attach="fog" args={['#f8fafc', 5, 25]} />
      </Canvas>
    </div>
  );
};

export const MedicalScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 bg-slate-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#0d9488" />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#fff" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.2} speed={1}>
           <group rotation={[0, Math.PI / 4, 0]}>
              {/* Abstract Medical Cross / Shield Symbol */}
              <BoxWithRoundedEdges width={3} height={0.8} depth={0.4} radius={0.2} color="#0d9488" />
              <BoxWithRoundedEdges width={0.8} height={3} depth={0.4} radius={0.2} color="#0d9488" />
              
              {/* Protective Ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[2.5, 0.05, 16, 100]} />
                  <meshStandardMaterial color="#fff" transparent opacity={0.3} />
              </mesh>
           </group>
        </Float>
      </Canvas>
    </div>
  );
}

function BoxWithRoundedEdges({ width, height, depth, radius, color }: any) {
  return (
    <mesh>
       <boxGeometry args={[width, height, depth]} />
       <meshPhysicalMaterial 
            color={color} 
            metalness={0.1} 
            roughness={0.2} 
            clearcoat={1}
            transparent
            opacity={0.9}
        />
    </mesh>
  );
}
