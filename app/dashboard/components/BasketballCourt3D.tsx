import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Player } from "../data/players";
import { playPositions } from "../data/plays";

interface BasketballCourt3DProps {
  activePlayer: Player;
  selectedPlay: string;
}

// 🏀 Animated Player Node Sub-Component
function PlayerNode({ 
  targetPosition, 
  color, 
  gravityRadius 
}: { 
  targetPosition: [number, number, number]; 
  color: string; 
  gravityRadius?: number;
}) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // useFrame is R3F's render tick loop. Runs ~60 times a second.
  useFrame(() => {
    if (sphereRef.current) {
      // Smoothly slide (lerp) sphere position from current to target
      sphereRef.current.position.lerp(new THREE.Vector3(...targetPosition), 0.1);
    }
    if (ringRef.current) {
      // Smoothly slide the gravity ring floor position
      ringRef.current.position.lerp(new THREE.Vector3(targetPosition[0], 0.01, targetPosition[2]), 0.1);
    }
  });

  return (
    <group>
      {/* If gravityRadius is passed, render the spacing ring */}
      {gravityRadius !== undefined && (
        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[targetPosition[0], 0.01, targetPosition[2]]}>
          <ringGeometry args={[0, gravityRadius, 64]} />
          <meshBasicMaterial color={color} opacity={0.16} transparent={true} depthWrite={false} />
        </mesh>
      )}
      {/* The 3D Sphere */}
      <mesh ref={sphereRef} position={targetPosition} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.1} />
      </mesh>
    </group>
  );
}

export default function BasketballCourt3D({ activePlayer, selectedPlay }: BasketballCourt3DProps) {
  // Fetch active play coordinates
  const playData = playPositions[selectedPlay] || playPositions["Pick & Roll"];
  const gravityRadius = (activePlayer.attributes["Gravity Pull"] / 100) * 4.5;

  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-0 bg-background/40 rounded-2xl overflow-hidden relative border border-net-border/50">
      <Canvas camera={{ position: [0, 12, 12], fov: 45 }} shadows>
        <color attach="background" args={["#060e0a"]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 15, 5]} intensity={1.2} castShadow shadow-mapSize={[2048, 2048]} />

        <OrbitControls 
          enablePan={true} 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={5}
          maxDistance={25}
        />

        {/* 1. COURT FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#0b1710" roughness={0.85} metalness={0.1} />
        </mesh>

        {/* 2. COURT BOUNDARIES & LINES */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[7.95, 8.0, 4, 1, 0, Math.PI * 2]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.3} transparent />
        </mesh>
        <mesh position={[0, 0.001, 0]}>
          <boxGeometry args={[0.08, 0.002, 12]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.4} transparent />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <ringGeometry args={[1.95, 2.0, 64]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.4} transparent />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4, 0.0005, 0]}>
          <planeGeometry args={[4, 3.8]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.06} transparent />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4, 0.001, 0]}>
          <ringGeometry args={[1.88, 1.9, 4, 1, Math.PI / 4]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.3} transparent />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8, 0.0015, 0]}>
          <ringGeometry args={[6.7, 6.75, 64, 1, Math.PI / 2, Math.PI]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.35} transparent />
        </mesh>

        {/* 3. BACKBOARD & HOOP STAND */}
        <group position={[7.5, 0, 0]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 3]} />
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </mesh>
          <mesh position={[-0.1, 3.0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.9, 1.3]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.2} />
          </mesh>
          <mesh position={[-0.13, 2.9, 0]}>
            <boxGeometry args={[0.01, 0.35, 0.5]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.4, 2.65, 0]}>
            <torusGeometry args={[0.22, 0.02, 8, 24]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
        </group>

        {/* 4. ACTIVE PLAYERS (OFFENSE - SAGE/TEAM COLORS) */}
        {playData.offense.map((pos, idx) => (
          <PlayerNode
            key={`off-${idx}`}
            targetPosition={pos}
            color={idx === 0 ? activePlayer.color : "#5a9e7c"}
            gravityRadius={idx === 0 ? gravityRadius : undefined}
          />
        ))}

        {/* 5. OPPONENTS (DEFENSE - RED) */}
        {playData.defense.map((pos, idx) => (
          <PlayerNode
            key={`def-${idx}`}
            targetPosition={pos}
            color="#ef4444"
          />
        ))}
      </Canvas>
    </div>
  );
}
