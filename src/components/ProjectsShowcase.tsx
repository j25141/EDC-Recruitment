import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Trophy, Smartphone, Car, Train, Users, ArrowUpRight } from 'lucide-react';
import { NeonBeam } from './NeonBeam';

const PROJECTS_DATA = [
  {
    id: 'blablacar-unicorn',
    badge: 'UNICORN STATUS',
    index: '01',
    category: 'SHARING ECONOMY',
    title: 'BlaBlaCar Platform',
    subtitle: 'Global Long-Distance Carpooling & Multi-Modal Network',
    image: '/src/assets/images/blablacar_journey_concept_1792515909674.jpg',
    description: 'Connecting over 100 million members across 21 countries. Elevating private vehicle occupancy to 1.9 persons and saving 2M+ tons of CO2 annually.',
    tags: ['NextGen Mobility', 'Trust Architecture', 'Marketplaces'],
    url: 'https://www.blablacar.com'
  },
  {
    id: 'blablacar-daily',
    badge: 'INNOVATION LEADER',
    index: '02',
    category: 'COMMUTER WEB & MOBILE',
    title: 'BlaBlaCar Daily',
    subtitle: 'Suburban Commuter Carpooling & Corporate Subsidies',
    image: '/src/assets/images/hero_mazzella_portrait_1792515908692.jpg',
    description: 'Transforming daily home-to-work routines. Over 500+ corporate campus integrations subsidized by local French transport authorities and CEE certificates.',
    tags: ['Daily Commutes', 'Smart Routing', 'Municipal Transit'],
    url: 'https://www.blablacar-daily.com'
  },
  {
    id: 'multimodal-network',
    badge: '1ST PLACE',
    index: '03',
    category: 'TRANSIT INFRASTRUCTURE',
    title: 'Multi-Modal Rail & Bus Hub',
    subtitle: 'Integrated European Rail and Long-Distance Coaches',
    image: '/src/assets/images/sustainable_transit_network_1792515908688.jpg',
    description: 'Uniting high-speed train operators (Renfe, Iryo, Ouigo) with regional long-distance coaches (BlaBlaCar Bus) into a single unified booking platform.',
    tags: ['Multi-Modal API', 'Rail Booking', 'European Corridors'],
    url: 'https://newsroom.blablacar.com/news/blablacar-adds-train-booking-in-spain'
  },
  {
    id: 'covoiturage-mvp',
    badge: 'FOUNDING MVP',
    index: '04',
    category: 'HISTORICAL ORIGIN',
    title: 'Covoiturage.fr (2006)',
    subtitle: 'The Web 2.0 Genesis of Community Carpooling',
    image: '/src/assets/images/blablacar_journey_concept_1792515909674.jpg',
    description: 'The bootstrapped prototype that proved strangers would ride together if verified identities and transparent cost-sharing mechanisms were guaranteed.',
    tags: ['Pioneer MVP', 'Cold Start Solution', 'Paris-Vendée'],
    url: 'https://newsroom.blablacar.com/about-us/story'
  }
];

export const ProjectsShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = PROJECTS_DATA.filter((item) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'SHARING ECONOMY') return item.category.includes('SHARING') || item.category.includes('HISTORICAL');
    if (activeFilter === 'COMMUTER') return item.category.includes('COMMUTER');
    if (activeFilter === 'TRANSIT') return item.category.includes('TRANSIT');
    return true;
  });

  return (
    <section id="projects" className="relative py-24 px-6 lg:px-8 max-w-7xl mx-auto border-b border-zinc-800/80">
      {/* Animated Green Neon Laser Beam Ribbon */}
      <NeonBeam className="top-0 right-1/4 w-[750px] h-[280px]" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center mb-14"
      >
        <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-semibold">
          VENTURES & PLATFORMS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Featured Enterprises
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mt-2 font-mono">
          From bootstrapped carpool portal to Europe's preeminent multi-modal transit network.
        </p>

        {/* Filter Pills with animated pill indicator */}
        <div className="flex items-center gap-2 mt-6 p-1.5 rounded-full bg-zinc-950 border border-zinc-800">
          {['ALL', 'SHARING ECONOMY', 'COMMUTER', 'TRANSIT'].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`relative px-4 py-1.5 text-xs font-mono rounded-full transition-all cursor-pointer ${
                  isActive ? 'text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectFilterPill"
                    className="absolute inset-0 bg-emerald-400 rounded-full shadow-md shadow-emerald-500/20"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Projects Grid with Framer Motion cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((proj, idx) => (
            <motion.div
              layout
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group rounded-3xl border border-zinc-800/90 hover:border-emerald-500/50 bg-zinc-950/80 p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Top Badge with subtle float */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold animate-float-slow">
                    <Trophy className="h-3 w-3" />
                    <span>{proj.badge}</span>
                  </span>
                  <span className="font-mono text-xs text-zinc-500 font-semibold">
                    {proj.index} //
                  </span>
                </div>

                {/* Media Image Showcase with zoom */}
                <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-[16/10] bg-zinc-900 mb-5">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-108 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  <div className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-emerald-500/20">
                    {proj.category}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-3">
                    {proj.subtitle}
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Footer tags and link */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.slice(0, 2).map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-zinc-400 group-hover:text-emerald-400 group-hover:bg-zinc-800/80 transition-all group-hover:scale-110"
                  aria-label={`Open ${proj.title}`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
