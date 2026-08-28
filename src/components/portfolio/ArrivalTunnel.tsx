import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";
import { MOTION } from "@/lib/motion";
import darshPortrait from "@/assets/darsh.jpeg";

const SESSION_KEY = "portfolioIntroPlayed";

const LOCAL_ASSET_IMAGES = [
  darshPortrait,
  "/certificates/openai-agents-workflows.jpg",
  "/certificates/oracle-agentic-ai.jpg",
  "/certificates/eduskills-cloud-engineer.jpg",
  "/certificates/deloitte-data-analytics.jpg",
  "/certificates/openai-applied-ai.jpg",
];

const TUNNEL_DEFAULTS = {
  background: "#07090b",
  lineColor: "#253038",
  lineOpacity: 55,
  colors: ["#b7ff3c", "#38bdf8", "#ffb547", "#a78bfa", "#ff5a5f", "#4ade80"],
  grid: 4,
  speed: 130,
  boost: 160,
  fade: 100,
};

const TUNNEL_WIDTH = 2;
const TUNNEL_HEIGHT = 1.8;
const SEGMENT_DEPTH = 1;
const NUM_SEGMENTS = 15;
const LINE_RADIUS = 0.003;
const SCROLL_TO_Z = 0.05;
const CAMERA_CHASE = 0.12;
const FADE_IN = 0.8;
const FOG_FAR = NUM_SEGMENTS * SEGMENT_DEPTH * 0.95;

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function ArrivalTunnel({ onFinish }: { onFinish?: () => void }) {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hasFinishedRef = useRef<boolean>(false);

  const finishIntro = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Ignore private browsing storage restrictions
    }
    setIsExiting(true);
    setTimeout(() => {
      setIsActive(false);
      document.body.style.overflow = "";
      onFinish?.();
    }, 700);
  };

  useEffect(() => {
    // 1. Check session storage
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setIsActive(false);
        onFinish?.();
        return;
      }
    } catch {
      // In case of sandbox error
    }

    // 2. Check prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        /* ignore */
      }
      setIsActive(false);
      onFinish?.();
      return;
    }

    // 3. Check WebGL support
    if (!isWebGLAvailable()) {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        /* ignore */
      }
      setIsActive(false);
      onFinish?.();
      return;
    }

    // Lock scrolling
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Escape key listener for skipping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Auto-transition after 2.8 seconds (capped duration)
    const autoFinishTimer = setTimeout(() => {
      finishIntro();
    }, 2800);

    // Hard fail-safe safety timer
    const safetyTimer = setTimeout(() => {
      setIsActive(false);
      document.body.style.overflow = origOverflow;
      onFinish?.();
    }, 3800);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(autoFinishTimer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = origOverflow;
    };
  }, []);

  // WebGL Scene Initialization
  useEffect(() => {
    if (!isActive) return;
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let alive = true;
    let raf = 0;

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(TUNNEL_DEFAULTS.background);

      const fogNear = Math.min(
        FOG_FAR * (1 - Math.min(100, Math.max(0, TUNNEL_DEFAULTS.fade)) / 100),
        FOG_FAR - 0.01
      );
      scene.fog = new THREE.Fog(new THREE.Color(TUNNEL_DEFAULTS.background), fogNear, FOG_FAR);

      const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
      camera.position.set(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const lineMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(TUNNEL_DEFAULTS.lineColor),
        transparent: true,
        opacity: Math.min(100, Math.max(0, TUNNEL_DEFAULTS.lineOpacity)) / 100,
      });

      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin("anonymous");
      const fading: THREE.MeshBasicMaterial[] = [];

      let imageIndex = 0;
      let colorIndex = 0;
      let populateIndex = 0;
      let scrollPos = 0;
      let last = 0;
      let pressed = false;

      const hw = TUNNEL_WIDTH / 2;
      const hh = TUNNEL_HEIGHT / 2;

      const cols = Math.max(1, Math.round(TUNNEL_DEFAULTS.grid));
      const rows = Math.max(1, Math.round(TUNNEL_DEFAULTS.grid));
      const colW = TUNNEL_WIDTH / cols;
      const rowH = TUNNEL_HEIGHT / rows;

      const geoFloor = new THREE.PlaneGeometry(colW, SEGMENT_DEPTH);
      const geoWall = new THREE.PlaneGeometry(SEGMENT_DEPTH, rowH);

      const geoTubeZ = new THREE.TubeGeometry(
        new THREE.LineCurve3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, -SEGMENT_DEPTH)
        ),
        1,
        LINE_RADIUS,
        8
      );
      const geoTubeX = new THREE.TubeGeometry(
        new THREE.LineCurve3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(TUNNEL_WIDTH, 0, 0)
        ),
        1,
        LINE_RADIUS,
        8
      );
      const geoTubeY = new THREE.TubeGeometry(
        new THREE.LineCurve3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, TUNNEL_HEIGHT, 0)
        ),
        1,
        LINE_RADIUS,
        8
      );

      const colorMats = TUNNEL_DEFAULTS.colors.map(
        (hex) =>
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(hex),
            side: THREE.DoubleSide,
          })
      );

      const imageMats = LOCAL_ASSET_IMAGES.map((url) => {
        const mat = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        });
        loader.load(
          url,
          (tex) => {
            if (!alive) {
              tex.dispose();
              return;
            }
            tex.minFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
            tex.colorSpace = THREE.SRGBColorSpace;
            mat.map = tex;
            mat.needsUpdate = true;
            fading.push(mat);
          },
          undefined,
          () => {
            // Ignore missing texture
          }
        );
        return mat;
      });

      const tube = (geo: THREE.BufferGeometry, x: number, y: number, z = 0) => {
        const m = new THREE.Mesh(geo, lineMaterial);
        m.position.set(x, y, z);
        return m;
      };

      const SLOTS: Array<{
        geo: THREE.BufferGeometry;
        pos: THREE.Vector3;
        rot: THREE.Euler;
      }> = [];

      {
        const z = -SEGMENT_DEPTH / 2;
        for (let i = 0; i < cols; i++) {
          const x = -hw + i * colW + colW / 2;
          SLOTS.push({
            geo: geoFloor,
            pos: new THREE.Vector3(x, -hh, z),
            rot: new THREE.Euler(-Math.PI / 2, 0, 0),
          });
          SLOTS.push({
            geo: geoFloor,
            pos: new THREE.Vector3(x, hh, z),
            rot: new THREE.Euler(Math.PI / 2, 0, 0),
          });
        }
        for (let i = 0; i < rows; i++) {
          const y = -hh + i * rowH + rowH / 2;
          SLOTS.push({
            geo: geoWall,
            pos: new THREE.Vector3(-hw, y, z),
            rot: new THREE.Euler(0, Math.PI / 2, 0),
          });
          SLOTS.push({
            geo: geoWall,
            pos: new THREE.Vector3(hw, y, z),
            rot: new THREE.Euler(0, -Math.PI / 2, 0),
          });
        }
      }

      function populate(group: THREE.Group) {
        const takesSlabs = populateIndex % 2 === 0;
        populateIndex++;
        const slabs = group.userData.slabs as THREE.Mesh[];
        for (const slab of slabs) {
          if (!takesSlabs || Math.random() > 0.5) {
            slab.visible = false;
            continue;
          }
          slab.visible = true;
          if (Math.random() > 0.45 && imageMats.length > 0) {
            slab.material = imageMats[(3 * imageIndex) % imageMats.length];
            imageIndex++;
          } else {
            slab.material = colorMats[(5 * colorIndex) % colorMats.length];
            colorIndex++;
          }
        }
      }

      function createSegment(z: number) {
        const group = new THREE.Group();
        group.position.z = z;
        for (let i = 0; i <= cols; i++) {
          const x = -hw + i * colW;
          group.add(tube(geoTubeZ, x, -hh));
          group.add(tube(geoTubeZ, x, hh));
        }
        for (let i = 1; i < rows; i++) {
          const y = -hh + i * rowH;
          group.add(tube(geoTubeZ, -hw, y));
          group.add(tube(geoTubeZ, hw, y));
        }
        group.add(tube(geoTubeX, -hw, -hh));
        group.add(tube(geoTubeX, -hw, hh));
        group.add(tube(geoTubeY, -hw, -hh));
        group.add(tube(geoTubeY, hw, -hh));

        const slabs: THREE.Mesh[] = SLOTS.map((slot) => {
          const m = new THREE.Mesh(slot.geo, colorMats[0]);
          m.position.copy(slot.pos);
          m.rotation.copy(slot.rot);
          m.visible = false;
          group.add(m);
          return m;
        });
        group.userData.slabs = slabs;
        populate(group);
        return group;
      }

      const segments: THREE.Group[] = [];
      for (let i = 0; i < NUM_SEGMENTS; i++) {
        const g = createSegment(-i * SEGMENT_DEPTH);
        scene.add(g);
        segments.push(g);
      }

      const resize = () => {
        if (!frame) return;
        const w = Math.max(1, frame.clientWidth);
        const h = Math.max(1, frame.clientHeight);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer?.setSize(w, h, false);
      };

      const ro = new ResizeObserver(resize);
      ro.observe(frame);
      resize();

      const animate = (now: number) => {
        if (!alive) return;
        raf = requestAnimationFrame(animate);
        const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
        last = now;

        const speedFactor = pressed
          ? TUNNEL_DEFAULTS.boost / 10
          : TUNNEL_DEFAULTS.speed / 100;
        scrollPos += speedFactor;
        const want = -SCROLL_TO_Z * scrollPos;
        camera.position.z += CAMERA_CHASE * (want - camera.position.z);

        const span = NUM_SEGMENTS * SEGMENT_DEPTH;
        const z = camera.position.z;
        for (const seg of segments) {
          if (seg.position.z > z + SEGMENT_DEPTH) {
            let min = 0;
            for (const s of segments) min = Math.min(min, s.position.z);
            seg.position.z = min - SEGMENT_DEPTH;
            populate(seg);
          } else if (seg.position.z < z - span - SEGMENT_DEPTH) {
            let max = -999999;
            for (const s of segments) max = Math.max(max, s.position.z);
            seg.position.z = max + SEGMENT_DEPTH;
            populate(seg);
          }
        }

        for (let i = fading.length - 1; i >= 0; i--) {
          const m = fading[i];
          m.opacity = Math.min(1, m.opacity + dt / FADE_IN);
          if (m.opacity >= 1) fading.splice(i, 1);
        }

        renderer?.render(scene, camera);
      };
      raf = requestAnimationFrame(animate);

      const onPointerDown = () => {
        pressed = true;
      };
      const onPointerUp = () => {
        pressed = false;
      };

      frame.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointerup", onPointerUp);

      return () => {
        alive = false;
        cancelAnimationFrame(raf);
        ro.disconnect();
        frame.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", onPointerUp);
        geoFloor.dispose();
        geoWall.dispose();
        geoTubeZ.dispose();
        geoTubeX.dispose();
        geoTubeY.dispose();
        for (const m of colorMats) m.dispose();
        for (const m of imageMats) {
          m.map?.dispose();
          m.dispose();
        }
        lineMaterial.dispose();
        renderer?.dispose();
      };
    } catch {
      // If WebGL runtime fails, bypass immediately
      setIsActive(false);
      onFinish?.();
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="arrival-tunnel"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[999999] bg-[#07090b] flex items-center justify-center overflow-hidden select-none"
        >
          {/* Three.js Canvas Container */}
          <div ref={frameRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* Vignette & Contrast Shroud */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(7,9,11,0.6)_0%,rgba(7,9,11,0.85)_100%)]" />

          {/* Floating Centered Identity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)", y: 14 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)", y: -6 }}
            transition={MOTION.section}
            className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          >
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#b7ff3c] mb-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b7ff3c] animate-pulse" />
              <span>TRANSIT SIGNAL // INITIALIZING</span>
            </div>

            <motion.h1
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 2.8,
                ease: "easeInOut",
              }}
              className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#f1f6f7]"
            >
              DARSH <span className="text-[#b7ff3c]">SOAM</span>
            </motion.h1>

            <p className="mt-3 font-mono text-xs sm:text-sm text-[#b3c0c4] tracking-wider uppercase">
              Cloud & DevOps Engineer &bull; AI Systems Builder
            </p>
          </motion.div>

          {/* Skip Button */}
          <div className="absolute bottom-6 right-6 z-20">
            <button
              onClick={finishIntro}
              aria-label="Skip Arrival Animation"
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(230,240,245,0.15)] bg-[#07090b]/80 backdrop-blur-md font-mono text-[11px] uppercase tracking-wider text-[#b3c0c4] hover:text-[#b7ff3c] hover:border-[#b7ff3c] transition-all"
            >
              <span>Skip Intro</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[rgba(230,240,245,0.08)] text-[9px] text-[#73848b] group-hover:text-[#b7ff3c]">
                ESC
              </kbd>
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ArrivalTunnel;
