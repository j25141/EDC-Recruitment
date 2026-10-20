import React, { useState } from 'react';
import { Home, Compass, Layers, Link as LinkIcon, Volume2, VolumeX, Check, ExternalLink } from 'lucide-react';

interface LeftDockProps {
  onCopySuccess: () => void;
}

export const LeftDock: React.FC<LeftDockProps> = ({ onCopySuccess }) => {
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    onCopySuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 p-2 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl shadow-2xl shadow-black/80">
      <a
        href="#home"
        aria-label="Home"
        className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all cursor-pointer group relative"
      >
        <Home className="h-4 w-4" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          Home
        </span>
      </a>

      <a
        href="#projects"
        aria-label="Projects & Ventures"
        className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all cursor-pointer group relative"
      >
        <Layers className="h-4 w-4" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          Ventures
        </span>
      </a>

      <a
        href="#automations"
        aria-label="Systems & Simulator"
        className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all cursor-pointer group relative"
      >
        <Compass className="h-4 w-4" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          Simulator
        </span>
      </a>

      <div className="w-4 h-[1px] bg-zinc-800 my-1" />

      {/* Copy Link to Portfolio */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy Link"
        className="p-2.5 rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/60 transition-all cursor-pointer group relative"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <LinkIcon className="h-4 w-4" />}
        <span className="absolute left-full ml-3 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          {copied ? 'Copied URL!' : 'Copy Link'}
        </span>
      </button>

      {/* Audio Ambient toggle */}
      <button
        type="button"
        onClick={() => setSoundEnabled(!soundEnabled)}
        aria-label="Toggle Sound"
        className="p-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-all cursor-pointer group relative"
      >
        {soundEnabled ? <Volume2 className="h-4 w-4 text-emerald-400" /> : <VolumeX className="h-4 w-4" />}
        <span className="absolute left-full ml-3 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          {soundEnabled ? 'Ambient Audio On' : 'Ambient Audio Off'}
        </span>
      </button>
    </aside>
  );
};
