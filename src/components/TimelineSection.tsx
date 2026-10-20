import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, AlertCircle, Lightbulb, Compass, Calendar } from 'lucide-react';
import { MILESTONES_DATA, Milestone } from '../data/showcaseData';

export const TimelineSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(MILESTONES_DATA[0].id);
  const activeMilestone = MILESTONES_DATA.find((m) => m.id === activeId) || MILESTONES_DATA[0];

  return (
    <section id="journey" className="py-20 border-b border-zinc-800/80 bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-400 uppercase mb-2">
            <span>Milestones & Timeline</span>
            <span className="text-zinc-600">·</span>
            <span>4 Chronological Phases</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
            The Entrepreneurial Journey
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl">
            How Frédéric Mazzella transformed a personal frustration on a winter highway into an international platform. Explore the four foundational milestones below.
          </p>
        </div>

        {/* 4 Milestone Selector Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" role="tablist" aria-label="Milestone Timeline">
          {MILESTONES_DATA.map((milestone, idx) => {
            const isActive = milestone.id === activeId;
            return (
              <button
                key={milestone.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`milestone-panel-${milestone.id}`}
                onClick={() => setActiveId(milestone.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 relative group cursor-pointer ${
                  isActive
                    ? 'border-emerald-500/60 bg-zinc-900 shadow-lg shadow-emerald-500/5'
                    : 'border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                {/* Active Indicator Top Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTimelineGlow"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-t-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`font-mono text-sm font-bold ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`}>
                    {milestone.year}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    {milestone.phase}
                  </span>
                </div>

                <h3 className={`text-sm font-semibold mb-2 line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                  {milestone.title}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {milestone.short}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Deep-Dive Panel */}
        <div
          id={`milestone-panel-${activeMilestone.id}`}
          role="tabpanel"
          aria-live="polite"
          className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Deep Dive Narrative */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                      Year {activeMilestone.year}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Phase: {activeMilestone.phase}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                    {activeMilestone.title}
                  </h3>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                    {activeMilestone.detail}
                  </p>

                  {/* Problem vs Opportunity Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl border border-rose-900/30 bg-rose-950/15">
                      <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase font-mono mb-1.5">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>The Problem Identified</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {activeMilestone.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-900/30 bg-emerald-950/15">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase font-mono mb-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>The Solution Engineered</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {activeMilestone.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Takeaway */}
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 flex items-start gap-3 mb-6">
                    <Lightbulb className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-1">
                        Entrepreneurial Insight
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {activeMilestone.takeaway}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Source Citation */}
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono text-zinc-500">Verified via Official Archives</span>
                  <a
                    href={activeMilestone.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    <span>{activeMilestone.sourceLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Concept Image & Flow */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="rounded-xl overflow-hidden border border-zinc-800 relative aspect-video sm:aspect-[4/3] bg-zinc-950">
                  <img
                    src="/src/assets/images/blablacar_journey_concept_1792515909674.jpg"
                    alt="Atmospheric European highway at dusk representing BlaBlaCar journeys"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-xs text-zinc-200">
                    <span className="font-mono text-emerald-400 uppercase text-[11px] block">Field Observation</span>
                    Connecting intercity corridors by filling empty vehicle capacity.
                  </div>
                </div>

                {/* Narrative step breakdown */}
                <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 text-xs text-zinc-400 space-y-2">
                  <div className="font-mono text-zinc-300 font-semibold uppercase text-[11px]">
                    Chronological Logic
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Observation (2003) → MVP (2006) → Trio Scale (2007-10) → Multi-Modal (2018-24)</span>
                  </div>
                  <p className="text-zinc-500 leading-normal">
                    This step-by-step evolution showcases how an organic insight matured into a robust, venture-backed enterprise without compromising its non-commercial cost-sharing ethos.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
