"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Torus, Ring, Sphere, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════════
   MedallionCanvas — the R3F canvas wrapper.
   Must be a separate named export for next/dynamic to pick up.
   ══════════════════════════════════════════════════════════════════ */

interface MedallionCanvasProps {
  className?: string;
}

export function MedallionCanvas({ className }: MedallionCanvasProps) {
  return (
    <Canvas
      className={className}
      aria-hidden="true"
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", aspectRatio: "1/1", maxWidth: 400, margin: "0 auto" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -3, -2]} intensity={0.4} />

      <Suspense fallback={null}>
        <MedallionComposition />
      </Suspense>

      <Environment preset="city" />
    </Canvas>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MedallionComposition — the 3D geometry arranged in a crest-like
   composition using school colors (navy #1B2A4A and gold #D4AF37).
   ══════════════════════════════════════════════════════════════════ */

function MedallionComposition() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group>
        {/* Outer ring — gold */}
        <Ring args={[2.2, 2.5, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.25}
            metalness={0.9}
            side={2} // DoubleSide
          />
        </Ring>

        {/* Inner ring — navy */}
        <Ring args={[1.8, 2.15, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1B2A4A" roughness={0.3} metalness={0.7} side={2} />
        </Ring>

        {/* Central sphere — gold */}
        <Sphere args={[0.55, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#D4AF37" roughness={0.15} metalness={1} />
        </Sphere>

        {/* Torus ring around the sphere */}
        <Torus args={[0.75, 0.08, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={1} />
        </Torus>

        {/* Cross arms — four rounded boxes in navy forming a cross */}
        <RoundedBox args={[1.4, 0.2, 0.1]} radius={0.05} position={[0, 0, 0.15]}>
          <meshStandardMaterial color="#1B2A4A" roughness={0.3} metalness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.2, 1.4, 0.1]} radius={0.05} position={[0, 0, 0.15]}>
          <meshStandardMaterial color="#1B2A4A" roughness={0.3} metalness={0.6} />
        </RoundedBox>

        {/* Rotating outer gear-like element */}
        <RotatingTeeth />
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RotatingTeeth — 8 small gold boxes arranged in a circle, slowly
   rotating around the Y axis for a subtle gear-like animation.
   ══════════════════════════════════════════════════════════════════ */

function RotatingTeeth() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const teeth = useMemo(() => {
    const items: { angle: number; x: number; z: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      items.push({
        angle,
        x: Math.cos(angle) * 1.6,
        z: Math.sin(angle) * 1.6,
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {teeth.map((tooth, i) => (
        <RoundedBox
          key={i}
          args={[0.15, 0.35, 0.1]}
          radius={0.03}
          position={[tooth.x, 0, tooth.z]}
          rotation={[0, -tooth.angle, 0]}
        >
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
        </RoundedBox>
      ))}
    </group>
  );
}
