import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Odometer, formatMoney } from './Odometer';

const CompanyRow = memo(({ company, maxScale }) => {
  const spendWidth = Math.min((company.currentSpend / maxScale) * 100, 100);
  const revWidth = Math.min((company.currentRev / maxScale) * 100, 100);
  
  const isPositivePnl = company.currentPnl >= 0;
  const pnlColorClass = isPositivePnl ? 'text-[var(--color-revenue-green)]' : 'text-[var(--color-spend-red)]';

  // Absolute dollars for since page load
  const pnlSinceLoadDollars = company.pnlSinceLoad * 1_000_000_000;
  
  // Format the since load text depending on whether it's profit or loss
  const sinceLoadText = isPositivePnl ? 'earned since page open' : 'lost since page open';
  
  // Just use the first letter as a logo placeholder
  const initial = company.name.charAt(0);
  
  // Custom colors for initials to look somewhat like logos
  const getLogoColor = (id) => {
    const colors = {
      amazon: 'bg-orange-500',
      alphabet: 'bg-blue-500',
      microsoft: 'bg-blue-400',
      meta: 'bg-blue-600',
      oracle: 'bg-red-600',
      openai: 'bg-emerald-500',
      anthropic: 'bg-amber-600',
      xai: 'bg-neutral-800 border border-neutral-600',
      mistral: 'bg-orange-400',
      cohere: 'bg-stone-500',
      deepseek: 'bg-blue-300',
      nvidia: 'bg-[var(--color-revenue-green)]'
    };
    return colors[id] || 'bg-slate-600';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="grid grid-cols-12 gap-4 items-center py-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
    >
      {/* Column 1: Company Info (3 cols) */}
      <div className="col-span-12 md:col-span-3 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${getLogoColor(company.id)}`}>
          {initial}
        </div>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight tracking-wide">{company.name}</h3>
          <p className="text-slate-500 text-xs font-mono mt-0.5">{company.subtext}</p>
        </div>
      </div>

      {/* Column 2: Data Bars (7 cols) */}
      <div className="col-span-12 md:col-span-7 flex flex-col gap-2.5">
        {/* Spend */}
        <div className="flex items-center gap-4 group/bar">
          <div className="flex-1 h-3 bg-white/5 rounded-r-full overflow-hidden shadow-inner backdrop-blur-sm border border-white/5 border-l-0">
            <motion.div 
              className="h-full rounded-r-full bg-gradient-to-r from-[var(--color-spend-red)]/50 via-[var(--color-spend-red)]/90 to-[var(--color-spend-red)] shadow-[0_0_12px_rgba(255,87,74,0.6)] relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${spendWidth}%` }}
              transition={{ duration: 0.5 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 w-[200%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          </div>
          <div className="w-16 text-right transition-transform group-hover/bar:scale-110">
            <Odometer value={company.currentSpend} decimals={0} className="text-[var(--color-spend-red)] text-sm font-bold drop-shadow-md" />
          </div>
        </div>
        
        {/* Revenue */}
        <div className="flex items-center gap-4 group/bar">
          <div className="flex-1 h-3 bg-white/5 rounded-r-full overflow-hidden shadow-inner backdrop-blur-sm border border-white/5 border-l-0">
            <motion.div 
              className="h-full rounded-r-full bg-gradient-to-r from-[var(--color-revenue-green)]/50 via-[var(--color-revenue-green)]/90 to-[var(--color-revenue-green)] shadow-[0_0_12px_rgba(46,204,113,0.6)] relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${revWidth}%` }}
              transition={{ duration: 0.5 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 w-[200%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          </div>
          <div className="w-16 text-right transition-transform group-hover/bar:scale-110">
            <Odometer value={company.currentRev} decimals={0} className="text-[var(--color-revenue-green)] text-sm font-bold drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Column 3: PnL (2 cols) */}
      <div className="col-span-12 md:col-span-2 text-right">
        <div className={`text-2xl font-bold tracking-tight mb-1 ${pnlColorClass}`}>
          {isPositivePnl ? '+' : ''}
          <Odometer value={company.currentPnl} decimals={1} className={pnlColorClass} />
        </div>
        <div className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase leading-tight">
          {sinceLoadText}<br/>
          <span className={pnlColorClass}>
            {pnlSinceLoadDollars < 0 ? '-' : '+'}${Math.abs(pnlSinceLoadDollars).toLocaleString('en-US', {maximumFractionDigits: 0})}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

CompanyRow.displayName = 'CompanyRow';
export { CompanyRow };
