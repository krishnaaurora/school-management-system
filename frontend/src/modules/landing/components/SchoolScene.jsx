import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Elegant School Campus Model
function CampusArchitecture() {
  const buildingRef = useRef();

  return (
    <group position={[0, -0.2, 0]} rotation={[0, -Math.PI / 6, 0]}>
      {/* Ground Base / Landscaped Courtyard */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[5.8, 6.2, 0.1, 64]} />
        <meshStandardMaterial color="#E8E5DD" roughness={0.9} />
      </mesh>

      {/* Lush Green Lawns */}
      <mesh receiveShadow position={[-0.8, 0.01, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 2.2, 32]} />
        <meshStandardMaterial color="#2D5A46" roughness={0.8} />
      </mesh>

      <mesh receiveShadow position={[2.0, 0.01, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#356550" roughness={0.8} />
      </mesh>

      {/* Brick & Sandstone Walkways */}
      <mesh receiveShadow position={[0, 0.02, 0.5]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <planeGeometry args={[1.0, 4.5]} />
        <meshStandardMaterial color="#D7CFBF" roughness={0.7} />
      </mesh>

      {/* Main Academic Wing - Clean Modernist Architecture */}
      <group ref={buildingRef} position={[-0.6, 0.85, -0.4]}>
        {/* Main Building Body */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 1.7, 1.4]} />
          <meshStandardMaterial color="#F7F4EC" roughness={0.4} metalness={0.05} />
        </mesh>

        {/* Forest Green Architectural Accent Band */}
        <mesh castShadow position={[0, 0.75, 0]}>
          <boxGeometry args={[3.3, 0.18, 1.48]} />
          <meshStandardMaterial color="#0D3B2E" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Terracotta/Brick Base Plinth */}
        <mesh castShadow receiveShadow position={[0, -0.8, 0]}>
          <boxGeometry args={[3.35, 0.15, 1.5]} />
          <meshStandardMaterial color="#C5A880" roughness={0.6} />
        </mesh>

        {/* Glass Windows Grid - Front Façade */}
        {[-1.1, -0.55, 0, 0.55, 1.1].map((x, i) => (
          <group key={`front-win-${i}`} position={[x, 0.05, 0.71]}>
            <mesh castShadow>
              <boxGeometry args={[0.38, 1.1, 0.02]} />
              <meshStandardMaterial color="#1B3A32" roughness={0.1} metalness={0.8} />
            </mesh>
            {/* Subtle window mullion */}
            <mesh position={[0, 0, 0.02]}>
              <boxGeometry args={[0.4, 0.03, 0.01]} />
              <meshStandardMaterial color="#0D3B2E" roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* Cantilevered Glass Library Wing */}
        <group position={[1.8, -0.1, 0.5]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.5, 1.2, 1.8]} />
            <meshStandardMaterial 
              color="#3B6357" 
              roughness={0.15} 
              metalness={0.6} 
              transparent 
              opacity={0.85} 
            />
          </mesh>
          {/* Warm Interior glow simulation */}
          <pointLight color="#F3E0B5" intensity={0.6} distance={2.5} position={[0, 0, 0]} />
          {/* Canopy Roof */}
          <mesh position={[0, 0.65, 0]} castShadow>
            <boxGeometry args={[1.65, 0.08, 1.95]} />
            <meshStandardMaterial color="#0D3B2E" roughness={0.3} />
          </mesh>
        </group>

        {/* Main Entrance Grand Portico */}
        <group position={[0, -0.4, 0.85]}>
          {/* Canopy */}
          <mesh castShadow position={[0, 0.5, 0]}>
            <boxGeometry args={[1.2, 0.08, 0.7]} />
            <meshStandardMaterial color="#C5A880" roughness={0.3} metalness={0.3} />
          </mesh>
          {/* Slender Columns */}
          <mesh castShadow position={[-0.48, 0, 0.25]}>
            <cylinderGeometry args={[0.03, 0.03, 1.0, 16]} />
            <meshStandardMaterial color="#0D3B2E" />
          </mesh>
          <mesh castShadow position={[0.48, 0, 0.25]}>
            <cylinderGeometry args={[0.03, 0.03, 1.0, 16]} />
            <meshStandardMaterial color="#0D3B2E" />
          </mesh>
          {/* Entrance Steps */}
          <mesh receiveShadow position={[0, -0.42, 0.15]}>
            <boxGeometry args={[1.4, 0.06, 0.6]} />
            <meshStandardMaterial color="#E0D7C6" />
          </mesh>
        </group>

        {/* Modern Clock Tower / Architectural Fin */}
        <group position={[-1.7, 0.5, 0.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.45, 2.7, 0.5]} />
            <meshStandardMaterial color="#0A231B" roughness={0.3} />
          </mesh>
          {/* Gold Clock Accent */}
          <mesh position={[0, 1.0, 0.26]}>
            <circleGeometry args={[0.12, 24]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Sports Running Track / Green Field (Left Background) */}
      <group position={[-2.4, 0.02, 1.8]} rotation={[-Math.PI / 2, 0, 0.6]}>
        {/* Track oval */}
        <mesh receiveShadow>
          <ringGeometry args={[0.8, 1.3, 32]} />
          <meshStandardMaterial color="#A85848" roughness={0.9} />
        </mesh>
        {/* Inner sports turf */}
        <mesh receiveShadow position={[0, 0, -0.005]}>
          <circleGeometry args={[0.8, 32]} />
          <meshStandardMaterial color="#2B6B4C" roughness={0.7} />
        </mesh>
      </group>

      {/* Surrounding Campus Trees & Greenery */}
      <TreesGroup />

      {/* Ambient Student Pathway Lighting Bollards */}
      {[-1.2, -0.3, 0.6, 1.5].map((x, i) => (
        <group key={`light-${i}`} position={[x, 0.15, 1.8 - i * 0.4]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#0D3B2E" metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#FFECC2" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Organic, Architectural Stylized Trees
function TreesGroup() {
  const treePositions = useMemo(() => [
    { pos: [-2.6, 0, -0.8], scale: 1.1, type: 'oak' },
    { pos: [-2.9, 0, 0.4], scale: 0.9, type: 'pine' },
    { pos: [-1.8, 0, -1.6], scale: 1.2, type: 'oak' },
    { pos: [1.2, 0, -1.8], scale: 1.3, type: 'oak' },
    { pos: [2.5, 0, -1.2], scale: 1.0, type: 'pine' },
    { pos: [2.8, 0, 0.8], scale: 0.85, type: 'oak' },
    { pos: [1.9, 0, 1.8], scale: 0.75, type: 'pine' },
    { pos: [-0.9, 0, 2.5], scale: 0.7, type: 'oak' },
  ], []);

  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle natural foliage sway
    groupRef.current.children.forEach((tree, idx) => {
      const offset = idx * 0.8;
      tree.rotation.z = Math.sin(t * 1.2 + offset) * 0.025;
      tree.rotation.x = Math.cos(t * 0.9 + offset) * 0.015;
    });
  });

  return (
    <group ref={groupRef}>
      {treePositions.map((t, idx) => (
        <group key={idx} position={t.pos} scale={t.scale}>
          {/* Trunk */}
          <mesh castShadow position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.04, 0.07, 0.7, 8]} />
            <meshStandardMaterial color="#4A3B32" roughness={0.9} />
          </mesh>
          {/* Foliage - Layered Natural Canopy */}
          {t.type === 'pine' ? (
            <group position={[0, 0.75, 0]}>
              <mesh castShadow position={[0, 0, 0]}>
                <coneGeometry args={[0.38, 0.6, 8]} />
                <meshStandardMaterial color="#1B4D3E" roughness={0.6} />
              </mesh>
              <mesh castShadow position={[0, 0.3, 0]}>
                <coneGeometry args={[0.3, 0.5, 8]} />
                <meshStandardMaterial color="#266452" roughness={0.6} />
              </mesh>
            </group>
          ) : (
            <group position={[0, 0.85, 0]}>
              <mesh castShadow position={[0, 0, 0]}>
                <sphereGeometry args={[0.42, 12, 12]} />
                <meshStandardMaterial color="#2E664F" roughness={0.7} />
              </mesh>
              <mesh castShadow position={[0.15, 0.15, 0.05]}>
                <sphereGeometry args={[0.3, 10, 10]} />
                <meshStandardMaterial color="#3C7A60" roughness={0.7} />
              </mesh>
              <mesh castShadow position={[-0.12, 0.1, -0.08]}>
                <sphereGeometry args={[0.28, 10, 10]} />
                <meshStandardMaterial color="#235340" roughness={0.7} />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
}

// Camera Rig with Soft Mouse Parallax
function CameraRig({ mousePos }) {
  const { camera } = useThree();

  useFrame(() => {
    // Target position based on gentle mouse offset
    const targetX = 3.5 + (mousePos.current.x * 0.9);
    const targetY = 2.4 + (mousePos.current.y * 0.5);
    const targetZ = 4.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);

    camera.lookAt(0, 0.35, 0);
  });

  return null;
}

// Safe Fallback for WebGL / Low-power devices
function WebGLFallback() {
  return (
    <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden shadow-photo-frame bg-forest-900 flex items-center justify-center p-6 border border-gold-500/20">
      <img
        src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop"
        alt="Greenfield International School Campus"
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-900/60 to-transparent" />
      <div className="relative z-10 text-center max-w-sm">
        <div className="w-14 h-14 rounded-full border border-gold-400/40 mx-auto flex items-center justify-center mb-3 bg-forest-800/80">
          <span className="font-serif font-bold text-gold-300 text-lg">GIS</span>
        </div>
        <p className="text-xs uppercase tracking-super-wide text-gold-400 font-semibold mb-1">Sustainable 15-Acre Campus</p>
        <h3 className="font-serif text-ivory text-xl">Greenfield International School</h3>
        <p className="text-xs text-ivory/70 mt-2">Hyderabad, Telangana · Est. 2026</p>
      </div>
    </div>
  );
}

export default function SchoolScene() {
  const mousePos = useRef({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const { innerWidth, innerHeight } = window;
    mousePos.current.x = (e.clientX / innerWidth - 0.5) * 2;
    mousePos.current.y = -(e.clientY / innerHeight - 0.5) * 2;
  };

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div 
      className="relative w-full h-[450px] lg:h-[580px] xl:h-[640px] r3f-canvas-container select-none"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        shadows
        camera={{ position: [3.5, 2.4, 4.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <SoftShadows size={15} samples={8} focus={0.5} />
        
        {/* Warm Architectural Lighting */}
        <ambientLight intensity={0.85} color="#FAF7EE" />
        <directionalLight
          castShadow
          position={[6, 9, 5]}
          intensity={1.8}
          color="#FFF8E7"
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-bias={-0.0003}
        />
        {/* Soft Cool Fill Light for Architectural Contrast */}
        <directionalLight position={[-4, 3, -4]} intensity={0.4} color="#D4E5E0" />

        <CameraRig mousePos={mousePos} />

        <Float
          speed={reducedMotion ? 0 : 0.8}
          rotationIntensity={reducedMotion ? 0 : 0.05}
          floatIntensity={reducedMotion ? 0 : 0.1}
        >
          <CampusArchitecture />
        </Float>
      </Canvas>

      {/* Subtle Architectural Badge Overlay in Canvas Corner */}
      <div className="absolute bottom-4 right-4 bg-forest-950/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-500/20 text-[11px] text-ivory/80 flex items-center gap-2 pointer-events-none shadow-subtle-elevated">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
        <span className="tracking-wide">15-Acre Smart Green Campus</span>
      </div>
    </div>
  );
}
