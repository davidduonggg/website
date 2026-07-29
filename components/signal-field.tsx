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
  gradient.addColorStop(0.28, "rgba(255,255,255,0.92)");
  gradient.addColorStop(0.64, "rgba(255,255,255,0.18)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

function waveRadius(theta: number, v: number, phase = 0) {
  return (
    1 +
    Math.sin(theta * 3.1 + v * 5.6 + phase) * 0.12 +
    Math.cos(theta * 5.7 - v * 4.2 + phase * 0.7) * 0.075 +
    Math.sin(theta * 8.3 + v * 2.4 - phase * 1.1) * 0.04
  );
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
    scene.fog = new THREE.FogExp2(0x000000, 0.012);

    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 120);
    camera.position.set(0, 0, 22);

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
    const pewter = new THREE.Color("#858d8a");
    const smoke = new THREE.Color("#454a49");

    const starRandom = seededRandom(2319);
    const starGeometry = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    const starColors: number[] = [];

    for (let index = 0; index < 6800; index += 1) {
      const angle = starRandom() * Math.PI * 2;
      const radius = 9 + Math.pow(starRandom(), 0.5) * 44;
      const x = Math.cos(angle) * radius + (starRandom() - 0.5) * 11;
      const y = Math.sin(angle) * radius * 0.52 + (starRandom() - 0.5) * 18;
      const z = -12 - starRandom() * 56;
      const sparkle = starRandom() > 0.78;
      const brightness = sparkle ? 0.96 + starRandom() * 0.04 : 0.78 + Math.pow(starRandom(), 1.8) * 0.2;
      const shade = white.clone().lerp(pewter, 1 - brightness);

      starPositions.push(x, y, z);
      starColors.push(shade.r, shade.g, shade.b);
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.29,
      map: particleTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      fog: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const shellGeometry = new THREE.BufferGeometry();
    const shellPositions: number[] = [];
    const shellColors: number[] = [];
    const baseShell: Array<[number, number, number, number, number]> = [];
    const latitudeSteps = 82;
    const longitudeSteps = 94;

    for (let latitude = 0; latitude <= latitudeSteps; latitude += 1) {
      const v = latitude / latitudeSteps;
      const phi = (v - 0.5) * Math.PI;
      const latitudeCurve = Math.cos(phi);

      for (let longitude = 0; longitude < longitudeSteps; longitude += 1) {
        const u = longitude / longitudeSteps;
        const theta = u * Math.PI * 2;
        const ridge = waveRadius(theta, v);
        const scallop = 1 + Math.sin(theta * 2.2 + v * 8.6) * 0.06 * Math.pow(latitudeCurve, 0.8);
        const radius = 3.65 * ridge * scallop;
        const pinch = 1 - Math.pow(Math.abs(v - 0.5) * 2, 2) * 0.08;
        const x = Math.cos(theta) * radius * latitudeCurve * pinch;
        const y = Math.sin(phi) * 4.05 + Math.sin(theta * 3.2 + v * 12.4) * 0.33 * latitudeCurve;
        const z = Math.sin(theta) * radius * latitudeCurve * 0.88;
        const edgeLight = Math.pow(Math.abs(Math.sin(theta + v * 2.3)), 3) * 0.32;
        const topLight = Math.max(0, y / 4.4) * 0.34;
        const ridgeLight = Math.max(0, Math.sin(theta * 3.1 + v * 5.6)) * 0.2;
        const brightness = Math.min(1, 0.48 + edgeLight + topLight + ridgeLight);
        const shade = white.clone().lerp(pewter, 1 - brightness).lerp(silver, topLight * 0.32);

        baseShell.push([x, y, z, theta, v]);
        shellPositions.push(x, y, z);
        shellColors.push(shade.r, shade.g, shade.b);
      }
    }

    shellGeometry.setAttribute("position", new THREE.Float32BufferAttribute(shellPositions, 3));
    shellGeometry.setAttribute("color", new THREE.Float32BufferAttribute(shellColors, 3));

    const shellMaterial = new THREE.PointsMaterial({
      size: 0.108,
      map: particleTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const shell = new THREE.Points(shellGeometry, shellMaterial);
    shell.rotation.set(-0.06, -0.62, 0.08);
    root.add(shell);

    const innerGeometry = new THREE.BufferGeometry();
    const innerPositions: number[] = [];
    const innerColors: number[] = [];
    const innerRandom = seededRandom(4817);

    for (let index = 0; index < 1700; index += 1) {
      const theta = innerRandom() * Math.PI * 2;
      const v = innerRandom();
      const phi = (v - 0.5) * Math.PI;
      const latitudeCurve = Math.cos(phi);
      const radius = (1.8 + innerRandom() * 1.5) * waveRadius(theta, v);
      const x = Math.cos(theta) * radius * latitudeCurve;
      const y = Math.sin(phi) * 3.2 + Math.sin(theta * 3 + v * 7) * 0.22;
      const z = Math.sin(theta) * radius * latitudeCurve * 0.78;
      const shade = silver.clone().lerp(smoke, 0.35 + innerRandom() * 0.38);

      innerPositions.push(x, y, z);
      innerColors.push(shade.r, shade.g, shade.b);
    }

    innerGeometry.setAttribute("position", new THREE.Float32BufferAttribute(innerPositions, 3));
    innerGeometry.setAttribute("color", new THREE.Float32BufferAttribute(innerColors, 3));

    const innerMaterial = new THREE.PointsMaterial({
      size: 0.055,
      map: particleTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const innerDust = new THREE.Points(innerGeometry, innerMaterial);
    root.add(innerDust);

    const glowTexture = createParticleTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture ?? undefined,
      color: "#ffffff",
      transparent: true,
      opacity: 0.12,
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
      camera.position.z = width < 720 ? 22.5 : 19.5;
      root.scale.setScalar(width < 720 ? 0.52 : 0.98);
      root.position.x = width < 720 ? 3.95 : 4.28;
      root.position.y = width < 720 ? 2.7 : 0.22;
      camera.updateProjectionMatrix();
    };

    const move = (event: PointerEvent) => {
      pointer.x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      pointer.y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };

    const animateShell = () => {
      const positions = shellGeometry.getAttribute("position");
      const phase = frame * 1.35;

      baseShell.forEach(([baseX, baseY, baseZ, theta, v], index) => {
        const wave = Math.sin(theta * 4.2 + v * 8.4 + phase) * 0.045;
        const ripple = Math.cos(theta * 7.6 - v * 5.2 + phase * 0.72) * 0.026;
        const scalar = 1 + wave + ripple;
        positions.setXYZ(index, baseX * scalar, baseY + wave * 0.42, baseZ * scalar);
      });

      positions.needsUpdate = true;
    };

    const render = () => {
      if (!running) {
        return;
      }

      frame += reducedMotion ? 0 : 0.0065;
      if (!reducedMotion) {
        animateShell();
      }

      root.rotation.y = frame * 0.2 + pointer.x * 0.16;
      root.rotation.x = Math.sin(frame * 0.64) * 0.08 + pointer.y * 0.1;
      shell.rotation.z = 0.08 + Math.sin(frame * 0.8) * 0.035;
      innerDust.rotation.y = -frame * 0.24;
      innerDust.rotation.x = Math.sin(frame * 0.8) * 0.07;
      stars.rotation.y = frame * 0.018 + pointer.x * 0.014;
      stars.rotation.x = Math.sin(frame * 0.45) * 0.012 + pointer.y * 0.014;
      shellMaterial.opacity = 0.96 + Math.sin(frame * 1.2) * 0.025;
      starMaterial.opacity = 0.98 + Math.sin(frame * 0.9) * 0.02;
      glowMaterial.opacity = 0.1 + Math.sin(frame * 1.1) * 0.025;

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
      starGeometry.dispose();
      starMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      glowMaterial.dispose();
      particleTexture?.dispose();
      glowTexture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="signal-canvas" data-testid="signal-field" ref={hostRef} aria-hidden="true" />;
}
