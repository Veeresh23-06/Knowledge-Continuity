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
    scene.fog = new THREE.FogExp2(0x020202, 0.0016);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      1500
    );
    camera.position.z = 420;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 4. Create Quantum-style Central Isometric 3D Knowledge Cube
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Outer wireframe cube
    const outerBoxGeo = new THREE.BoxGeometry(110, 110, 110);
    const outerEdges = new THREE.EdgesGeometry(outerBoxGeo);
    const outerLineMat = new THREE.LineBasicMaterial({
      color: 0x14b8a6, // Teal
      transparent: true,
      opacity: 0.75,
    });
    const outerCube = new THREE.LineSegments(outerEdges, outerLineMat);
    cubeGroup.add(outerCube);

    // Mid wireframe cube
    const midBoxGeo = new THREE.BoxGeometry(80, 80, 80);
    const midEdges = new THREE.EdgesGeometry(midBoxGeo);
    const midLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8, // Cyan
      transparent: true,
      opacity: 0.55,
    });
    const midCube = new THREE.LineSegments(midEdges, midLineMat);
    cubeGroup.add(midCube);

    // Inner glowing core cube
    const coreBoxGeo = new THREE.BoxGeometry(45, 45, 45);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0f766e,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreCube = new THREE.Mesh(coreBoxGeo, coreMat);
    cubeGroup.add(coreCube);

    // Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(95, 0.8, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    cubeGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(125, 0.6, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    cubeGroup.add(ring2);

    // Position cube group in the upper-center area
    cubeGroup.position.set(0, 30, -50);

    // 5. Ambient Knowledge Particles and Ray Network
    const particleCount = 130;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const colors = new Float32Array(particleCount * 3);

    const tealColor = new THREE.Color(0x0d9488);
    const cyanColor = new THREE.Color(0x06b6d4);
    const emeraldColor = new THREE.Color(0x10b981);
    const whiteColor = new THREE.Color(0xffffff);

    const palette = [tealColor, cyanColor, emeraldColor, whiteColor];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 850;
      positions[i3 + 1] = (Math.random() - 0.5) * 650;
      positions[i3 + 2] = (Math.random() - 0.5) * 650;

      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
        z: (Math.random() - 0.5) * 0.3,
      });

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(45, 212, 191, 0.7)");
      gradient.addColorStop(1, "rgba(13, 148, 136, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 7,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 6. Dynamic Connection Lines
    const maxLines = 180;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 7. Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.4;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.4;
    };

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // 8. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Mouse & Scroll Parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      targetScrollY += (scrollY - targetScrollY) * 0.08;

      camera.position.x = targetX * 0.6;
      camera.position.y = -targetY * 0.6;
      camera.position.z = 420 + targetScrollY * 0.2;

      // Rotate 3D Cube and Rings
      cubeGroup.rotation.y += 0.005;
      cubeGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.15 + (targetY * 0.001);
      cubeGroup.rotation.z = Math.cos(Date.now() * 0.0008) * 0.1;

      midCube.rotation.y -= 0.008;
      midCube.rotation.x -= 0.005;
      coreCube.rotation.y += 0.012;

      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;

      // Slowly rotate particle field
      particles.rotation.y += 0.0008;
      linesMesh.rotation.y = particles.rotation.y;

      // Update particles
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i].x;
        pos[i3 + 1] += velocities[i].y;
        pos[i3 + 2] += velocities[i].z;

        if (pos[i3] > 425 || pos[i3] < -425) velocities[i].x *= -1;
        if (pos[i3 + 1] > 325 || pos[i3 + 1] < -325) velocities[i].y *= -1;
        if (pos[i3 + 2] > 325 || pos[i3 + 2] < -325) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Update connection lines
      let lineVertexIndex = 0;
      let lineCount = 0;
      const connectionDist = 100;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          if (lineCount >= maxLines) break;

          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDist) {
            const alpha = 1.0 - dist / connectionDist;

            linePositions[lineVertexIndex] = pos[i * 3];
            linePositions[lineVertexIndex + 1] = pos[i * 3 + 1];
            linePositions[lineVertexIndex + 2] = pos[i * 3 + 2];

            lineColors[lineVertexIndex] = 0.08 * alpha;
            lineColors[lineVertexIndex + 1] = 0.72 * alpha;
            lineColors[lineVertexIndex + 2] = 0.68 * alpha;

            linePositions[lineVertexIndex + 3] = pos[j * 3];
            linePositions[lineVertexIndex + 4] = pos[j * 3 + 1];
            linePositions[lineVertexIndex + 5] = pos[j * 3 + 2];

            lineColors[lineVertexIndex + 3] = 0.08 * alpha;
            lineColors[lineVertexIndex + 4] = 0.72 * alpha;
            lineColors[lineVertexIndex + 5] = 0.68 * alpha;

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

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      outerBoxGeo.dispose();
      outerEdges.dispose();
      outerLineMat.dispose();
      midBoxGeo.dispose();
      midEdges.dispose();
      midLineMat.dispose();
      coreBoxGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();

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
