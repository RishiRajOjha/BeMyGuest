"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";

// Slightly desaturated / antiqued versus a typical "festive" wedding palette on purpose —
// the brief calls for editorial luxury-campaign color, not a saturated commercial look.
const WOOD = "#3b2118";
const WOOD_LIGHT = "#82513a";
const MAROON = "#6a232b";
const IVORY = "#e4d7bf";
const BRASS = "#ad7f42";
const MARIGOLD = "#c9782f";
const ROSE = "#833138";

function useDummy() {
  return useMemo(() => new THREE.Object3D(), []);
}

/** Static instanced scatter of small "petal" discs across a ground patch — zero per-frame cost. */
function PetalScatter({
  count,
  zFrom,
  zTo,
  xSpread,
  color,
  y = 0.02
}: {
  count: number;
  zFrom: number;
  zTo: number;
  xSpread: number;
  color: string;
  y?: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useDummy();

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() * 2 - 1) * xSpread;
      const z = zFrom + Math.random() * (zTo - zFrom);
      const s = 0.045 + Math.random() * 0.05;
      dummy.position.set(x, y, z);
      dummy.rotation.set(-Math.PI / 2, 0, Math.random() * Math.PI * 2);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count, zFrom, zTo, xSpread, y, dummy]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} receiveShadow frustumCulled={false}>
      <circleGeometry args={[1, 6]} />
      <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

/** A carved pillar with a brass base, capital and decorative rings — reused down the aisle and at the mandap. */
function Pillar({
  x,
  z,
  height = 6.6,
  withLight = false,
  castShadow = true
}: {
  x: number;
  z: number;
  height?: number;
  withLight?: boolean;
  castShadow?: boolean;
}) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, height / 2 + 0.4, 0]} castShadow={castShadow} receiveShadow>
        <cylinderGeometry args={[0.4, 0.54, height, 16]} />
        <meshStandardMaterial color={WOOD_LIGHT} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.24, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[0.78, 0.88, 0.4, 6]} />
        <meshStandardMaterial color={BRASS} roughness={0.32} metalness={0.7} />
      </mesh>
      <mesh position={[0, height + 0.6, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[0.86, 0.6, 0.46, 8]} />
        <meshStandardMaterial color={BRASS} roughness={0.32} metalness={0.7} />
      </mesh>
      {[0, 1, 2].map((r) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.5 + r * 0.16, 0]}>
          <torusGeometry args={[0.52 + r * 0.035, 0.05, 10, 24]} />
          <meshStandardMaterial color={BRASS} roughness={0.25} metalness={0.72} />
        </mesh>
      ))}
      {[0, 1].map((r) => (
        <mesh key={`upper-${r}`} rotation={[Math.PI / 2, 0, 0]} position={[0, height - 0.55 + r * 0.15, 0]}>
          <torusGeometry args={[0.47 + r * 0.045, 0.035, 10, 24]} />
          <meshStandardMaterial color={BRASS} roughness={0.25} metalness={0.72} />
        </mesh>
      ))}
      {/* Lantern glow — a warm emissive sphere everywhere, a real point light only where the budget allows. */}
      <mesh position={[0, height + 1.05, 0]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshStandardMaterial color="#ffcf8a" emissive="#ffb15a" emissiveIntensity={2.2} />
      </mesh>
      {withLight && <pointLight position={[0, height + 1.05, 0]} color="#ffb15a" intensity={2.6} distance={7} decay={2} />}
    </group>
  );
}

/** A sagging garland "string" between two pillar tops. */
function Garland({ from, to, color = MARIGOLD }: { from: [number, number, number]; to: [number, number, number]; color?: string }) {
  const curve = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const mid = a.clone().lerp(b, 0.5);
    mid.y -= 0.9;
    return new THREE.QuadraticBezierCurve3(a, mid, b);
  }, [from, to]);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 20, 0.045, 6, false), [curve]);
  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}

function createRangoliTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const cx = size / 2;
  const cy = size / 2;
  ctx.clearRect(0, 0, size, size);
  const ringColors = ["#c1652f", "#c98a2b", "#711f22", "#e6d5b8"];
  for (let ring = 0; ring < 4; ring++) {
    const radius = 60 + ring * 55;
    const petals = 12 + ring * 4;
    ctx.fillStyle = ringColors[ring % ringColors.length];
    for (let i = 0; i < petals; i++) {
      const a = (i / petals) * Math.PI * 2;
      const px = cx + Math.cos(a) * radius;
      const py = cy + Math.sin(a) * radius;
      ctx.beginPath();
      ctx.ellipse(px, py, 16, 8, a, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.beginPath();
  ctx.fillStyle = "#e6d5b8";
  ctx.arc(cx, cy, 34, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

function RangoliFloor() {
  const texture = useMemo(() => (typeof document !== "undefined" ? createRangoliTexture() : null), []);
  if (!texture) return null;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.31, -9.2]}>
      <circleGeometry args={[2.6, 48]} />
      <meshBasicMaterial map={texture} transparent opacity={0.4} depthWrite={false} />
    </mesh>
  );
}

/** Restrained rising smoke from the sacred fire — a handful of soft fading quads, not a particle storm. */
function SmokeWisps({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const count = 6;
  const offsets = useMemo(() => new Array(count).fill(0).map((_, i) => i * 1.7 + Math.random()), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const phase = ((t + offsets[i]) % 5.2) / 5.2;
      mesh.position.y = position[1] + phase * 2.6;
      mesh.position.x = position[0] + Math.sin(phase * Math.PI * 2 + i) * 0.18;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(phase * Math.PI) * 0.16;
      mesh.scale.setScalar(0.5 + phase * 1.1);
    });
  });

  return (
    <group ref={group} position={[0, 0, position[2]]}>
      {offsets.map((_, i) => (
        <mesh key={i} rotation={[0, 0, 0]}>
          <planeGeometry args={[1, 1.4]} />
          <meshBasicMaterial color="#cfc2b0" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}


function FlowerCluster({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const petals = [MARIGOLD, "#e7c79e", IVORY, ROSE, "#c96a3b", MARIGOLD];
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, -0.16, 0]}>
        <sphereGeometry args={[0.48, 16, 12]} />
        <meshStandardMaterial color="#5a251d" roughness={0.85} />
      </mesh>
      {new Array(12).fill(0).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = 0.46;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.12 + (i % 3) * 0.035, Math.sin(a) * r]}>
            <sphereGeometry args={[0.22, 10, 10]} />
            <meshStandardMaterial color={petals[i % petals.length]} roughness={0.78} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.24, 10, 10]} />
        <meshStandardMaterial color="#f7d77e" emissive="#5d2510" emissiveIntensity={0.15} roughness={0.55} />
      </mesh>
    </group>
  );
}

function Urli({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.78, 0.22, 24]} />
        <meshStandardMaterial color={BRASS} roughness={0.26} metalness={0.78} />
      </mesh>
      <mesh position={[0, 0.53, 0]}>
        <torusGeometry args={[0.55, 0.035, 8, 28]} />
        <meshStandardMaterial color="#e2ad55" roughness={0.22} metalness={0.8} />
      </mesh>
      <FlowerCluster position={[0, 0.64, 0]} scale={0.72} />
      <pointLight position={[0, 1.25, 0]} color="#ff9e53" intensity={0.8} distance={5} decay={2} />
    </group>
  );
}

