/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, ArrowRight, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';

// --- TIMELINE COMPARISON ---
export const StandardVsEarlyTimeline: React.FC = () => {
  const [mode, setMode] = useState<'standard' | 'early'>('standard');

  const weeks = [0, 2, 4, 6, 8, 10];
  const standardStart = 8; // 8 weeks
  const earlyStart = 4; // 4 weeks

  return (
    <div className="flex flex-col p-8 bg-white rounded-xl shadow-sm border border-slate-200 h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
            <h3 className="font-serif text-xl text-slate-900 mb-1 font-semibold">Time to Cannulation</h3>
            <p className="text-sm text-slate-500">Comparison of waiting periods.</p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-1">
            <button 
                onClick={() => setMode('standard')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'standard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Standard
            </button>
            <button 
                onClick={() => setMode('early')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'early' ? 'bg-medical-teal text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Protocol
            </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-[200px] flex items-center">
          {/* Timeline Base */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-slate-100 rounded-full"></div>
          
          {/* Active Period Bar */}
          <motion.div 
            className={`absolute top-1/2 left-0 h-2 rounded-full ${mode === 'early' ? 'bg-medical-teal' : 'bg-slate-400'}`}
            initial={{ width: '80%' }}
            animate={{ width: mode === 'early' ? '40%' : '80%' }}
            transition={{ type: "spring", stiffness: 60 }}
          />

          {/* Markers */}
          <div className="w-full flex justify-between relative z-10">
              {weeks.map((w, i) => (
                  <div key={w} className="flex flex-col items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                          (mode === 'early' && w <= earlyStart) || (mode === 'standard' && w <= standardStart) 
                          ? 'bg-slate-900 border-slate-900' 
                          : 'bg-white border-slate-300'
                      }`}></div>
                      <span className="text-xs font-mono text-slate-400">{w}w</span>
                  </div>
              ))}
          </div>

          {/* Cannulation Flag */}
          <motion.div 
             className="absolute top-0 transform -translate-x-1/2"
             initial={{ left: '80%' }}
             animate={{ left: mode === 'early' ? '40%' : '80%' }}
             transition={{ type: "spring", stiffness: 60 }}
          >
              <div className={`flex flex-col items-center ${mode === 'early' ? 'text-medical-teal' : 'text-slate-500'}`}>
                  <div className="bg-white p-2 rounded-lg shadow-lg border border-current mb-2 whitespace-nowrap">
                      <span className="font-bold text-sm">First Cannulation</span>
                  </div>
                  <div className="w-0.5 h-16 bg-current border-dashed border-l border-current opacity-50"></div>
              </div>
          </motion.div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3">
              {mode === 'early' ? <CheckCircle2 className="text-medical-teal" /> : <AlertCircle className="text-orange-400" />}
              <p className="text-sm text-slate-700">
                  {mode === 'early' 
                    ? "Ultrasound criteria met. Safe to cannulate at 2-4 weeks." 
                    : "Standard protocol requires 6-8 weeks of maturation blind to actual vessel state."}
              </p>
          </div>
      </div>
    </div>
  );
};

// --- MATURATION VISUALIZER ---
export const FistulaMaturationGuide: React.FC = () => {
  return (
    <div className="flex flex-col p-8 bg-white rounded-xl shadow-sm border border-slate-200 h-full">
      <h3 className="font-serif text-xl text-slate-900 mb-1 font-semibold">Ultrasound Criteria</h3>
      <p className="text-sm text-slate-500 mb-8">The "Rule of 6s" guides the early access protocol.</p>

      <div className="grid grid-cols-1 gap-6">
          {/* Vessel Diameter */}
          <div className="flex items-center justify-between">
             <div className="flex flex-col">
                 <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Diameter</span>
                 <span className="text-xs text-slate-400">Vein Width</span>
             </div>
             <div className="flex-1 mx-6 flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full border-4 border-dashed border-slate-300 flex items-center justify-center relative">
                    <div className="absolute -bottom-6 text-[10px] text-slate-400">Pre-Op</div>
                    <div className="w-4 h-4 rounded-full bg-venous-light"></div>
                 </div>
                 <ArrowRight className="text-slate-300" />
                 <div className="w-16 h-16 rounded-full border-4 border-medical-teal flex items-center justify-center bg-medical-light relative">
                    <div className="absolute -bottom-6 text-[10px] text-medical-teal font-bold">&gt; 6mm</div>
                    <div className="w-10 h-10 rounded-full bg-venous shadow-inner"></div>
                 </div>
             </div>
          </div>

          <div className="w-full h-[1px] bg-slate-100"></div>

          {/* Depth */}
          <div className="flex items-center justify-between">
             <div className="flex flex-col">
                 <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Depth</span>
                 <span className="text-xs text-slate-400">From Skin</span>
             </div>
             <div className="flex-1 mx-6 flex items-center justify-center h-16 bg-slate-50 rounded-lg border border-slate-200 relative overflow-hidden">
                 <div className="absolute top-0 w-full h-2 bg-orange-100 border-b border-orange-200"></div>
                 <div className="absolute top-6 w-32 h-6 bg-venous rounded-full shadow-sm"></div>
                 <div className="absolute right-4 top-2 h-4 border-l border-slate-400 flex items-center pl-1">
                    {/* Fixed syntax error: < used directly in JSX text */}
                    <span className="text-xs font-bold text-slate-700">&lt; 0.6cm</span>
                 </div>
             </div>
          </div>
          
          <div className="w-full h-[1px] bg-slate-100"></div>
          
           {/* Flow */}
           <div className="flex items-center justify-between">
             <div className="flex flex-col">
                 <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Flow</span>
                 <span className="text-xs text-slate-400">Volume</span>
             </div>
             <div className="flex-1 mx-6">
                 <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden relative">
                     <motion.div 
                        className="h-full bg-gradient-to-r from-blue-400 to-medical-teal"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                     />
                     <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-600 tracking-widest">
                        &gt; 600 mL/min
                     </div>
                 </div>
             </div>
          </div>

      </div>
    </div>
  );
};

// --- OUTCOME CHART ---
export const OutcomeChart: React.FC = () => {
    // Data representative of study trends (Approximate derived values for visualization)
    // Standard: ~60 days catheter use
    // Early Access: ~30 days catheter use
    
    return (
        <div className="flex flex-col p-8 bg-white rounded-xl border border-slate-200 shadow-lg">
             <h3 className="font-serif text-2xl text-slate-900 mb-2 font-semibold">Clinical Impact</h3>
             <p className="text-slate-500 mb-8">Reduction in total Catheter Days per patient.</p>
             
             <div className="flex items-end justify-center gap-16 h-64 pb-8 border-b border-slate-100">
                 {/* Standard Bar */}
                 <div className="group flex flex-col items-center gap-3 w-24">
                     <div className="text-lg font-bold text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">68 Days</div>
                     <div className="w-full bg-slate-200 rounded-t-lg h-64 relative overflow-hidden group-hover:bg-slate-300 transition-colors">
                        <div className="absolute bottom-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
                     </div>
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Standard Care</span>
                 </div>

                 {/* Protocol Bar */}
                 <div className="group flex flex-col items-center gap-3 w-24">
                     <div className="text-lg font-bold text-medical-teal mb-1 opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in">-58%</div>
                     <motion.div 
                        className="w-full bg-medical-teal rounded-t-lg relative overflow-hidden shadow-lg shadow-medical-teal/30"
                        initial={{ height: 0 }}
                        whileInView={{ height: '110px' }} // Approx 40% of standard
                        viewport={{ once: true }}
                        transition={{ type: "spring", damping: 20 }}
                     >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/20"></div>
                     </motion.div>
                     <span className="text-xs font-bold text-medical-teal uppercase tracking-wider">Protocol</span>
                 </div>
             </div>

             <div className="mt-6 flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-slate-200 rounded-sm"></div>
                     <span className="text-slate-500">Standard</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-medical-teal rounded-sm"></div>
                     <span className="text-slate-900 font-medium">Early Access</span>
                 </div>
             </div>
        </div>
    );
};