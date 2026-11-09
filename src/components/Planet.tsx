import { useMemo } from 'react';

export type PlanetType = 'earth' | 'jupiter' | 'saturn' | 'sun' | 'earth-ultra' | 'mars' | 'neptune' | 'venus';

interface PlanetProps {
  type: PlanetType;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

function useSeededStars(seed: number, count: number) {
  return useMemo(() => {
    let s = seed;
    const stars: { top: string; left: string; size: number; delay: number }[] = [];
    for (let i = 0; i < count; i++) {
      s = (s * 9301 + 49297) % 233280;
      const r1 = s / 233280;
      s = (s * 9301 + 49297) % 233280;
      const r2 = s / 233280;
      s = (s * 9301 + 49297) % 233280;
      const r3 = s / 233280;
      s = (s * 9301 + 49297) % 233280;
      const r4 = s / 233280;
      stars.push({
        top: `${r1 * 100}%`,
        left: `${r2 * 100}%`,
        size: r3 * 1.8 + 0.4,
        delay: r4 * 4,
      });
    }
    return stars;
  }, [seed, count]);
}

/**
 * Rotating texture sphere.
 *
 * Uses a single CSS background-image that is 200% wide and scrolls left.
 * The element itself is clip-pathed to a circle — no border-radius overflow
 * issues, no img seam, no unfilled right edge.
 */
function TextureSphere({ texture, duration }: { texture: string; duration: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        clipPath: 'circle(49.5% at 50% 50%)',
        WebkitClipPath: 'circle(49.5% at 50% 50%)',
        backgroundImage: `url(${texture})`,
        backgroundSize: '200% 100%',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0% 50%',
        animation: `planetScroll ${duration}s linear infinite`,
        willChange: 'background-position',
      }}
    />
  );
}

/** Cloud layer that scrolls at a different speed than the surface */
function CloudLayer({ texture, duration, opacity, filter }: { texture: string; duration: number; opacity: number; filter: string }) {
  return (
    <div
      className="absolute inset-0 mix-blend-screen"
      style={{
        clipPath: 'circle(49.5% at 50% 50%)',
        WebkitClipPath: 'circle(49.5% at 50% 50%)',
        opacity,
        backgroundImage: `url(${texture})`,
        backgroundSize: '200% 100%',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0% 50%',
        filter,
        animation: `planetScroll ${duration}s linear infinite`,
        willChange: 'background-position',
      }}
    />
  );
}

/** 3D lighting overlay — radial gradient gives the sphere depth */
function LightingOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        clipPath: 'circle(49.5% at 50% 50%)',
        WebkitClipPath: 'circle(49.5% at 50% 50%)',
        background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 25%, transparent 45%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.65) 100%)',
      }}
    />
  );
}

/** Day-night terminator shadow */
function TerminatorShadow({ angle = 135 }: { angle?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        clipPath: 'circle(49.5% at 50% 50%)',
        WebkitClipPath: 'circle(49.5% at 50% 50%)',
        transform: `rotate(${angle}deg)`,
        background: 'linear-gradient(90deg, transparent 25%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.75) 100%)',
      }}
    />
  );
}

/** Atmosphere glow ring outside the sphere */
function AtmosphereGlow({ inset = '-6%', color = 'rgba(100,180,255,0.2)' }: { inset?: string; color?: string }) {
  return (
    <div className="absolute rounded-full pointer-events-none" style={{
      inset,
      background: `radial-gradient(circle, transparent 46%, ${color} 50%, transparent 58%)`,
    }} />
  );
}

/** Inset rim shadow + outer glow via box-shadow */
function RimLight({ boxShadow }: { boxShadow: string }) {
  return (
    <div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{ boxShadow }}
    />
  );
}

