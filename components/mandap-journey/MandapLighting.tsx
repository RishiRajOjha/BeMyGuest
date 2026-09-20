"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getSplineU } from "./journeyTimeline";
import { useJourneyContext } from "./JourneyContext";

// Sky-side light (hemisphere + key + one directional) cools from golden-hour amber toward a
// dusk lavender-blue as the journey progresses, while the practical wedding lighting (warm
// fill, lanterns, sacred fire — set in MandapEnvironment) warms up in inverse proportion. That
// warm/cool contrast is what gives the final mandap reveal its "lit against the evening" feel
// instead of everything just getting uniformly brighter.
const HEMI_SKY_GOLDEN = new THREE.Color("#d7a77b");
const HEMI_SKY_DUSK = new THREE.Color("#8891c4");
const KEY_GOLDEN = new THREE.Color("#ffd7aa");
const KEY_DUSK = new THREE.Color("#d8b8c8");
const RIM_GOLDEN = new THREE.Color("#d87557");
const RIM_DUSK = new THREE.Color("#6b6f9e");

export function MandapLighting() {
  const { elapsedRef } = useJourneyContext();
  const key = useRef<THREE.DirectionalLight>(null);
  const rim = useRef<THREE.DirectionalLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const warmFill = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const u = getSplineU(elapsedRef.current);
    const arrival = THREE.MathUtils.smoothstep(u, 0.55, 1);
    const dusk = THREE.MathUtils.smoothstep(u, 0.2, 0.95);

    if (key.current) {
      key.current.intensity = 2.0 + arrival * 0.9;
      key.current.color.copy(KEY_GOLDEN).lerp(KEY_DUSK, dusk * 0.55);
    }
    if (rim.current) {
      rim.current.color.copy(RIM_GOLDEN).lerp(RIM_DUSK, dusk);
      rim.current.intensity = 0.72 - dusk * 0.18;
    }
    if (hemi.current) {
      hemi.current.color.copy(HEMI_SKY_GOLDEN).lerp(HEMI_SKY_DUSK, dusk);
      hemi.current.intensity = 1.9 - dusk * 0.5;
    }
    if (warmFill.current) warmFill.current.intensity = 3.8 + arrival * 3.6;
  });

  return (
    <>
      <hemisphereLight ref={hemi} args={["#d7a77b", "#120706", 1.9]} />
      <ambientLight intensity={0.68} color="#7a3d28" />
      <directionalLight ref={key} position={[9, 24, 20]} intensity={2} color="#ffd7aa" castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight ref={rim} position={[-18, 12, 3]} intensity={0.72} color="#d87557" />
      <pointLight ref={warmFill} position={[0, 7, 2]} color="#ff9b50" intensity={4} distance={26} decay={2} />
      <pointLight position={[0, 4, -11]} color="#ffb15a" intensity={8} distance={18} decay={2} />
    </>
  );
}
