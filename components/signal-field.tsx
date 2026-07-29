"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createParticleTexture() {
  const canvas = document.createElement("canvas");
  const size = 64;
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.34, "rgba(255,255,255,0.72)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.12)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

export function SignalField() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.026);

    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 110);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const particleTexture = createParticleTexture();
    const root = new THREE.Group();
    scene.add(root);

    const white = new THREE.Color("#ffffff");
    const silver = new THREE.Color("#cfd6d2");
    const smoke = new THREE.Color("#59605e");

    const farRandom = seededRandom(2319);
    const farGeometry = new THREE.BufferGeometry();
    const farPositions: number[] = [];
    const farColors: number[] = [];

    for (let index = 0; index < 2600; index += 1) {
      const angle = farRandom() * Math.PI * 2;
      const radius = 12 + Math.pow(farRandom(), 0.46) * 42;
      const x = Math.cos(angle) * radius + (farRandom() - 0.5) * 10;
      const y = Math.sin(angle) * radius * 0.48 + (farRandom() - 0.5) * 14;
      const z = -12 - farRandom() * 52;
      const brightness = farRandom() > 0.965 ? 0.08 : 0.48 + farRandom() * 0.44;
      const shade = white.clone().lerp(smoke, brightness);

      farPositions.push(x, y, z);
      farColors.push(shade.r, shade.g, shade.b);
    }

    farGeometry.setAttribute("position", new THREE.Float32BufferAttribute(farPositions, 3));
    farGeometry.setAttribute("color", new THREE.Float32BufferAttribute(farColors, 3));

    const farMaterial = new THREE.PointsMaterial({
      size: 0.09,
      map: particleTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const farParticles = new THREE.Points(farGeometry, farMaterial);
    scene.add(farParticles);

    const dustRandom = seededRandom(7401);
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions: number[] = [];
    const dustColors: number[] = [];

    for (let index = 0; index < 1500; index += 1) {
      const x = (dustRandom() - 0.5) * 42;
      const wave = Math.sin(x * 0.34 + dustRandom() * 0.8) * 2.2;
      const y = x * 0.075 + wave + (dustRandom() - 0.5) * 4.6;
      const z = -18 + (dustRandom() - 0.5) * 18;
      const shade = silver.clone().lerp(smoke, 0.36 + dustRandom() * 0.48);

      dustPositions.push(x, y, z);
      dustColors.push(shade.r, shade.g, shade.b);
    }

    dustGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.Float32BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustParticles);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.56,
    });
    const ghostMaterial = new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.16,
    });
    const filaments: THREE.Line[] = [];
    const filamentBases: THREE.Euler[] = [];

    for (let strand = 0; strand < 12; strand += 1) {
      const points: THREE.Vector3[] = [];
      const phase = (strand / 12) * Math.PI * 2;

      for (let index = 0; index <= 340; index += 1) {
        const t = (index / 340) * Math.PI * 2;
        const curl = t + Math.sin(t * 2 + phase) * 0.16 + phase * 0.12;
        const radius = 2.85 + Math.sin(t * 3 + phase) * 0.72 + Math.cos(t * 5 - phase) * 0.18;
        const x = Math.cos(curl) * radius;
        const y = Math.sin(t * 1.72 + phase) * 1.04 + Math.cos(t * 0.6 + phase) * 0.36;
        const z = Math.sin(curl) * radius * 0.86 + Math.cos(t * 2.4 + phase) * 0.28;

        points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, strand < 7 ? lineMaterial : ghostMaterial);
      const baseRotation = new THREE.Euler(strand * 0.17, strand * 0.27, strand * 0.11);
      line.rotation.copy(baseRotation);
      filaments.push(line);
      filamentBases.push(baseRotation);
      root.add(line);
    }

    const coreRandom = seededRandom(9283);
    const coreGeometry = new THREE.BufferGeometry();
    const corePositions: number[] = [];
    const coreColors: number[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < 1200; index += 1) {
      const radius = Math.pow(coreRandom(), 0.55) * 7.4;
      const angle = index * goldenAngle + radius * 0.48 + (coreRandom() - 0.5) * 0.3;
      const x = Math.cos(angle) * radius + (coreRandom() - 0.5) * 0.42;
      const y = Math.sin(angle * 1.64) * 1.04 + Math.sin(radius * 0.92) * 0.58 + (coreRandom() - 0.5) * 1.7;
      const z = Math.sin(angle) * radius * 0.78 + (coreRandom() - 0.5) * 2.2;
      const shade = white.clone().lerp(silver, Math.min(radius / 7.4, 1) * 0.42);

      corePositions.push(x, y, z);
      coreColors.push(shade.r, shade.g, shade.b);
    }

    coreGeometry.setAttribute("position", new THREE.Float32BufferAttribute(corePositions, 3));
    coreGeometry.setAttribute("color", new THREE.Float32BufferAttribute(coreColors, 3));

    const coreMaterial = new THREE.PointsMaterial({
      size: 0.075,
      map: particleTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const coreParticles = new THREE.Points(coreGeometry, coreMaterial);
    root.add(coreParticles);

    const haloTexture = createParticleTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: haloTexture ?? undefined,
      color: "#ffffff",
      transparent: true,
      opacity: 0.11,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(glowMaterial);
    glow.scale.set(8.8, 8.8, 1);
    root.add(glow);

    const pointer = new THREE.Vector2(0, 0);
    let frame = 0;
    let animationFrame = 0;
    let running = true;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.position.z = width < 720 ? 23 : 19.5;
      root.scale.setScalar(width < 720 ? 0.56 : 1);
      root.position.x = width < 720 ? 4.15 : 4.05;
      root.position.y = width < 720 ? 2.58 : 0.08;
      camera.updateProjectionMatrix();
    };

    const move = (event: PointerEvent) => {
      pointer.x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      pointer.y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };

    const render = () => {
      if (!running) {
        return;
      }

      frame += reducedMotion ? 0 : 0.007;
      root.rotation.y = frame * 0.24 + pointer.x * 0.18;
      root.rotation.x = Math.sin(frame * 0.72) * 0.11 + pointer.y * 0.12;
      farParticles.rotation.y = frame * 0.018 + pointer.x * 0.012;
      dustParticles.rotation.y = -frame * 0.026 + pointer.x * 0.02;
      dustParticles.rotation.x = Math.sin(frame * 0.42) * 0.018 + pointer.y * 0.018;
      coreParticles.rotation.y = -frame * 0.2;
      coreParticles.rotation.x = Math.sin(frame * 0.9) * 0.09;
      coreMaterial.opacity = 0.68 + Math.sin(frame * 1.4) * 0.05;
      glowMaterial.opacity = 0.09 + Math.sin(frame * 1.1) * 0.025;
      filaments.forEach((line, index) => {
        const base = filamentBases[index];
        const offset = index * 0.28;
        line.rotation.set(
          base.x + Math.sin(frame + offset) * 0.045,
          base.y + frame * (0.12 + index * 0.004),
          base.z + Math.cos(frame * 0.8 + offset) * 0.035,
        );
        line.scale.setScalar(1 + Math.sin(frame * 1.35 + offset) * 0.022);
      });

      renderer.render(scene, camera);

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("pointermove", move);
    window.addEventListener("resize", resize);
    render();

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      filaments.forEach((line) => line.geometry.dispose());
      lineMaterial.dispose();
      ghostMaterial.dispose();
      farGeometry.dispose();
      farMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      glowMaterial.dispose();
      particleTexture?.dispose();
      haloTexture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="signal-canvas" data-testid="signal-field" ref={hostRef} aria-hidden="true" />;
}
