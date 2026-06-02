import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Odometer, formatMoney } from './Odometer';

// Chevron SVG icon component
function ChevronIcon({ isOpen }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="text-slate-400 group-hover:text-white transition-colors"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

// External link icon for the verify button
function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block ml-2 -mt-0.5"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// Quarterly mini-bar chart for the expanded panel
function QuarterlyChart({ quarters }) {
  if (!quarters || quarters.length === 0) return null;

  // Find max value across all quarters for scaling
  const maxVal = Math.max(...quarters.flatMap(q => [q.spend, q.rev]));

  return (
    <div className="grid grid-cols-4 gap-3">
      {quarters.map((q, i) => {
        const spendHeight = maxVal > 0 ? (q.spend / maxVal) * 100 : 0;
        const revHeight = maxVal > 0 ? (q.rev / maxVal) * 100 : 0;

        return (
          <div key={i} className="flex flex-col items-center">
            {/* Bar area */}
            <div className="flex items-end gap-1 h-20 w-full justify-center mb-2">
              {/* Spend bar */}
              <motion.div
                className="w-5 rounded-t-sm bg-[var(--color-spend-red)] relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(spendHeight, 4)}%` }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
              </motion.div>
              {/* Revenue bar */}
              <motion.div
                className="w-5 rounded-t-sm bg-[var(--color-revenue-green)] relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(revHeight, 4)}%` }}
                transition={{ duration: 0.5, delay: i * 0.08 + 0.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
              </motion.div>
            </div>

            {/* Values */}
            <div className="text-[10px] font-mono text-[var(--color-spend-red)] leading-tight">
              ${q.spend.toFixed(1)}B
            </div>
            <div className="text-[10px] font-mono text-[var(--color-revenue-green)] leading-tight">
              ${q.rev.toFixed(1)}B
            </div>

            {/* Quarter label */}
            <div className="text-[10px] text-slate-500 font-mono mt-1 tracking-tight whitespace-nowrap">
              {q.label}
            </div>

            {/* Estimated badge */}
            {q.est && (
              <div className="text-[8px] text-amber-500/60 font-mono uppercase tracking-widest mt-0.5">
                Est.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const CompanyRow = memo(({ company, maxScale }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const spendWidth = Math.min((company.currentSpend / maxScale) * 100, 100);
  const revWidth = Math.min((company.currentRev / maxScale) * 100, 100);

  const isPositivePnl = company.currentPnl >= 0;
  const pnlColorClass = isPositivePnl ? 'text-[#ffd500] drop-shadow-[0_0_8px_rgba(255,213,0,0.8)]' : 'text-[var(--color-spend-red)]';

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
    <div className="border-b border-white/5">
      {/* Row Header — always visible, clickable */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => setIsExpanded(prev => !prev)}
        className="grid grid-cols-12 gap-4 items-center py-5 hover:bg-white/[0.03] transition-colors group cursor-pointer"
      >
        {/* Column 1: Company Info (3 cols) */}
        <div className="col-span-12 md:col-span-3 flex items-center gap-3">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="w-10 h-10 object-contain drop-shadow-md rounded-md" />
          ) : (
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${getLogoColor(company.id)}`}>
              {initial}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg leading-tight tracking-wide">{company.name}</h3>
            <p className="text-slate-500 text-xs font-mono mt-0.5 line-clamp-2 break-words max-w-[250px]">
              {company.baselineYear ? `Full AI Capital Expenditure est. since ${company.baselineYear}` : company.subtext}
            </p>
          </div>
          {/* Chevron — visible on mobile next to company name */}
          <div className="md:hidden flex items-center">
            <ChevronIcon isOpen={isExpanded} />
          </div>
        </div>

        {/* Column 2: Data Bars (7 cols) */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-2.5">
          {/* CapEx */}
          <div className="flex items-center gap-4 group/bar">
            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-white/5">
              <motion.div
                className="h-full rounded-full bg-[var(--color-spend-red)] shadow-[0_0_20px_rgba(255,87,74,0.9)] relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${spendWidth}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="w-16 text-right transition-transform group-hover/bar:scale-110">
              <Odometer value={company.currentSpend} decimals={0} className="text-[var(--color-spend-red)] text-sm font-bold drop-shadow-[0_0_8px_rgba(255,87,74,0.6)]" />
            </div>
          </div>

          {/* Revenue */}
          <div className="flex items-center gap-4 group/bar">
            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-white/5">
              <motion.div
                className="h-full rounded-full bg-[var(--color-revenue-green)] shadow-[0_0_20px_rgba(46,204,113,0.9)] relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${revWidth}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="w-16 text-right transition-transform group-hover/bar:scale-110">
              <Odometer value={company.currentRev} decimals={0} className="text-[var(--color-revenue-green)] text-sm font-bold drop-shadow-[0_0_8px_rgba(46,204,113,0.6)]" />
            </div>
          </div>
        </div>

        {/* Column 3: PnL + Chevron (2 cols) */}
        <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-3">
          <div className="text-right">
            <div className={`text-2xl font-bold tracking-tight mb-1 ${pnlColorClass}`}>
              {isPositivePnl ? '+' : ''}
              <Odometer value={company.currentPnl} decimals={1} className={pnlColorClass} />
            </div>
            <div className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase leading-tight">
              <span className={isPositivePnl ? 'text-[#ffd500]' : ''}>{sinceLoadText}</span><br/>
              <span className={pnlColorClass}>
                {pnlSinceLoadDollars < 0 ? '-' : '+'}${Math.abs(pnlSinceLoadDollars).toLocaleString('en-US', {maximumFractionDigits: 0})}
              </span>
            </div>
          </div>
          {/* Desktop chevron */}
          <div className="hidden md:flex items-center">
            <ChevronIcon isOpen={isExpanded} />
          </div>
        </div>
      </motion.div>

      {/* Expanded Panel — animated accordion */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="expanded-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-2 px-2 md:px-4">
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  {/* Left: Quarterly Performance */}
                  <div className="flex-1 w-full md:w-2/3">
                    <h4 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-steel-azure)]" />
                      Trailing 4 Quarters
                    </h4>
                    <QuarterlyChart quarters={company.quarters} />

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[var(--color-spend-red)]" />
                        CapEx
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[var(--color-revenue-green)]" />
                        Revenue
                      </span>
                    </div>
                  </div>

                  {/* Right: Verify Source + Summary */}
                  <div className="w-full md:w-1/3 flex flex-col gap-4">
                    {/* Quick Summary Card */}
                    <div className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">
                        Cumulative Snapshot
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Total CapEx</span>
                          <span className="text-xs font-mono text-[var(--color-spend-red)] font-bold">
                            {formatMoney(company.currentSpend, 1)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Total Revenue</span>
                          <span className="text-xs font-mono text-[var(--color-revenue-green)] font-bold">
                            {formatMoney(company.currentRev, 1)}
                          </span>
                        </div>
                        <div className="border-t border-white/5 pt-2 flex justify-between items-center">
                          <span className="text-xs text-slate-400 font-bold">Net PnL</span>
                          <span className={`text-xs font-mono font-bold ${pnlColorClass}`}>
                            {isPositivePnl ? '+' : ''}{formatMoney(company.currentPnl, 1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Verify Source Button */}
                    <a
                      href={company.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg
                        bg-[#00509d] hover:bg-[#003f7f] text-white font-semibold text-sm
                        transition-all duration-200 shadow-lg shadow-[#00509d]/20
                        hover:shadow-[#00509d]/40 hover:scale-[1.02] active:scale-[0.98]
                        border border-[#00509d]/50"
                    >
                      Verify Source Data (PDF)
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

CompanyRow.displayName = 'CompanyRow';
export { CompanyRow };
