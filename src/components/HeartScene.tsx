
import { useEffect, useRef } from "react";
import * as THREE from "three";

function createHeartShape(): THREE.Shape {
  const shape = new THREE.Shape();

  shape.moveTo(0.5, 0.5);
  shape.bezierCurveTo(0.5, 0.5, 0.4, 0, 0, 0);
  shape.bezierCurveTo(-0.6, 0, -0.6, 0.7, -0.6, 0.7);
  shape.bezierCurveTo(-0.6, 1.1, -0.3, 1.54, 0.5, 1.9);
  shape.bezierCurveTo(1.2, 1.54, 1.6, 1.1, 1.6, 0.7);
  shape.bezierCurveTo(1.6, 0.7, 1.6, 0, 1, 0);
  shape.bezierCurveTo(0.7, 0, 0.5, 0.5, 0.5, 0.5);

  return shape;
}

export default function HeartScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      Math.max(mount.clientWidth, 1) /
        Math.max(mount.clientHeight, 1),
      0.1,
      200
    );

    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.75)
    );
    renderer.setSize(
      Math.max(mount.clientWidth, 1),
      Math.max(mount.clientHeight, 1)
    );
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));

    const pinkLight = new THREE.PointLight(
      0xff4d78,
      3,
      25
    );
    pinkLight.position.set(3, 4, 5);
    scene.add(pinkLight);

    const goldLight = new THREE.PointLight(
      0xffd18b,
      2,
      20
    );
    goldLight.position.set(-4, -2, 3);
    scene.add(goldLight);

    // Shared heart geometry
    const heartGeometry = new THREE.ExtrudeGeometry(
      createHeartShape(),
      {
        depth: 0.2,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.05,
        bevelThickness: 0.05,
        curveSegments: 12,
      }
    );

    heartGeometry.center();

    const colors = [
      0xe8375a,
      0xff6b8a,
      0xc8973a,
      0xb01840,
      0xff9eb5,
    ];

    const floatingHearts: {
      mesh: THREE.Mesh;
      baseY: number;
      speed: number;
      phase: number;
    }[] = [];

    const heartCount = window.innerWidth < 600 ? 14 : 25;

    for (let i = 0; i < heartCount; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        metalness: 0.35,
        roughness: 0.35,
        transparent: true,
        opacity: 0.75,
      });

      const heart = new THREE.Mesh(heartGeometry, material);

      const scale = 0.12 + Math.random() * 0.28;
      heart.scale.setScalar(scale);

      heart.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 13,
        (Math.random() - 0.5) * 6 - 2
      );

      heart.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(heart);

      floatingHearts.push({
        mesh: heart,
        baseY: heart.position.y,
        speed: 0.35 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Two special hearts for the invisible string
    const specialMaterialA = new THREE.MeshStandardMaterial({
      color: 0xe8375a,
      emissive: 0x8a1735,
      emissiveIntensity: 0.55,
      metalness: 0.4,
      roughness: 0.25,
    });

    const specialMaterialB = new THREE.MeshStandardMaterial({
      color: 0xffb2c4,
      emissive: 0x9c4660,
      emissiveIntensity: 0.45,
      metalness: 0.35,
      roughness: 0.25,
    });

    const leftHeart = new THREE.Mesh(
      heartGeometry,
      specialMaterialA
    );
    const rightHeart = new THREE.Mesh(
      heartGeometry,
      specialMaterialB
    );

    leftHeart.scale.setScalar(0.36);
    rightHeart.scale.setScalar(0.36);

    scene.add(leftHeart, rightHeart);

    // Golden thread connecting the hearts
    const threadSegments = 70;
    const threadPositions = new Float32Array(
      (threadSegments + 1) * 3
    );

    const threadGeometry = new THREE.BufferGeometry();

    const threadAttribute = new THREE.BufferAttribute(
      threadPositions,
      3
    );

    threadAttribute.setUsage(THREE.DynamicDrawUsage);
    threadGeometry.setAttribute("position", threadAttribute);

    const threadMaterial = new THREE.LineBasicMaterial({
      color: 0xffd58a,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    });

    const goldenThread = new THREE.Line(
      threadGeometry,
      threadMaterial
    );

    scene.add(goldenThread);

    // Soft golden glow around the thread
    const glowMaterial = new THREE.LineBasicMaterial({
      color: 0xc8973a,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });

    const glowThread = new THREE.Line(
      threadGeometry,
      glowMaterial
    );

    glowThread.position.z = -0.015;
    scene.add(glowThread);

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();
    let frameId = 0;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      floatingHearts.forEach(
        ({ mesh, baseY, speed, phase }) => {
          if (!reducedMotion) {
            mesh.rotation.y += 0.003;
            mesh.rotation.x += 0.001;

            mesh.position.y =
              baseY +
              Math.sin(elapsed * speed + phase) * 0.28;
          }
        }
      );

      // Position special hearts near opposite edges,
      // leaving the center readable for page content.
      const aspect = camera.aspect;
      const spread = Math.min(5.2, 2.4 * aspect + 1.2);

      const movement = reducedMotion ? 0 : elapsed;

      leftHeart.position.set(
        -spread,
        -1.7 + Math.sin(movement * 0.45) * 0.25,
        -1.5
      );

      rightHeart.position.set(
        spread,
        1.6 + Math.sin(movement * 0.45 + 2) * 0.25,
        -1.5
      );

      leftHeart.rotation.y =
        Math.sin(movement * 0.35) * 0.25;

      rightHeart.rotation.y =
        -Math.sin(movement * 0.35 + 1) * 0.25;

      // Animated, gently curved golden connection
      const start = leftHeart.position;
      const end = rightHeart.position;

      for (let i = 0; i <= threadSegments; i++) {
        const t = i / threadSegments;

        const x = THREE.MathUtils.lerp(
          start.x,
          end.x,
          t
        );

        const baseY = THREE.MathUtils.lerp(
          start.y,
          end.y,
          t
        );

        const curve =
          Math.sin(t * Math.PI) *
          (0.55 +
            Math.sin(movement * 0.5) * 0.12);

        const y = baseY - curve;

        const z =
          -1.6 +
          Math.sin(t * Math.PI) * -0.12;

        const offset = i * 3;

        threadPositions[offset] = x;
        threadPositions[offset + 1] = y;
        threadPositions[offset + 2] = z;
      }

      threadAttribute.needsUpdate = true;
      threadGeometry.computeBoundingSphere();

      if (!reducedMotion) {
        camera.position.x +=
          (mouseX * 0.6 - camera.position.x) * 0.025;

        camera.position.y +=
          (mouseY * 0.4 - camera.position.y) * 0.025;
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    const onResize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 1.75)
      );

      if (reducedMotion) renderFrame();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      floatingHearts.forEach(({ mesh }) => {
        (mesh.material as THREE.Material).dispose();
      });

      specialMaterialA.dispose();
      specialMaterialB.dispose();
      heartGeometry.dispose();

      threadGeometry.dispose();
      threadMaterial.dispose();
      glowMaterial.dispose();

      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
