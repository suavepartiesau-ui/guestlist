import React, { useState, useEffect } from 'react';
import { Rabbit, Lock, CheckCircle, ArrowRight, Instagram } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState('portal'); // portal, form, confirmed
  const [formData, setFormData] = useState({
    name: '',
    instagram: '',
    guests: '1'
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);

  // Subtle mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage('confirmed');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e3] font-serif overflow-hidden relative selection:bg-amber-300/30">
      
      {/* Subtle vignette overlay */}
      <div className="fixed inset-0 pointer-events-none z-50" 
           style={{
             background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
           }}>
      </div>

      {/* Floating ambient elements with parallax */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400 rounded-full blur-[150px]"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* STAGE 1: THE PORTAL */}
        {stage === 'portal' && (
          <div className="text-center max-w-2xl w-full animate-[fadeIn_1.2s_ease-out]">
            
            {/* Rabbit icon with glow */}
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 blur-2xl bg-amber-300/20 rounded-full scale-150"></div>
              <div className="relative bg-[#0a0a0a] border border-amber-300/20 rounded-full p-8 backdrop-blur-sm">
                <Rabbit className="w-16 h-16 text-amber-200/80" strokeWidth={1.5} />
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#e8e6e3] mb-4 leading-tight">
              The Suave
              <br />
              <span className="italic font-serif">Collective</span>
            </h1>
            
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent mx-auto my-8"></div>
            
            <p className="text-sm md:text-base text-[#b8b5b0] mb-12 max-w-md mx-auto leading-relaxed font-sans tracking-wide">
              An intimate gathering for those who appreciate
              <br />
              the finer moments. Limited access.
            </p>

            {/* Entry button */}
            <button 
              onClick={() => setStage('form')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-amber-300/30 text-amber-100/90 text-sm uppercase tracking-[0.2em] font-sans transition-all duration-500 hover:border-amber-300/60 hover:bg-amber-300/5 cursor-pointer"
            >
              <span>Request Entry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* Subtle footer tags */}
            <div className="mt-20 flex justify-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#4a4a4a] font-sans">
               <span>Adelaide</span>
               <span>·</span>
               <span>Fringe 2026</span>
            </div>
          </div>
        )}

        {/* STAGE 2: THE REQUEST FORM */}
        {stage === 'form' && (
          <div className="w-full max-w-lg animate-[slideUp_0.6s_ease-out]">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-amber-300/60 text-xs uppercase tracking-[0.3em] mb-4 font-sans">
                <Lock className="w-3 h-3" />
                <span>Private Access</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-[#e8e6e3] mb-3">
                Request Your Invitation
              </h2>
              <p className="text-sm text-[#7a7872] font-sans">
                We'll be in touch shortly.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] text-[#7a7872] mb-3 font-sans">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="First Last"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#2a2a2a] pb-3 text-lg text-[#e8e6e3] placeholder-[#3a3a3a] focus:outline-none focus:border-amber-300/40 transition-colors font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] text-[#7a7872] mb-3 font-sans">
                  Instagram Handle
                </label>
                <div className="flex items-center border-b border-[#2a2a2a] focus-within:border-amber-300/40 transition-colors">
                  <Instagram className="w-4 h-4 text-[#4a4a4a] mr-2" />
                  <input
                    required
                    type="text"
                    name="instagram"
                    placeholder="@yourusername"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="flex-1 bg-transparent pb-3 text-lg text-[#e8e6e3] placeholder-[#3a3a3a] focus:outline-none font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] text-[#7a7872] mb-3 font-sans">
                  Party Size
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#2a2a2a] pb-3 text-lg text-[#e8e6e3] focus:outline-none focus:border-amber-300/40 transition-colors cursor-pointer font-sans"
                >
                  <option value="1" className="bg-[#0a0a0a]">Just me</option>
                  <option value="2" className="bg-[#0a0a0a]">2 guests</option>
                  <option value="3" className="bg-[#0a0a0a]">3 guests</option>
                  <option value="4" className="bg-[#0a0a0a]">4 guests</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-12 py-4 bg-amber-300/10 border border-amber-300/30 text-amber-100/90 text-sm uppercase tracking-[0.25em] font-sans transition-all duration-300 hover:bg-amber-300/15 hover:border-amber-300/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 bg-amber-300 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-100"></div>
                    <div className="w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-200"></div>
                  </span>
                ) : 'Submit Request'}
              </button>

              <p className="text-center text-xs text-[#5a5a5a] mt-6 font-sans">
                By submitting, you agree to receive event details via Instagram DM
              </p>
            </form>
          </div>
        )}

        {/* STAGE 3: CONFIRMATION */}
        {stage === 'confirmed' && (
          <div className="text-center max-w-lg w-full animate-[fadeIn_0.8s_ease-out]">
            
            {/* Success icon */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 blur-2xl bg-emerald-300/20 rounded-full scale-150 animate-pulse"></div>
              <div className="relative bg-[#0a0a0a] border border-emerald-300/30 rounded-full p-6">
                <CheckCircle className="w-12 h-12 text-emerald-300/80" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-light text-[#e8e6e3] mb-4">
              Request Received
            </h2>
            
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent mx-auto my-6"></div>
            
            <p className="text-base text-[#b8b5b0] mb-8 leading-relaxed font-sans">
              Welcome, <span className="text-amber-200 italic">{formData.name}</span>.
              <br />
              We'll reach out via <span className="text-amber-200">{formData.instagram}</span> shortly.
            </p>

            <div className="bg-[#151515] border border-[#2a2a2a] p-8 mb-8">
              <p className="text-sm text-[#7a7872] leading-relaxed font-sans">
                Keep an eye on your Instagram DMs for exclusive details,
                venue information, and your personal access code.
              </p>
            </div>

            <a 
              href="https://instagram.com/suavecollective" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-amber-300/60 hover:text-amber-300/90 transition-colors font-sans"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow Us</span>
            </a>
          </div>
        )}

      </main>
      
      {/* Subtle branding */}
      <div className="fixed bottom-6 left-6 text-[10px] text-[#2a2a2a] uppercase tracking-[0.3em] font-sans">
        TSC — MMXXVI
      </div>
    </div>
  );
};

export default App;