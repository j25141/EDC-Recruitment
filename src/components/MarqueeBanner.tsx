import React from 'react';

const MARQUEE_ITEMS = [
  '✦ 100M+ TRUSTED MEMBERS',
  '✦ 2.0M TONS CO₂ AVOIDED / YR',
  '✦ 21 INTERNATIONAL MARKETS',
  '✦ D.R.I.V.E. TRUST ARCHITECTURE',
  '✦ STANFORD COMPUTER SCIENCE',
  '✦ ENS ULM PHYSICS',
  '✦ EX-NASA AMES FELLOW',
  '✦ 1.9 PERSONS PER CAR (VS 1.3 EU AVG)',
  '✦ €600M+ ANNUAL TRAVELER SAVINGS',
  '✦ BLA / BLABLA / BLABLABLA',
  '✦ UNLOCKING EMPTY SEAT CAPACITY'
];

export const MarqueeBanner: React.FC = () => {
  return (
    <div className="w-full border-y border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md overflow-hidden py-3 relative select-none">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* Repeated twice for infinite loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <span
            key={idx}
            className="text-xs font-mono font-bold tracking-wider text-zinc-400 hover:text-emerald-400 transition-colors uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
