import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Quote, Sparkles, Play, Award, Compass, ArrowUpRight, Cpu } from 'lucide-react';
import { NeonBeam } from './NeonBeam';

const ROLES = [
  'Co-Founder & Exec Chairman @ BlaBlaCar',
  'Master of Science in CS @ Stanford',
  'Physics & Scientific Computing @ ENS Ulm',
  'Former Research Fellow @ NASA Ames',
  'Shared Mobility & Network Pioneer'
];

export const BentoHome: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 65);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 35);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative pt-28 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Signature Animated Flowing Neon Laser Beam */}
      <NeonBeam className="top-10 left-1/4 w-[850px] h-[320px]" />

      {/* Top Title Tag with subtle float animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-2 animate-float-slow">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>PORTFOLIO SHOWCASE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1 text-center">
          Frédéric Mazzella
        </h1>

        {/* Dynamic Typewriter text */}
        <div className="h-7 flex items-center justify-center mt-2 font-mono text-xs sm:text-sm text-emerald-400">
          <span>{displayText}</span>
          <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse" />
        </div>
      </motion.div>

      {/* Bento Grid layout with staggered entrance & interactive hover states */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Card 1: MINDSET (Span 4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -6 }}
          className="md:col-span-4 rounded-3xl border border-zinc-800/90 hover:border-emerald-500/40 bg-zinc-950/80 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all duration-300"
        >
          {/* Subtle cursor gradient hover */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono tracking-wider text-emerald-400 font-bold uppercase">
                MINDSET
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-4">
              <strong className="text-white">Excellence is a habit.</strong> Keen observation, operational discipline, and unwavering trust — principles I apply to every engineering and network challenge.
            </p>
          </div>

          {/* Photo container with zoom on hover */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-[4/3] bg-zinc-900 mt-2">
            <img
              src="/src/assets/images/hero_mazzella_portrait_1792515908692.jpg"
              alt="Frédéric Mazzella portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Founder & Physics Researcher</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Center Showcase / Media Card (Span 5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -6 }}
          className="md:col-span-5 rounded-3xl border border-zinc-800/90 hover:border-emerald-500/40 bg-zinc-950/80 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              TRANSIT ECOSYSTEM
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              100M+ MEMBERS
            </span>
          </div>

          {/* Interactive Media Container with glowing pulse */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-video bg-zinc-900 group/img">
            <img
              src="/src/assets/images/blablacar_journey_concept_1792515909674.jpg"
              alt="Shared road journeys across Europe"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
              <a
                href="#automations"
                className="h-12 w-12 rounded-full bg-emerald-400 hover:bg-emerald-300 text-zinc-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 transition-transform group-hover/img:scale-115 cursor-pointer"
                aria-label="Explore simulator"
              >
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </a>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-mono">
              Turning empty passenger capacity into Europe's largest mobility grid.
            </div>
          </div>

          {/* Subtext info */}
          <div className="pt-4 border-t border-zinc-800/80 mt-4 flex items-center justify-between text-xs text-zinc-400">
            <span>Stanford MS & INSEAD MBA</span>
            <a href="#projects" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 font-mono text-[11px]">
              <span>View Projects</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Card 3: Skills Pill Stack (Span 3 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -6 }}
          className="md:col-span-3 rounded-3xl border border-zinc-800/90 hover:border-emerald-500/40 bg-zinc-950/80 p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 group"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-4 flex items-center justify-between">
              <span>CORE DISCIPLINES</span>
              <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {['MARKETPLACES', 'P2P TRUST', 'NETWORK EFFECTS', 'ALGORITHMS', 'MULTI-MODAL', 'ESG MOBILITY'].map((tag, idx) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-semibold text-zinc-200 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 mt-6">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">D.R.I.V.E. FRAMEWORK</span>
            <span className="text-xs font-semibold text-white">Declared · Rated · Insured · Verified · Engaged</span>
          </div>
        </motion.div>

        {/* Card 4: Location Card with Animated Radar Ripple (Span 5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -6 }}
          className="md:col-span-5 rounded-3xl border border-zinc-800/90 hover:border-emerald-500/40 bg-zinc-950/80 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 group"
        >
          {/* Subtle stylized vector radar map with animated ripples */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* Concentric expanding ripples around Paris */}
            <div className="absolute top-[45%] left-[65%] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute h-16 w-16 -top-8 -left-8 rounded-full border border-emerald-400 animate-radar-ripple" />
              <span className="absolute h-32 w-32 -top-16 -left-16 rounded-full border border-emerald-400 animate-radar-ripple" style={{ animationDelay: '1s' }} />
              <span className="h-3 w-3 rounded-full bg-emerald-400 block shadow-lg shadow-emerald-400" />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                LOCATION
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              HQ & OPERATIONS
            </span>
          </div>

          <div className="relative z-10 my-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              PARIS, FRANCE
            </h3>
            <span className="text-sm font-mono text-emerald-400 block mt-1">
              48.8566° N, 2.3522° E
            </span>
          </div>

          <div className="relative z-10 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>21 Operating Countries</span>
            <span className="text-white">Europe & Latin America</span>
          </div>
        </motion.div>

        {/* Card 5: Quote Card (Span 7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ y: -6 }}
          className="md:col-span-7 rounded-3xl border border-zinc-800/90 hover:border-emerald-500/40 bg-zinc-950/80 p-8 flex flex-col justify-between shadow-2xl relative transition-all duration-300 group"
        >
          <div className="mb-4">
            <Quote className="h-10 w-10 text-emerald-400/30 mb-2 group-hover:text-emerald-400/60 transition-colors" />
            <blockquote className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
              "Build with purpose. Lead with vision. The value isn’t inventing a new engine; it’s unlocking the spare capacity all around us."
            </blockquote>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="text-white font-semibold">— Frédéric Mazzella</span>
            <span className="text-emerald-400">BlaBlaCar Co-Founder</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
