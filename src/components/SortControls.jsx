import React from 'react';

const SORT_OPTIONS = [
  { value: 'pnl_asc', label: 'Least PNL' },
  { value: 'pnl_desc', label: 'Most PNL' },
  { value: 'rev_desc', label: 'Most Revenue' },
  { value: 'spend_desc', label: 'Most Spend' },
  { value: 'rev_asc', label: 'Least Revenue' },
  { value: 'spend_asc', label: 'Least Spend' },
  { value: 'az', label: 'A-Z' },
];

export function SortControls({ sortBy, setSortBy }) {
  return (
    <div className="flex flex-wrap items-center gap-0 mb-4 z-10 relative border border-white/10 rounded-sm w-fit overflow-hidden">
      {SORT_OPTIONS.map((option, index) => (
        <button
          key={option.value}
          onClick={() => setSortBy(option.value)}
          className={`px-4 py-1.5 text-xs font-semibold tracking-wider transition-colors border-r border-white/10 last:border-r-0 ${
            sortBy === option.value
              ? 'bg-white/10 text-white'
              : 'bg-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
