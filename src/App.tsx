import React, { useState } from 'react';
import { LeftDock } from './components/LeftDock';
import { AelradiNavbar } from './components/AelradiNavbar';
import { BentoHome } from './components/BentoHome';
import { MarqueeBanner } from './components/MarqueeBanner';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { AutomationsSection } from './components/AutomationsSection';
import { TechnicalSkillsSection } from './components/TechnicalSkillsSection';
import { TimelineSection } from './components/TimelineSection';
import { VenturesSection } from './components/VenturesSection';
import { ImpactSection } from './components/ImpactSection';
import { LessonsSection } from './components/LessonsSection';
import { AvailabilityCalendar } from './components/AvailabilityCalendar';
import { CertificatesSection } from './components/CertificatesSection';
import { VivaRubricSection } from './components/VivaRubricSection';
import { Footer } from './components/Footer';
import { SourcesDisclosureModal } from './components/SourcesDisclosureModal';
import { FloatingChatButton } from './components/FloatingChatButton';
import { AmbientBackground } from './components/AmbientBackground';
import { Check } from 'lucide-react';

export default function App() {
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopySuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      {/* Interactive Physics Ambient Network Canvas */}
      <AmbientBackground />

      {/* Floating Left Sidebar Dock matching video */}
      <LeftDock onCopySuccess={handleCopySuccess} />

      {/* Floating Centered Pill Navigation matching video */}
      <AelradiNavbar onOpenSources={() => setSourcesModalOpen(true)} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Bento Grid Home (Frame 00:00) */}
        <BentoHome />

        {/* Kinetic Horizontal Ticker */}
        <MarqueeBanner />

        {/* Featured Projects & Ventures (Frame 00:01) */}
        <ProjectsShowcase />

        {/* AI Automations & Interactive Simulator (Frames 00:02 - 00:04) */}
        <AutomationsSection />

        {/* Technical Skills Bento (Frame 00:05) */}
        <TechnicalSkillsSection />

        {/* Chronological 4-Milestone Journey */}
        <TimelineSection />

        {/* Deep Dive Enterprise Architecture */}
        <VenturesSection />

        {/* Quantified Impact & D.R.I.V.E. Trust Framework */}
        <ImpactSection />

        {/* Kinetic Horizontal Ticker 2 */}
        <MarqueeBanner />

        {/* Schedule & Availability Calendar (Frames 00:06 - 00:07) */}
        <AvailabilityCalendar />

        {/* Academic Credentials & Research Degrees (Frames 00:08 - 00:09) */}
        <CertificatesSection />

        {/* 3 Core Entrepreneurial Lessons */}
        <LessonsSection />

        {/* Viva Defense Deck & 100-Mark Rubric */}
        <VivaRubricSection />
      </main>

      {/* Footer */}
      <Footer onOpenSources={() => setSourcesModalOpen(true)} />

      {/* Floating Bottom-Right Glowing Circular Chat Button */}
      <FloatingChatButton />

      {/* Verified Sources & AI Tools Disclosure Modal */}
      <SourcesDisclosureModal
        isOpen={sourcesModalOpen}
        onClose={() => setSourcesModalOpen(false)}
      />

      {/* Copy Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs shadow-2xl backdrop-blur-md">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>Showcase link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
