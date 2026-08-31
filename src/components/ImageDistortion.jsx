import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Texture, Triangle, Flowmap, Vec2 } from "ogl";

const IMAGE_SRC = "/projects/cloudrender_v2.png";
const IMAGE_ASPECT = 1920 / 1080;
const STRENGTH = 0.6;
const AMBIENT_STRENGTH = 0.18;
const BLUR_RADIUS = 0.022;
const MAX_PIXEL_JUMP = 250;

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform sampler2D tFlow;
  uniform float uImageAspect;
  uniform vec2 uResolution;
  uniform float uStrength;
  uniform float uAmbientStrength;
  uniform float uBlurRadius;
  uniform float uTime;
  varying vec2 vUv;

  vec4 blurSample(vec2 uv, float r) {
    vec4 sum = texture2D(tMap, uv) * 0.24;
    sum += texture2D(tMap, uv + vec2(r, 0.0)) * 0.09;
    sum += texture2D(tMap, uv - vec2(r, 0.0)) * 0.09;
    sum += texture2D(tMap, uv + vec2(0.0, r)) * 0.09;
    sum += texture2D(tMap, uv - vec2(0.0, r)) * 0.09;
    vec2 d = vec2(r, r) * 0.7071;
    sum += texture2D(tMap, uv + d) * 0.07;
    sum += texture2D(tMap, uv + vec2(-d.x, d.y)) * 0.07;
    sum += texture2D(tMap, uv + vec2(d.x, -d.y)) * 0.07;
    sum += texture2D(tMap, uv - d) * 0.07;
    float r2 = r * 2.0;
    sum += texture2D(tMap, uv + vec2(r2, 0.0)) * 0.03;
    sum += texture2D(tMap, uv - vec2(r2, 0.0)) * 0.03;
    sum += texture2D(tMap, uv + vec2(0.0, r2)) * 0.03;
    sum += texture2D(tMap, uv - vec2(0.0, r2)) * 0.03;
    return sum;
  }

  void main() {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / uImageAspect, 1.0),
      min((uResolution.y / uResolution.x) * uImageAspect, 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec3 flow = texture2D(tFlow, vUv).rgb;
    float flowMag = clamp(length(flow.rg), 0.0, 0.6);

    // resting state: soft blur, no ripple
    vec4 blurredColor = blurSample(uv, uBlurRadius);

    // active state: sharp image warped into ripples
    vec2 ambient = vec2(
      sin(uv.y * 5.0 + uTime * 0.6) + sin(uv.x * 3.0 - uTime * 0.35),
      cos(uv.x * 5.0 - uTime * 0.5) + cos(uv.y * 3.0 + uTime * 0.4)
    ) * 0.5;

    float boost = 1.0 + flowMag * 3.0;
    vec2 displacement = ambient * uAmbientStrength * boost + flow.rg * uStrength;
    displacement = clamp(displacement, vec2(-0.3), vec2(0.3));

    vec2 displaced = clamp(uv - displacement, vec2(0.001), vec2(0.999));

    vec4 rippledColor = texture2D(tMap, displaced);

    float aberration = flowMag * 0.02;
    rippledColor.r = texture2D(tMap, clamp(displaced + vec2(aberration, 0.0), vec2(0.001), vec2(0.999))).r;
    rippledColor.b = texture2D(tMap, clamp(displaced - vec2(aberration, 0.0), vec2(0.001), vec2(0.999))).b;

    // cross-fade blur -> ripple based on how active the cursor has been here
    float focus = smoothstep(0.0, 0.15, flowMag);
    gl_FragColor = mix(blurredColor, rippledColor, focus);
  }
`;

export const ImageDistortion = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    let flowmap, texture, program, mesh;
    let loadedImg = null;
    let frameId = null;

    const buildScene = () => {
      flowmap = new Flowmap(gl, { falloff: 0.18, alpha: 1, dissipation: 0.96 });

      texture = new Texture(gl);
      if (loadedImg) texture.image = loadedImg;

      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          tMap: { value: texture },
          tFlow: flowmap.uniform,
          uImageAspect: { value: IMAGE_ASPECT },
          uResolution: { value: new Vec2(1, 1) },
          uStrength: { value: STRENGTH },
          uAmbientStrength: { value: prefersReducedMotion ? 0 : AMBIENT_STRENGTH },
          uBlurRadius: { value: BLUR_RADIUS },
          uTime: { value: 0 },
        },
      });
      mesh = new Mesh(gl, { geometry, program });
    };

    buildScene();

    if (!loadedImg) {
      const img = new Image();
      img.src = IMAGE_SRC;
      img.onload = () => {
        loadedImg = img;
        texture.image = img;
        draw();
      };
    }

    const mouse = new Vec2(-1);
    const velocity = new Vec2();
    const lastMouse = new Vec2();
    let lastTime = null;
    let insideBounds = false;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      renderer.setSize(rect.width, rect.height);
      program.uniforms.uResolution.value.set(rect.width, rect.height);
      flowmap.aspect = rect.width / rect.height;
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      if (px < 0 || px > rect.width || py < 0 || py > rect.height) {
        insideBounds = false;
        return;
      }

      mouse.set(px / rect.width, 1 - py / rect.height);

      if (!insideBounds || lastTime === null) {
        lastTime = performance.now();
        lastMouse.set(px, py);
      }

      const deltaX = clampNum(px - lastMouse.x, -MAX_PIXEL_JUMP, MAX_PIXEL_JUMP);
      const deltaY = clampNum(py - lastMouse.y, -MAX_PIXEL_JUMP, MAX_PIXEL_JUMP);
      lastMouse.set(px, py);

      const time = performance.now();
      const delta = Math.max(14, time - lastTime);
      lastTime = time;

      velocity.x = deltaX / delta;
      velocity.y = deltaY / delta;
      velocity.needsUpdate = true;
      insideBounds = true;
    };

    const draw = () => {
      flowmap.update();
      renderer.render({ scene: mesh });
    };

    const loop = () => {
      frameId = requestAnimationFrame(loop);
      program.uniforms.uTime.value = performance.now() * 0.001;

      if (!velocity.needsUpdate) {
        mouse.set(-1);
        velocity.set(0);
      }
      velocity.needsUpdate = false;

      flowmap.mouse.copy(mouse);
      flowmap.velocity.lerp(velocity, velocity.len() ? 0.5 : 0.1);
      draw();
    };

    const stopLoop = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
    };

    const startLoop = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(loop);
    };

    resize();
    draw();

    const onVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    const onContextLost = (e) => {
      e.preventDefault();
      stopLoop();
    };
    const onContextRestored = () => {
      buildScene();
      resize();
      draw();
      startLoop();
    };

    gl.canvas.addEventListener("webglcontextlost", onContextLost, false);
    gl.canvas.addEventListener("webglcontextrestored", onContextRestored, false);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Mouse-triggered motion is allowed under prefers-reduced-motion (WCAG 2.3.3) -
    // only the always-on ambient sine warp (set via uAmbientStrength below) is
    // gratuitous/autoplaying and gets suppressed for that preference.
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.canvas.removeEventListener("webglcontextlost", onContextLost, false);
      gl.canvas.removeEventListener("webglcontextrestored", onContextRestored, false);
      container.removeChild(gl.canvas);
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="hero-distortion" aria-hidden="true" />;
};

function clampNum(v, min, max) {
  return Math.min(Math.max(v, min), max);
}
