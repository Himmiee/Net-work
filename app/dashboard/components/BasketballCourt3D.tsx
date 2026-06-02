import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Player } from "../data/players";

interface BasketballCourt3DProps {
  activePlayer: Player;
}

export default function BasketballCourt3D({ activePlayer }: BasketballCourt3DProps) {
  // Calculate threat gravity circle radius dynamically based on play attributes
  const gravityRadius = (activePlayer.attributes["Gravity Pull"] / 100) * 4.5;

  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-0 bg-background/40 rounded-2xl overflow-hidden relative border border-net-border/50">
      <Canvas
        camera={{ position: [0, 12, 12], fov: 45 }}
        shadows
      >
        {/* Color representing the clear sky / ambient room color */}
        <color attach="background" args={["#060e0a"]} />

        {/* 1. LIGHTING */}
        {/* Ambient light shines on everything equally (removes pitch black shadows) */}
        <ambientLight intensity={0.4} />
        
        {/* Directional light acts like a stadium floodlight casting soft shadows */}
        <directionalLight
          position={[5, 15, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        {/* 2. CAMERA CONTROLS */}
        {/* Allows clicking and dragging to orbit, right-clicking to pan, and scrolling to zoom */}
        <OrbitControls 
          enablePan={true} 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.1} // Prevents looking under the floor
          minDistance={5}
          maxDistance={25}
        />

        {/* 3. THE BASKETBALL COURT FLOOR */}
        {/* Laying flat (rotated 90 degrees on X-axis) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[16, 12]} />
          <meshStandardMaterial color="#0b1710" roughness={0.85} metalness={0.1} />
        </mesh>

        {/* 4. COURT MARKINGS (DRAWN WITH 3D SHAPES) */}
        
        {/* Outer Boundary line (Thin rectangle outline) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[7.95, 8.0, 4, 1, 0, Math.PI * 2]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.3} transparent />
        </mesh>

        {/* Center Division Line */}
        <mesh position={[0, 0.001, 0]}>
          <boxGeometry args={[0.08, 0.002, 12]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.4} transparent />
        </mesh>

        {/* Center Circle */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <ringGeometry args={[1.95, 2.0, 64]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.4} transparent />
        </mesh>

        {/* Key / Paint Area (Shaded Rectangle) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4, 0.0005, 0]}>
          <planeGeometry args={[4, 3.8]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.06} transparent />
        </mesh>

        {/* Key Outline */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4, 0.001, 0]}>
          {/* Renders a hollow outline box */}
          <ringGeometry args={[1.88, 1.9, 4, 1, Math.PI / 4]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.3} transparent />
        </mesh>

        {/* Three-Point Line (Semi-Circle Hoop Arc) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8, 0.0015, 0]}>
          {/* Draw a half-circle arc */}
          <ringGeometry args={[6.7, 6.75, 64, 1, Math.PI / 2, Math.PI]} />
          <meshBasicMaterial color="#2d9e6a" opacity={0.35} transparent />
        </mesh>

        {/* Basic Backboard & Hoop Stand */}
        <group position={[7.5, 0, 0]}>
          {/* Pole */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 3]} />
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </mesh>
          {/* Backboard */}
          <mesh position={[-0.1, 3.0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.9, 1.3]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.2} />
          </mesh>
          {/* Red Target Outline on Backboard */}
          <mesh position={[-0.13, 2.9, 0]}>
            <boxGeometry args={[0.01, 0.35, 0.5]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          {/* Rim / Hoop Orange Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.4, 2.65, 0]}>
            <torusGeometry args={[0.22, 0.02, 8, 24]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
        </group>

        {/* 5. ACTIVE PLAYER SPACING REPRESENTATION */}
        {/* Glowing Spacing Gravity Ring under player floor coordinates */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[activePlayer.position3D[0], 0.01, activePlayer.position3D[2]]}>
          <ringGeometry args={[0, gravityRadius, 64]} />
          <meshBasicMaterial color={activePlayer.color} opacity={0.15} transparent={true} depthWrite={false} />
        </mesh>

        {/* Active Player 3D Node (Sphere) */}
        <mesh position={activePlayer.position3D} castShadow>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial color={activePlayer.color} roughness={0.2} metalness={0.1} />
        </mesh>
      </Canvas>
    </div>
  );
}
