"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/lib/theme-context";

interface ThreeCanvasProps {
  forcedTheme?: "dark" | "light";
}

export function ThreeCanvas({ forcedTheme }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme: contextTheme } = useTheme();
  const activeTheme = forcedTheme || contextTheme || "dark";
  const sceneRef = useRef<{
    updateTheme: (t: "dark" | "light") => void;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const isDark = activeTheme === "dark";
    const bgHex = isDark ? 0x020202 : 0xf8fafc;
    const fog = new THREE.FogExp2(bgHex, 0.0016);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      1,
      1800
    );
    camera.position.set(0, 20, 390);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(bgHex, 0);
    container.appendChild(renderer.domElement);

    // 2. Central 3D Crystalline Knowledge Nexus (Faceted Icosahedron & Gyro Rings)
    const nexusGroup = new THREE.Group();
    scene.add(nexusGroup);
    nexusGroup.position.set(0, 35, -40);

    // Outer Faceted Polyhedron (Icosahedron)
    const icoGeo = new THREE.IcosahedronGeometry(75, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoLineMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x2dd4bf : 0x0d9488,
      transparent: true,
      opacity: isDark ? 0.75 : 0.65,
    });
    const icoMesh = new THREE.LineSegments(icoEdges, icoLineMat);
    nexusGroup.add(icoMesh);

    // Inner Glowing Core (Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(42, 0);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerLineMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.6 : 0.5,
    });
    const innerMesh = new THREE.LineSegments(innerEdges, innerLineMat);
    nexusGroup.add(innerMesh);

    // Concentric Gyroscopic Rings
    const ring1Geo = new THREE.TorusGeometry(96, 0.9, 16, 90);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x14b8a6 : 0x0f766e,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    nexusGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(120, 0.7, 16, 90);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0ea5e9 : 0x0369a1,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    nexusGroup.add(ring2);

    // 3. Sprawling 3D Knowledge Network Nodes (Particle Constellation)
    const nodeCount = 130;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];
    const nodeColors = new Float32Array(nodeCount * 3);

    // Canvas texture for round luminous particles
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const g = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      g.addColorStop(0, "rgba(255, 255, 255, 1)");
      g.addColorStop(0.3, "rgba(45, 212, 191, 0.85)");
      g.addColorStop(0.7, "rgba(14, 165, 233, 0.3)");
      g.addColorStop(1, "rgba(14, 165, 233, 0)");
      pCtx.fillStyle = g;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const nodeTexture = new THREE.CanvasTexture(pCanvas);

    const darkColors = [new THREE.Color(0x14b8a6), new THREE.Color(0x38bdf8), new THREE.Color(0x10b981), new THREE.Color(0xffffff)];
    const lightColors = [new THREE.Color(0x0d9488), new THREE.Color(0x0284c7), new THREE.Color(0x059669), new THREE.Color(0x475569)];

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      nodePositions[i3] = (Math.random() - 0.5) * 850;
      nodePositions[i3 + 1] = (Math.random() - 0.5) * 620;
      nodePositions[i3 + 2] = (Math.random() - 0.5) * 620;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.28,
        y: (Math.random() - 0.5) * 0.28,
        z: (Math.random() - 0.5) * 0.28,
      });

      const colorSet = isDark ? darkColors : lightColors;
      const c = colorSet[Math.floor(Math.random() * colorSet.length)];
      nodeColors[i3] = c.r;
      nodeColors[i3 + 1] = c.g;
      nodeColors[i3 + 2] = c.b;
    }

    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 6.5,
      map: nodeTexture,
      transparent: true,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexColors: true,
      depthWrite: false,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // 4. Dynamic Synaptic Connections & Traveling Data Pulses
    const maxLines = 180;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.32 : 0.22,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);

    // 5. Interactive Mouse & Scroll Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.38;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.38;
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

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      targetScrollY += (scrollY - targetScrollY) * 0.06;

      camera.position.x = targetX * 0.55;
      camera.position.y = 20 - targetY * 0.55;
      camera.position.z = 390 + targetScrollY * 0.2;
      camera.lookAt(0, 0, 0);

      // Rotate Knowledge Nexus & Orbital Rings
      nexusGroup.rotation.y += 0.005;
      nexusGroup.rotation.x = Math.sin(time * 0.8) * 0.12 + targetY * 0.0008;
      nexusGroup.rotation.z = Math.cos(time * 0.6) * 0.08;

      innerMesh.rotation.y -= 0.008;
      innerMesh.rotation.x -= 0.006;

      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;

      // Rotate background node field
      nodes.rotation.y += 0.0006;
      linesMesh.rotation.y = nodes.rotation.y;

      // Update positions of knowledge nodes
      const pos = nodeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        pos[i3] += nodeVelocities[i].x;
        pos[i3 + 1] += nodeVelocities[i].y;
        pos[i3 + 2] += nodeVelocities[i].z;

        // Bounce back within boundary sphere
        if (pos[i3] > 425 || pos[i3] < -425) nodeVelocities[i].x *= -1;
        if (pos[i3 + 1] > 310 || pos[i3 + 1] < -310) nodeVelocities[i].y *= -1;
        if (pos[i3 + 2] > 310 || pos[i3 + 2] < -310) nodeVelocities[i].z *= -1;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      // Update Synaptic Evidence Connections
      let lineVertexIdx = 0;
      let activeLineCount = 0;
      const connectionDist = 105;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (activeLineCount >= maxLines) break;

          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDist) {
            const alpha = 1.0 - dist / connectionDist;

            linePositions[lineVertexIdx] = pos[i * 3];
            linePositions[lineVertexIdx + 1] = pos[i * 3 + 1];
            linePositions[lineVertexIdx + 2] = pos[i * 3 + 2];

            lineColors[lineVertexIdx] = (isDark ? 0.08 : 0.05) * alpha;
            lineColors[lineVertexIdx + 1] = (isDark ? 0.72 : 0.55) * alpha;
            lineColors[lineVertexIdx + 2] = (isDark ? 0.75 : 0.65) * alpha;

            linePositions[lineVertexIdx + 3] = pos[j * 3];
            linePositions[lineVertexIdx + 4] = pos[j * 3 + 1];
            linePositions[lineVertexIdx + 5] = pos[j * 3 + 2];

            lineColors[lineVertexIdx + 3] = (isDark ? 0.08 : 0.05) * alpha;
            lineColors[lineVertexIdx + 4] = (isDark ? 0.72 : 0.55) * alpha;
            lineColors[lineVertexIdx + 5] = (isDark ? 0.75 : 0.65) * alpha;

            lineVertexIdx += 6;
            activeLineCount++;
          }
        }
      }

      lineGeo.setDrawRange(0, activeLineCount * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Scene theme updater
    sceneRef.current = {
      updateTheme: (newTheme: "dark" | "light") => {
        const dark = newTheme === "dark";
        const newBg = dark ? 0x020202 : 0xf8fafc;
        fog.color.setHex(newBg);
        renderer.setClearColor(newBg, 0);

        icoLineMat.color.setHex(dark ? 0x2dd4bf : 0x0d9488);
        icoLineMat.opacity = dark ? 0.75 : 0.65;

        innerLineMat.color.setHex(dark ? 0x38bdf8 : 0x0284c7);
        innerLineMat.opacity = dark ? 0.6 : 0.5;

        ring1Mat.color.setHex(dark ? 0x14b8a6 : 0x0f766e);
        ring1Mat.opacity = dark ? 0.45 : 0.35;

        ring2Mat.color.setHex(dark ? 0x0ea5e9 : 0x0369a1);
        ring2Mat.opacity = dark ? 0.35 : 0.25;

        nodeMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        lineMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        lineMat.opacity = dark ? 0.32 : 0.22;

        const cSet = dark ? darkColors : lightColors;
        const cArr = nodeGeo.attributes.color.array as Float32Array;
        for (let i = 0; i < nodeCount; i++) {
          const col = cSet[i % cSet.length];
          cArr[i * 3] = col.r;
          cArr[i * 3 + 1] = col.g;
          cArr[i * 3 + 2] = col.b;
        }
        nodeGeo.attributes.color.needsUpdate = true;
      },
    };

    // Cleanup resources on unmount
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      icoGeo.dispose();
      icoEdges.dispose();
      icoLineMat.dispose();
      innerGeo.dispose();
      innerEdges.dispose();
      innerLineMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();

      nodeGeo.dispose();
      nodeMat.dispose();
      nodeTexture.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update theme dynamically when theme changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.updateTheme(activeTheme);
    }
  }, [activeTheme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
