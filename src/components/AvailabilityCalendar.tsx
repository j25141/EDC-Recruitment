import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Check, ChevronLeft, ChevronRight, X, Sparkles, UserCheck } from 'lucide-react';
import { NeonBeam } from './NeonBeam';

const AVAILABLE_DAYS = [2, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30];

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

export const AvailabilityCalendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(22);
  const [selectedSlot, setSelectedSlot] = useState<string | null>('02:00 PM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;
    setBookingConfirmed(true);
  };

  return (
    <section id="availability" className="relative py-24 px-6 lg:px-8 max-w-7xl mx-auto border-b border-zinc-800/80">
      <NeonBeam className="top-10 left-1/4 w-[850px] h-[300px]" />

      {/* Header matching frame 00:06 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold">
            SCHEDULE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Availability & Viva Defense
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mt-2">
            Any questions about this entrepreneur showcase or technical architecture? Book a 30-minute evaluation session.
          </p>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OPEN FOR EVALUATION CALLS</span>
        </div>
      </div>

      {/* Main Calendar Card matching video 00:07 */}
      <div className="rounded-3xl border border-zinc-800/90 bg-zinc-950/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Month Title Strip */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-white font-mono">
              October 2026
            </h3>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
              30 min call
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 border border-zinc-800"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-zinc-400 py-4">
          <span>SUN</span>
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 py-2">
          {/* Offset for Thursday October 1st */}
          <div className="h-10 sm:h-14" />
          <div className="h-10 sm:h-14" />
          <div className="h-10 sm:h-14" />
          <div className="h-10 sm:h-14" />

          {/* Days 1 to 31 */}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const isAvailable = AVAILABLE_DAYS.includes(day);
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                type="button"
                onClick={() => isAvailable && setSelectedDay(day)}
                disabled={!isAvailable}
                className={`h-10 sm:h-14 rounded-2xl flex flex-col items-center justify-center font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-emerald-400 text-zinc-950 font-bold shadow-lg shadow-emerald-500/30 scale-105'
                    : isAvailable
                    ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-zinc-900/30 text-zinc-600 border border-zinc-900 cursor-not-allowed opacity-40'
                }`}
              >
                <span>{day}</span>
                {isAvailable && !isSelected && (
                  <span className="h-1 w-1 rounded-full bg-emerald-400 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Time Slot Picker for Selected Day */}
        {selectedDay && (
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                Available Times for October {selectedDay}, 2026:
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Timezone: UTC+3 / Local Evaluator Time
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 mb-6">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                    selectedSlot === slot
                      ? 'bg-emerald-400 text-zinc-950 border-emerald-400 font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {/* Quick Booking Form */}
            {!bookingConfirmed ? (
              <form onSubmit={handleBooking} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <input
                  type="text"
                  placeholder="Evaluator / Your Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-sans"
                />
                <input
                  type="email"
                  placeholder="Work / College Email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  required
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-sans"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold font-mono transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                >
                  Confirm 30m Slot
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>
                    Confirmed for <strong>October {selectedDay}, 2026 at {selectedSlot}</strong>. Invite queued for {guestEmail}!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(false)}
                  className="text-zinc-400 hover:text-white text-[11px] underline ml-4"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
