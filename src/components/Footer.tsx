import React from 'react';
import { ArrowUp, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSources: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSources }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-base font-bold text-white mb-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                FM
              </div>
              <span>Frédéric Mazzella — Entrepreneur Showcase</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              Prepared for EDC JSSUN Technical Team Recruitment 2026. Dissecting the entrepreneurial journey, shared mobility business models, and peer-to-peer trust architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#journey" className="hover:text-white transition-colors">Journey</a>
            <a href="#ventures" className="hover:text-white transition-colors">Ventures</a>
            <a href="#simulator" className="hover:text-white transition-colors">Simulator</a>
            <a href="#impact" className="hover:text-white transition-colors">Impact</a>
            <a href="#lessons" className="hover:text-white transition-colors">Lessons</a>
            <a href="#viva-rubric" className="hover:text-white transition-colors">Viva & Rubric</a>
            <button
              onClick={onOpenSources}
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
            >
              Sources & AI Note
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            <span>© 2026 Interactive Entrepreneur Showcase · Built with React, Tailwind CSS & Framer Motion</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-zinc-400">EDC JSSUN Recruitment Task</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span className="text-[11px] font-mono">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
