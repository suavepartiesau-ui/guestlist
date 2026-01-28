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
        x: (e.clientX / window.innerWidth - 0.5) * 30, // Increased movement for desktop
        y: (e.clientY / window.innerHeight - 0.5) * 30
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
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-400 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-400 rounded-full blur-[180px]"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* STAGE 1: THE PORTAL */}
        {stage === 'portal' && (
          <div className="text-center w-full max-w-4xl animate-[fadeIn_1.2s_ease-out]">
            
            {/* Rabbit icon with glow */}
            <div className="relative inline-block mb-16 scale-125">
              <div className="absolute inset-0 blur-3xl bg-amber-300/20 rounded-full scale-150"></div>
              <div className="relative bg-[#0a0a0a] border border-amber-300/20 rounded-full p-8 backdrop-blur-sm">
                <Rabbit className="w-20 h-20 text-[#fcd34d]" strokeWidth={1.2} />
              </div>
            </div>

            {/* Main heading - SCALED UP FOR DESKTOP */}
            <h1 className="text-6xl md:text-9xl font-light tracking-tight text-[#e8e6e3] mb-8 leading-[0.9]">
              The Suave
              <br />
              <span className="italic font-serif text-amber-50">Collective</span>
            </h1>
            
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent mx-auto my-12"></div>
            
            <p className="text-lg md:text-2xl text-[#a8a29e] mb-16 max-w-2xl mx-auto leading-relaxed font-sans tracking-wide font-light">
              An intimate gathering for those who appreciate
              <br className="hidden md:block" />
              the finer moments. Limited access.
            </p>

            {/* Entry button - FIXED VISIBILITY */}
            <button 
              onClick={() => setStage('form')}
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-amber-900/10 border border-amber-200/30 text-[#fffbeb] text-base md:text-lg uppercase tracking-[0.25em] font-sans transition-all duration-500 hover:border-amber-200/60 hover:bg-amber-900/20 cursor-pointer"
            >
              <span className="font-semibold">Request Entry</span>
              <ArrowRight className="w-5 h-5 text-[#fcd34d] group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* Footer tags - FIXED VISIBILITY */}
            <div className="mt-24 flex justify-center gap-8 text-xs md:text-sm uppercase tracking-[0.4em] text-[#9ca3af] font-sans font-medium">
               <span>Adelaide</span>
               <span className="text-amber-500/50">·</span>
               <span>Fringe 2026</span>
            </div>
          </div>
        )}

        {/* STAGE 2: THE REQUEST FORM */}
        {stage === 'form' && (
          <div className="w-full max-w-xl animate-[slideUp_0.6s_ease-out]">
            
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-[#fcd34d] text-xs uppercase tracking-[0.3em] mb-6 font-sans">
                <Lock className="w-3 h-3" />
                <span>Private Access</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-[#e8e6e3] mb-4">
                Request Invitation
              </h2>
              <p className="text-base text-[#a8a29e] font-sans">
                We'll be in touch shortly.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-10">
              
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-[0.2em] text-[#9ca3af] mb-2 font-sans">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="First Last"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#333] pb-4 text-2xl md:text-3xl text-[#e8e6e3] placeholder-[#333] focus:outline-none focus:border-amber-300/60 transition-colors font-serif"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-[0.2em] text-[#9ca3af] mb-2 font-sans">
                  Instagram Handle
                </label>
                <div className="flex items-center border-b border-[#333] focus-within:border-amber-300/60 transition-colors">
                  <Instagram className="w-5 h-5 text-[#666] mr-4" />
                  <input
                    required
                    type="text"
                    name="instagram"
                    placeholder="@yourusername"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="flex-1 bg-transparent pb-4 text-2xl md:text-3xl text-[#e8e6e3] placeholder-[#333] focus:outline-none font-serif"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-[0.2em] text-[#9ca3af] mb-2 font-sans">
                  Party Size
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#333] pb-4 text-2xl md:text-3xl text-[#e8e6e3] focus:outline-none focus:border-amber-300/60 transition-colors cursor-pointer font-serif appearance-none rounded-none"
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
                className="w-full mt-16 py-6 bg-amber-900/20 border border-amber-200/20 text-[#fffbeb] text-sm uppercase tracking-[0.3em] font-sans transition-all duration-300 hover:bg-amber-900/40 hover:border-amber-200/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#fcd34d] rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-[#fcd34d] rounded-full animate-pulse delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-[#fcd34d] rounded-full animate-pulse delay-200"></div>
                  </span>
                ) : 'Submit Request'}
              </button>
            </form>
          </div>
        )}

        {/* STAGE 3: CONFIRMATION */}
        {stage === 'confirmed' && (
          <div className="text-center max-w-xl w-full animate-[fadeIn_0.8s_ease-out]">
            
            {/* Success icon */}
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 blur-3xl bg-emerald-300/20 rounded-full scale-150 animate-pulse"></div>
              <div className="relative bg-[#0a0a0a] border border-emerald-500/30 rounded-full p-8">
                <CheckCircle className="w-16 h-16 text-emerald-400" strokeWidth={1.2} />
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-light text-[#e8e6e3] mb-4">
              Request Received
            </h2>
            
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent mx-auto my-8"></div>
            
            <p className="text-xl text-[#a8a29e] mb-12 leading-relaxed font-sans">
              Welcome, <span className="text-[#fcd34d] italic">{formData.name}</span>.
              <br />
              We'll reach out via <span className="text-[#fcd34d]">{formData.instagram}</span> shortly.
            </p>

            <div className="bg-[#151515] border border-[#333] p-10 mb-10">
              <p className="text-base text-[#9ca3af] leading-relaxed font-sans">
                Keep an eye on your Instagram DMs for exclusive details,
                venue information, and your personal access code.
              </p>
            </div>

            <a 
              href="https://instagram.com/suavecollective" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-amber-300/60 hover:text-amber-300/90 transition-colors font-sans"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow Us</span>
            </a>
          </div>
        )}

      </main>
      
      {/* Subtle branding */}
      <div className="fixed bottom-8 left-8 text-xs text-[#333] uppercase tracking-[0.4em] font-sans">
        TSC — MMXXVI
      </div>
    </div>
  );
};

export default App;