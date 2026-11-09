import { useEffect, useRef } from "react";
import * as THREE from "three";

/** A hand-built rocket; no remote models or textures are required. */
export function ThreeBackdrop() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      container.dataset.fallback = "true";
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.65;
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    const rocket = new THREE.Group();
    const ivory = new THREE.MeshStandardMaterial({
      color: "#e7e3d9",
      metalness: 0.4,
      roughness: 0.32,
    });
    const orange = new THREE.MeshStandardMaterial({
      color: "#ee633d",
      metalness: 0.25,
      roughness: 0.35,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: "#1a2633",
      metalness: 0.75,
      roughness: 0.3,
    });
    const glass = new THREE.MeshStandardMaterial({
      color: "#82b9c5",
      metalness: 0.9,
      roughness: 0.12,
      emissive: "#0b2638",
      emissiveIntensity: 0.5,
    });
    const flameMaterial = new THREE.MeshBasicMaterial({
      color: "#ff9c59",
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const coreMaterial = new THREE.MeshBasicMaterial({ color: "#ffedbf" });
    const mesh = (
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      parent: THREE.Object3D = rocket,
    ) => {
      const object = new THREE.Mesh(geometry, material);
      parent.add(object);
      return object;
    };
    const profile = [
      [0, -1.52],
      [0.29, -1.52],
      [0.42, -1.25],
      [0.51, -0.7],
      [0.52, 0.2],
      [0.49, 0.85],
      [0.39, 1.35],
      [0.22, 1.8],
      [0, 2.15],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    mesh(new THREE.LatheGeometry(profile, 64), ivory);
    const nose = mesh(new THREE.ConeGeometry(0.22, 0.43, 48), orange);
    nose.position.y = 1.93;
    const band = mesh(new THREE.CylinderGeometry(0.515, 0.515, 0.16, 64), dark);
    band.position.y = -0.62;
    const seam = mesh(new THREE.TorusGeometry(0.502, 0.014, 8, 64), dark);
    seam.rotation.x = Math.PI / 2;
    seam.position.y = 0.55;
    const nozzle = mesh(
      new THREE.CylinderGeometry(0.25, 0.35, 0.36, 32, 1, true),
      dark,
    );
    nozzle.position.y = -1.62;
    const porthole = new THREE.Group();
    porthole.position.set(0, 0.67, 0.475);
    porthole.rotation.x = -0.12;
    mesh(new THREE.TorusGeometry(0.225, 0.058, 16, 48), orange, porthole);
    const windowMesh = mesh(
      new THREE.SphereGeometry(0.185, 32, 24),
      glass,
      porthole,
    );
    windowMesh.scale.z = 0.25;
    rocket.add(porthole);
    const finShape = new THREE.Shape();
    finShape.moveTo(0.36, -0.65);
    finShape.lineTo(1.03, -1.53);
    finShape.lineTo(1.03, -1.94);
    finShape.lineTo(0.28, -1.36);
    finShape.closePath();
    for (let i = 0; i < 3; i++) {
      const fin = mesh(
        new THREE.ExtrudeGeometry(finShape, {
          depth: 0.075,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: 0.035,
          bevelThickness: 0.035,
        }),
        orange,
      );
      fin.rotation.y = (i * Math.PI * 2) / 3;
    }
    const stripe = mesh(new THREE.BoxGeometry(0.065, 0.65, 0.015), orange);
    stripe.position.set(0, -0.1, 0.52);
    const flame = new THREE.Group();
    flame.position.y = -1.84;
    const outer = mesh(
      new THREE.ConeGeometry(0.23, 1.3, 32, 1, true),
      flameMaterial,
      flame,
    );
    outer.rotation.z = Math.PI;
    outer.position.y = -0.6;
    const inner = mesh(
      new THREE.ConeGeometry(0.12, 0.95, 24),
      coreMaterial,
      flame,
    );
    inner.rotation.z = Math.PI;
    inner.position.y = -0.42;
    rocket.add(flame);
    rocket.rotation.set(-0.1, -0.34, -0.48);
    rocket.position.set(0.05, 0.4, 0);
    scene.add(rocket);
    scene.add(new THREE.HemisphereLight(0xd5e8ff, 0x233141, 3));
    const key = new THREE.DirectionalLight(0xffedda, 5);
    key.position.set(-3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x759ab9, 4);
    rim.position.set(4, 1, -2);
    scene.add(rim);
    const engine = new THREE.PointLight(0xff7437, 8, 5);
    engine.position.set(0, -2, 1);
    rocket.add(engine);
    const dustGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(110 * 3);
    let seed = 42;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (random() - 0.5) * 12;
      positions[i + 1] = (random() - 0.5) * 12;
      positions[i + 2] = -3 - random() * 4;
    }
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xadbcc9,
      size: 0.025,
      transparent: true,
      opacity: 0.6,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);
    const pointer = { x: 0, y: 0 };
    const move = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const reset = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    container.addEventListener("pointermove", move);
    container.addEventListener("pointerleave", reset);
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.position.z = width < 400 ? 11 : 10;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    let visible = true,
      motion = document.documentElement.dataset.motion !== "off";
    let frame = 0;
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      if (motion) {
        rocket.position.y =
          0.4 +
          Math.sin(time * 0.001) * 0.09 +
          Math.min(scrollY / innerHeight, 1) * 0.35;
        rocket.rotation.y +=
          (-0.34 + pointer.x * 0.25 - rocket.rotation.y) * 0.035;
        rocket.rotation.x +=
          (-0.1 + pointer.y * 0.15 - rocket.rotation.x) * 0.035;
        flame.scale.y = 1 + Math.sin(time * 0.024) * 0.09;
        dust.rotation.z = time * 0.000008;
      }
      renderer.render(scene, camera);
      if (!motion) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const onMotion = () => {
      motion = document.documentElement.dataset.motion !== "off";
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(draw);
    });
    visibility.observe(container);
    window.addEventListener("orbital-motion", onMotion);
    resize();
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("orbital-motion", onMotion);
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerleave", reset);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points)
          object.geometry.dispose();
      });
      [
        ivory,
        orange,
        dark,
        glass,
        flameMaterial,
        coreMaterial,
        dustMaterial,
      ].forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div
      ref={host}
      className="three-backdrop"
      role="img"
      aria-label="A cream and orange exploration rocket in orbit"
    >
      <div className="rocket-fallback" aria-hidden="true">
        <svg viewBox="0 0 240 420">
          <path d="M120 20Q60 90 77 285h86Q180 90 120 20" fill="#e7e3d9" />
          <path d="m77 220-45 100 48-20m83-80 45 100-48-20" fill="#ed693f" />
          <circle
            cx="120"
            cy="145"
            r="24"
            fill="#193344"
            stroke="#ed693f"
            strokeWidth="9"
          />
          <path d="m95 300 25 100 25-100" fill="#ffad65" />
        </svg>
      </div>
    </div>
  );
}
