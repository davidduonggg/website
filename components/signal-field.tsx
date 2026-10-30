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
  gradient.addColorStop(0.24, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.62, "rgba(255,255,255,0.2)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function createPointMaterial(
  texture: THREE.Texture | null,
  size: number,
  opacity: number,
  vertexColors = true,
) {
  const parameters: THREE.PointsMaterialParameters = {
    size,
    map: texture ?? undefined,
    vertexColors,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  };

  if (!vertexColors) {
    parameters.color = 0xffffff;
  }

  return new THREE.PointsMaterial(parameters);
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
    scene.fog = new THREE.FogExp2(0x000000, 0.011);

    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 120);
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const particleTexture = createParticleTexture();
    const root = new THREE.Group();
    scene.add(root);

    const white = new THREE.Color("#ffffff");
    const silver = new THREE.Color("#d5dad7");
    const pewter = new THREE.Color("#7f8783");
    const smoke = new THREE.Color("#343836");

    const backgroundRandom = seededRandom(2319);
    const backgroundGeometry = new THREE.BufferGeometry();
    const backgroundPositions: number[] = [];
    const backgroundColors: number[] = [];

    for (let index = 0; index < 7600; index += 1) {
      const x = (backgroundRandom() - 0.5) * 78;
      const followsRiver = backgroundRandom() < 0.68;
      const riverCenter = Math.sin(x * 0.105) * 3.4;
      const y = followsRiver
        ? riverCenter + (backgroundRandom() - 0.5) * (9 + Math.abs(x) * 0.07)
        : (backgroundRandom() - 0.5) * 42;
      const z = -20 - backgroundRandom() * 62;
      const brightness = 0.42 + Math.pow(backgroundRandom(), 2.2) * 0.38;
      const shade = white.clone().lerp(pewter, 1 - brightness);

      backgroundPositions.push(x, y, z);
      backgroundColors.push(shade.r, shade.g, shade.b);
    }

    backgroundGeometry.setAttribute("position", new THREE.Float32BufferAttribute(backgroundPositions, 3));
    backgroundGeometry.setAttribute("color", new THREE.Float32BufferAttribute(backgroundColors, 3));

    const backgroundMaterial = createPointMaterial(particleTexture, 0.18, 0.62);
    backgroundMaterial.fog = false;
    const backgroundStars = new THREE.Points(backgroundGeometry, backgroundMaterial);
    scene.add(backgroundStars);

    const midRandom = seededRandom(3827);
    const midGeometry = new THREE.BufferGeometry();
    const midPositions: number[] = [];
    const midColors: number[] = [];

    for (let index = 0; index < 2400; index += 1) {
      const x = (midRandom() - 0.5) * 58;
      const y =
        (midRandom() - 0.5) * 34 +
        Math.sin(x * 0.09 + 0.8) * (1.2 + midRandom() * 2.2);
      const z = -8 - midRandom() * 40;
      const brightness = 0.66 + Math.pow(midRandom(), 1.7) * 0.32;
      const shade = white.clone().lerp(pewter, 1 - brightness);

      midPositions.push(x, y, z);
      midColors.push(shade.r, shade.g, shade.b);
    }

    midGeometry.setAttribute("position", new THREE.Float32BufferAttribute(midPositions, 3));
    midGeometry.setAttribute("color", new THREE.Float32BufferAttribute(midColors, 3));

    const midMaterial = createPointMaterial(particleTexture, 0.29, 0.82);
    midMaterial.fog = false;
    const midStars = new THREE.Points(midGeometry, midMaterial);
    scene.add(midStars);

    const brightRandom = seededRandom(6301);
    const brightGeometry = new THREE.BufferGeometry();
    const brightPositions: number[] = [];
    const brightColors: number[] = [];

    for (let index = 0; index < 340; index += 1) {
      const x = (brightRandom() - 0.5) * 50;
      const y = (brightRandom() - 0.5) * 30;
      const z = -3 - brightRandom() * 32;
      const brightness = 0.86 + brightRandom() * 0.14;
      const shade = white.clone().lerp(silver, 1 - brightness);

      brightPositions.push(x, y, z);
      brightColors.push(shade.r, shade.g, shade.b);
    }

    brightGeometry.setAttribute("position", new THREE.Float32BufferAttribute(brightPositions, 3));
    brightGeometry.setAttribute("color", new THREE.Float32BufferAttribute(brightColors, 3));

    const brightMaterial = createPointMaterial(particleTexture, 0.48, 0.96);
    brightMaterial.fog = false;
    const brightStars = new THREE.Points(brightGeometry, brightMaterial);
    scene.add(brightStars);

    const coreRandom = seededRandom(4817);
    const coreGeometry = new THREE.BufferGeometry();
    const corePositions: number[] = [];
    const coreColors: number[] = [];
    const coreCount = 6800;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < coreCount; index += 1) {
      const normalized = index / Math.max(coreCount - 1, 1);
      const vertical = 1 - normalized * 2;
      const latitudeRadius = Math.sqrt(Math.max(0, 1 - vertical * vertical));
      const theta = goldenAngle * index + (coreRandom() - 0.5) * 0.055;
      const lobe = Math.pow((Math.cos(theta * 6 + vertical * 2.3) + 1) * 0.5, 3.2);
      const ripple = Math.sin(theta * 4.1 - vertical * 8.2) * 0.08;
      const radius = 1.42 + lobe * 0.42 + ripple + coreRandom() * 0.1;
      const x = Math.cos(theta) * latitudeRadius * radius;
      const y = vertical * (1.52 + lobe * 0.16);
      const z = Math.sin(theta) * latitudeRadius * radius * 0.82;
      const brightness = Math.min(1, 0.62 + lobe * 0.28 + Math.abs(vertical) * 0.14);
      const shade = white.clone().lerp(pewter, 1 - brightness);

      corePositions.push(x, y, z);
      coreColors.push(shade.r, shade.g, shade.b);
    }

    coreGeometry.setAttribute("position", new THREE.Float32BufferAttribute(corePositions, 3));
    coreGeometry.setAttribute("color", new THREE.Float32BufferAttribute(coreColors, 3));

    const coreMaterial = createPointMaterial(particleTexture, 0.095, 0.92);
    const core = new THREE.Points(coreGeometry, coreMaterial);
    core.rotation.set(-0.18, -0.42, 0.06);
    core.renderOrder = 1;
    root.add(core);

    const ringRandom = seededRandom(7613);
    const ringBackGeometry = new THREE.BufferGeometry();
    const ringFrontGeometry = new THREE.BufferGeometry();
    const ringBackPositions: number[] = [];
    const ringBackColors: number[] = [];
    const ringFrontPositions: number[] = [];
    const ringFrontColors: number[] = [];
    const ringBands = 9;
    const pointsPerBand = 620;

    for (let band = 0; band < ringBands; band += 1) {
      for (let point = 0; point < pointsPerBand; point += 1) {
        if (ringRandom() < 0.065) {
          continue;
        }

        const angle =
          (point / pointsPerBand) * Math.PI * 2 +
          (ringRandom() - 0.5) * 0.008;
        const radius = 5.85 + band * 0.218 + (ringRandom() - 0.5) * 0.105;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.31;
        const z = Math.sin(angle) * radius * 0.34;
        const bandCenter = 1 - Math.abs(band / (ringBands - 1) - 0.5) * 2;
        const brightness = 0.64 + bandCenter * 0.25 + ringRandom() * 0.11;
        const shade = white.clone().lerp(pewter, 1 - brightness);
        const isBack = Math.sin(angle) > 0;
        const positions = isBack ? ringBackPositions : ringFrontPositions;
        const colors = isBack ? ringBackColors : ringFrontColors;

        positions.push(x, y, z);
        colors.push(shade.r, shade.g, shade.b);
      }
    }

    ringBackGeometry.setAttribute("position", new THREE.Float32BufferAttribute(ringBackPositions, 3));
    ringBackGeometry.setAttribute("color", new THREE.Float32BufferAttribute(ringBackColors, 3));
    ringFrontGeometry.setAttribute("position", new THREE.Float32BufferAttribute(ringFrontPositions, 3));
    ringFrontGeometry.setAttribute("color", new THREE.Float32BufferAttribute(ringFrontColors, 3));

    const ringBackMaterial = createPointMaterial(particleTexture, 0.066, 0.42);
    const ringFrontMaterial = createPointMaterial(particleTexture, 0.072, 0.82);
    const ringBack = new THREE.Points(ringBackGeometry, ringBackMaterial);
    const ringFront = new THREE.Points(ringFrontGeometry, ringFrontMaterial);
    ringBack.rotation.z = -0.19;
    ringFront.rotation.z = -0.19;
    ringBack.renderOrder = 0;
    ringFront.renderOrder = 2;
    root.add(ringBack, ringFront);

    const dustRandom = seededRandom(9901);
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions: number[] = [];
    const dustColors: number[] = [];

    for (let index = 0; index < 1400; index += 1) {
      const theta = dustRandom() * Math.PI * 2;
      const vertical = dustRandom() * 2 - 1;
      const latitudeRadius = Math.sqrt(Math.max(0, 1 - vertical * vertical));
      const radius = Math.pow(dustRandom(), 0.48) * 1.34;
      const x = Math.cos(theta) * latitudeRadius * radius;
      const y = vertical * radius;
      const z = Math.sin(theta) * latitudeRadius * radius;
      const shade = silver.clone().lerp(smoke, 0.2 + dustRandom() * 0.55);

      dustPositions.push(x, y, z);
      dustColors.push(shade.r, shade.g, shade.b);
    }

    dustGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.Float32BufferAttribute(dustColors, 3));

    const dustMaterial = createPointMaterial(particleTexture, 0.052, 0.4);
    const innerDust = new THREE.Points(dustGeometry, dustMaterial);
    innerDust.renderOrder = 1;
    root.add(innerDust);

    const glowTexture = createParticleTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture ?? undefined,
      color: "#ffffff",
      transparent: true,
      opacity: 0.13,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(glowMaterial);
    glow.scale.set(7.4, 7.4, 1);
    glow.renderOrder = 1;
    root.add(glow);

    const nucleusMaterial = new THREE.SpriteMaterial({
      map: glowTexture ?? undefined,
      color: "#ffffff",
      transparent: true,
      opacity: 0.66,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const nucleus = new THREE.Sprite(nucleusMaterial);
    nucleus.scale.set(1.45, 1.45, 1);
    nucleus.renderOrder = 1;
    root.add(nucleus);

    const pointer = new THREE.Vector2(0, 0);
    const smoothedPointer = new THREE.Vector2(0, 0);
    let frame = 0;
    let animationFrame = 0;
    let running = true;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.position.z = width < 720 ? 22.5 : 19.5;
      root.scale.setScalar(width < 720 ? 0.43 : height < 800 ? 0.98 : 0.82);
      root.position.x = width < 720 ? 3.15 : 4.2;
      root.position.y = width < 720 ? 2.68 : 0.18;
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

      frame += reducedMotion ? 0 : 0.006;
      smoothedPointer.lerp(pointer, reducedMotion ? 1 : 0.045);

      const breath = 1 + Math.sin(frame * 1.1) * 0.018;
      root.rotation.y = Math.sin(frame * 0.32) * 0.03 + smoothedPointer.x * 0.055;
      root.rotation.x = Math.sin(frame * 0.52) * 0.025 + smoothedPointer.y * 0.05;
      root.rotation.z = Math.sin(frame * 0.34) * 0.025;
      core.rotation.y = -0.42 - frame * 0.16;
      core.rotation.z = 0.06 + Math.sin(frame * 0.68) * 0.05;
      core.scale.setScalar(1.9 * breath);
      innerDust.rotation.y = frame * 0.24;
      innerDust.rotation.x = -frame * 0.11;
      innerDust.scale.setScalar(1.72 * breath);
      ringBack.rotation.y = Math.sin(frame * 0.28) * 0.05;
      ringFront.rotation.y = ringBack.rotation.y;
      ringBack.rotation.x = Math.cos(frame * 0.24) * 0.025;
      ringFront.rotation.x = ringBack.rotation.x;
      ringBack.rotation.z = -0.19 + frame * 0.028;
      ringFront.rotation.z = ringBack.rotation.z;
      backgroundStars.rotation.y = frame * 0.014 + smoothedPointer.x * 0.012;
      backgroundStars.rotation.x = Math.sin(frame * 0.4) * 0.01 + smoothedPointer.y * 0.012;
      midStars.rotation.y = -frame * 0.021 + smoothedPointer.x * 0.022;
      midStars.rotation.x = Math.sin(frame * 0.32 + 0.7) * 0.012 + smoothedPointer.y * 0.022;
      brightStars.rotation.y = frame * 0.029 + smoothedPointer.x * 0.034;
      brightStars.rotation.x = Math.cos(frame * 0.29) * 0.014 + smoothedPointer.y * 0.034;
      backgroundMaterial.opacity = 0.58 + Math.sin(frame * 0.42) * 0.035;
      midMaterial.opacity = 0.78 + Math.sin(frame * 0.58 + 1.1) * 0.065;
      brightMaterial.opacity = 0.88 + Math.sin(frame * 0.96 + 0.3) * 0.1;
      coreMaterial.opacity = 0.92 + Math.sin(frame * 1.18) * 0.04;
      ringBackMaterial.opacity = 0.38 + Math.sin(frame * 0.74) * 0.055;
      ringFrontMaterial.opacity = 0.76 + Math.sin(frame * 0.82 + 0.6) * 0.07;
      glowMaterial.opacity = 0.12 + Math.sin(frame * 1.05) * 0.03;
      nucleusMaterial.opacity = 0.6 + Math.sin(frame * 1.34) * 0.12;

      renderer.render(scene, camera);

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener("pointermove", move);
    resize();
    render();

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", move);
      backgroundGeometry.dispose();
      backgroundMaterial.dispose();
      midGeometry.dispose();
      midMaterial.dispose();
      brightGeometry.dispose();
      brightMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringBackGeometry.dispose();
      ringBackMaterial.dispose();
      ringFrontGeometry.dispose();
      ringFrontMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      glowMaterial.dispose();
      nucleusMaterial.dispose();
      particleTexture?.dispose();
      glowTexture?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="signal-canvas" data-testid="signal-field" ref={hostRef} aria-hidden="true" />;
}
