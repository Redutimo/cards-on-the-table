// Background canvas logic ported from vanilla JS

let bgRaf, pRaf;
let pAnimating = false;
let particles = [];
let bgCanvasEl, pCanvasEl, bgCtx, pCtx;

const STAR_COUNT = 220;
let stars = [];

const AURORA_BLOBS = [
  { cx: 0.15, cy: 0.25, rx: 0.45, ry: 0.20, color: [80, 20, 160],  speed: 0.00018, phase: 0 },
  { cx: 0.75, cy: 0.15, rx: 0.40, ry: 0.18, color: [20, 60, 140],  speed: 0.00013, phase: 1.5 },
  { cx: 0.50, cy: 0.80, rx: 0.50, ry: 0.22, color: [100, 30, 80],  speed: 0.00021, phase: 3.1 },
  { cx: 0.85, cy: 0.60, rx: 0.35, ry: 0.16, color: [40, 80, 120],  speed: 0.00016, phase: 0.8 },
];

let bgT = 0;

export function initCanvases(bgCanvas, pCanvas) {
  bgCanvasEl = bgCanvas;
  pCanvasEl = pCanvas;
  bgCtx = bgCanvasEl.getContext('2d');
  pCtx = pCanvasEl.getContext('2d');

  stars = Array.from({length: STAR_COUNT}, () => ({
    x:       Math.random(),
    y:       Math.random(),
    r:       Math.random() * 1.4 + 0.3,
    speed:   Math.random() * 0.00008 + 0.00002,
    phase:   Math.random() * Math.PI * 2,
    twinkle: Math.random() * 0.5 + 0.3,
    drift:   (Math.random() - 0.5) * 0.00004,
  }));

  window.addEventListener('resize', resize);
  resize();
  
  if (!bgRaf) drawBackground(performance.now());
}

export function cleanupCanvases() {
  window.removeEventListener('resize', resize);
  cancelAnimationFrame(bgRaf);
  cancelAnimationFrame(pRaf);
  bgRaf = null;
  pRaf = null;
  pAnimating = false;
}

function resize() {
  if (bgCanvasEl) {
    bgCanvasEl.width = window.innerWidth;
    bgCanvasEl.height = window.innerHeight;
  }
  if (pCanvasEl) {
    pCanvasEl.width = window.innerWidth;
    pCanvasEl.height = window.innerHeight;
  }
}

function drawBackground(ts) {
  if (!bgCtx) return;
  bgT = ts * 0.001;
  const W = bgCanvasEl.width, H = bgCanvasEl.height;
  bgCtx.clearRect(0, 0, W, H);

  // Deep space background
  bgCtx.fillStyle = '#050508';
  bgCtx.fillRect(0, 0, W, H);

  // Aurora nebula blobs
  AURORA_BLOBS.forEach(b => {
    const ox = Math.sin(bgT * b.speed * 1000 + b.phase) * 0.06;
    const oy = Math.cos(bgT * b.speed * 800  + b.phase) * 0.04;
    const cx = (b.cx + ox) * W;
    const cy = (b.cy + oy) * H;
    const alpha = 0.055 + Math.sin(bgT * b.speed * 600 + b.phase) * 0.02;
    const grad = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, b.rx * W);
    const [r,g,bl] = b.color;
    grad.addColorStop(0,   `rgba(${r},${g},${bl},${alpha})`);
    grad.addColorStop(0.5, `rgba(${r},${g},${bl},${alpha * 0.4})`);
    grad.addColorStop(1,   `rgba(${r},${g},${bl},0)`);
    bgCtx.save();
    bgCtx.scale(1, b.ry / b.rx);
    bgCtx.fillStyle = grad;
    bgCtx.beginPath();
    bgCtx.arc(cx, cy * (b.rx / b.ry), b.rx * W, 0, Math.PI * 2);
    bgCtx.fill();
    bgCtx.restore();
  });

  // Stars
  stars.forEach(s => {
    s.x += s.drift;
    if (s.x < 0) s.x = 1;
    if (s.x > 1) s.x = 0;
    const twinkle = 0.5 + 0.5 * Math.sin(bgT * 2.1 + s.phase);
    const alpha = s.twinkle * twinkle + (1 - s.twinkle);
    bgCtx.beginPath();
    bgCtx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(255,245,220,${alpha * 0.85})`;
    bgCtx.fill();
    // Occasional larger twinkle cross
    if (s.r > 1.3 && twinkle > 0.9) {
      bgCtx.strokeStyle = `rgba(255,240,180,${(twinkle - 0.9) * 4 * 0.5})`;
      bgCtx.lineWidth = 0.5;
      const sx = s.x * W, sy = s.y * H, cr = s.r * 3;
      bgCtx.beginPath();
      bgCtx.moveTo(sx - cr, sy); bgCtx.lineTo(sx + cr, sy);
      bgCtx.moveTo(sx, sy - cr); bgCtx.lineTo(sx, sy + cr);
      bgCtx.stroke();
    }
  });

  bgRaf = requestAnimationFrame(drawBackground);
}

function drawStar(ctx, cx, cy, innerR, outerR, points) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i * Math.PI) / points;
    if (i === 0) ctx.moveTo(cx + Math.sin(a)*r, cy - Math.cos(a)*r);
    else         ctx.lineTo(cx + Math.sin(a)*r, cy - Math.cos(a)*r);
  }
  ctx.closePath();
  ctx.fill();
}

function animateParticles() {
  if (!pCtx) return;
  pAnimating = true;
  pCtx.clearRect(0, 0, pCanvasEl.width, pCanvasEl.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    p.vy += 0.12; // gravity
    p.life -= p.decay;
    if (p.life <= 0) return;
    pCtx.save();
    pCtx.globalAlpha = Math.max(0, p.life);
    pCtx.fillStyle = p.color + p.life + ')';
    pCtx.translate(p.x, p.y);
    if (p.shape === 'star') {
      pCtx.rotate(p.spin * Date.now() * 0.01);
      drawStar(pCtx, 0, 0, p.r * 0.5, p.r, 4);
    } else {
      pCtx.beginPath();
      pCtx.arc(0, 0, p.r, 0, Math.PI * 2);
      pCtx.fill();
    }
    pCtx.restore();
  });

  if (particles.length > 0) {
    pRaf = requestAnimationFrame(animateParticles);
  } else {
    pAnimating = false;
  }
}

export function spawnParticles(cx, cy) {
  if (!pCanvasEl) return;
  const count = 55;
  for (let i = 0; i < count; i++) {
    const angle  = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.6;
    const speed  = Math.random() * 4.5 + 1.5;
    const gold   = Math.random() > 0.5;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 2,
      r:  Math.random() * 3 + 1,
      life: 1,
      decay: Math.random() * 0.025 + 0.018,
      color: gold ? `rgba(240,200,80,` : `rgba(255,255,200,`,
      spin: (Math.random() - 0.5) * 0.3,
      shape: Math.random() > 0.6 ? 'star' : 'circle',
    });
  }
  if (!pAnimating) animateParticles();
}
