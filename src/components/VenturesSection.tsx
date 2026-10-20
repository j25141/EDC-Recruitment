import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink, Users, Car, Zap, Building2, Shield, Network, ArrowRight } from 'lucide-react';
import { VENTURES_DATA, Venture } from '../data/showcaseData';

export const VenturesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('blablacar-main');

  const toggleVenture = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="ventures" className="py-20 border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-400 uppercase mb-2">
            <span>Enterprise & Ecosystem</span>
            <span className="text-zinc-600">·</span>
            <span>2 Connected Ventures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
            Ventures & Business Architecture
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl">
            Exploring the two flagship platforms engineered to solve distinct mobility paradigms: long-distance intercity travel and daily commuter carpooling.
          </p>
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
          {VENTURES_DATA.map((venture) => {
            const isExpanded = expandedId === venture.id;
            return (
              <div
                key={venture.id}
                className={`rounded-2xl border transition-all duration-300 bg-zinc-900/40 overflow-hidden ${
                  isExpanded ? 'border-zinc-700 shadow-xl shadow-black/40' : 'border-zinc-800/80 hover:border-zinc-700/80'
                }`}
              >
                {/* Header Strip */}
                <div className="p-6 sm:p-7 border-b border-zinc-800/70">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                      {venture.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Launched {venture.launchYear}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {venture.name}
                  </h3>

                  <p className="text-sm font-medium text-zinc-300 mb-4">
                    {venture.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {venture.description}
                  </p>
                </div>

                {/* Founder Connection Callout */}
                <div className="px-6 sm:px-7 py-4 bg-zinc-950/50 border-b border-zinc-800/60 text-xs text-zinc-300 flex items-start gap-3">
                  <Shield className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Mazzella's Connection: </span>
                    <span>{venture.founderRole}</span>
                    <div className="mt-1 text-zinc-500 font-mono text-[11px]">
                      Co-Founders: {venture.coFounders.join(' · ')}
                    </div>
                  </div>
                </div>

                {/* Quick Highlights */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Key Performance Attributes
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {venture.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expand / Collapse Trigger */}
                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => toggleVenture(venture.id)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Full Architecture' : 'Deep Dive Architecture & Business Model'}</span>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </motion.div>
                    </button>

                    <a
                      href={venture.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Expandable Deep Dive Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-zinc-800 bg-zinc-950/70 p-6 sm:p-7 space-y-6 overflow-hidden"
                    >
                      {/* Value Proposition Matrix */}
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-3">
                          Quad-Pillar Value Proposition
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/50">
                            <span className="font-semibold text-white block mb-1">Driver Value:</span>
                            <span className="text-zinc-400 leading-relaxed">{venture.businessModel.driver}</span>
                          </div>
                          <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/50">
                            <span className="font-semibold text-white block mb-1">Passenger Value:</span>
                            <span className="text-zinc-400 leading-relaxed">{venture.businessModel.passenger}</span>
                          </div>
                          <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/50">
                            <span className="font-semibold text-white block mb-1">Platform Model:</span>
                            <span className="text-zinc-400 leading-relaxed">{venture.businessModel.platform}</span>
                          </div>
                          <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/50">
                            <span className="font-semibold text-white block mb-1">Community & Eco:</span>
                            <span className="text-zinc-400 leading-relaxed">{venture.businessModel.community}</span>
                          </div>
                        </div>
                      </div>

                      {/* Operational Lifecycle */}
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                          Operational Journey Lifecycle
                        </div>
                        <div className="space-y-2 text-xs">
                          {venture.operationalSteps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-2.5 rounded-md bg-zinc-900/30 border border-zinc-800/50">
                              <span className="font-mono text-emerald-400 font-bold shrink-0">0{idx + 1}.</span>
                              <span className="text-zinc-300 leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Network Effect Dynamics */}
                      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                        <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase font-semibold mb-1.5">
                          <Network className="h-4 w-4" />
                          <span>Network Effect Mechanism</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {venture.networkEffectNote}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Comparative Strategic Analysis Box */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <Building2 className="h-4 w-4" />
            <span>Strategic Synthesis</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Why Diversification into Daily Commutes Matters
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed mb-6 max-w-3xl">
            Long-distance carpooling (BlaBlaCar) and daily commuter carpooling (BlaBlaCar Daily) operate under completely different user behaviors, frequencies, and subsidy mechanisms:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40">
              <span className="font-mono text-emerald-400 font-bold block mb-1.5">1. Trip Frequency</span>
              <p className="text-zinc-400 leading-relaxed">
                Intercity carpooling occurs 1–2 times per month for leisure/holiday trips; BlaBlaCar Daily occurs 8–10 times weekly during morning and evening rush hours.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40">
              <span className="font-mono text-emerald-400 font-bold block mb-1.5">2. Monetization & Subsidies</span>
              <p className="text-zinc-400 leading-relaxed">
                Intercity passengers pay per ride through a non-commercial shared pot; Daily rides are heavily subsidized by local transportation authorities (AOM) and corporate carbon offset programs.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40">
              <span className="font-mono text-emerald-400 font-bold block mb-1.5">3. Route Detour Tolerance</span>
              <p className="text-zinc-400 leading-relaxed">
                Intercity drivers tolerate a 15–30 minute pickup detour along major highway junctions; commuters demand pinpoint matching within 3–5 minutes of their daily trajectory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
