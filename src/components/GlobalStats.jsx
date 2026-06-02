import React from 'react';
import { Odometer } from './Odometer';

export function GlobalStats({ spend, rev, spentSinceLoad }) {
  // Convert billions to absolute dollars for the "since page load" tracker
  const spentSinceLoadDollars = spentSinceLoad * 1_000_000_000;

  return (
    <div className="w-full mb-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-6 uppercase tracking-tighter">
            Is AI<br />Profitable ?
          </h1>
          <p className="text-slate-400 uppercase tracking-widest text-sm md:text-base font-semibold">
            Tracking the spend and revenue of frontier AI companies (May 2026).
          </p>
        </div>
        <div className="mt-8 md:mt-0 text-left md:text-right">
          <h2 className="text-7xl md:text-9xl font-black text-[var(--color-spend-red)] leading-none mb-4 uppercase tracking-tighter">
            NO.
          </h2>
          <p className="text-slate-400 uppercase tracking-widest text-sm md:text-base font-semibold">
            Everyone's broke.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/10 pb-8">
        <div>
          <div className="text-3xl md:text-4xl font-bold text-[var(--color-spend-red)] mb-2 tracking-tight">
            <Odometer value={spend} decimals={1} />
          </div>
          <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">
            Total Industry CapEx
          </div>
        </div>

        <div>
          <div className="text-3xl md:text-4xl font-bold text-[var(--color-revenue-green)] mb-2 tracking-tight">
            <Odometer value={rev} decimals={1} />
          </div>
          <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">
            Total Industry Revenue
          </div>
        </div>

        <div>
          <div className="text-3xl md:text-4xl font-bold text-cyan-500 mb-2 tracking-tight flex items-baseline">
            <Odometer value={spentSinceLoadDollars} decimals={0} suffix="" />
          </div>
          <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">
            $ in CapEx since page load
          </div>
        </div>
      </div>
    </div>
  );
}
