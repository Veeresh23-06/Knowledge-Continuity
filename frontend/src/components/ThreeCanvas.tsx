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
    const bgColor = 0x020202;
    scene.fog = new THREE.FogExp2(bgColor, 0.0015);

    // 2. Camera setup with cinematic depth
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.set(0, 70, 360);
    camera.lookAt(0, -20, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(bgColor, 0);
    container.appendChild(renderer.domElement);

    // 4. Undulating 3D Knowledge Data Wavefield (Continuous Mathematical Topology)
    const gridX = 72;
    const gridY = 52;
    const planeWidth = 1400;
    const planeDepth = 1050;
    const waveGeo = new THREE.PlaneGeometry(planeWidth, planeDepth, gridX, gridY);
    waveGeo.rotateX(-Math.PI / 2.2);

    const vertexCount = (gridX + 1) * (gridY + 1);
    const waveColors = new Float32Array(vertexCount * 3);
    const origPositions = waveGeo.attributes.position.array.slice() as Float32Array;

    // Circular glowing particle texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(45, 212, 191, 0.85)");
      grad.addColorStop(0.7, "rgba(14, 165, 233, 0.35)");
      grad.addColorStop(1, "rgba(14, 165, 233, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    // Wave Points
    waveGeo.setAttribute("color", new THREE.BufferAttribute(waveColors, 3));
    const wavePointMat = new THREE.PointsMaterial({
      size: 5.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });
    const wavePoints = new THREE.Points(waveGeo, wavePointMat);
    wavePoints.position.set(0, -90, -120);
    scene.add(wavePoints);

    // Wave Wireframe Mesh (Subtle connecting lines between grid points)
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x0f766e,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const waveMesh = new THREE.Mesh(waveGeo, wireframeMat);
    waveMesh.position.set(0, -90, -120);
    scene.add(waveMesh);

    // 5. Floating Knowledge Beacons (Upper Atmosphere Constellation)
    const beaconCount = 75;
    const beaconGeo = new THREE.BufferGeometry();
    const beaconPos = new Float32Array(beaconCount * 3);
    const beaconVels: { x: number; y: number; z: number }[] = [];
    const beaconColors = new Float32Array(beaconCount * 3);

    const tealC = new THREE.Color(0x14b8a6);
    const cyanC = new THREE.Color(0x38bdf8);
    const emeraldC = new THREE.Color(0x10b981);
    const whiteC = new THREE.Color(0xffffff);
    const colorChoices = [tealC, cyanC, emeraldC, whiteC];

    for (let i = 0; i < beaconCount; i++) {
      const i3 = i * 3;
      beaconPos[i3] = (Math.random() - 0.5) * 800;
      beaconPos[i3 + 1] = Math.random() * 260 - 20; // Float above the wavefield
      beaconPos[i3 + 2] = (Math.random() - 0.5) * 600;

      beaconVels.push({
        x: (Math.random() - 0.5) * 0.22,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.22,
      });

      const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      beaconColors[i3] = chosenColor.r;
      beaconColors[i3 + 1] = chosenColor.g;
      beaconColors[i3 + 2] = chosenColor.b;
    }

    beaconGeo.setAttribute("position", new THREE.BufferAttribute(beaconPos, 3));
    beaconGeo.setAttribute("color", new THREE.BufferAttribute(beaconColors, 3));

    const beaconMat = new THREE.PointsMaterial({
      size: 7,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });
    const beacons = new THREE.Points(beaconGeo, beaconMat);
    scene.add(beacons);

    // Dynamic Evidence Link Lines
    const maxLinks = 120;
    const linkPositions = new Float32Array(maxLinks * 6);
    const linkColors = new Float32Array(maxLinks * 6);
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPositions, 3));
    linkGeo.setAttribute("color", new THREE.BufferAttribute(linkColors, 3));

    const linkMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const linksMesh = new THREE.LineSegments(linkGeo, linkMat);
    scene.add(linksMesh);

    // 6. Interactive Cursor and Scroll Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.35;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.35;
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

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth parallax tracking
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      targetScrollY += (scrollY - targetScrollY) * 0.06;

      camera.position.x = targetX * 0.5;
      camera.position.y = 70 - targetY * 0.4;
      camera.position.z = 360 + targetScrollY * 0.18;
      camera.lookAt(targetX * 0.15, -20 - targetY * 0.15, 0);

      // --- Animate 3D Data Wavefield ---
      const posAttr = waveGeo.attributes.position;
      const posArray = posAttr.array as Float32Array;
      const colArray = waveGeo.attributes.color.array as Float32Array;

      for (let i = 0; i < vertexCount; i++) {
        const idx = i * 3;
        const ox = origPositions[idx];
        const oy = origPositions[idx + 1];

        // Multi-frequency topological wave calculation
        const wave1 = Math.sin(ox * 0.007 + time * 1.1) * Math.cos(oy * 0.008 + time * 0.9) * 36;
        const wave2 = Math.sin((ox + oy) * 0.005 + time * 0.7) * 20;
        const wave3 = Math.cos(Math.sqrt(ox * ox + oy * oy) * 0.006 - time * 0.8) * 16;
        
        // Interactive cursor ripple
        const dx = ox - targetX * 1.5;
        const dy = oy - targetY * 1.5;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseRipple = Math.exp(-distToMouse * 0.004) * Math.sin(distToMouse * 0.02 - time * 3) * 14;

        const elevation = wave1 + wave2 + wave3 + mouseRipple;
        posArray[idx + 2] = elevation;

        // Dynamic elevation-based color gradient (Obsidian dark -> Teal -> Luminous Cyan)
        const normH = (elevation + 45) / 90; // Normalize approx 0 to 1
        const clampedH = Math.max(0, Math.min(1, normH));

        colArray[idx] = 0.04 + clampedH * 0.18; // Red
        colArray[idx + 1] = 0.45 + clampedH * 0.55; // Green (Teal)
        colArray[idx + 2] = 0.55 + clampedH * 0.45; // Blue (Cyan)
      }

      posAttr.needsUpdate = true;
      waveGeo.attributes.color.needsUpdate = true;
      waveGeo.computeVertexNormals();

      // --- Animate Floating Knowledge Beacons ---
      const bPos = beaconGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < beaconCount; i++) {
        const i3 = i * 3;
        bPos[i3] += beaconVels[i].x;
        bPos[i3 + 1] += beaconVels[i].y;
        bPos[i3 + 2] += beaconVels[i].z;

        // Soft vertical floating oscillation
        bPos[i3 + 1] += Math.sin(time * 1.2 + i) * 0.18;

        // Boundary reflection
        if (bPos[i3] > 420 || bPos[i3] < -420) beaconVels[i].x *= -1;
        if (bPos[i3 + 1] > 260 || bPos[i3 + 1] < -30) beaconVels[i].y *= -1;
        if (bPos[i3 + 2] > 320 || bPos[i3 + 2] < -320) beaconVels[i].z *= -1;
      }
      beaconGeo.attributes.position.needsUpdate = true;

      // --- Update Evidence Connection Links ---
      let linkVertexIdx = 0;
      let activeLinkCount = 0;
      const linkThreshold = 95;

      for (let i = 0; i < beaconCount; i++) {
        for (let j = i + 1; j < beaconCount; j++) {
          if (activeLinkCount >= maxLinks) break;

          const dx = bPos[i * 3] - bPos[j * 3];
          const dy = bPos[i * 3 + 1] - bPos[j * 3 + 1];
          const dz = bPos[i * 3 + 2] - bPos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < linkThreshold) {
            const alpha = 1.0 - dist / linkThreshold;

            linkPositions[linkVertexIdx] = bPos[i * 3];
            linkPositions[linkVertexIdx + 1] = bPos[i * 3 + 1];
            linkPositions[linkVertexIdx + 2] = bPos[i * 3 + 2];

            linkColors[linkVertexIdx] = 0.08 * alpha;
            linkColors[linkVertexIdx + 1] = 0.75 * alpha;
            linkColors[linkVertexIdx + 2] = 0.85 * alpha;

            linkPositions[linkVertexIdx + 3] = bPos[j * 3];
            linkPositions[linkVertexIdx + 4] = bPos[j * 3 + 1];
            linkPositions[linkVertexIdx + 5] = bPos[j * 3 + 2];

            linkColors[linkVertexIdx + 3] = 0.08 * alpha;
            linkColors[linkVertexIdx + 4] = 0.75 * alpha;
            linkColors[linkVertexIdx + 5] = 0.85 * alpha;

            linkVertexIdx += 6;
            activeLinkCount++;
          }
        }
      }

      linkGeo.setDrawRange(0, activeLinkCount * 2);
      linkGeo.attributes.position.needsUpdate = true;
      linkGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources on unmount
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      waveGeo.dispose();
      wavePointMat.dispose();
      wireframeMat.dispose();
      particleTexture.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      linkGeo.dispose();
      linkMat.dispose();
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