function GatewayZone({ isMobile }: { isMobile: boolean }) {
  const z = 24.5;
  return (
    <group>
      <Pillar x={-5.7} z={z} height={8.4} withLight />
      <Pillar x={5.7} z={z} height={8.4} withLight={!isMobile} />
      <mesh position={[0, 8.7, z]} castShadow>
        <boxGeometry args={[13, 0.42, 1.1]} />
        <meshStandardMaterial color={WOOD} roughness={0.58} />
      </mesh>
      <mesh position={[0, 9.25, z]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <coneGeometry args={[4.9, 1.8, 4]} />
        <meshStandardMaterial color={MAROON} roughness={0.72} />
      </mesh>
      <mesh position={[0, 8.4, z - 0.48]}>
        <torusGeometry args={[4.35, 0.1, 12, 64]} />
        <meshStandardMaterial color="#e9d5b4" roughness={0.82} />
      </mesh>
      {new Array(isMobile ? 18 : 28).fill(0).map((_, i) => {
        const a = (i / (isMobile ? 18 : 28)) * Math.PI * 2;
        const x = Math.cos(a) * 4.38;
        const y = 8.4 + Math.sin(a) * 4.38;
        return <FlowerCluster key={i} position={[x, y, z - 0.25]} scale={0.28} />;
      })}
      <Garland from={[-5.2, 7.7, z - 0.25]} to={[5.2, 7.7, z - 0.25]} color={MARIGOLD} />
      <Urli position={[-4.6, 0, z - 1.2]} scale={0.9} />
      <Urli position={[4.6, 0, z - 1.2]} scale={0.9} />
    </group>
  );
}

function ExteriorZone({ isMobile }: { isMobile: boolean }) {
  return (
    <group>
      {/* Soft venue silhouettes only — no distracting green blobs in the first frame. */}
      {[-15, -7, 7, 15].map((x, i) => (
        <group key={i} position={[x, 0, -31 - (i % 2) * 3]}>
          <mesh position={[0, 3.4, 0]}>
            <boxGeometry args={[5.2, 7, 2.2]} />
            <meshStandardMaterial color={i % 2 ? "#351713" : "#431c17"} roughness={0.98} />
          </mesh>
          <mesh position={[0, 7.5, 0]} rotation={[0, 0, Math.PI / 4]}>
            <coneGeometry args={[2.9, 2.5, 4]} />
            <meshStandardMaterial color={i % 2 ? "#6a2c25" : "#54231e"} roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* A broad central runner gives the opening shot a deliberate visual axis. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 8]} receiveShadow>
        <planeGeometry args={[5.6, 37]} />
        <meshStandardMaterial color="#6a3b2b" roughness={0.82} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.25, 0.02, 8]} receiveShadow>
        <planeGeometry args={[0.11, 37]} />
        <meshStandardMaterial color="#d9a14c" roughness={0.55} metalness={0.45} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.25, 0.02, 8]} receiveShadow>
        <planeGeometry args={[0.11, 37]} />
        <meshStandardMaterial color="#d9a14c" roughness={0.55} metalness={0.45} />
      </mesh>

      {/* Low floral details replace the previous foliage blobs. */}
      <Urli position={[-4.8, 0, 28.2]} scale={0.85} />
      <Urli position={[4.8, 0, 28.2]} scale={0.85} />
      <Urli position={[-6.8, 0, 19.2]} scale={0.68} />
      <Urli position={[6.8, 0, 19.2]} scale={0.68} />

      {/* Warm points of light establish scale and pull the eye toward the entry. */}
      {[
        [-7.2, 26],
        [7.2, 26],
        [-8.3, 18.5],
        [8.3, 18.5],
        [-6.5, 12],
        [6.5, 12]
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 1.7, 0]}>
            <cylinderGeometry args={[0.075, 0.11, 3.4, 10]} />
            <meshStandardMaterial color={BRASS} roughness={0.28} metalness={0.75} />
          </mesh>
          <mesh position={[0, 3.42, 0]}>
            <sphereGeometry args={[0.23, 16, 16]} />
            <meshStandardMaterial color="#ffe2ae" emissive="#ff9b42" emissiveIntensity={2.9} />
          </mesh>
          {!isMobile && <pointLight position={[0, 3.42, 0]} color="#ff9d52" intensity={1.8} distance={8} decay={2} />}
        </group>
      ))}

      <PetalScatter count={isMobile ? 28 : 55} zFrom={14} zTo={31} xSpread={8.5} color={MARIGOLD} />
      <Sparkles count={isMobile ? 16 : 34} scale={[20, 7, 18]} position={[0, 5, 20]} size={1.35} speed={0.08} opacity={0.2} color="#f4cf8e" />
    </group>
  );
}

