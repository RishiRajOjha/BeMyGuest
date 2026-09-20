"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getSplineU } from "./journeyTimeline";
import { useJourneyContext } from "./JourneyContext";

// One continuous camera path. The first 1/3 is deliberately wide and high so the
// opening reads as a venue reveal instead of immediately looking like a close-up.
const PATH_POINTS: [number, number, number][] = [
  [0, 8.6, 42],
  [0, 6.6, 31.5],
  [0, 4.7, 22.5],
  [0, 3.25, 14.4],
  [0, 2.4, 8.2],
  [0.25, 2.2, 2.0],
  [0.55, 2.35, -4.5],
  [0.8, 2.65, -9.2],
  [0.2, 2.85, -12.2]
];

export function JourneyCamera() {
  const { elapsedRef, reducedMotion, debugRef } = useJourneyContext();
  const { camera } = useThree();

  const lookPoint = useMemo(() => new THREE.Vector3(), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const currentLook = useMemo(() => new THREE.Vector3(), []);
  const cameraDirection = useMemo(() => new THREE.Vector3(), []);
  const path = useMemo(
    () => new THREE.CatmullRomCurve3(PATH_POINTS.map((p) => new THREE.Vector3(...p)), false, "catmullrom", 0.25),
    []
  );

  useFrame((_, delta) => {
    const rawT = elapsedRef.current;
    const t = Number.isFinite(rawT) ? Math.max(0, rawT) : 0;
    const u = getSplineU(t);

    const position = path.getPointAt(u);
    path.getTangentAt(u, tangent).normalize();

    // The look target is always a little ahead of the camera, so the shot feels like a
    // physical dolly/crane move rather than a camera pointed at a fixed target.
    lookPoint.copy(tangent).multiplyScalar(10.5).add(position);
    lookPoint.y += u > 0.62 ? Math.min(1.15, (u - 0.62) * 3.1) : 0;

    // Aerial tilt quickly relaxes during the opening two seconds.
    lookPoint.y -= Math.max(0, 1 - u / 0.16) * 2.4;

    const breathe = reducedMotion ? 0 : Math.sin(t * 0.75) * 0.018;
    targetPosition.copy(position);
    targetPosition.x += breathe;
    targetPosition.y += breathe * 0.45;

    // Less damping than before: the camera should feel decisive and filmic.
    const positionLerp = reducedMotion ? 1 : Math.min(1, delta * 7.5);
    camera.position.lerp(targetPosition, positionLerp);

    camera.getWorldDirection(cameraDirection);
    const lookLerp = reducedMotion ? 1 : Math.min(1, delta * 8.5);
    currentLook.copy(camera.position).add(cameraDirection).lerp(lookPoint, lookLerp);
    camera.lookAt(currentLook);

    if (camera instanceof THREE.PerspectiveCamera) {
      // Slightly wider at the start, tightening as we enter the mandap.
      const targetFov = 58 - Math.min(1, u / 0.82) * 13;
      camera.fov += (targetFov - camera.fov) * Math.min(1, delta * 5);
      camera.updateProjectionMatrix();
    }

    if (debugRef?.current) {
      const p = camera.position;
      debugRef.current.textContent = `u=${u.toFixed(3)} pos=${p.x.toFixed(2)},${p.y.toFixed(2)},${p.z.toFixed(2)}`;
    }
  });

  return null;
}
