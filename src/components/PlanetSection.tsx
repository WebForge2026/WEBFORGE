import { ReactNode } from 'react';
import { Planet, PlanetType } from '@/components/Planet';

interface PlanetSectionProps {
  children: ReactNode;
  planetType?: PlanetType;
  planetSize?: number;
  planetX?: number;
  planetY?: number;
  planetOpacity?: number;
  className?: string;
}

export function PlanetSection({
  children,
  planetType,
  planetSize = 500,
  planetX = 80,
  planetY = 50,
  planetOpacity = 0.4,
  className = '',
}: PlanetSectionProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}
    >
      {/* Planet background */}
      {planetType && (
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{
            left: `${planetX}%`,
            top: `${planetY}%`,
            transform: 'translate(-50%, -50%)',
            opacity: planetOpacity,
            zIndex: 0,
            contain: 'layout style paint',
          }}
        >
          <Planet type={planetType} size={planetSize} />
        </div>
      )}
      {/* Content on top */}
      <div className="relative" style={{ zIndex: 1 }}>{children}</div>
    </div>
  );
}