function EntranceZone({ isMobile }: { isMobile: boolean }) {
  const archZ = 10.6;
  return (
    <group>
      {/* The floral arch: camera travels straight through its ring — this IS the transition. */}
      <mesh position={[0, 3.5, archZ]} castShadow receiveShadow>
        <torusGeometry args={[3.3, 0.24, 12, 40]} />
        <meshStandardMaterial color={IVORY} roughness={0.85} />
      </mesh>
      <mesh position={[0, 3.5, archZ]}>
        <torusGeometry args={[3.55, 0.06, 8, 40]} />
        <meshStandardMaterial color={MARIGOLD} roughness={0.7} />
      </mesh>
      {new Array(isMobile ? 20 : 32).fill(0).map((_, i, arr) => {
        const a = (i / arr.length) * Math.PI * 2;
        const r = 3.55;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 3.5 + Math.sin(a) * r, archZ]} rotation={[0, 0, a]}>
            <sphereGeometry args={[0.09, 6, 6]} />
            <meshStandardMaterial color={i % 3 === 0 ? IVORY : MARIGOLD} roughness={0.8} />
          </mesh>
        );
      })}
      {[
        [-2.9, 6.8, archZ - 0.15],
        [2.9, 6.8, archZ - 0.15],
        [-2.95, 1.0, archZ - 0.15],
        [2.95, 1.0, archZ - 0.15]
      ].map((p, i) => <FlowerCluster key={`arch-flower-${i}`} position={p as [number, number, number]} scale={0.55} />)}
      <Garland from={[-2.95, 6.7, archZ - 0.25]} to={[2.95, 6.7, archZ - 0.25]} color={IVORY} />
      <Pillar x={-2.9} z={archZ} height={7} withLight />
      <Pillar x={2.9} z={archZ} height={7} withLight={!isMobile} />
      <PetalScatter count={isMobile ? 14 : 24} zFrom={8.5} zTo={13.5} xSpread={3.4} color={ROSE} />
    </group>
  );
}

const AISLE_PAIRS = [7, 4, 1, -2];

function AisleZone({ isMobile }: { isMobile: boolean }) {
  return (
    <group>
      {AISLE_PAIRS.map((z, i) => (
        <group key={z}>
          <Pillar x={-3.1} z={z} height={5.4} withLight={!isMobile && i % 2 === 0} />
          <Pillar x={3.1} z={z} height={5.4} withLight={false} />
          <Garland from={[-3.1, 6.2, z]} to={[3.1, 6.2, z]} color={i % 2 === 0 ? MARIGOLD : IVORY} />
        </group>
      ))}
      <PetalScatter count={isMobile ? 20 : 44} zFrom={-3} zTo={8} xSpread={2.6} color={MARIGOLD} />
      <Sparkles count={isMobile ? 12 : 24} scale={[6, 4, 12]} position={[0, 3, 2.5]} size={1.6} speed={0.1} opacity={0.3} color="#e6d5b8" />
    </group>
  );
}

