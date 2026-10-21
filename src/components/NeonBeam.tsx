import React from 'react';

interface NeonBeamProps {
  className?: string;
  speed?: 'normal' | 'fast' | 'slow';
}

export const NeonBeam: React.FC<NeonBeamProps> = ({ className = '' }) => {
  // Soft ambient radial glow to complement the background Tubes Cursor without visual clutter
  return (
    <div
      className={`pointer-events-none absolute select-none overflow-hidden blur-3xl opacity-20 -z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="w-[500px] h-[250px] bg-gradient-to-r from-emerald-500/20 via-green-400/20 to-transparent rounded-full" />
    </div>
  );
};
