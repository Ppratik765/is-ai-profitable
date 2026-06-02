import React from 'react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-12 px-4 z-10 relative bg-black/20 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center space-y-6 text-slate-400 text-sm">
        <div>
          <h4 className="text-white font-semibold mb-2 tracking-wide uppercase">Why I Built This</h4>
          <p className="max-w-2xl mx-auto leading-relaxed">
            This dashboard visualizes the massive scale of capital expenditure required to train and run frontier AI models.
            While valuations are skyrocketing, the actual profitability of the industry is deeply negative for almost everyone
            except hardware providers like Nvidia. This dashboard simulates the real-time financial drain based on 
            estimated monthly burn rates as of May 2026.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-2 tracking-wide uppercase">Sources & Estimates</h4>
          <p className="max-w-2xl mx-auto leading-relaxed text-xs">
            Data is synthesized from public financial disclosures, analyst estimates, and industry reports as of May 2026.
            Burn rates are estimated based on infrastructure build-outs (compute clusters, energy, talent) versus current
            generative AI product revenue run-rates. This is a simulation meant for educational and illustrative purposes.
          </p>
        </div>

        <div className="pt-8 text-xs opacity-60">
          Created with React, Tailwind CSS v4, and Framer Motion.
        </div>
      </div>
    </footer>
  );
}
