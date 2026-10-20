import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';
import { VIVA_QUESTIONS } from '../data/showcaseData';

export const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'assistant' | 'user'; text: string }>>([
    {
      role: 'assistant',
      text: "Hello! I am your EDC Recruitment & Viva Defense companion for the Frédéric Mazzella showcase. Click any defense prompt below or ask me about the business model!"
    }
  ]);

  const handlePromptClick = (questionId: number) => {
    const q = VIVA_QUESTIONS.find((item) => item.id === questionId);
    if (!q) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: q.question },
      { role: 'assistant', text: `${q.answer}\n\nKey Defense Points:\n• ${q.keyPoints.join('\n• ')}` }
    ]);
  };

  return (
    <>
      {/* Floating Bottom-Right Pulse Button matching video */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Viva Assistant"
          className="relative h-14 w-14 rounded-full bg-emerald-400 hover:bg-emerald-300 text-zinc-950 flex items-center justify-center shadow-2xl shadow-emerald-500/50 transition-transform hover:scale-105 cursor-pointer"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping opacity-60 pointer-events-none" />
          {isOpen ? <X className="h-6 w-6 relative z-10" /> : <MessageSquare className="h-6 w-6 relative z-10" />}
        </button>
      </div>

      {/* Floating Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl backdrop-blur-xl flex flex-col max-h-[500px]">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Viva Defense Companion
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">EDC 2026 Ready</span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                  m.role === 'assistant'
                    ? 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 ml-4 font-medium'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="pt-3 border-t border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase">
              Quick Evaluator Questions:
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => handlePromptClick(1)}
                className="text-left text-[11px] p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800/80 transition-colors font-mono line-clamp-1"
              >
                1. Why Mazzella over Elon Musk?
              </button>
              <button
                type="button"
                onClick={() => handlePromptClick(2)}
                className="text-left text-[11px] p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800/80 transition-colors font-mono line-clamp-1"
              >
                2. What is the Empty Seats insight?
              </button>
              <button
                type="button"
                onClick={() => handlePromptClick(4)}
                className="text-left text-[11px] p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800/80 transition-colors font-mono line-clamp-1"
              >
                3. How does D.R.I.V.E. establish trust?
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
