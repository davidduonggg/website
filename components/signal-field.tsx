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
    scene.fog = new THREE.FogExp2(0x000000, 0.042);

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

    const root = new THREE.Group();
    scene.add(root);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.7,
    });
    const ghostMaterial = new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.2,
    });
    const squiggles: THREE.Line[] = [];

    for (let strand = 0; strand < 10; strand += 1) {
      const points: THREE.Vector3[] = [];
      const phase = (strand / 10) * Math.PI * 2;

      for (let index = 0; index <= 280; index += 1) {
        const t = (index / 280) * Math.PI * 2;
        const radius = 3.25 + Math.sin(t * 3 + phase) * 1.12 + Math.cos(t * 5 - phase) * 0.36;
        const x = Math.cos(t + phase * 0.16) * radius;
        const y = Math.sin(t * 2 + phase) * 1.36 + Math.cos(t * 4 + phase) * 0.4;
        const z = Math.sin(t + phase * 0.34) * radius * 0.72;

        points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, strand < 6 ? lineMaterial : ghostMaterial);
      line.rotation.set(strand * 0.19, strand * 0.31, strand * 0.13);
      squiggles.push(line);
      root.add(line);
    }

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions: number[] = [];
    const particleColors: number[] = [];
    const white = new THREE.Color("#ffffff");
    const grey = new THREE.Color("#8f9492");

    for (let index = 0; index < 620; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.62) * 9.5;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.6;
      const y = Math.sin(angle) * radius * 0.56 + (Math.random() - 0.5) * 4.8;
      const z = (Math.random() - 0.5) * 8.5;
      const shade = white.clone().lerp(grey, Math.min(radius / 9.5, 1) * 0.7);

      particlePositions.push(x, y, z);
      particleColors.push(shade.r, shade.g, shade.b);
    }

    particleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.Float32BufferAttribute(particleColors, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    root.add(particles);

    const haloMaterial = new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.14,
    });
    const haloCurve = new THREE.EllipseCurve(0, 0, 7.2, 2.05, 0, Math.PI * 2);
    const halo = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(haloCurve.getPoints(220).map((point) => new THREE.Vector3(point.x, point.y, 0))),
      haloMaterial,
    );
    halo.rotation.set(0.72, 0.28, -0.36);
    root.add(halo);

    const pointer = new THREE.Vector2(0, 0);
    let frame = 0;
    let animationFrame = 0;
    let running = true;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.position.z = width < 720 ? 22 : 18;
      root.scale.setScalar(width < 720 ? 0.74 : 1);
      root.position.x = width < 720 ? 2.3 : 4.2;
      root.position.y = width < 720 ? 0.6 : 0.1;
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

      frame += 0.008;
      root.rotation.y = frame * 0.32 + pointer.x * 0.24;
      root.rotation.x = Math.sin(frame * 0.8) * 0.16 + pointer.y * 0.18;
      squiggles.forEach((line, index) => {
        const offset = index * 0.32;
        line.rotation.x += Math.sin(frame + offset) * 0.0009;
        line.rotation.y += 0.0018 + index * 0.00018;
        line.scale.setScalar(1 + Math.sin(frame * 1.8 + offset) * 0.035);
      });
      particles.rotation.y = -frame * 0.3;
      particles.rotation.x = Math.sin(frame) * 0.16;
      halo.rotation.z += 0.003;
      halo.rotation.x = 0.72 + Math.sin(frame * 1.2) * 0.16;

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
      squiggles.forEach((line) => line.geometry.dispose());
      lineMaterial.dispose();
      ghostMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      halo.geometry.dispose();
      haloMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="signal-canvas" data-testid="signal-field" ref={hostRef} aria-hidden="true" />;
}
