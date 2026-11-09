"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.0018);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    // 4. Create Connected Knowledge Network Nodes
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const colors = new Float32Array(particleCount * 3);

    const tealColor = new THREE.Color(0x0d9488); // #0d9488
    const cyanColor = new THREE.Color(0x06b6d4); // #06b6d4
    const emeraldColor = new THREE.Color(0x10b981); // #10b981
    const blueColor = new THREE.Color(0x3b82f6); // #3b82f6

    const palette = [tealColor, cyanColor, emeraldColor, blueColor];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 800;
      positions[i3 + 1] = (Math.random() - 0.5) * 600;
      positions[i3 + 2] = (Math.random() - 0.5) * 600;

      velocities.push({
        x: (Math.random() - 0.5) * 0.4,
        y: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.4,
      });

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material with round texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(45, 212, 191, 0.8)");
      gradient.addColorStop(1, "rgba(13, 148, 136, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 9,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 5. Dynamic Connection Lines (Relationships / Evidence Links)
    const maxLines = 300;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 6. Interactive Mouse & Scroll tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.5;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.5;
    };

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth mouse parallax
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Smooth scroll effect on camera depth and network rotation
      targetScrollY += (scrollY - targetScrollY) * 0.06;

      camera.position.x = targetX * 0.8;
      camera.position.y = -targetY * 0.8;
      camera.position.z = 400 + targetScrollY * 0.25;

      particles.rotation.y += 0.0012;
      particles.rotation.x = targetScrollY * 0.0004;
      linesMesh.rotation.y = particles.rotation.y;
      linesMesh.rotation.x = particles.rotation.x;

      // Update particle positions
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i].x;
        pos[i3 + 1] += velocities[i].y;
        pos[i3 + 2] += velocities[i].z;

        // Boundary bouncing
        if (pos[i3] > 400 || pos[i3] < -400) velocities[i].x *= -1;
        if (pos[i3 + 1] > 300 || pos[i3 + 1] < -300) velocities[i].y *= -1;
        if (pos[i3 + 2] > 300 || pos[i3 + 2] < -300) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Update connected lines between nearby nodes
      let lineVertexIndex = 0;
      let lineCount = 0;
      const connectionDist = 110;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          if (lineCount >= maxLines) break;

          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDist) {
            const alpha = 1.0 - dist / connectionDist;

            // Point 1
            linePositions[lineVertexIndex] = pos[i * 3];
            linePositions[lineVertexIndex + 1] = pos[i * 3 + 1];
            linePositions[lineVertexIndex + 2] = pos[i * 3 + 2];

            lineColors[lineVertexIndex] = 0.05 * alpha;
            lineColors[lineVertexIndex + 1] = 0.7 * alpha;
            lineColors[lineVertexIndex + 2] = 0.65 * alpha;

            // Point 2
            linePositions[lineVertexIndex + 3] = pos[j * 3];
            linePositions[lineVertexIndex + 4] = pos[j * 3 + 1];
            linePositions[lineVertexIndex + 5] = pos[j * 3 + 2];

            lineColors[lineVertexIndex + 3] = 0.05 * alpha;
            lineColors[lineVertexIndex + 4] = 0.7 * alpha;
            lineColors[lineVertexIndex + 5] = 0.65 * alpha;

            lineVertexIndex += 6;
            lineCount++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

