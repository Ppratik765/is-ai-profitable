import React from 'react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-12 px-8 z-10 relative bg-black/20 backdrop-blur-sm w-full">
      <div className="w-full mx-auto text-center space-y-8 text-slate-400 text-sm">
        <div>
          <h4 className="text-white font-semibold mb-3 tracking-wide uppercase">Why I Built This</h4>
          <p className="w-full mx-auto leading-relaxed text-base">
            I built this to show the raw scale of money being poured into AI right now. We see crazy valuations everywhere, 
            but in reality, almost everyone except Nvidia is bleeding cash to build these frontier models. This dashboard 
            tracks that massive capital expenditure and the resulting financial drain in real-time.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-3 tracking-wide uppercase">Sources & Estimates</h4>
          <p className="w-full mx-auto leading-relaxed text-sm">
            The numbers here come straight from recent earnings reports, press releases, and public filings as of June 2026. 
            The burn rates are estimated by looking at massive infrastructure build-outs—like compute clusters and energy costs—compared 
            to actual AI product revenue. Keep in mind this is an educational simulation, not financial advice.
          </p>
        </div>

        <div className="pt-8 text-sm opacity-80 font-mono">
          <a href="https://github.com/Ppratik765" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Priyanshu Pratik
          </a>
        </div>
      </div>
    </footer>
  );
}
