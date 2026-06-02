import React, { useState, useMemo } from 'react';
import { useSimulationEngine } from './hooks/useSimulationEngine';
import { GlobalStats } from './components/GlobalStats';
import { SortControls } from './components/SortControls';
import { CompanyRow } from './components/CompanyRow';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { companies, globalSpend, globalRev, globalPnl, globalSpentSinceLoad } = useSimulationEngine();
  const [sortBy, setSortBy] = useState('pnl_asc');

  const sortedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => {
      switch (sortBy) {
        case 'pnl_desc': return b.currentPnl - a.currentPnl;
        case 'pnl_asc': return a.currentPnl - b.currentPnl;
        case 'spend_desc': return b.currentSpend - a.currentSpend;
        case 'spend_asc': return a.currentSpend - b.currentSpend;
        case 'rev_desc': return b.currentRev - a.currentRev;
        case 'rev_asc': return a.currentRev - b.currentRev;
        case 'az': return a.name.localeCompare(b.name);
        default: return a.currentPnl - b.currentPnl;
      }
    });
  }, [companies, sortBy]);

  // Find max values for visual bars scaling
  const maxSpend = useMemo(() => Math.max(...companies.map(c => c.currentSpend)), [companies]);
  const maxRev = useMemo(() => Math.max(...companies.map(c => c.currentRev)), [companies]);
  const maxScale = Math.max(maxSpend, maxRev);

  // Generate some stars for the background
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
    }));
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-[var(--color-spend-red)] selection:text-white pb-20">
      {/* Background Celestial Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-20 animate-starlight"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `-${Math.random() * 20}s`,
            }}
          />
        ))}
        {/* Subtle radial gradients for celestial feel */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-spend-red)]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-revenue-green)]/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 pt-0 pb-12 relative z-10 max-w-7xl">
        <GlobalStats spend={globalSpend} rev={globalRev} spentSinceLoad={globalSpentSinceLoad} />
        
        <div className="mt-4">
          <SortControls sortBy={sortBy} setSortBy={setSortBy} />

          {/* List Headers */}
          <div className="grid grid-cols-12 gap-4 items-center pb-2 border-b border-white/10 text-[10px] text-slate-500 font-mono tracking-widest uppercase font-bold mt-2">
            <div className="col-span-12 md:col-span-3">Company</div>
            <div className="col-span-12 md:col-span-7 flex items-center">
              <span className="text-[var(--color-spend-red)] mr-2">• TOTAL SPEND ON AI</span>
              <span className="text-[var(--color-revenue-green)]">• TOTAL REVENUE FROM AI</span>
            </div>
            <div className="col-span-12 md:col-span-2 text-right">Cumulative PNL</div>
          </div>

          {/* Company List */}
          <div className="flex flex-col">
            <AnimatePresence>
              {sortedCompanies.map(company => (
                <CompanyRow 
                  key={company.id} 
                  company={company} 
                  maxScale={maxScale}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
