import React, { useState, useId } from 'react';
import { motion } from 'motion/react';
import { Car, Fuel, Leaf, Users, Euro, Sparkles, RefreshCw, CheckCircle } from 'lucide-react';

interface RoutePreset {
  name: string;
  distance: number;
  tollRate: number;
  description: string;
}

const PRESETS: RoutePreset[] = [
  {
    name: 'Paris → Vendée (The 2003 Spark)',
    distance: 420,
    tollRate: 32,
    description: 'The exact route Mazzella attempted to take on Christmas Eve when trains sold out.'
  },
  {
    name: 'Paris → Lyon (Premier Corridor)',
    distance: 465,
    tollRate: 38,
    description: 'One of BlaBlaCar’s highest liquidity long-distance highway routes.'
  },
  {
    name: 'Madrid → Barcelona (Spain Expansion)',
    distance: 620,
    tollRate: 42,
    description: 'Major international market corridor connecting Spain’s two largest metropolises.'
  },
  {
    name: 'Suburban Commute (BlaBlaCar Daily)',
    distance: 35,
    tollRate: 0,
    description: 'Typical daily home-to-office round trip with localized employer incentives.'
  }
];

export const SimulatorSection: React.FC = () => {
  const [distance, setDistance] = useState<number>(420);
  const [passengers, setPassengers] = useState<number>(2);
  const [fuelPrice, setFuelPrice] = useState<number>(1.85); // €/L
  const [consumption, setConsumption] = useState<number>(6.5); // L/100km
  const [tollCost, setTollCost] = useState<number>(32);

  const distSliderId = useId();
  const passSliderId = useId();
  const fuelSliderId = useId();
  const consSliderId = useId();

  // Calculations
  const fuelCostTotal = (distance / 100) * consumption * fuelPrice;
  const totalTripCost = fuelCostTotal + tollCost;

  // Under BlaBlaCar non-commercial model:
  // Total cost is divided fairly among all travelers (Driver + N passengers)
  const totalOccupants = 1 + passengers;
  const costPerPerson = totalTripCost / totalOccupants;
  const passengerContributionTotal = costPerPerson * passengers;
  const driverNetCost = totalTripCost - passengerContributionTotal;
  const driverSavingsPercent = Math.round((passengerContributionTotal / totalTripCost) * 100);

  // Carbon savings: Baseline solo driving emits ~150g CO2/km per car.
  // Each passenger sharing a car avoids placing an additional vehicle on the highway.
  // Net CO2 saved = passengers * (distance * 0.150 kg CO2/km) * 0.85 (adjustment factor for added passenger weight)
  const co2AvoidedKg = Math.round(passengers * (distance * 0.15) * 0.85);

  const applyPreset = (preset: RoutePreset) => {
    setDistance(preset.distance);
    setTollCost(preset.tollRate);
  };

  return (
    <section id="simulator" className="py-20 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-400 uppercase mb-2">
            <span>Interactive Model</span>
            <span className="text-zinc-600">·</span>
            <span>Economics & CO₂ Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
            The Empty Seats Economics Simulator
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl">
            Test the core mathematical thesis behind BlaBlaCar: how distributing fuel and toll expenses across empty seats drastically reduces out-of-pocket costs and prevents tons of carbon emissions.
          </p>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-zinc-400 mr-2">Presets:</span>
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                distance === preset.distance
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Main Grid: Controls + Visual Cabin + Output Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-7 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-zinc-800 pb-3">
              <span>Trip Parameters</span>
              <span className="text-xs font-mono text-zinc-400 font-normal">Non-commercial sharing</span>
            </h3>

            {/* Distance Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <label htmlFor={distSliderId} className="font-semibold text-zinc-300">Route Distance</label>
                <span className="font-mono text-emerald-400 font-bold">{distance} km</span>
              </div>
              <input
                id={distSliderId}
                type="range"
                min="20"
                max="800"
                step="10"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                <span>20 km (Commute)</span>
                <span>400 km</span>
                <span>800 km (Cross-country)</span>
              </div>
            </div>

            {/* Passengers Selector (Seats Shared) */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <label htmlFor={passSliderId} className="font-semibold text-zinc-300">Empty Seats Shared</label>
                <span className="font-mono text-emerald-400 font-bold">{passengers} passenger{passengers > 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPassengers(num)}
                    className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      passengers === num
                        ? 'bg-emerald-400 text-zinc-950 border-emerald-400'
                        : 'bg-zinc-950/70 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {num === 0 ? 'Solo (0)' : `+${num} Seat${num > 1 ? 's' : ''}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel Price & Consumption Dual Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <label htmlFor={fuelSliderId} className="text-zinc-300">Fuel Price</label>
                  <span className="font-mono text-zinc-200">€{fuelPrice.toFixed(2)}/L</span>
                </div>
                <input
                  id={fuelSliderId}
                  type="range"
                  min="1.40"
                  max="2.50"
                  step="0.05"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <label htmlFor={consSliderId} className="text-zinc-300">Efficiency</label>
                  <span className="font-mono text-zinc-200">{consumption} L/100km</span>
                </div>
                <input
                  id={consSliderId}
                  type="range"
                  min="4.5"
                  max="9.5"
                  step="0.5"
                  value={consumption}
                  onChange={(e) => setConsumption(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Estimated Tolls */}
            <div className="flex items-center justify-between text-xs text-zinc-300 pt-2 border-t border-zinc-800/80">
              <span>Highway Tolls (Estimated)</span>
              <span className="font-mono text-white font-semibold">€{tollCost.toFixed(2)}</span>
            </div>
          </div>

          {/* Visual Cabin & Results Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Results Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <span className="text-xs text-zinc-400 block mb-1 font-mono">Driver Net Cost</span>
                <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                  €{driverNetCost.toFixed(2)}
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  {driverSavingsPercent}% saved vs solo (€{totalTripCost.toFixed(2)})
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <span className="text-xs text-zinc-400 block mb-1 font-mono">Fare Per Passenger</span>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
                  {passengers === 0 ? 'N/A' : `€${costPerPerson.toFixed(2)}`}
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  {passengers > 0 ? 'Exact fair cost share' : 'No seats shared'}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-900/30 bg-emerald-950/20">
                <span className="text-xs text-emerald-300 block mb-1 font-mono">Carbon Avoided</span>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
                  {co2AvoidedKg} kg
                </div>
                <div className="text-xs text-zinc-300 mt-1">
                  CO₂ prevented this trip
                </div>
              </div>
            </div>

            {/* Interactive Car Cabin Diagram */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Vehicle Occupancy Visualizer ({totalOccupants}/4 Seats)
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  {passengers === 0 ? 'Solo Commuter' : `${passengers} Passenger(s) Picked Up`}
                </div>
              </div>

              {/* 4 Seat Vehicle Graphic */}
              <div className="max-w-md mx-auto p-6 rounded-xl bg-zinc-950 border border-zinc-800/80 shadow-inner">
                {/* Car Windshield Header */}
                <div className="w-full h-8 rounded-t-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-6">
                  ▲ Direction of Travel ▲
                </div>

                {/* Front Row: Driver + Passenger 1 */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Seat 1: Driver */}
                  <div className="p-4 rounded-xl border border-emerald-500/50 bg-emerald-950/30 flex flex-col items-center text-center">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-2 font-mono font-bold text-xs">
                      DRV
                    </div>
                    <span className="text-xs font-bold text-white">Driver</span>
                    <span className="text-[11px] font-mono text-emerald-400 mt-1">Pays €{driverNetCost.toFixed(1)}</span>
                  </div>

                  {/* Seat 2: Passenger 1 */}
                  <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                    passengers >= 1
                      ? 'border-emerald-500/50 bg-emerald-950/30'
                      : 'border-zinc-800 bg-zinc-900/20 opacity-40'
                  }`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-mono font-bold text-xs mb-2 ${
                      passengers >= 1
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {passengers >= 1 ? 'P1' : 'EMPTY'}
                    </div>
                    <span className="text-xs font-bold text-white">
                      {passengers >= 1 ? 'Passenger 1' : 'Empty Seat'}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 mt-1">
                      {passengers >= 1 ? `Pays €${costPerPerson.toFixed(1)}` : 'Wasted Capacity'}
                    </span>
                  </div>
                </div>

                {/* Back Row: Passenger 2 + Passenger 3 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Seat 3: Passenger 2 */}
                  <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                    passengers >= 2
                      ? 'border-emerald-500/50 bg-emerald-950/30'
                      : 'border-zinc-800 bg-zinc-900/20 opacity-40'
                  }`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-mono font-bold text-xs mb-2 ${
                      passengers >= 2
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {passengers >= 2 ? 'P2' : 'EMPTY'}
                    </div>
                    <span className="text-xs font-bold text-white">
                      {passengers >= 2 ? 'Passenger 2' : 'Empty Seat'}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 mt-1">
                      {passengers >= 2 ? `Pays €${costPerPerson.toFixed(1)}` : 'Wasted Capacity'}
                    </span>
                  </div>

                  {/* Seat 4: Passenger 3 */}
                  <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                    passengers >= 3
                      ? 'border-emerald-500/50 bg-emerald-950/30'
                      : 'border-zinc-800 bg-zinc-900/20 opacity-40'
                  }`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-mono font-bold text-xs mb-2 ${
                      passengers >= 3
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {passengers >= 3 ? 'P3' : 'EMPTY'}
                    </div>
                    <span className="text-xs font-bold text-white">
                      {passengers >= 3 ? 'Passenger 3' : 'Empty Seat'}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 mt-1">
                      {passengers >= 3 ? `Pays €${costPerPerson.toFixed(1)}` : 'Wasted Capacity'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Economic Takeaway Note */}
              <p className="text-xs text-zinc-400 text-center mt-4">
                Under the strict French & European legal framework for ridesharing, drivers are prohibited from turning a commercial profit. All contributions are capped to cover strictly real fuel and toll costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
