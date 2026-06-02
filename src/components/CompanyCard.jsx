import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Odometer } from './Odometer';

const CompanyCard = memo(({ company, isHighestSpender, isHighestProfit, maxScale }) => {
  // Normalize bar widths
  const spendWidth = Math.min((company.currentSpend / maxScale) * 100, 100);
  const revWidth = Math.min((company.currentRev / maxScale) * 100, 100);

  const borderClass = isHighestSpender
    ? 'border-[var(--color-steel-azure)] shadow-[0_0_20px_rgba(0,80,157,0.5)]'
    : isHighestProfit
    ? 'border-[var(--color-pure-gold)] shadow-[0_0_20px_rgba(255,213,0,0.3)]'
    : 'border-white/10 hover:border-white/30';

  const pnlClass = company.currentPnl >= 0
    ? 'text-[var(--color-pure-gold)] drop-shadow-[0_0_8px_rgba(255,213,0,0.8)]'
    : 'text-slate-100 drop-shadow-[0_0_8px_rgba(0,63,136,0.8)]';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`bg-white/5 backdrop-blur-md rounded-2xl p-5 border ${borderClass} transition-colors duration-300 flex flex-col h-full`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold tracking-wide">{company.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">PnL</div>
          <Odometer value={company.currentPnl} className={`text-lg font-bold ${pnlClass}`} />
        </div>
      </div>

      <div className="space-y-4 mt-auto">
        {/* Spend Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 uppercase tracking-wider">Spend</span>
            <Odometer value={company.currentSpend} className="text-slate-300" />
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--color-steel-azure)] shadow-[0_0_10px_rgba(0,80,157,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${spendWidth}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Revenue Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 uppercase tracking-wider">Revenue</span>
            <Odometer value={company.currentRev} className="text-[var(--color-pure-gold)]" />
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--color-pure-gold)] shadow-[0_0_10px_rgba(255,213,0,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${revWidth}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

CompanyCard.displayName = 'CompanyCard';
export { CompanyCard };
