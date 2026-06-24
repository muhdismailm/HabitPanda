"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Cylinder, Cone } from "@react-three/drei";
import * as THREE from "three";

interface PandaModelProps {
  mood: "Happy" | "Neutral" | "Sad";
  stage: string;
  equipped?: string[];
}

export function PandaModel({ mood, stage, equipped = [] }: PandaModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  // Stage affects size
  const scale = stage === "Baby Panda" ? 0.7 : stage === "Adult Panda" ? 1 : 1.3;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (!groupRef.current || !headRef.current || !bodyRef.current) return;

    if (mood === "Happy") {
      // Happy: Bouncing
      groupRef.current.position.y = Math.abs(Math.sin(t * 6)) * 0.5 - 1;
      headRef.current.rotation.x = Math.sin(t * 3) * 0.1;
      bodyRef.current.scale.set(1, 1, 1);
    } else if (mood === "Sad") {
      // Sad: Head down
      groupRef.current.position.y = -1;
      headRef.current.rotation.x = Math.PI / 6;
      bodyRef.current.scale.set(1, 0.9, 1);
    } else {
      // Neutral: Idle breathing
      groupRef.current.position.y = -1;
      headRef.current.rotation.x = 0;
      const breath = 1 + Math.sin(t * 2) * 0.03;
      bodyRef.current.scale.set(breath, breath, breath);
    }
  });

  return (
    <group>
      {/* --- Environment Props --- */}
      {equipped.includes("palm_tree") && (
        <group position={[-2.5, -1, -1]}>
          <Cylinder args={[0.2, 0.3, 3]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </Cylinder>
          <Cone args={[1, 0.5, 5]} position={[0, 3, 0]} rotation={[0.2, 0, 0]}>
            <meshStandardMaterial color="#22c55e" roughness={0.8} />
          </Cone>
          <Cone args={[1, 0.5, 5]} position={[0.2, 2.9, 0.2]} rotation={[-0.2, 0, 0.2]}>
            <meshStandardMaterial color="#16a34a" roughness={0.8} />
          </Cone>
        </group>
      )}

      {equipped.includes("lotus_pond") && (
        <group position={[1.5, -0.9, 1]}>
          <Cylinder args={[1.5, 1.5, 0.1, 32]}>
            <meshStandardMaterial color="#3b82f6" roughness={0.1} transparent opacity={0.8} />
          </Cylinder>
          <Sphere args={[0.2, 16, 16]} position={[0, 0.1, 0]} scale={[1, 0.5, 1]}>
            <meshStandardMaterial color="#ec4899" />
          </Sphere>
          <Cylinder args={[0.4, 0.4, 0.05, 16]} position={[-0.5, 0.05, 0.3]}>
            <meshStandardMaterial color="#22c55e" />
          </Cylinder>
        </group>
      )}

      {/* --- The Panda --- */}
      <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -1, 0]}>
        {/* Body */}
      <group ref={bodyRef}>
        <Sphere args={[1, 32, 32]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#f8f9fa" roughness={0.8} />
        </Sphere>
        {/* Arms */}
        <Cylinder args={[0.25, 0.2, 1.2]} position={[-0.9, 1.2, 0.2]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Cylinder>
        <Cylinder args={[0.25, 0.2, 1.2]} position={[0.9, 1.2, 0.2]} rotation={[0, 0, -Math.PI / 4]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Cylinder>
        {/* Legs */}
        <Cylinder args={[0.3, 0.3, 0.8]} position={[-0.5, 0.4, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 0.8]} position={[0.5, 0.4, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Cylinder>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 2.2, 0]}>
        <Sphere args={[0.9, 32, 32]}>
          <meshStandardMaterial color="#f8f9fa" roughness={0.8} />
        </Sphere>
        {/* Bamboo Hat */}
        {equipped.includes("bamboo_hat") && (
          <group position={[0, 0.85, 0]} rotation={[0.1, 0, 0]}>
            <Cone args={[1.1, 0.5, 32]} position={[0, 0.25, 0]}>
              <meshStandardMaterial color="#d97706" roughness={1} />
            </Cone>
            <Cylinder args={[1.1, 1.1, 0.05, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#d97706" roughness={1} />
            </Cylinder>
          </group>
        )}
        
        {/* Bird Friend */}
        {equipped.includes("bird_friend") && (
          <group position={[-0.8, 1.0, 0]} rotation={[0, 0.5, 0.2]}>
            <Sphere args={[0.2, 16, 16]}>
              <meshStandardMaterial color="#eab308" />
            </Sphere>
            <Cone args={[0.08, 0.2, 16]} position={[0.15, 0, 0.1]} rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
              <meshStandardMaterial color="#ea580c" />
            </Cone>
            <Sphere args={[0.03, 8, 8]} position={[0.1, 0.05, 0.15]}>
              <meshStandardMaterial color="black" />
            </Sphere>
            <Sphere args={[0.03, 8, 8]} position={[0.1, 0.05, 0.05]}>
              <meshStandardMaterial color="black" />
            </Sphere>
          </group>
        )}
        {/* Ears */}
        <Sphere args={[0.3, 32, 32]} position={[-0.65, 0.7, 0]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[0.65, 0.7, 0]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Sphere>
        {/* Eye Patches */}
        <Sphere args={[0.2, 32, 32]} position={[-0.35, 0.1, 0.75]} scale={[1.2, 0.9, 0.2]} rotation={[0, 0, -0.2]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.2, 32, 32]} position={[0.35, 0.1, 0.75]} scale={[1.2, 0.9, 0.2]} rotation={[0, 0, 0.2]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Sphere>
        {/* Eyes */}
        <Sphere args={[0.06, 16, 16]} position={[-0.35, 0.12, 0.8]}>
          <meshStandardMaterial color="white" />
        </Sphere>
        <Sphere args={[0.06, 16, 16]} position={[0.35, 0.12, 0.8]}>
          <meshStandardMaterial color="white" />
        </Sphere>
        {/* Nose */}
        <Sphere args={[0.08, 16, 16]} position={[0, -0.15, 0.88]} scale={[1.5, 0.8, 0.5]}>
          <meshStandardMaterial color="#1f2937" />
        </Sphere>
      </group>
      </group>
    </group>
  );
}
