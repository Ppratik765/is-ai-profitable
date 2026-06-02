import { useState, useEffect } from 'react';

// Base data as of May 2026 (in Billions)
export const INITIAL_COMPANIES = [
  { id: 'amazon', name: 'Amazon', subtext: 'Full AI capex est. since 2022', spend: 313, rev: 22, pnl: -291, burn: 12 },
  { id: 'alphabet', name: 'Alphabet (Google)', subtext: 'Full AI capex est. since 2022', spend: 287, rev: 25, pnl: -262, burn: 11 },
  { id: 'microsoft', name: 'Microsoft', subtext: 'Full AI capex est. since 2022', spend: 266, rev: 31, pnl: -235, burn: 10 },
  { id: 'meta', name: 'Meta', subtext: 'Full AI capex est. since 2022', spend: 230, rev: 3, pnl: -227, burn: 9.5 },
  { id: 'oracle', name: 'Oracle', subtext: 'Cumulative est. since 2023', spend: 57, rev: 18, pnl: -39, burn: 1.6 },
  { id: 'openai', name: 'OpenAI', subtext: 'Cumulative est. since 2020', spend: 55, rev: 28, pnl: -27, burn: 1.1 },
  { id: 'anthropic', name: 'Anthropic', subtext: 'Cumulative est. since 2021', spend: 33, rev: 6.5, pnl: -26.5, burn: 1.1 },
  { id: 'xai', name: 'xAI', subtext: 'Cumulative est. since 2023', spend: 20, rev: 0.8, pnl: -19.2, burn: 0.8 },
  { id: 'mistral', name: 'Mistral AI', subtext: 'Cumulative est. since 2023', spend: 1, rev: 0.4, pnl: -0.6, burn: 0.02 },
  { id: 'cohere', name: 'Cohere AI', subtext: 'Cumulative est. since 2020', spend: 0.7, rev: 0.4, pnl: -0.3, burn: 0.01 },
  { id: 'deepseek', name: 'DeepSeek', subtext: 'Cumulative est. since 2023', spend: 0.3, rev: 0.1, pnl: -0.2, burn: 0.01 },
  { id: 'nvidia', name: 'Nvidia', subtext: 'Cumulative est. since 2023', spend: 225, rev: 478, pnl: 253, burn: -20 }, // Earning rate
];

// Calculate global totals from initial companies
const INITIAL_GLOBAL_SPEND = INITIAL_COMPANIES.reduce((acc, c) => acc + c.spend, 0); // ~1488B
const INITIAL_GLOBAL_REV = INITIAL_COMPANIES.reduce((acc, c) => acc + c.rev, 0); // ~613B

const INTERVAL_MS = 100;
const MS_PER_MONTH = 30 * 24 * 60 * 60 * 1000; // Assuming 30-day month
const TICKS_PER_MONTH = MS_PER_MONTH / INTERVAL_MS;

export function useSimulationEngine() {
  const [data, setData] = useState({
    companies: INITIAL_COMPANIES.map(c => ({
      ...c,
      currentSpend: c.spend,
      currentRev: c.rev,
      currentPnl: c.pnl,
      spentSinceLoad: 0,
      revSinceLoad: 0,
      pnlSinceLoad: 0
    })),
    globalSpend: INITIAL_GLOBAL_SPEND,
    globalRev: INITIAL_GLOBAL_REV,
    globalPnl: INITIAL_GLOBAL_REV - INITIAL_GLOBAL_SPEND,
    globalSpentSinceLoad: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        let newGlobalSpend = prevData.globalSpend;
        let newGlobalRev = prevData.globalRev;
        let totalSpendIncrementThisTick = 0;

        const newCompanies = prevData.companies.map(company => {
          let newSpend = company.currentSpend;
          let newRev = company.currentRev;
          let spentSinceLoad = company.spentSinceLoad;
          let revSinceLoad = company.revSinceLoad;

          if (company.burn > 0) {
            // Burn means spending increases, revenue flat
            const spendIncrement = company.burn / TICKS_PER_MONTH;
            newSpend += spendIncrement;
            newGlobalSpend += spendIncrement;
            spentSinceLoad += spendIncrement;
            totalSpendIncrementThisTick += spendIncrement;
          } else if (company.burn < 0) {
            // Negative burn (earning) means revenue increases, spending flat
            const revIncrement = Math.abs(company.burn) / TICKS_PER_MONTH;
            newRev += revIncrement;
            newGlobalRev += revIncrement;
            revSinceLoad += revIncrement;
          }

          return {
            ...company,
            currentSpend: newSpend,
            currentRev: newRev,
            currentPnl: newRev - newSpend,
            spentSinceLoad,
            revSinceLoad,
            pnlSinceLoad: revSinceLoad - spentSinceLoad
          };
        });

        return {
          companies: newCompanies,
          globalSpend: newGlobalSpend,
          globalRev: newGlobalRev,
          globalPnl: newGlobalRev - newGlobalSpend,
          globalSpentSinceLoad: prevData.globalSpentSinceLoad + totalSpendIncrementThisTick
        };
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return data;
}