function MandapZone({ isMobile }: { isMobile: boolean }) {
  const cz = -9;
  const pillars: [number, number][] = [
    [-3, cz - 2.3],
    [3, cz - 2.3],
    [-3, cz + 2.3],
    [3, cz + 2.3]
  ];
  return (
    <group>
      {/* Raised platform */}
      <mesh position={[0, 0, cz]} receiveShadow>
        <boxGeometry args={[9.6, 0.45, 8.2]} />
        <meshStandardMaterial color="#3a2218" roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.24, cz]} receiveShadow>
        <boxGeometry args={[8.7, 0.08, 7.3]} />
        <meshStandardMaterial color="#7a5538" roughness={0.88} />
      </mesh>
      <RangoliFloor />

      {pillars.map(([x, z], i) => (
        <Pillar key={i} x={x} z={z} height={6.8} withLight={i === 0 || i === 3} />
      ))}
      {pillars.map(([x, z], i) => (
        <FlowerCluster key={`mandap-flower-${i}`} position={[x, 6.65, z]} scale={0.72} />
      ))}

      {/* Canopy roof, stacked for a pagoda-like silhouette. */}
      <mesh position={[0, 7.5, cz]} castShadow>
        <boxGeometry args={[10.2, 0.26, 8.3]} />
        <meshStandardMaterial color={WOOD} roughness={0.65} />
      </mesh>
      <mesh position={[0, 7.85, cz]} castShadow>
        <boxGeometry args={[9.1, 0.22, 7.3]} />
        <meshStandardMaterial color={IVORY} roughness={0.95} />
      </mesh>
      <mesh position={[0, 8.2, cz]} castShadow>
        <boxGeometry args={[7.9, 0.2, 6.3]} />
        <meshStandardMaterial color={MAROON} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 9.2, cz]} castShadow rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[5, 2.4, 4]} />
        <meshStandardMaterial color={MAROON} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 10.5, cz]}>
        <sphereGeometry args={[0.26, 14, 14]} />
        <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Floral canopy garlands beneath the roofline */}
      {[
        [-4, cz - 3.6],
        [4, cz - 3.6],
        [-4, cz + 3.6],
        [4, cz + 3.6]
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 6.9, z]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.11, 8, 28]} />
          <meshStandardMaterial color={MARIGOLD} roughness={0.75} />
        </mesh>
      ))}

      {/* Rear fabric drape frames the altar */}
      <mesh position={[0, 3.6, cz - 3.9]} castShadow>
        <planeGeometry args={[8.4, 5.8, 16, 12]} />
        <meshStandardMaterial color={IVORY} roughness={0.98} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 3.6, cz - 3.86]}>
        <planeGeometry args={[8.4, 0.5]} />
        <meshStandardMaterial color={MAROON} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Seating silhouettes for the couple — abstract, no identifiable figures */}
      <mesh position={[0, 0.85, cz - 1.1]} castShadow>
        <boxGeometry args={[2.6, 0.6, 0.95]} />
        <meshStandardMaterial color="#251817" roughness={0.85} />
      </mesh>
      <mesh position={[-1.05, 1.85, cz - 1.1]}>
        <boxGeometry args={[0.26, 2, 0.32]} />
        <meshStandardMaterial color="#251817" roughness={0.85} />
      </mesh>
      <mesh position={[1.05, 1.85, cz - 1.1]}>
        <boxGeometry args={[0.26, 2, 0.32]} />
        <meshStandardMaterial color="#251817" roughness={0.85} />
      </mesh>

      {/* Sacred fire */}
      <mesh position={[0, 0.5, cz + 2.7]} castShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.4, 8]} />
        <meshStandardMaterial color={BRASS} roughness={0.35} metalness={0.6} />
      </mesh>
      <FireGlow position={[0, 0.85, cz + 2.7]} />
      <SmokeWisps position={[0, 0.9, cz + 2.7]} />

      <PetalScatter count={isMobile ? 20 : 36} zFrom={cz - 4} zTo={cz + 4} xSpread={4.4} color={ROSE} y={0.34} />
      {!isMobile && (
        <Sparkles count={16} scale={[6, 5, 6]} position={[0, 3.5, cz]} size={2} speed={0.08} opacity={0.28} color="#ffb15a" />
      )}
    </group>
  );
}

function FireGlow({ position }: { position: [number, number, number] }) {
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!light.current) return;
    const t = clock.getElapsedTime();
    light.current.intensity = 3.4 + Math.sin(t * 9) * 0.5 + Math.sin(t * 23) * 0.25;
  });
  return (
    <>
      <pointLight ref={light} position={position} color="#ff7a2e" intensity={3.4} distance={9} decay={2} />
      <mesh position={position}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial color="#ffb15a" emissive="#ff8a3d" emissiveIntensity={2.6} />
      </mesh>
    </>
  );
}

export function MandapEnvironment({ isMobile }: { isMobile: boolean }) {
  return (
    <group>
      {/* One continuous ground plane runs the whole length of the journey — no seams, no scene swap.
          Keep the environment in the same coordinate system as JourneyCamera so the camera
          physically crosses the entrance and arrives at the mandap at the authored timestamps. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 8]} receiveShadow>
        <planeGeometry args={[42, 50]} />
        <meshStandardMaterial color="#3a2213" roughness={0.95} />
      </mesh>

      <ExteriorZone isMobile={isMobile} />
      <GatewayZone isMobile={isMobile} />
      <EntranceZone isMobile={isMobile} />
      <AisleZone isMobile={isMobile} />
      <MandapZone isMobile={isMobile} />
    </group>
  );
}
