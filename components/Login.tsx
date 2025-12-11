import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Lock, ArrowRight, ShieldCheck, Cpu, UserPlus, Fingerprint, Github, Globe, Terminal } from 'lucide-react';

interface LoginProps {
  onBack: () => void;
}

const SystemLog = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const messages = [
    "INITIALIZING SECURE HANDSHAKE...",
    "ESTABLISHING UPLINK TO MARS COLONY...",
    "VERIFYING BIOMETRIC SIGNATURES...",
    "ENCRYPTING DATA STREAM (AES-256)...",
    "CHECKING CLEARANCE LEVEL...",
    "READY FOR AUTHENTICATION.",
    "WAITING FOR USER INPUT..."
  ];

  useEffect(() => {
    let delay = 0;
    messages.forEach((msg, index) => {
      delay += Math.random() * 800 + 200;
      setTimeout(() => {
        setLogs(prev => [...prev.slice(-4), `> ${msg}`]);
      }, delay);
    });
  }, []);

  return (
    <div className="bg-black/80 rounded-lg p-4 font-mono text-[10px] text-green-500/80 border border-green-900/30 h-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-1">
         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col justify-end h-full gap-1">
        {logs.map((log, i) => (
          <div key={i} className="animate-in slide-in-from-left-2 fade-in duration-300">
            {log}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
      {/* Scanline overlay for log */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[size:100%_4px] pointer-events-none"></div>
    </div>
  );
};

export const Login: React.FC<LoginProps> = ({ onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset form when toggling
  useEffect(() => {
     setEmail('');
     setPassword('');
     setConfirmPassword('');
  }, [isSignUp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(isSignUp ? "REGISTRATION REQUEST SENT TO ORBITAL COMMAND" : "ACCESS DENIED: RESTRICTED PERSONNEL ONLY");
    }, 2000);
  };

  const inputClasses = "w-full bg-black/60 border border-white/10 focus:border-martian-red focus:bg-black/90 outline-none pl-4 focus:pl-6 pr-4 py-4 text-white font-mono text-sm transition-all duration-300 rounded-lg placeholder:text-white/30 placeholder:font-sans placeholder:tracking-wide shadow-[inset_0_0_0_transparent] focus:shadow-[inset_0_0_20px_rgba(255,46,46,0.1)]";

  return (
    <div className="fixed inset-0 z-[60] bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden font-sans">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a0b2e_0%,#000000_100%)] opacity-60 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        {/* Animated Grid Floor */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none [perspective:1000px] [transform:rotateX(20deg)]"></div>

        {/* Floating Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-martian-red/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <div className="w-full max-w-lg p-4 md:p-8 relative z-10 flex flex-col max-h-[100vh] overflow-y-auto">
            {/* Header */}
            <div className="mb-8 text-center relative group">
                 <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-white/5 border border-white/10 mb-6 relative overflow-hidden transition-all duration-500 hover:border-martian-red/50 hover:shadow-[0_0_30px_rgba(255,46,46,0.2)]">
                    <div className="absolute inset-0 bg-martian-red/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    {isSignUp ? (
                         <UserPlus className="w-8 h-8 text-martian-red relative z-10" />
                    ) : (
                         <Lock className="w-8 h-8 text-martian-red relative z-10" />
                    )}
                 </div>
                 <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-3 text-white transition-all duration-300">
                    {isSignUp ? 'NEW RECRUIT' : 'MARTIAN ID'}
                 </h2>
                 <div className="flex items-center justify-center gap-2 text-martian-green font-mono text-xs uppercase tracking-[0.3em]">
                    <ShieldCheck size={12} />
                    <span>{isSignUp ? 'Clearance Required' : 'Secure Gateway v4.0'}</span>
                 </div>
            </div>

            {/* Main Card */}
            <div ref={containerRef} className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl overflow-hidden group">
                
                {/* Laser Scan Effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-martian-red to-transparent opacity-50 animate-scan-vertical pointer-events-none z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-martian-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* Decorative Tech Corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/20 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/20 rounded-br-lg"></div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    
                    {/* Social Logins - External Protocols */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button type="button" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 py-3 rounded-lg text-xs font-mono font-bold transition-all group/social">
                            <Github size={16} className="text-white/60 group-hover/social:text-white" />
                            <span>GITHUB</span>
                        </button>
                        <button type="button" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 py-3 rounded-lg text-xs font-mono font-bold transition-all group/social">
                            <Globe size={16} className="text-white/60 group-hover/social:text-white" />
                            <span>GOOGLE</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 py-2">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Or enter credentials</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>

                    <div className="space-y-4">
                        <div className="group/input">
                            <label className="text-[10px] font-mono font-bold text-gray-500 group-focus-within/input:text-martian-red uppercase tracking-widest mb-2 block transition-colors">
                                Identity Protocol (Email)
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClasses}
                                    placeholder="agent@evilmartians.com"
                                />
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-martian-red transform scale-y-0 group-focus-within/input:scale-y-100 transition-transform duration-300 rounded-l-lg"></div>
                            </div>
                        </div>

                        <div className="group/input">
                            <label className="text-[10px] font-mono font-bold text-gray-500 group-focus-within/input:text-martian-red uppercase tracking-widest mb-2 block transition-colors">
                                {isSignUp ? 'Create Passcode' : 'Security Key'}
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={inputClasses}
                                    placeholder="••••••••••••"
                                />
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-martian-red transform scale-y-0 group-focus-within/input:scale-y-100 transition-transform duration-300 rounded-l-lg"></div>
                            </div>
                        </div>

                        {isSignUp && (
                            <div className="group/input animate-in slide-in-from-top-2 fade-in duration-300">
                                <label className="text-[10px] font-mono font-bold text-gray-500 group-focus-within/input:text-martian-red uppercase tracking-widest mb-2 block transition-colors">
                                    Confirm Passcode
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={inputClasses}
                                        placeholder="••••••••••••"
                                    />
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-martian-red transform scale-y-0 group-focus-within/input:scale-y-100 transition-transform duration-300 rounded-l-lg"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black font-bold font-display text-lg py-4 uppercase tracking-wide hover:bg-martian-red hover:text-white transition-all duration-300 relative group/btn overflow-hidden rounded-lg mt-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,46,46,0.4)]"
                    >
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                        
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isLoading ? (
                                <>
                                    <Cpu className="animate-spin" size={20} /> Processing...
                                </>
                            ) : (
                                <>
                                    {isSignUp ? 'Initiate Sequence' : 'Authenticate'} <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </span>
                    </button>
                    
                    {/* System Logs */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <SystemLog />
                    </div>

                    {/* Toggle Switch */}
                    <div className="pt-4 text-center">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-gray-500 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.15em] flex items-center justify-center gap-2 mx-auto group/toggle"
                        >
                            {isSignUp ? (
                                <>ALREADY RECRUITED? <span className="text-martian-red group-hover/toggle:underline">LOGIN HERE</span></>
                            ) : (
                                <>NO ID? <span className="text-martian-red group-hover/toggle:underline">REQUEST ACCESS</span></>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            <button 
                onClick={onBack} 
                className="mt-8 w-full text-center text-gray-500 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.2em] flex items-center justify-center gap-3 group"
            >
                <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" /> 
                Abort Mission / Return to Base
            </button>
        </div>
        
        {/* Footer info */}
        <div className="absolute bottom-6 text-[10px] text-white/20 font-mono tracking-widest hidden md:block">
            SECURE CONNECTION ESTABLISHED • PORT 443 • LATENCY 12ms • {isSignUp ? 'MODE: REGISTRATION' : 'MODE: AUTHENTICATION'}
        </div>
    </div>
  );
};