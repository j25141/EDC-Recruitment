import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenSources: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'automations', label: 'AUTOMATIONS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'services', label: 'SERVICES' },
  { id: 'availability', label: 'AVAILABILITY' },
  { id: 'certificates', label: 'CERTIFICATES' },
  { id: 'viva-rubric', label: 'VIVA / RUBRIC' }
];

export const AelradiNavbar: React.FC<NavbarProps> = ({ onOpenSources }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_ITEMS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Floating Centered Pill Container */}
      <nav
        aria-label="Portfolio Sections"
        className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-zinc-950/80 border border-zinc-800/90 backdrop-blur-xl shadow-2xl shadow-black/80 max-w-full overflow-x-auto scrollbar-none"
      >
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-xs font-mono tracking-wider font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbarActivePill"
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Brand / Short label on tablet & mobile */}
        <div className="flex lg:hidden items-center justify-between w-full min-w-[280px] px-3 py-1">
          <span className="font-mono text-xs font-bold text-white tracking-wider">
            FRÉDÉRIC MAZZELLA
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSources}
              className="text-[11px] font-mono text-emerald-400 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20"
            >
              Sources
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-4 right-4 bg-zinc-950/95 border border-zinc-800 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-2 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`text-left px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-colors ${
                activeSection === item.id
                  ? 'bg-zinc-800 text-white font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSources();
            }}
            className="text-left px-4 py-2.5 rounded-xl font-mono text-xs text-emerald-400 hover:bg-zinc-900 transition-colors flex items-center gap-2"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>SOURCES & AI DISCLOSURE</span>
          </button>
        </div>
      )}
    </header>
  );
};
