
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface StarfieldProps {
  intensity: number; // 0 for normal, higher for warp-gate
  progress: MotionValue<number>;
}

export const Starfield: React.FC<StarfieldProps> = ({ intensity, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastProgress = useRef(0);
  const velocity = useRef(0);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Stars as Line Segments for Stretching Effect
    const starsCount = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 6); // Line segments (start and end)
    const baseSpeeds = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = -Math.random() * 150;
      
      const i6 = i * 6;
      positions[i6] = x;
      positions[i6 + 1] = y;
      positions[i6 + 2] = z;
      positions[i6 + 3] = x;
      positions[i6 + 4] = y;
      positions[i6 + 5] = z; // End starts at same point

      baseSpeeds[i] = 0.1 + Math.random() * 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.LineBasicMaterial({
      color: 0x88ffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const starLines = new THREE.LineSegments(geometry, starMaterial);
    scene.add(starLines);

    // Planet & Ships logic from before
    const planetGroup = new THREE.Group();
    const planetGeom = new THREE.SphereGeometry(8, 32, 32);
    const planetMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.1 });
    const planet = new THREE.Mesh(planetGeom, planetMat);
    planetGroup.add(planet);
    planetGroup.position.set(20, -15, -150);
    scene.add(planetGroup);

    camera.position.z = 5;

    let frame: number;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Calculate Scroll Velocity
      const currentP = progress.get();
      const delta = Math.abs(currentP - lastProgress.current);
      velocity.current = THREE.MathUtils.lerp(velocity.current, delta * 50, 0.1);
      lastProgress.current = currentP;

      const effectiveSpeed = 0.1 + velocity.current + (intensity * 5);
      const stretch = Math.min(effectiveSpeed * 2, 8); // How much stars stretch

      const posAttr = starLines.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < starsCount; i++) {
        const i6 = i * 6;
        const zPos = posAttr[i6 + 2];
        const moveSpeed = baseSpeeds[i] * (1 + velocity.current * 10);
        
        // Update both points of the line segment
        posAttr[i6 + 2] += moveSpeed;
        posAttr[i6 + 5] = posAttr[i6 + 2] - stretch; // The tail

        if (posAttr[i6 + 2] > 10) {
          posAttr[i6 + 2] = -150;
          posAttr[i6 + 5] = -150;
          posAttr[i6] = posAttr[i6 + 3] = (Math.random() - 0.5) * 100;
          posAttr[i6 + 1] = posAttr[i6 + 4] = (Math.random() - 0.5) * 100;
        }
      }
      starLines.geometry.attributes.position.needsUpdate = true;

      // Camera Dynamic FOV
      camera.fov = 75 + (velocity.current * 20);
      camera.updateProjectionMatrix();

      planetGroup.position.z = -150 + (currentP * 180);
      planet.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]); // Added intensity to deps to reset if needed

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full fixed inset-0"
        style={{ 
          filter: intensity > 0.5 ? `blur(${intensity * 2}px) brightness(1.5)` : 'none',
        }}
      />
      {/* Cockpit Glass Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-60" />
      <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-10">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
      </div>
    </>
  );
};
