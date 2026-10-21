import React from 'react';
import { ArrowDown, Sparkles, ExternalLink, Award, BookOpen, Layers } from 'lucide-react';
import { IMPACT_METRICS } from '../data/showcaseData';

export const Hero: React.FC = () => {
  return (
    <section id="overview" className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-zinc-800/80">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Split-Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-400 uppercase mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>EDC JSSUN Recruitment 2026 · Founder Case Study</span>
            </div>

            {/* Main Title with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance mb-6">
              Frédéric Mazzella
              <span className="block text-zinc-400 text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
                Turning Empty Seats into Opportunity.
              </span>
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-6">
              Stranded in Paris on Christmas Eve 2003 with fully booked trains, Frédéric Mazzella looked out onto the highway and noticed millions of drivers traveling alone with empty seats. That simple observation became{' '}
              <span className="text-white font-medium">BlaBlaCar</span>—a global shared mobility platform connecting over{' '}
              <span className="text-emerald-400 font-semibold">100 million members</span> across 21 countries.
            </p>

            {/* Background & Credentials */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-zinc-400 mb-8 border-y border-zinc-800/70 py-3 font-mono">
              <span>École Normale Supérieure</span>
              <span className="text-zinc-600">·</span>
              <span>Stanford Univ. (MS)</span>
              <span className="text-zinc-600">·</span>
              <span>INSEAD MBA</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400">Ex-NASA Researcher</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#journey"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-lg shadow-emerald-500/15"
              >
                <span>Explore the Journey</span>
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#simulator"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
              >
                <Layers className="h-4 w-4 text-emerald-400" />
                <span>Economics Simulator</span>
              </a>
              <a
                href="#viva-rubric"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>Viva & Rubric Deck</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Container (High-Res Founder Portrait) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 shadow-2xl">
              {/* Portrait Image */}
              <div className="aspect-square relative overflow-hidden bg-zinc-950">
                <img
                  src="./assets/images/hero_mazzella_portrait_1792515908692.jpg"
                  alt="Portrait of Frédéric Mazzella, co-founder of BlaBlaCar"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                />
                {/* Measured Scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              </div>

              {/* Bottom Quote & Bio Badge */}
              <div className="p-6 bg-zinc-900/90 border-t border-zinc-800">
                <blockquote className="text-sm italic text-zinc-200 mb-3 leading-relaxed">
                  "The opportunity wasn't manufacturing another car or train line; it was unlocking the massive spare capacity already rolling on our roads."
                </blockquote>
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                  <span className="font-semibold text-white">Co-Founder & Executive Chairman</span>
                  <span className="font-mono text-emerald-400">BlaBlaCar · BlaBlaCar Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Metrics Strip (Below the Hero Split) */}
        <div className="mt-16 pt-12 border-t border-zinc-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {IMPACT_METRICS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums text-emerald-400 mb-1">
                  {item.metric}
                </div>
                <div className="text-sm font-semibold text-zinc-200 mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-zinc-400 leading-normal">
                  {item.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