export function Planet({ type, size = 500, className = '', style }: PlanetProps) {
  const stars = useSeededStars(31, 25);
  const base = import.meta.env.BASE_URL;
  const textureUrl = `${base}planet-${type === 'earth-ultra' ? 'earth-ultra' : type}-texture.webp`;
  const rotationDuration = 140;
  const earthClouds = `${base}planet-earth-texture.webp`;

  // ============================== EARTH ==============================
  if (type === 'earth') {
    return (
      <div className={`planet-wrapper ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true">
        <AtmosphereGlow inset="-6%" color="rgba(100,180,255,0.2)" />
        <TextureSphere texture={textureUrl} duration={rotationDuration} />
        <CloudLayer texture={earthClouds} duration={rotationDuration * 0.85} opacity={0.3} filter="brightness(2.5) contrast(0.3) blur(2px)" />
        <LightingOverlay />
        <TerminatorShadow />
        <RimLight boxShadow="inset 0 0 40px rgba(100,180,255,0.15), 0 0 50px rgba(41,128,185,0.2)" />
      </div>
    );
  }

  // ============================== EARTH ULTRA ==============================
  if (type === 'earth-ultra') {
    return (
      <div className={`planet-wrapper ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true">
        <AtmosphereGlow inset="-8%" color="rgba(100,180,255,0.25)" />
        <TextureSphere texture={textureUrl} duration={rotationDuration} />
        <CloudLayer texture={earthClouds} duration={rotationDuration * 0.8} opacity={0.25} filter="brightness(2) contrast(0.4) blur(1.5px)" />
        <LightingOverlay />
        <TerminatorShadow />
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.12) 0%, transparent 20%)',
        }} />
        <RimLight boxShadow="inset 0 0 50px rgba(100,180,255,0.2), 0 0 70px rgba(30,111,168,0.25)" />
      </div>
    );
  }

  // ============================== JUPITER ==============================
  if (type === 'jupiter') {
    return (
      <div className={`planet-wrapper ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true">
        <TextureSphere texture={textureUrl} duration={rotationDuration} />
        <LightingOverlay />
        <TerminatorShadow angle={120} />
        <RimLight boxShadow="inset 0 0 35px rgba(0,0,0,0.4), 0 0 40px rgba(201,166,121,0.12)" />
      </div>
    );
  }

  // ============================== SATURN ==============================
  if (type === 'saturn') {
    const ringSize = size * 1.9;
    const ringStyle: React.CSSProperties = {
      width: ringSize,
      height: ringSize * 0.26,
      transform: 'translate(-50%, -50%) rotate(-20deg)',
      background: 'radial-gradient(ellipse, transparent 36%, rgba(220,200,160,0.35) 39%, rgba(240,220,180,0.55) 43%, rgba(180,160,120,0.2) 47%, rgba(230,210,170,0.45) 51%, rgba(200,180,140,0.35) 55%, rgba(180,160,120,0.15) 60%, transparent 64%)',
      filter: 'blur(0.3px)',
    };
    return (
      <div className={`planet-wrapper ${className}`} style={{ width: ringSize, height: ringSize, ...style }} aria-hidden="true">
        {/* Rings — back half */}
        <div className="absolute left-1/2 top-1/2 rounded-full" style={{ ...ringStyle, clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
        {/* Planet body */}
        <div className="absolute left-1/2 top-1/2" style={{ width: size, height: size, transform: 'translate(-50%, -50%)' }}>
          <TextureSphere texture={textureUrl} duration={rotationDuration} />
          <LightingOverlay />
          <TerminatorShadow angle={130} />
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.35)' }} />
        </div>
        {/* Rings — front half */}
        <div className="absolute left-1/2 top-1/2 rounded-full" style={{ ...ringStyle, clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />
      </div>
    );
  }

  // ============================== MARS ==============================
  if (type === 'mars') {
    return (
      <div className={`planet-wrapper ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true">
        <AtmosphereGlow inset="-5%" color="rgba(200,100,50,0.12)" />
        <TextureSphere texture={textureUrl} duration={rotationDuration} />
        <LightingOverlay />
        <TerminatorShadow angle={125} />
        <RimLight boxShadow="inset 0 0 35px rgba(0,0,0,0.4), 0 0 35px rgba(180,80,40,0.1)" />
      </div>
    );
  }

  // ============================== NEPTUNE ==============================
  if (type === 'neptune') {
    return (
      <div className={`planet-wrapper ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true">
        <AtmosphereGlow inset="-7%" color="rgba(40,80,200,0.2)" />
        <TextureSphere texture={textureUrl} duration={rotationDuration} />
        <LightingOverlay />
        <TerminatorShadow angle={130} />
        <RimLight boxShadow="inset 0 0 40px rgba(0,0,0,0.4), 0 0 50px rgba(30,60,180,0.18)" />
      </div>
    );
  }

  // ============================== VENUS ==============================
  if (type === 'venus') {
    return (
      <div className={`planet-wrapper ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true">
        <AtmosphereGlow inset="-6%" color="rgba(230,190,80,0.18)" />
        <TextureSphere texture={textureUrl} duration={rotationDuration} />
        <LightingOverlay />
        <TerminatorShadow angle={128} />
        <RimLight boxShadow="inset 0 0 35px rgba(0,0,0,0.35), 0 0 45px rgba(220,180,70,0.15)" />
      </div>
    );
  }

  // ============================== SUN ==============================
  if (type === 'sun') {
    return (
      <div className={`planet-wrapper ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true">
        {/* Outer corona — large pulsing glow */}
        <div className="absolute rounded-full pointer-events-none" style={{
          inset: '-45%',
          background: 'radial-gradient(circle, rgba(255,160,40,0.15) 12%, rgba(255,100,10,0.08) 28%, rgba(255,80,0,0.04) 45%, transparent 70%)',
          animation: 'planetSunCorona 6s ease-in-out infinite',
        }} />
        {/* Mid corona */}
        <div className="absolute rounded-full pointer-events-none" style={{
          inset: '-20%',
          background: 'radial-gradient(circle, rgba(255,200,80,0.12) 30%, rgba(255,140,30,0.06) 50%, transparent 70%)',
          animation: 'planetSunPulse 4s ease-in-out infinite',
        }} />
        {/* Sun surface */}
        <TextureSphere texture={textureUrl} duration={rotationDuration} />
        {/* Bright hot center overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: 'circle(49.5% at 50% 50%)',
            WebkitClipPath: 'circle(49.5% at 50% 50%)',
            background: 'radial-gradient(circle at 38% 32%, rgba(255,250,220,0.3) 0%, rgba(255,220,150,0.1) 25%, transparent 50%)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Emissive glow rim — the sun glows from within */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{
          boxShadow: 'inset 0 0 50px rgba(255,200,80,0.5), 0 0 80px rgba(255,150,30,0.35), 0 0 140px rgba(255,100,10,0.18), 0 0 200px rgba(255,80,0,0.08)',
        }} />
        {/* Solar flare bursts around the surface */}
        {stars.slice(0, 12).map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: s.top,
              left: s.left,
              width: s.size * 3,
              height: s.size * 3,
              background: 'radial-gradient(circle, rgba(255,240,180,0.7), rgba(255,180,50,0.2) 50%, transparent 80%)',
              animation: `planetSunFlare ${3 + i * 0.2}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
