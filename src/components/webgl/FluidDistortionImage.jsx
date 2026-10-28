import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uPlaneSize;
  uniform vec2 uImageSize;
  uniform vec2 uMouse;
  uniform vec2 uVelocityVector;
  uniform float uHover;
  uniform float uSpeed;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  // Aspect-ratio cover mapping in GLSL
  vec2 getCoverUv(vec2 uv, vec2 planeSize, vec2 imageSize) {
    float planeAspect = planeSize.x / planeSize.y;
    float imageAspect = imageSize.x / imageSize.y;
    vec2 newUv = uv;
    if (planeAspect > imageAspect) {
      float scale = imageAspect / planeAspect;
      newUv.y = (uv.y - 0.5) * scale + 0.5;
    } else {
      float scale = planeAspect / imageAspect;
      newUv.x = (uv.x - 0.5) * scale + 0.5;
    }
    return newUv;
  }

  void main() {
    vec2 uv = vUv;

    // Aspect-ratio correction to compute true isotropic distances in screen space
    float aspect = uPlaneSize.x / uPlaneSize.y;
    vec2 screenUv = vec2(uv.x * aspect, uv.y);
    vec2 screenMouse = vec2(uMouse.x * aspect, uMouse.y);

    float dist = distance(screenUv, screenMouse);
    vec2 dir = normalize(screenUv - screenMouse + vec2(0.0001));

    // 1. Organic Liquid Membrane Profile (Gaussian center bulge + outer rim wave)
    float rNorm = dist / 0.36;
    float liquidBulge = exp(-rNorm * rNorm * 1.8) * 0.065;
    float liquidRim = sin(clamp(rNorm, 0.0, 1.0) * 3.14159) * 0.025;
    vec2 fluidPush = dir * (liquidBulge + liquidRim);

    // 2. Viscous Drag along cursor trajectory (heavy inertia fluid pulling)
    vec2 viscousDrag = uVelocityVector * exp(-rNorm * 1.6) * 0.16;

    // 3. Total smooth displacement vector
    vec2 totalDisp = (fluidPush + viscousDrag) * uHover * uIntensity;

    // 4. Optical Refraction UV mapping (Aspect-ratio protected)
    vec2 displacedScreenUv = clamp(uv + totalDisp, 0.001, 0.999);

    // 5. Micro-fine optical chromatic split (silky water dispersion, strictly non-garish)
    float chromOffset = length(totalDisp) * 0.045;
    vec2 uvR = getCoverUv(displacedScreenUv + dir * chromOffset, uPlaneSize, uImageSize);
    vec2 uvG = getCoverUv(displacedScreenUv, uPlaneSize, uImageSize);
    vec2 uvB = getCoverUv(displacedScreenUv - dir * chromOffset, uPlaneSize, uImageSize);

    float r = texture2D(uTexture, clamp(uvR, 0.0, 1.0)).r;
    float g = texture2D(uTexture, clamp(uvG, 0.0, 1.0)).g;
    float b = texture2D(uTexture, clamp(uvB, 0.0, 1.0)).b;

    // 6. Tactile specular highlight on fluid ridges (liquid glass luster)
    float caustic = smoothstep(0.015, 0.06, length(totalDisp)) * 0.08 * uHover;
    vec3 color = vec3(r, g, b) + vec3(caustic);

    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * FluidDistortionImage — Unseen Studio Inspired Liquid Shader Component
 */
export default function FluidDistortionImage({
  src,
  alt = '',
  className = '',
  aspectRatio = '16/10',
  priority = false,
  intensity = 1.0,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Respect reduced motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer, scene, camera, mesh, texture;
    let animationFrameId;
    let isVisible = true;

    // Physics state vectors with smooth organic viscous inertia
    const currentMouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const prevPointerPos = new THREE.Vector2(0.5, 0.5);
    const currentVelVector = new THREE.Vector2(0, 0);
    const targetVelVector = new THREE.Vector2(0, 0);
    let targetHover = 0;
    let currentHover = 0;
    let lastMoveTime = performance.now();

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
      camera.position.z = 1;

      const loader = new THREE.TextureLoader();
      loader.load(
        src,
        (loadedTex) => {
          loadedTex.minFilter = THREE.LinearFilter;
          loadedTex.magFilter = THREE.LinearFilter;
          loadedTex.generateMipmaps = false;
          texture = loadedTex;

          const imgWidth = loadedTex.image.naturalWidth || loadedTex.image.width || 1200;
          const imgHeight = loadedTex.image.naturalHeight || loadedTex.image.height || 800;

          const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
          const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
              uTexture: { value: loadedTex },
              uPlaneSize: { value: new THREE.Vector2(container.clientWidth || 400, container.clientHeight || 300) },
              uImageSize: { value: new THREE.Vector2(imgWidth, imgHeight) },
              uMouse: { value: new THREE.Vector2(0.5, 0.5) },
              uVelocityVector: { value: new THREE.Vector2(0, 0) },
              uHover: { value: 0 },
              uSpeed: { value: 0 },
              uTime: { value: 0 },
              uIntensity: { value: intensity },
            },
            transparent: false,
          });

          mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          updateSize();
        },
        undefined,
        () => {
          setHasWebGL(false);
        }
      );

      const updateSize = () => {
        if (!container || !renderer || !mesh) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;

        renderer.setSize(width, height, false);
        mesh.material.uniforms.uPlaneSize.value.set(width, height);
      };

      const handlePointer = (clientX, clientY) => {
        const rect = container.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, 1.0 - (clientY - rect.top) / rect.height));

        targetMouse.set(x, y);

        const now = performance.now();
        const dt = Math.max((now - lastMoveTime) / 1000, 0.001);
        
        // Compute velocity with visceral response
        const vx = (x - prevPointerPos.x) / dt;
        const vy = (y - prevPointerPos.y) / dt;
        
        targetVelVector.set(vx, vy).clampLength(0, 4.0);

        prevPointerPos.set(x, y);
        lastMoveTime = now;
        targetHover = 1.0;
      };

      const onPointerMove = (e) => {
        handlePointer(e.clientX, e.clientY);
      };

      const onPointerEnter = (e) => {
        targetHover = 1.0;
        handlePointer(e.clientX, e.clientY);
      };

      const onPointerLeave = () => {
        targetHover = 0.0;
        targetVelVector.set(0, 0);
      };

      container.addEventListener('pointermove', onPointerMove, { passive: true });
      container.addEventListener('pointerenter', onPointerEnter);
      container.addEventListener('pointerleave', onPointerLeave);

      // Support subtle touch drag on mobile
      const onTouchMove = (e) => {
        if (e.touches && e.touches[0]) {
          handlePointer(e.touches[0].clientX, e.touches[0].clientY);
        }
      };
      container.addEventListener('touchmove', onTouchMove, { passive: true });

      const resizeObserver = new ResizeObserver(() => updateSize());
      resizeObserver.observe(container);

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(container);

      const clock = new THREE.Clock();

      const render = () => {
        animationFrameId = requestAnimationFrame(render);
        if (!isVisible || !mesh) return;

        const delta = Math.min(clock.getDelta(), 0.05);
        const elapsedTime = clock.getElapsedTime();

        // Viscous fluid physics: heavy inertia with natural recovery
        currentMouse.lerp(targetMouse, 0.14);
        currentVelVector.lerp(targetVelVector, 0.10);
        currentHover = THREE.MathUtils.damp(currentHover, targetHover, 3.2, delta);

        // Exponential velocity dissipation
        targetVelVector.multiplyScalar(Math.exp(-3.5 * delta));

        mesh.material.uniforms.uMouse.value.copy(currentMouse);
        mesh.material.uniforms.uVelocityVector.value.copy(currentVelVector);
        mesh.material.uniforms.uSpeed.value = currentVelVector.length();
        mesh.material.uniforms.uHover.value = currentHover;
        mesh.material.uniforms.uTime.value = elapsedTime;

        renderer.render(scene, camera);
      };

      render();

      return () => {
        cancelAnimationFrame(animationFrameId);
        container.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerenter', onPointerEnter);
        container.removeEventListener('pointerleave', onPointerLeave);
        container.removeEventListener('touchmove', onTouchMove);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();

        if (renderer) renderer.dispose();
        if (texture) texture.dispose();
        if (mesh) {
          mesh.geometry.dispose();
          mesh.material.dispose();
        }
      };
    } catch (err) {
      setHasWebGL(false);
    }
  }, [src, intensity]);

  if (!hasWebGL) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none cursor-pointer ${className}`}
      style={{
        aspectRatio,
        touchAction: 'pan-y',
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover pointer-events-none"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
