/** Gold sparkle burst on a canvas: ~36 particles, 900 ms, then the canvas is cleared. */

const DURATION_MS = 900;
const COLORS = ["#fcd34d", "#fbbf24", "#fde68a", "#f59e0b", "#ffffff"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  spin: number;
  color: string;
}

export function burst(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.scale(dpr, dpr);

  // Burst from just right of the heading.
  const originX = Math.min(width * 0.45, 260);
  const originY = height / 2;
  const particles: Particle[] = Array.from({ length: 36 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 3.5;
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      size: 1.5 + Math.random() * 2.5,
      spin: Math.random() * Math.PI,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#fbbf24",
    };
  });

  const start = performance.now();
  let raf = 0;

  const drawStar = (p: Particle, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.spin);
    ctx.beginPath();
    // Four-point sparkle.
    for (let i = 0; i < 8; i += 1) {
      const r = i % 2 === 0 ? p.size * 2 : p.size * 0.5;
      const a = (i * Math.PI) / 4;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const frame = (now: number) => {
    const t = (now - start) / DURATION_MS;
    ctx.clearRect(0, 0, width, height);
    if (t >= 1) return;
    const alpha = 1 - t * t;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy = p.vy * 0.96 + 0.06;
      p.spin += 0.08;
      drawStar(p, alpha);
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, width, height);
  };
}
