/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, MedicalScene } from './components/QuantumScene';
import { StandardVsEarlyTimeline, FistulaMaturationGuide, OutcomeChart } from './components/Diagrams';
import { ArrowDown, Menu, X, Activity, HeartPulse, FileText } from 'lucide-react';

const ResearcherCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-xs hover:border-medical-teal/50" style={{ animationDelay: delay }}>
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-medical-teal">
        <Activity size={20} />
      </div>
      <h3 className="font-serif text-xl text-slate-900 text-center mb-2 font-semibold">{name}</h3>
      <div className="w-8 h-0.5 bg-medical-teal mb-3 opacity-40"></div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-medical-teal selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-medical-teal rounded-lg flex items-center justify-center text-white shadow-lg shadow-medical-teal/20">
              <HeartPulse size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-lg tracking-tight leading-none transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                VASCULAR ACCESS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Clinical Research</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-600">
            <a href="#problem" onClick={scrollToSection('problem')} className="hover:text-medical-teal transition-colors cursor-pointer">THE CHALLENGE</a>
            <a href="#protocol" onClick={scrollToSection('protocol')} className="hover:text-medical-teal transition-colors cursor-pointer">THE PROTOCOL</a>
            <a href="#outcomes" onClick={scrollToSection('outcomes')} className="hover:text-medical-teal transition-colors cursor-pointer">OUTCOMES</a>
            <a 
              href="https://www.researchgate.net/publication/397041882_Early_Access_Protocol_Reduces_Time_to_AV_Fistula_Cannulation_and_Catheter_Dependency" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-medical-teal transition-colors shadow-sm cursor-pointer"
            >
              <FileText size={14} />
              <span>Read Study</span>
            </a>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#problem" onClick={scrollToSection('problem')} className="hover:text-medical-teal transition-colors cursor-pointer">The Challenge</a>
            <a href="#protocol" onClick={scrollToSection('protocol')} className="hover:text-medical-teal transition-colors cursor-pointer">The Protocol</a>
            <a href="#outcomes" onClick={scrollToSection('outcomes')} className="hover:text-medical-teal transition-colors cursor-pointer">Clinical Outcomes</a>
            <a 
              href="https://www.researchgate.net/publication/397041882_Early_Access_Protocol_Reduces_Time_to_AV_Fistula_Cannulation_and_Catheter_Dependency" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-medical-teal text-white rounded-full shadow-lg cursor-pointer"
            >
              Read Study
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-50">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(248,250,252,0.4)_60%,rgba(241,245,249,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Nephrology • Vascular Access</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-slate-900 tracking-tight">
            Accelerating <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-teal to-blue-600">Vascular Access</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-normal leading-relaxed mb-10">
            Implementing an <strong>Early Access Protocol</strong> to reduce time to cannulation and minimize catheter dependency in hemodialysis patients.
          </p>
          
          <div className="flex justify-center gap-4">
             <a href="#problem" onClick={scrollToSection('problem')} className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                Explore Findings
             </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <ArrowDown className="text-slate-400" size={24} />
        </div>
      </header>

      <main>
        {/* Problem Statement */}
        <section id="problem" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
               <div className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200">
                  {/* Abstract medical visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full border-[32px] border-venous-light/30 relative">
                       <div className="absolute inset-0 border-[32px] border-arterial-light/30 rounded-full scale-75"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-xs font-bold text-slate-500 uppercase">Risk Factor</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800">Prolonged Catheter Use = Higher Infection Risk</p>
                  </div>
               </div>
            </div>
            <div className="md:col-span-7">
              <div className="inline-block mb-4 text-xs font-bold tracking-widest text-medical-teal uppercase">The Challenge</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900 font-semibold">The Catheter Burden</h2>
              <div className="w-16 h-1 bg-medical-teal mb-8"></div>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  For patients with End-Stage Renal Disease (ESRD), a functioning Arteriovenous Fistula (AVF) is the "lifeline" for hemodialysis. However, AVFs traditionally require <strong>8-12 weeks</strong> to mature before they can be safely used.
                </p>
                <p>
                  During this maturation period, patients often rely on <strong>Central Venous Catheters (CVCs)</strong>. CVCs are associated with significantly higher rates of infection, hospitalization, and mortality compared to fistulas. Reducing catheter time is a primary goal in nephrology.
                </p>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-4">
                   <Activity className="text-medical-teal mt-1 flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-slate-900 mb-1">Standard Care Limitations</h4>
                     <p className="text-sm">Traditional protocols rely on physical exam ("rule of thumb") and conservative timelines, leading to unnecessary delays in removing catheters.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Protocol - Interactive */}
        <section id="protocol" className="py-24 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-medical-teal text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-slate-200 shadow-sm">
                        <HeartPulse size={14}/> METHODOLOGY
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900 font-semibold">The Early Access Protocol</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                       Instead of waiting for arbitrary timeframes, the Early Access Protocol uses rigorous ultrasound assessment to determine physiological readiness.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <StandardVsEarlyTimeline />
                        <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="font-serif text-xl text-slate-900 mb-3">Why it works</h4>
                            <p className="text-slate-600">
                                By visualizing the vessel diameter and depth accurately with ultrasound, clinicians can identify fistulas that have matured rapidly (within 2-4 weeks) but might be missed by simple physical palpation.
                            </p>
                        </div>
                    </div>
                    <div>
                        <FistulaMaturationGuide />
                    </div>
                </div>
            </div>
        </section>

        {/* Outcomes - Statistics */}
        <section id="outcomes" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-20 z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <OutcomeChart />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-medical-teal/10 text-medical-dark text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                            STUDY RESULTS
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900 font-semibold">Significant Reductions</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            The implementation of the Early Access Protocol demonstrated a dramatic improvement in clinical metrics compared to the standard of care group.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                                <div>
                                    <strong className="text-slate-900 block">Reduced Time to Cannulation</strong>
                                    <span className="text-slate-500">Patients were able to use their fistula weeks sooner.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                                <div>
                                    <strong className="text-slate-900 block">Reduced Catheter Dependency</strong>
                                    <span className="text-slate-500">Significant decrease in total days with a CVC, directly lowering infection risk.</span>
                                </div>
                            </li>
                        </ul>
                     </div>
                </div>
            </div>
        </section>

        {/* Impact Summary */}
        <section className="py-24 bg-slate-900 text-white">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square rounded-xl overflow-hidden relative border border-slate-700 shadow-2xl">
                        <MedicalScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-400 font-sans opacity-80">Clinical Environment Simulation</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <h2 className="font-serif text-4xl mb-6 text-white">Transforming Patient Care</h2>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                        The reduction in catheter days is not just a statistic; it translates to fewer hospitalizations for sepsis, improved patient comfort, and better overall quality of life for those undergoing hemodialysis.
                    </p>
                    
                    <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-lg border-l-4 border-l-medical-teal backdrop-blur-sm">
                        <p className="font-serif italic text-xl text-slate-100 mb-4">
                            "Early cannulation, when guided by strict ultrasound criteria, is safe and significantly reduces the duration of central venous catheter dependence."
                        </p>
                        <span className="text-sm font-bold text-medical-teal tracking-wider uppercase">— Research Conclusion</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Team */}
        <section id="authors" className="py-24 bg-slate-50 border-t border-slate-200">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">CONTRIBUTORS</div>
                    <h2 className="font-serif text-3xl md:text-4xl mb-4 text-slate-900 font-semibold">Clinical Research Team</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Representing Departments of Vascular Surgery & Nephrology.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
                    <ResearcherCard 
                        name="Principal Investigator" 
                        role="Vascular Surgery" 
                        delay="0s" 
                    />
                    <ResearcherCard 
                        name="Lead Nephrologist" 
                        role="Clinical Research" 
                        delay="0.1s" 
                    />
                    <ResearcherCard 
                        name="Study Coordinator" 
                        role="Dialysis Access Center" 
                        delay="0.2s" 
                    />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-white border-t border-slate-200 text-slate-600 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                   <HeartPulse className="text-medical-teal" size={20} />
                   <div className="text-slate-900 font-serif font-bold text-xl">Vascular Access</div>
                </div>
                <p className="text-sm text-slate-500">Visualizing medical research for better patient outcomes.</p>
            </div>
            <div className="flex gap-6 text-sm font-medium">
                <a href="#" className="hover:text-medical-teal transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-medical-teal transition-colors">Terms of Use</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-slate-400">
            Based on research: Early Access Protocol Reduces Time to AV Fistula Cannulation.
        </div>
      </footer>
    </div>
  );
};

export default App;