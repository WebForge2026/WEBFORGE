import { useEffect, useRef } from 'react';

export function BackgroundMesh() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none max-w-full">
      <div className="absolute inset-0 bg-obsidian" />
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/10 blur-[120px] animate-mesh max-w-full" />
      <div className="absolute top-[30%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/8 blur-[100px] animate-mesh max-w-full" style={{ animationDelay: '5s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-emerald-600/6 blur-[110px] animate-mesh max-w-full" style={{ animationDelay: '10s' }} />

      <div className="absolute inset-0 noise-texture opacity-[0.015]" />

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </div>
  );
}

export function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursor.style.transform = `translate3d(${currentX - 200}px, ${currentY - 200}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-0 opacity-60 max-w-full"
      style={{
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
      }}
    />
  );
}
