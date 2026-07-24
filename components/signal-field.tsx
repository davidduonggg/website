"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SignalField() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const rows = 28;
    const cols = 42;
    const positions: number[] = [];
    const colors: number[] = [];
    const colorA = new THREE.Color("#68f3dc");
    const colorB = new THREE.Color("#ffcf6b");

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        positions.push((x - cols / 2) * 0.58, (y - rows / 2) * 0.58, 0);
        const mixed = colorA.clone().lerp(colorB, (x + y) / (rows + cols));
        colors.push(mixed.r, mixed.g, mixed.b);
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    const points = new THREE.Points(geometry, material);
    points.position.x = 4.5;
    scene.add(points);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#68f3dc",
      transparent: true,
      opacity: 0.18,
    });
    const lineSegments: THREE.LineSegments[] = [];

    for (let y = 0; y < rows; y += 4) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions: number[] = [];

      for (let x = 0; x < cols - 1; x += 1) {
        const index = y * cols + x;
        linePositions.push(
          positions[index * 3],
          positions[index * 3 + 1],
          positions[index * 3 + 2],
          positions[(index + 1) * 3],
          positions[(index + 1) * 3 + 1],
          positions[(index + 1) * 3 + 2],
        );
      }

      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      const line = new THREE.LineSegments(lineGeometry, lineMaterial);
      line.position.copy(points.position);
      lineSegments.push(line);
      scene.add(line);
    }

    const pointer = new THREE.Vector2(0, 0);
    let frame = 0;
    let animationFrame = 0;
    let running = true;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const move = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const render = () => {
      if (!running) {
        return;
      }

      frame += 0.01;
      const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;

      for (let index = 0; index < attribute.count; index += 1) {
        const x = positions[index * 3];
        const y = positions[index * 3 + 1];
        const wave = Math.sin(frame + x * 0.48 + y * 0.36) * 0.34;
        attribute.setZ(index, wave + pointer.x * 1.2 + pointer.y * 0.4);
      }

      attribute.needsUpdate = true;
      points.rotation.x = pointer.y * 0.28;
      points.rotation.y = pointer.x * 0.36;
      lineSegments.forEach((line) => {
        line.rotation.copy(points.rotation);
      });

      renderer.render(scene, camera);

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    resize();
    host.addEventListener("pointermove", move);
    window.addEventListener("resize", resize);
    render();

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      host.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      lineMaterial.dispose();
      lineSegments.forEach((line) => line.geometry.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="signal-canvas" data-testid="signal-field" ref={hostRef} aria-hidden="true" />;
}
