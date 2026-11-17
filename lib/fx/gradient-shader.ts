/**
 * Hero gradient mesh: one full-screen triangle and one fragment shader, raw
 * WebGL 1 (no library). Three slow colour fields in the site palette drift
 * over the page background; near the cursor the field bends toward it and
 * brightens slightly.
 *
 * Cost control: renders at half the (capped) device pixel ratio, pauses when
 * the canvas is off screen or the tab is hidden, and stops on context loss.
 * Returns a cleanup function, or null if WebGL is unavailable (the static
 * CSS gradient underneath stays visible).
 */

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseStrength;

const vec3 BG = vec3(0.008, 0.024, 0.090);      // #020617
const vec3 SKY = vec3(0.220, 0.741, 0.973);     // #38BDF8
const vec3 INDIGO = vec3(0.506, 0.549, 0.973);  // #818CF8
const vec3 PURPLE = vec3(0.753, 0.518, 0.988);  // #C084FC

float field(vec2 p, vec2 c, float spread) {
  vec2 d = p - c;
  return exp(-dot(d, d) * spread);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);

  vec2 toMouse = m - p;
  float md2 = dot(toMouse, toMouse);
  p += toMouse * 0.22 * uMouseStrength * exp(-md2 * 3.5);

  float t = uTime;
  vec2 c1 = vec2(aspect * (0.28 + 0.10 * sin(t * 0.13)), 0.78 + 0.08 * cos(t * 0.11));
  vec2 c2 = vec2(aspect * (0.74 + 0.09 * cos(t * 0.09)), 0.62 + 0.10 * sin(t * 0.12));
  vec2 c3 = vec2(aspect * (0.50 + 0.14 * sin(t * 0.07 + 1.3)), 0.30 + 0.07 * cos(t * 0.10));

  vec3 col = BG;
  col += SKY * field(p, c1, 4.5) * 0.24;
  col += INDIGO * field(p, c2, 4.0) * 0.22;
  col += PURPLE * field(p, c3, 5.0) * 0.14;
  col += SKY * 0.07 * uMouseStrength * exp(-md2 * 16.0);

  // Ordered noise to avoid banding in the dark gradient.
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function startGradientShader(canvas: HTMLCanvasElement): (() => void) | null {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: false,
  });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uResolution = gl.getUniformLocation(program, "uResolution");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uMouse = gl.getUniformLocation(program, "uMouse");
  const uMouseStrength = gl.getUniformLocation(program, "uMouseStrength");

  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
    const width = Math.max(1, Math.round(canvas.clientWidth * scale));
    const height = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    gl.uniform2f(uResolution, width, height);
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  // Mouse in 0..1 canvas space (y up), eased toward the pointer each frame.
  const target = { x: 0.5, y: 0.5, strength: 0 };
  const mouse = { x: 0.5, y: 0.5, strength: 0 };
  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
    target.x = x;
    target.y = y;
    target.strength = inside ? 1 : 0;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  let raf = 0;
  let onScreen = true;
  let stopped = false;
  let first = true;
  const startTime = performance.now();

  const render = (now: number) => {
    raf = 0;
    if (stopped || !onScreen || document.hidden) return;
    mouse.x += (target.x - mouse.x) * 0.06;
    mouse.y += (target.y - mouse.y) * 0.06;
    mouse.strength += (target.strength - mouse.strength) * 0.04;
    gl.uniform1f(uTime, (now - startTime) / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uMouseStrength, mouse.strength);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (first) {
      first = false;
      canvas.dataset.ready = "true";
    }
    raf = requestAnimationFrame(render);
  };
  const resume = () => {
    if (!raf && !stopped && onScreen && !document.hidden) raf = requestAnimationFrame(render);
  };

  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry?.isIntersecting ?? false;
    resume();
  });
  io.observe(canvas);
  document.addEventListener("visibilitychange", resume);

  const stop = () => {
    stopped = true;
    cancelAnimationFrame(raf);
    io.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", resume);
    canvas.removeEventListener("webglcontextlost", stop);
  };
  canvas.addEventListener("webglcontextlost", stop);

  resume();
  return () => {
    stop();
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}
