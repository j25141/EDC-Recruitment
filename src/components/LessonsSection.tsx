import React from 'react';
import { Target, Shield, Users2, Quote, ArrowRight, Code } from 'lucide-react';
import { LESSONS_DATA } from '../data/showcaseData';

export const LessonsSection: React.FC = () => {
  return (
    <section id="lessons" className="py-20 border-b border-zinc-800/80 bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-400 uppercase mb-2">
            <span>Foundational Insights</span>
            <span className="text-zinc-600">·</span>
            <span>Founder Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
            Entrepreneurial Lessons from Frédéric Mazzella
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl">
            Practical principles distilled from twenty years of building and scaling peer-to-peer networks across challenging international markets.
          </p>
        </div>

        {/* 3 Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {LESSONS_DATA.map((lesson, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Number & Tagline */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-extrabold text-emerald-400">
                    {lesson.number}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 uppercase">
                    Principle {idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {lesson.title}
                </h3>

                <p className="text-xs font-mono text-zinc-400 mb-4">
                  {lesson.tagline}
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {lesson.principle}
                </p>

                {/* Practical Takeaway Box */}
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/60 mb-6 text-xs">
                  <span className="font-mono font-semibold text-emerald-400 block mb-1">
                    How to Apply:
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {lesson.application}
                  </p>
                </div>
              </div>

              {/* Quote Block */}
              <div className="pt-4 border-t border-zinc-800/80">
                <blockquote className="text-xs italic text-zinc-400 flex items-start gap-2">
                  <Quote className="h-3.5 w-3.5 text-emerald-400/80 shrink-0 mt-0.5" />
                  <span>"{lesson.quote}"</span>
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Application for EDC Technical Team Aspirants */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 to-zinc-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase mb-2">
              <Code className="h-4 w-4" />
              <span>Takeaway for Student Engineers & Founders</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Don’t Build Solutions Looking for Problems
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              When building technical projects, start by verifying that real people suffer from the friction you're solving. Prioritize clear UX, robust trust guarantees, and modular, maintainable architecture over flashy tech stacks.
            </p>
          </div>

          <a
            href="#viva-rubric"
            className="px-5 py-3 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Review Viva Preparation Deck →
          </a>
        </div>
      </div>
    </section>
  );
};
