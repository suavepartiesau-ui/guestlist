import React, { useState, useEffect } from 'react';
import { Rabbit, Lock, Key, CheckCircle, ArrowRight, Instagram } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState('portal'); // portal, code, form, confirmed
  const [formData, setFormData] = useState({
    name: '',
    instagram: '',
    guests: '1'
  });
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);

  // Subtle mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCodeChange = (e) => {
    setAccessCode(e.target.value.toUpperCase());
    setError(false);
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (accessCode === 'SUAVE') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStage('form');
      }, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500); // Reset shake
    }
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
      
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-50" 
           style={{
             background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)'
           }}>
      </div>

      {/* Floating ambient elements */}
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
            
            <div className="relative inline-block mb-16 scale-125">
              <div className="absolute inset-0 blur-3xl bg-amber-300/20 rounded-full scale-150"></div>
              <div className="relative bg-[#0a0a0a] border border-amber-300/20 rounded-full p-8 backdrop-blur-sm">
                <Rabbit className="w-20 h-20 text-[#fcd34d]" strokeWidth={1.2} />
              </div>
            </div>

            <h1 className="text-6xl md:text-9xl font-light tracking-tight text-[#e8e6e3] mb-8 leading-[0.9]">
              The Suave
              <br />
              <span className="italic font-serif text-amber-50">Collective</span>
            </h1>
            
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent mx-auto my-12"></div>
            
            <p className="text-lg md:text-2xl text-[#a8a29e] mb-16 max-w-2xl mx-auto leading-relaxed font-sans tracking-wide font-light">
              Restricted Access.
              <br className="hidden md:block" />
              Please enter your invitation code.
            </p>

            {/* NEW BUTTON STYLE: Solid borders, high contrast */}
            <button 
              onClick={() => setStage('code')}
              className="group relative inline-flex items-center gap-4 px-12 py-5 bg-transparent border-2 border-[#fcd34d] text-[#fcd34d] text-base md:text-lg uppercase tracking-[0.25em] font-sans font-bold transition-all duration-300 hover:bg-[#fcd34d] hover:text-black cursor-pointer"
            >
              <span>Enter Code</span>
              <Key className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </button>

            <div className="mt-24 flex justify-center gap-8 text-xs md:text-sm uppercase tracking-[0.4em] text-[#9ca3af] font-sans font-medium">
               <span>Adelaide</span>
               <span className="text-amber-500/50">·</span>
               <span>Fringe 2026</span>
            </div>
          </div>
        )}

        {/* STAGE 2: ACCESS CODE */}
        {stage === 'code' && (
          <div className="w-full max-w-lg animate-[slideUp_0.4s_ease-out]">
            <div className="text-center mb-12">
              <Lock className="w-8 h-8 text-[#fcd34d] mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-light text-[#e8e6e3] mb-3">
                Security Check
              </h2>
            </div>

            <form onSubmit={verifyCode} className="space-y-8">
               <div className="space-y-4">
                <input
                  autoFocus
                  type="text"
                  value={accessCode}
                  onChange={handleCodeChange}
                  placeholder="ENTER CODE"
                  className={`w-full bg-transparent border-b-2 ${error ? 'border-red-500 text-red-400 shake' : 'border-[#333] text-[#e8e6e3]'} pb-4 text-center text-4xl md:text-5xl placeholder-[#333] focus:outline-none focus:border-[#fcd34d] transition-all font-sans tracking-[0.2em] uppercase`}
                />
                {error && (
                  <p className="text-red-500 text-xs text-center uppercase tracking-widest animate-pulse">
                    Access Denied
                  </p>
                )}
               </div>

               <button 
                type="submit" 
                disabled={loading || !accessCode}
                className="w-full mt-10 px-12 py-5 bg-transparent border-2 border-[#fcd34d] text-[#fcd34d] text-sm uppercase tracking-[0.3em] font-bold font-sans transition-all duration-300 hover:bg-[#fcd34d] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#fcd34d]"
              >
                {loading ? 'Verifying...' : 'Unlock'}
              </button>
            </form>
            
            <button 
              onClick={() => setStage('portal')}
              className="w-full mt-6 text-[#666] text-xs uppercase tracking-[0.2em] hover:text-[#999] transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* STAGE 3: THE FORM */}
        {stage === 'form' && (
          <div className="w-full max-w-xl animate-[slideUp_0.6s_ease-out]">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-emerald-400/80 text-xs uppercase tracking-[0.3em] mb-6 font-sans">
                <CheckCircle className="w-3 h-3" />
                <span>Code Verified</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-[#e8e6e3] mb-4">
                Guest Details
              </h2>
              <p className="text-base text-[#a8a29e] font-sans">
                Secure your position on the list.
              </p>
            </div>

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
                  className="w-full bg-transparent border-b border-[#333] pb-4 text-2xl md:text-3xl text-[#e8e6e3] placeholder-[#333] focus:outline-none focus:border-[#fcd34d] transition-colors font-serif"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-[0.2em] text-[#9ca3af] mb-2 font-sans">
                  Instagram Handle
                </label>
                <div className="flex items-center border-b border-[#333] focus-within:border-[#fcd34d] transition-colors">
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
                  className="w-full bg-transparent border-b border-[#333] pb-4 text-2xl md:text-3xl text-[#e8e6e3] focus:outline-none focus:border-[#fcd34d] transition-colors cursor-pointer font-serif appearance-none rounded-none"
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
                className="w-full mt-16 px-12 py-5 bg-transparent border-2 border-[#fcd34d] text-[#fcd34d] text-sm uppercase tracking-[0.3em] font-bold font-sans transition-all duration-300 hover:bg-[#fcd34d] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* STAGE 4: CONFIRMATION */}
        {stage === 'confirmed' && (
          <div className="text-center max-w-xl w-full animate-[fadeIn_0.8s_ease-out]">
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
                Keep an eye on your Instagram DMs for exclusive details.
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
      
      <div className="fixed bottom-8 left-8 text-xs text-[#333] uppercase tracking-[0.4em] font-sans">
        TSC — MMXXVI
      </div>
      
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default App;