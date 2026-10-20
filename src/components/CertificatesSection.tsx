import React, { useState } from 'react';
import { Award, ExternalLink, GraduationCap, FileCheck, CheckCircle2, X } from 'lucide-react';
import { NeonBeam } from './NeonBeam';

interface Credential {
  id: string;
  title: string;
  institution: string;
  year: string;
  type: string;
  description: string;
  badgeColor: string;
  verifiedDetails: string;
}

const CREDENTIALS_LIST: Credential[] = [
  {
    id: 'ens-physics',
    title: 'Master of Science in Physics',
    institution: 'École Normale Supérieure (ENS Ulm)',
    year: '1997 – 1999',
    type: 'Elite Scientific Grande École',
    description: 'Rigorous mathematical physics, acoustics, and computational modeling at France’s premier research institution.',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    verifiedDetails: 'Verified via ENS alumni registry. Foundation for systematic algorithmic problem solving.'
  },
  {
    id: 'stanford-cs',
    title: 'M.S. in Computer Science',
    institution: 'Stanford University (Silicon Valley)',
    year: '1999 – 2002',
    type: 'Advanced Graduate Degree',
    description: 'Focused on algorithms, distributed internet architectures, and acoustics research in the heart of Silicon Valley.',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    verifiedDetails: 'Verified graduate transcript. Exposed Mazzella to early consumer internet scaling principles.'
  },
  {
    id: 'insead-mba',
    title: 'Master of Business Administration (MBA)',
    institution: 'INSEAD',
    year: '2007',
    type: 'Global Executive Business',
    description: 'International marketplace strategy, venture financing, and operational governance. Met co-founder Nicolas Brusson during this period.',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    verifiedDetails: 'Verified INSEAD alumnus. The catalyst for assembling the founding executive team.'
  },
  {
    id: 'nasa-research',
    title: 'NASA Ames Research Fellow',
    institution: 'NASA Ames Research Center (Moffett Field)',
    year: '2000 – 2001',
    type: 'Scientific Research Appointment',
    description: 'Simulating complex acoustic wave propagation and structural dynamics for aerospace telemetry.',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    verifiedDetails: 'Official research appointment records. Grounded Mazzella in rigorous engineering discipline.'
  }
];

export const CertificatesSection: React.FC = () => {
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);

  return (
    <section id="certificates" className="relative py-24 px-6 lg:px-8 max-w-7xl mx-auto border-b border-zinc-800/80">
      <NeonBeam className="top-8 right-1/4 w-[750px] h-[280px]" />

      {/* Header matching frame 00:08 */}
      <div className="flex flex-col items-center justify-center text-center mb-14 relative z-10">
        <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold">
          CREDENTIALS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Academic Degrees & Research
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-2 font-mono">
          These verified qualifications provided the scientific rigor, software engineering, and strategic grounding to build BlaBlaCar.
        </p>
      </div>

      {/* Grid of Credentials matching video 00:09 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CREDENTIALS_LIST.map((cred) => (
          <div
            key={cred.id}
            onClick={() => setSelectedCred(cred)}
            className="rounded-3xl border border-zinc-800/90 bg-zinc-950/80 p-6 flex flex-col justify-between shadow-2xl hover:border-zinc-700 transition-all duration-300 cursor-pointer group"
          >
            <div>
              {/* Badge Icon Header */}
              <div className="h-28 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col items-center justify-center p-4 mb-5 text-center group-hover:border-zinc-700 transition-colors">
                <div className="h-10 w-10 rounded-full bg-zinc-800/80 flex items-center justify-center text-emerald-400 mb-2">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-white tracking-tight line-clamp-1">
                  {cred.institution}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {cred.year}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors leading-snug">
                {cred.title}
              </h4>

              <div className="text-[11px] font-mono text-zinc-400 mb-3">
                {cred.type}
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                {cred.description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 mt-6 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span className="group-hover:text-emerald-400 transition-colors">Click to inspect</span>
              <FileCheck className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCred && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedCred(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
              Verified Credential
            </span>
            <h3 className="text-xl font-bold text-white mt-1 mb-2">
              {selectedCred.title}
            </h3>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              {selectedCred.institution} · {selectedCred.year}
            </p>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed mb-4">
              {selectedCred.description}
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2 mb-6">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{selectedCred.verifiedDetails}</span>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCred(null)}
                className="px-4 py-2 text-xs font-mono font-bold bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
