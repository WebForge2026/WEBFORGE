import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number }[];
}

const STAR_COLORS = [
  '255, 255, 255',
  '200, 230, 255',
  '180, 220, 255',
  '220, 240, 255',
  '52, 211, 153',
  '34, 211, 238',
];

export function StarfieldCanvas({ density = 1, shootingStars = true }: { density?: number; shootingStars?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const nextShootingStarRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let running = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((width * height) / 4000 * density);
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const colorIndex = Math.random();
        let color: string;
        if (colorIndex > 0.94) color = STAR_COLORS[4];
        else if (colorIndex > 0.88) color = STAR_COLORS[5];
        else color = STAR_COLORS[Math.floor(Math.random() * 4)];

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.8 + 0.2,
          size: Math.random() * 1.5 + 0.3,
          baseAlpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
        });
      }
      starsRef.current = stars;
    };

    const spawnShootingStar = () => {
      const fromLeft = Math.random() > 0.5;
      const angle = (Math.random() * 0.3 + 0.15) * Math.PI;
      const speed = Math.random() * 8 + 12;
      const sx = fromLeft ? -50 : width + 50;
      const sy = Math.random() * height * 0.6;
      const vx = fromLeft ? Math.cos(angle) * speed : -Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const maxLife = 80 + Math.random() * 40;

      shootingStarsRef.current.push({
        x: sx, y: sy, vx, vy, life: 0, maxLife, trail: [],
      });
    };

    let time = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      if (!running) return;
      // Throttle to ~30fps for star animation (saves GPU without visual difference)
      if (now - lastTime < 33) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      lastTime = now;
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const alpha = star.baseAlpha * twinkle * star.z;
        const sz = star.size * star.z;

        ctx.beginPath();
        ctx.arc(star.x, star.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        ctx.fill();

        if (star.size > 1.0 && twinkle > 0.8) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, sz * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, sz * 3);
          gradient.addColorStop(0, `rgba(${star.color}, ${alpha * 0.25})`);
          gradient.addColorStop(1, `rgba(${star.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        star.x += 0.01 * star.z;
        if (star.x > width + 5) star.x = -5;
      }

      if (shootingStars) {
        if (time >= nextShootingStarRef.current && shootingStarsRef.current.length < 2) {
          if (Math.random() > 0.3) spawnShootingStar();
          nextShootingStarRef.current = time + 150 + Math.random() * 250;
        }

        shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
          s.life += 1;
          s.x += s.vx;
          s.y += s.vy;
          s.trail.unshift({ x: s.x, y: s.y });
          if (s.trail.length > 15) s.trail.pop();

          const lifeRatio = s.life / s.maxLife;
          const fadeAlpha = lifeRatio < 0.1 ? lifeRatio * 10 : 1 - Math.max(0, (lifeRatio - 0.7) / 0.3);

          for (let i = 0; i < s.trail.length - 1; i++) {
            const p1 = s.trail[i];
            const p2 = s.trail[i + 1];
            const trailAlpha = (1 - i / s.trail.length) * fadeAlpha;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(200, 230, 255, ${trailAlpha * 0.8})`;
            ctx.lineWidth = (1 - i / s.trail.length) * 2.5;
            ctx.lineCap = 'round';
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
          const headGradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 8);
          headGradient.addColorStop(0, `rgba(220, 240, 255, ${fadeAlpha})`);
          headGradient.addColorStop(0.5, `rgba(52, 211, 153, ${fadeAlpha * 0.5})`);
          headGradient.addColorStop(1, 'rgba(52, 211, 153, 0)');
          ctx.fillStyle = headGradient;
          ctx.fill();

          return s.life < s.maxLife && s.x > -100 && s.x < width + 100 && s.y < height + 100;
        });
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafRef.current);
      } else if (!running) {
        running = true;
        lastTime = performance.now();
        rafRef.current = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, [density, shootingStars]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
