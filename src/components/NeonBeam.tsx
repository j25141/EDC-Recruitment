import React from 'react';

interface NeonBeamProps {
  className?: string;
  speed?: 'normal' | 'fast' | 'slow';
}

export const NeonBeam: React.FC<NeonBeamProps> = ({ className = '', speed = 'normal' }) => {
  return (
    <div className={`pointer-events-none absolute select-none overflow-hidden ${className}`} aria-hidden="true">
      <svg
        className="w-full h-full opacity-90 animate-beam-glow"
        viewBox="0 0 1400 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#glow)">
          {/* Main fast flowing laser beam */}
          <path
            d="M -150 180 C 250 50, 480 320, 880 110 C 1080 10, 1280 230, 1550 140"
            stroke="url(#laserGreen)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="500 300"
            className="animate-flow-laser"
          />
          {/* Secondary harmonic laser pulse */}
          <path
            d="M -50 210 C 350 280, 680 90, 1020 240 C 1180 300, 1340 120, 1500 190"
            stroke="url(#laserEmerald)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="350 200"
            style={{ animation: 'flowLaser 5s linear infinite reverse' }}
          />
          {/* Ultra-fine bright white core beam */}
          <path
            d="M -150 180 C 250 50, 480 320, 880 110 C 1080 10, 1280 230, 1550 140"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="180 600"
            className="animate-flow-laser"
          />
        </g>
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="laserGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="20%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#86efac" stopOpacity="1" />
            <stop offset="80%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="laserEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0" />
            <stop offset="30%" stopColor="#4ade80" stopOpacity="1" />
            <stop offset="70%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
