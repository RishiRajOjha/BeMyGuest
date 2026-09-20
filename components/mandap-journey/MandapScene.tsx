"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MandapLighting } from "./MandapLighting";
import { MandapEnvironment } from "./MandapEnvironment";
import { JourneyCamera } from "./JourneyCamera";
import { getSplineU } from "./journeyTimeline";
import { useJourneyContext } from "./JourneyContext";

// Golden hour -> sunset -> early blue hour, tied to the same camera progress (u) as everything
// else. Most of the journey happens under the mandap canopy where the sky barely reads, so the
// shift is most visible in the establishing/entrance frames and as a cool rim behind the mandap
// silhouette at the very end.
const SKY_GOLDEN = new THREE.Color("#d98a4c");
const SKY_SUNSET = new THREE.Color("#7d3e2c");
const SKY_BLUE_HOUR = new THREE.Color("#171a2e");

const FOG_GOLDEN = new THREE.Color("#3a2013");
const FOG_SUNSET = new THREE.Color("#2a140f");
const FOG_BLUE_HOUR = new THREE.Color("#150f16");

function SkyAndFogProgression() {
  const { elapsedRef } = useJourneyContext();
  const { scene } = useThree();
  const bg = new THREE.Color();
  const fogColor = new THREE.Color();

  useFrame(() => {
    const u = getSplineU(elapsedRef.current);
    if (u < 0.5) {
      bg.copy(SKY_GOLDEN).lerp(SKY_SUNSET, u / 0.5);
      fogColor.copy(FOG_GOLDEN).lerp(FOG_SUNSET, u / 0.5);
    } else {
      const local = (u - 0.5) / 0.5;
      bg.copy(SKY_SUNSET).lerp(SKY_BLUE_HOUR, local);
      fogColor.copy(FOG_SUNSET).lerp(FOG_BLUE_HOUR, local);
    }
    if (scene.background instanceof THREE.Color) scene.background.copy(bg);
    if (scene.fog) (scene.fog as THREE.FogExp2).color.copy(fogColor);
  });

  return null;
}

export function MandapScene({
  isMobile,
  onReady
}: {
  isMobile: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 8.6, 42], fov: 58, near: 0.05, far: 150 }}
      dpr={[1, isMobile ? 1.35 : 1.9]}
      shadows={{ type: THREE.PCFSoftShadowMap }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
        preserveDrawingBuffer: false
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.22;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        onReady?.();
      }}
    >
      <color attach="background" args={["#d98a4c"]} />
      <fogExp2 attach="fog" args={["#3a2013", 0.0105]} />
      <SkyAndFogProgression />
      <MandapLighting />
      <MandapEnvironment isMobile={isMobile} />
      <JourneyCamera />
    </Canvas>
  );
}
