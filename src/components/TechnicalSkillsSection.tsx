import React from 'react';
import { Code2, Cpu, Globe, Database, Network, ShieldCheck, Map, Layers, Radio, Workflow } from 'lucide-react';
import { NeonBeam } from './NeonBeam';

interface SkillItem {
  name: string;
  category: string;
  desc: string;
}

const SKILL_COLUMNS = [
  {
    title: 'CORE PLATFORM & ARCHITECTURE',
    skills: [
      { name: 'Python / Geospatial', desc: 'Geospatial routing & ETA engines' },
      { name: 'Distributed Systems', desc: 'Fault-tolerant cross-border APIs' },
      { name: 'Relational & SQL DBs', desc: 'High-concurrency booking schemas' },
      { name: 'REST / GraphQL', desc: 'Multi-modal transit synchronization' }
    ]
  },
  {
    title: 'ROUTING & ALGORITHMIC NETWORKS',
    skills: [
      { name: 'Corridor Seeding', desc: 'Highway junction matching algorithms' },
      { name: 'Detour Optimization', desc: 'Sub-15 min passenger pickup algorithms' },
      { name: 'CEE / Subsidies API', desc: 'Automated municipal transport validation' },
      { name: 'Multi-Modal Brokers', desc: 'Rail + Bus timetable integration' }
    ]
  },
  {
    title: 'P2P TRUST & GOVERNANCE',
    skills: [
      { name: 'D.R.I.V.E. Framework', desc: 'Bilateral double-blind rating logic' },
      { name: 'Identity Verification', desc: 'Government ID & biometric validation' },
      { name: 'Non-Commercial Cap', desc: 'Strict regulatory fuel-cost limits' },
      { name: 'Anti-Fraud Engines', desc: 'Ride cancellation prevention guards' }
    ]
  }
];

export const TechnicalSkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 px-6 lg:px-8 max-w-7xl mx-auto border-b border-zinc-800/80">
      {/* Neon Beam Accent */}
      <NeonBeam className="top-6 left-1/4 w-[750px] h-[280px]" />

      {/* Header matching frame 00:05 */}
      <div className="flex flex-col items-center justify-center text-center mb-14 relative z-10">
        <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold">
          COMPETENCIES
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          TECHNICAL SKILLS & ARCHITECTURE
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mt-2 font-mono">
          Engineering capabilities underpinning massive collaborative marketplaces.
        </p>
      </div>

      {/* Bento Grid matching frame 00:05 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SKILL_COLUMNS.map((col, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-zinc-800/90 bg-zinc-950/80 p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-zinc-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
                <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                  {col.title}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-4">
                {col.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between group-hover:border-zinc-700/80 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                        {skill.desc}
                      </p>
                    </div>
                    <div className="h-7 w-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-mono shrink-0 ml-3">
                      ✓
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400">
              Verified in production across 21 countries.
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
