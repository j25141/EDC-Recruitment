import React, { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import { SOURCES_LIST } from '../data/showcaseData';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcesDisclosureModal: React.FC<SourcesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-400 uppercase mb-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Research Integrity & Transparency</span>
        </div>
        <h3 id="modal-title" className="text-2xl font-bold text-white mb-2">
          Verified Sources & AI Tools Disclosure
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 mb-6">
          Adhering strictly to EDC JSSUN evaluation criteria for factual verification, source provenance, and academic honesty.
        </p>

        {/* Section 1: Official Sources */}
        <div className="mb-8">
          <h4 className="text-sm font-mono uppercase tracking-wider text-zinc-300 font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-400" />
            <span>Primary Sources (Official BlaBlaCar Newsroom)</span>
          </h4>
          <div className="space-y-3">
            {SOURCES_LIST.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
              >
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {source.title}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-emerald-400 shrink-0" />
                </div>
                <div className="text-[11px] font-mono text-zinc-500 mb-1.5">
                  {source.domain}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {source.details}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Section 2: AI Tools Disclosure */}
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 mb-6">
          <h4 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2">
            Mandatory AI-Use Disclosure
          </h4>
          <p className="text-xs text-zinc-300 leading-relaxed mb-3">
            In compliance with recruitment guidelines: AI assistance was utilized to help organize research content, structure the visual timeline and venture comparisons, design the modern engineering portfolio interface in React and Tailwind CSS with Framer Motion, and format the comprehensive Viva preparation deck.
          </p>
          <div className="space-y-1.5 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>All historical dates (2003, 2006, 2018, 2024) cross-checked against official company archives.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Co-founder contributions (Francis Nappez & Nicolas Brusson) explicitly documented.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Company-reported impact figures clearly distinguished from external independent audits.</span>
            </div>
          </div>
        </div>

        {/* Footer action */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
          >
            Close & Return to Showcase
          </button>
        </div>
      </div>
    </div>
  );
};
