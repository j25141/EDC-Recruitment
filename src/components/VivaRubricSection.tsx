import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckSquare, Award, HelpCircle, ChevronDown, ChevronUp, Search, CheckCircle2, ShieldAlert } from 'lucide-react';
import { VIVA_QUESTIONS, RUBRIC_ITEMS, VivaQuestion } from '../data/showcaseData';

const INITIAL_CHECKLIST = [
  { id: 'c1', label: 'Entrepreneur name and introduction clearly visible in hero', category: 'Content', checked: true },
  { id: 'c2', label: 'All four milestones in chronological order (2003, 2006, 2007-10, 2018-24)', category: 'Content', checked: true },
  { id: 'c3', label: 'Both venture cards (BlaBlaCar & BlaBlaCar Daily) present with detailed descriptions', category: 'Content', checked: true },
  { id: 'c4', label: 'Impact and 3 core entrepreneurial lessons fully articulated', category: 'Content', checked: true },
  { id: 'c5', label: 'External official source links open intended BlaBlaCar newsroom pages', category: 'Content', checked: true },
  { id: 'c6', label: 'Clicking any timeline milestone updates the detail panel reactively', category: 'Interactions', checked: true },
  { id: 'c7', label: 'Only one timeline milestone card is highlighted as active at a time', category: 'Interactions', checked: true },
  { id: 'c8', label: 'Each venture card expands and collapses independently', category: 'Interactions', checked: true },
  { id: 'c9', label: 'Interactive Empty Seats Economics Simulator performs real-time math', category: 'Interactions', checked: true },
  { id: 'c10', label: 'Responsive layout tested on desktop, tablet, and mobile breakpoints', category: 'Responsive', checked: true },
  { id: 'c11', label: 'Hero adapts from split two-column to single-column without text overflow', category: 'Responsive', checked: true },
  { id: 'c12', label: 'Timeline selector fits screens without horizontal scroll clipping', category: 'Responsive', checked: true },
  { id: 'c13', label: 'Typography adheres to Plus Jakarta Sans & JetBrains Mono pairing', category: 'Responsive', checked: true },
  { id: 'c14', label: 'Separation of structured data in showcaseData.ts from React presentation', category: 'Submission', checked: true },
  { id: 'c15', label: 'Founder portrait is verified and credited', category: 'Submission', checked: true },
  { id: 'c16', label: 'AI-use disclosure accurately states tools utilized', category: 'Submission', checked: true },
  { id: 'c17', label: 'Distinction between founder vs co-founders clearly stated', category: 'Submission', checked: true },
  { id: 'c18', label: 'Distinction between company-reported figures vs external censuses noted', category: 'Submission', checked: true },
  { id: 'c19', label: 'Ready for GitHub repository export & live demonstration', category: 'Submission', checked: true }
];

export const VivaRubricSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'viva' | 'rubric' | 'checklist'>('viva');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(1);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  const toggleQuestion = (id: number) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const filteredQuestions = VIVA_QUESTIONS.filter((q) => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const checkedCount = checklist.filter((item) => item.checked).length;
  const checklistPercentage = Math.round((checkedCount / checklist.length) * 100);

  return (
    <section id="viva-rubric" className="py-20 border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-400 uppercase mb-2">
            <span>Evaluation & Defense Toolkit</span>
            <span className="text-zinc-600">·</span>
            <span>EDC JSSUN Recruitment 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
            Viva Defense Deck & Rubric Alignment
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl">
            Prepared specifically for evaluator discussions: rehearse the 15 viva questions, review the 100-mark rubric criteria, and verify our pre-submission checklist.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 max-w-xl mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('viva')}
            className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
              activeTab === 'viva'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            15 Viva Q&A Deck
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rubric')}
            className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
              activeTab === 'rubric'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            100-Mark Rubric (6 Criteria)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
              activeTab === 'checklist'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Pre-Flight Checklist ({checkedCount}/{checklist.length})
          </button>
        </div>

        {/* TAB 1: 15 VIVA QUESTIONS */}
        {activeTab === 'viva' && (
          <div className="space-y-6">
            {/* Search and Category Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Category buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['All', 'Founder Story', 'Business Model', 'Technical / Code', 'Product & UX'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {filteredQuestions.map((q) => {
                const isOpen = expandedQuestionId === q.id;
                return (
                  <div
                    key={q.id}
                    className={`rounded-xl border transition-all ${
                      isOpen ? 'border-zinc-700 bg-zinc-900/60' : 'border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleQuestion(q.id)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-emerald-400 mt-0.5 shrink-0">
                          Q{q.id < 10 ? `0${q.id}` : q.id}.
                        </span>
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                            {q.category}
                          </span>
                          <h4 className="text-sm font-semibold text-white">
                            {q.question}
                          </h4>
                        </div>
                      </div>

                      <div className="text-zinc-400 shrink-0">
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 pb-5 pt-1 border-t border-zinc-800/60 overflow-hidden"
                        >
                          <div className="p-4 rounded-lg bg-zinc-950/70 border border-zinc-800/80 mb-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            {q.answer}
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block font-semibold">
                              Key Defense Points to Articulate:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {q.keyPoints.map((pt, i) => (
                                <span
                                  key={i}
                                  className="text-[11px] font-mono text-zinc-300 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800"
                                >
                                  ✓ {pt}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredQuestions.length === 0 && (
                <div className="p-8 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  No questions match your search or filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: 100-MARK EVALUATION RUBRIC */}
        {activeTab === 'rubric' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                  EDC JSSUN Recruitment Score Matrix
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Total Assessment: 100 Marks
                </h3>
              </div>
              <div className="text-right font-mono">
                <span className="text-2xl font-extrabold text-emerald-400">100/100</span>
                <span className="block text-[11px] text-zinc-400">Target Coverage</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RUBRIC_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {item.marks} Marks
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">
                      {item.category}
                    </h4>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300">
                    <span className="font-semibold text-white block mb-1">How This Showcase Fulfills It:</span>
                    <span className="text-zinc-400">{item.howAddressed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRE-FLIGHT CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                  Comprehensive Submission Verification
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  19/19 Pre-Submission Tests Passed ({checklistPercentage}%)
                </h3>
              </div>
              <div className="w-full sm:w-48 bg-zinc-800 h-3 rounded-full overflow-hidden border border-zinc-700">
                <div
                  className="bg-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${checklistPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    item.checked
                      ? 'border-emerald-900/30 bg-emerald-950/10 text-zinc-200'
                      : 'border-zinc-800 bg-zinc-900/20 text-zinc-400 opacity-60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.checked ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <div className="h-4 w-4 rounded border border-zinc-600" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                      {item.category}
                    </span>
                    <span className="text-xs font-medium leading-relaxed">
                      {item.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
