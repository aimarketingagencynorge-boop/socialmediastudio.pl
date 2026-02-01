
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface StarfieldProps {
  intensity: number;
  progress: MotionValue<number>;
}

export const Starfield: React.FC<StarfieldProps> = ({ intensity, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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

    // Helpers to create iconic shapes
    const createXWing = () => {
      const group = new THREE.Group();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 2), material);
      group.add(body);
      const wingGeom = new THREE.BoxGeometry(1.5, 0.05, 0.6);
      const w1 = new THREE.Mesh(wingGeom, material);
      w1.rotation.z = Math.PI / 5;
      group.add(w1);
      const w2 = new THREE.Mesh(wingGeom, material);
      w2.rotation.z = -Math.PI / 5;
      group.add(w2);
      return group;
    };

    const createTieFighter = () => {
      const group = new THREE.Group();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), material);
      group.add(ball);
      const wingGeom = new THREE.BoxGeometry(0.05, 1.5, 1.2);
      const w1 = new THREE.Mesh(wingGeom, material);
      w1.position.x = 0.6;
      group.add(w1);
      const w2 = new THREE.Mesh(wingGeom, material);
      w2.position.x = -0.6;
      group.add(w2);
      return group;
    };

    // Star System
    const starsCount = 6000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 3);
    const velocities = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i + 1] = (Math.random() - 0.5) * 80;
      positions[i + 2] = -Math.random() * 100;
      velocities[i/3] = 0.05 + Math.random() * 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x88ffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(geometry, starMaterial);
    scene.add(starPoints);

    // Floating Planet
    const planetGroup = new THREE.Group();
    const planetGeom = new THREE.SphereGeometry(6, 48, 48);
    const planetMat = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff, 
      wireframe: true,
      transparent: true,
      opacity: 0.15 
    });
    const planet = new THREE.Mesh(planetGeom, planetMat);
    planetGroup.add(planet);
    planetGroup.position.set(15, -10, -120);
    scene.add(planetGroup);

    // Recognizable Ships
    const ships: { group: THREE.Group, offset: number, orbit: number }[] = [];
    for (let i = 0; i < 4; i++) {
      const shipGroup = i % 2 === 0 ? createXWing() : createTieFighter();
      const shipData = {
        group: shipGroup,
        offset: Math.random() * 100,
        orbit: 10 + Math.random() * 20
      };
      shipGroup.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 20, -100 - i * 40);
      scene.add(shipGroup);
      ships.push(shipData);
    }

    camera.position.z = 5;

    let frame: number;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      const p = progress.get();
      const posAttr = starPoints.geometry.attributes.position.array as Float32Array;
      const speed = 0.2 + (intensity * 4) + (p * 2);

      starMaterial.size = 0.1 + intensity * 0.2;
      
      for (let i = 0; i < starsCount; i++) {
        const i3 = i * 3;
        posAttr[i3 + 2] += velocities[i] * speed;
        if (posAttr[i3 + 2] > 5) {
          posAttr[i3 + 2] = -100;
          posAttr[i3] = (Math.random() - 0.5) * 80;
          posAttr[i3 + 1] = (Math.random() - 0.5) * 80;
        }
      }
      starPoints.geometry.attributes.position.needsUpdate = true;

      planetGroup.position.z = -120 + p * 150;
      planet.rotation.y += 0.002;
      planetMat.opacity = 0.1 + p * 0.2;

      ships.forEach((shipData, idx) => {
        const ship = shipData.group;
        ship.position.z += speed * 0.9;
        // Subtle banking/swerving motion
        ship.position.x += Math.sin(Date.now() * 0.001 + idx) * 0.02;
        ship.rotation.z = Math.sin(Date.now() * 0.001 + idx) * 0.1;

        if (ship.position.z > 10) {
          ship.position.z = -200;
          ship.position.x = (Math.random() - 0.5) * 60;
          ship.position.y = (Math.random() - 0.5) * 30;
        }
      });

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
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full fixed inset-0"
      style={{ 
        filter: intensity > 0.5 ? `blur(${intensity * 1.5}px) contrast(1.2)` : 'none',
        transition: 'filter 0.1s ease-out'
      }}
    />
  );
};
