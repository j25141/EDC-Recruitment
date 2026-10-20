import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Play, CheckCircle2, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import { NeonBeam } from './NeonBeam';
import { SimulatorSection } from './SimulatorSection';

const INITIAL_LOGS = [
  '[22:06:40] INIT blablacar-router v4.8 :: Corridor matching daemon active',
  '[22:06:41] GEO_QUERY: Origin [48.8566, 2.3522] (Paris) -> Dest [45.7640, 4.8357] (Lyon)',
  '[22:06:41] DETOUR_FILTER: Driver max detour set to <= 12 min (Highway A6 Interchange)',
  '[22:06:42] TRUST_CHECK: Driver ID #884920 [D.R.I.V.E. Rating: 4.96/5.0, 142 completed trips]',
  '[22:06:42] SEAT_ALLOC: 2 empty seats allocated -> Passenger [Alex] & [Camille]',
  '[22:06:43] COST_SHARE: Fuel €46.20 + Toll €38.00 = €84.20 -> €28.06 / traveler [Non-commercial compliance: PASS]',
  '[22:06:44] ESG_TELEMETRY: Carbon avoidance recorded -> -54.2 kg CO2 :: Status: 200 OK'
];

const STREAM_CORRIDORS = [
  { from: 'Paris', to: 'Vendée', km: 420, co2: '53.5 kg', driver: '#92104' },
  { from: 'Madrid', to: 'Barcelona', km: 620, co2: '79.1 kg', driver: '#31448' },
  { from: 'Lyon', to: 'Marseille', km: 315, co2: '40.2 kg', driver: '#65109' },
  { from: 'London', to: 'Manchester', km: 335, co2: '42.7 kg', driver: '#19032' },
  { from: 'Brussels', to: 'Amsterdam', km: 210, co2: '26.8 kg', driver: '#88219' }
];

export const AutomationsSection: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);
  const [streamIndex, setStreamIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Automatic real-time log stream ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const corridor = STREAM_CORRIDORS[streamIndex % STREAM_CORRIDORS.length];
      const newEntry = `[${now}] MATCH_LIVE: [${corridor.from} -> ${corridor.to}] Driver ${corridor.driver} :: Occupancy 3/4 :: -${corridor.co2} CO₂ :: 200 OK`;

      setLogs((prev) => [...prev.slice(1), newEntry]);
      setStreamIndex((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, [streamIndex]);

  const triggerManualEvent = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const now = new Date().toLocaleTimeString();
      const manualEntry = `[${now}] HIGHWAY_DISPATCH: Paris-Vendée (Holiday Surge) :: 4 Seats Filled :: D.R.I.V.E. Confirmed :: -64.2 kg CO2`;
      setLogs((prev) => [...prev.slice(1), manualEntry]);
      setIsSimulating(false);
    }, 400);
  };

  return (
    <section id="automations" className="relative py-24 px-6 lg:px-8 max-w-7xl mx-auto border-b border-zinc-800/80">
      {/* Animated Green Neon Laser Beam */}
      <NeonBeam className="top-12 left-1/3 w-[950px] h-[350px]" />

      {/* Section Header matching video 00:03 */}
      <div className="flex flex-col items-center justify-center text-center mb-14 relative z-10">
        <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
          ENTERPRISE MATCHING SYSTEMS
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 text-balance">
          Automated Route & Trust Systems
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-4 leading-relaxed font-sans">
          Production matching algorithms built for real-world mobility operations — geospatial corridor pairing, automated D.R.I.V.E. identity verification, and non-commercial cost reconciliation at scale.
        </p>
      </div>

      {/* Terminal View with live pulsing badge */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden mb-16 relative group hover:border-emerald-500/40 transition-colors">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-900/70 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-zinc-300 font-semibold">blablacar-corridor-pipeline — live daemon</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>STREAMING ACTIVE</span>
            </div>
            <button
              type="button"
              onClick={triggerManualEvent}
              disabled={isSimulating}
              className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg transition-all cursor-pointer font-mono"
            >
              <RefreshCw className={`h-3 w-3 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Injecting event...' : 'Inject Surge Match'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 font-mono text-xs text-zinc-300 space-y-2 overflow-x-auto bg-black/95">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-emerald-400 select-none font-bold">$</span>
              <span className={log.includes('PASS') || log.includes('MATCH_LIVE') || log.includes('SURGE') ? 'text-emerald-300' : 'text-zinc-300'}>
                {log}
              </span>
            </div>
          ))}
          {/* Blinking cursor */}
          <div className="flex items-center gap-2 pt-1 text-emerald-400">
            <span className="select-none">$</span>
            <span className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Embedded Empty Seats Economics Simulator */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-2 sm:p-4 hover:border-zinc-700 transition-colors">
        <SimulatorSection />
      </div>
    </section>
  );
};
