import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenSources: () => void;
  onOpenViva: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSources, onOpenViva }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#overview"
          className="flex items-center gap-2.5 text-base font-bold tracking-tight text-zinc-100 hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
            FM
          </div>
          <span>Frédéric Mazzella</span>
        </a>

        {/* Zone 2: Nav Links (Clean, concise single-line text links) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a
            href="#journey"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Journey
          </a>
          <a
            href="#ventures"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Ventures
          </a>
          <a
            href="#simulator"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Simulator
          </a>
          <a
            href="#impact"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Impact
          </a>
          <a
            href="#lessons"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Lessons
          </a>
          <a
            href="#viva-rubric"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Viva & Rubric
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSources}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Sources & AI Note</span>
          </button>
          <a
            href="#simulator"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Try Economics Model</span>
          </a>
        </div>
      </div>
    </header>
  );
};
