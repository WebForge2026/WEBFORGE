import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}[]';

export function IntroLoader() {
  const [hidden, setHidden] = useState(false);
  const [display, setDisplay] = useState('WebForge');

  useEffect(() => {
    const target = 'WebForge';
    const duration = 1800;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);

      const next = target
        .split('')
        .map((char, i) => {
          const charProgress = progress * target.length - i;
          if (charProgress >= 1) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplay(next);

      if (progress >= 1) {
        setDisplay(target);
        clearInterval(interval);
      }
    }, 50);

    const timer = setTimeout(() => setHidden(true), 2800);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (hidden) return null;

  const webPart = display.slice(0, 3);
  const forgePart = display.slice(3);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-dark pointer-events-none animate-fade-out">
      <div className="font-mono text-4xl font-extrabold tracking-tight">
        <span className="text-white">{webPart}</span>
        <span className="text-brand-500">{forgePart}</span>
      </div>
      <div className="mt-5 h-[3px] w-36 overflow-hidden rounded-full bg-slate-700 opacity-0 animate-fade-in-up">
        <div className="h-full w-0 bg-brand-500 animate-progress" />
      </div>
    </div>
  );
}
