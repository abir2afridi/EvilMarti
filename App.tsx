
import React, { useEffect, useRef, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { OpenSource } from './components/OpenSource';
import { Blog } from './components/Blog';
import { Login } from './components/Login';
import { ThemeProvider } from './components/ThemeProvider';
import { Twitter, Github, Linkedin, Youtube, ArrowRight, ArrowUpRight, Globe, Clock, Send } from 'lucide-react';

function AppContent() {
  const [view, setView] = useState<'home' | 'login'>('home');
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only set up observer if we are on home view
    if (view === 'login') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFooterVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.disconnect();
      }
    };
  }, [view]);

  const footerStyles = `
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    .animate-scanline {
      animation: scanline 4s linear infinite;
    }
    .bg-grid-tech {
      background-size: 50px 50px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    }
  `;

  // If login view is active, render Login component
  if (view === 'login') {
      return <Login onBack={() => setView('home')} />;
  }

  return (
    <div className="font-sans antialiased bg-gray-50 dark:bg-[#0a0a0a] text-martian-dark dark:text-white selection:bg-martian-red selection:text-white transition-colors duration-300">
      <style>{footerStyles}</style>
      <Navigation onLoginClick={() => setView('login')} />
      
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <OpenSource />
        <Blog />
      </main>

      <footer 
        ref={footerRef}
        className={`bg-black text-white pt-0 pb-0 overflow-hidden relative transition-all duration-1000 ease-out ${isFooterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-tech pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-martian-red/5 pointer-events-none"></div>
        
        {/* Scanning Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="w-full h-[20%] bg-gradient-to-b from-transparent via-martian-green/10 to-transparent animate-scanline blur-sm"></div>
        </div>

        {/* Top CTA Section - Massive Typography */}
        <div className="border-b border-white/10 relative z-10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 lg:py-32">
                 <div className="relative group cursor-pointer">
                    <h2 className="text-[12vw] leading-[0.8] font-display font-black tracking-tighter text-white mix-blend-exclusion group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-gray-400 group-hover:to-white transition-all duration-500">
                       LET'S BUILD
                    </h2>
                    <div className="flex items-center justify-between gap-8 mt-4">
                         <h2 className="text-[12vw] leading-[0.8] font-display font-black tracking-tighter text-white/40 group-hover:text-martian-red transition-colors duration-300">
                           THE FUTURE
                        </h2>
                        <button className="hidden lg:flex bg-martian-red text-black w-32 h-32 rounded-full items-center justify-center font-bold text-xl hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-[0_0_40px_rgba(255,46,46,0.4)]">
                            <ArrowUpRight size={48} strokeWidth={2.5} />
                        </button>
                    </div>
                 </div>
            </div>
        </div>

        {/* Main Grid Layout */}
        <div className="border-b border-white/10 relative z-10">
            <div className="max-w-[1400px] mx-auto border-x border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 divide-y md:divide-y-0 lg:divide-x divide-white/10">
                    
                    {/* Column 1: Identity & Socials (3 cols) */}
                    <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between min-h-[300px] relative group hover:bg-white/5 transition-colors">
                        <CornerMarkers />
                        <div>
                             <div className="font-display font-black text-2xl tracking-tight mb-6 flex items-center gap-2">
                                <span className="w-3 h-3 bg-martian-red rounded-sm animate-pulse"></span>
                                EVIL MARTIANS
                             </div>
                             <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
                                Product development studio for high-growth startups and enterprises.
                            </p>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <SocialIcon icon={<Twitter size={18} />} href="#" hoverColor="#1DA1F2" />
                            <SocialIcon icon={<Github size={18} />} href="#" hoverColor="#ffffff" />
                            <SocialIcon icon={<Linkedin size={18} />} href="#" hoverColor="#0A66C2" />
                            <SocialIcon icon={<Youtube size={18} />} href="#" hoverColor="#FF0000" />
                        </div>
                    </div>

                    {/* Column 2: Directory (3 cols) */}
                    <div className="lg:col-span-3 p-8 lg:p-10 relative group hover:bg-white/5 transition-colors">
                         <CornerMarkers />
                         <h3 className="text-xs font-mono font-bold text-martian-green uppercase tracking-widest mb-8 flex items-center gap-2">
                            [ DIRECTORY ]
                         </h3>
                         <ul className="grid grid-cols-1 gap-4">
                            <FooterLink href="#">Our Work</FooterLink>
                            <FooterLink href="#">Services</FooterLink>
                            <FooterLink href="#">Open Source</FooterLink>
                            <FooterLink href="#">Martian Blog</FooterLink>
                            <FooterLink href="#">Careers</FooterLink>
                         </ul>
                    </div>

                    {/* Column 3: Coordinates (3 cols) */}
                    <div className="lg:col-span-3 p-8 lg:p-10 relative group hover:bg-white/5 transition-colors">
                         <CornerMarkers />
                         <h3 className="text-xs font-mono font-bold text-martian-green uppercase tracking-widest mb-8 flex items-center gap-2">
                            [ TELEMETRY ]
                         </h3>
                         <ul className="space-y-5 font-mono text-sm">
                            <LiveTime city="New York" offset={-5} />
                            <LiveTime city="San Francisco" offset={-8} />
                            <LiveTime city="Tokyo" offset={9} />
                            <LiveTime city="Lisbon" offset={0} />
                            <li className="flex justify-between items-center pt-4 border-t border-white/10">
                                <span className="text-gray-400">Remote First</span>
                                <Globe size={14} className="text-white/50" />
                            </li>
                         </ul>
                    </div>

                    {/* Column 4: Uplink (3 cols) */}
                    <div className="lg:col-span-3 p-8 lg:p-10 relative group hover:bg-white/5 transition-colors bg-white/[0.02]">
                         <CornerMarkers />
                         <h3 className="text-xs font-mono font-bold text-martian-green uppercase tracking-widest mb-8 flex items-center gap-2">
                             [ UPLINK ]
                         </h3>
                         <p className="text-gray-400 text-sm mb-6">
                            Receive deep tech signals. No noise.
                         </p>
                         
                         <form className="relative mt-auto">
                            <input 
                                type="email" 
                                placeholder="ACCESS_CODE (EMAIL)" 
                                className="w-full bg-black/50 border border-white/20 px-4 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-martian-red focus:bg-white/5 transition-all font-mono"
                            />
                            <button type="submit" className="absolute right-2 top-2 bottom-2 aspect-square bg-white text-black hover:bg-martian-red transition-colors flex items-center justify-center">
                                <ArrowRight size={18} />
                            </button>
                         </form>
                         
                         <div className="mt-6 flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase">
                             <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></span>
                             System Operational
                         </div>
                    </div>

                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs text-gray-500 font-mono uppercase tracking-wider relative z-10">
             <div className="flex items-center gap-8">
                 <span>© 2025 Evil Martians</span>
                 <span className="hidden md:inline text-white/10">|</span>
                 <a href="#" className="hover:text-white transition-colors">Privacy</a>
                 <a href="#" className="hover:text-white transition-colors">Terms</a>
             </div>
             
             <div className="flex items-center gap-2 text-white/30">
                 <div className="h-px w-8 bg-white/20"></div>
                 <span>END OF TRANSMISSION</span>
                 <div className="h-px w-8 bg-white/20"></div>
             </div>
        </div>
        
      </footer>
    </div>
  );
}

// Helper Components

const CornerMarkers = () => (
    <>
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </>
);

const SocialIcon = ({ icon, href, hoverColor }: { icon: React.ReactNode; href: string; hoverColor: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <a 
            href={href} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
                backgroundColor: isHovered ? hoverColor : 'rgba(255,255,255,0.05)',
                color: isHovered ? (hoverColor === '#ffffff' ? '#000' : '#fff') : '#9ca3af',
                borderColor: isHovered ? hoverColor : 'rgba(255,255,255,0.1)'
            }}
            className="w-10 h-10 border flex items-center justify-center transition-all duration-300"
        >
            {icon}
        </a>
    );
};

const FooterLink = ({ href, children }: { href: string; children?: React.ReactNode }) => (
    <li>
        <a href={href} className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors text-sm font-medium border-b border-white/5 pb-2 hover:border-white/20 hover:pl-2 transition-all">
            <span>{children}</span>
            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-martian-red" />
        </a>
    </li>
);

const LiveTime = ({ city, offset }: { city: string; offset: number }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            // Calculate time based on offset
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const cityTime = new Date(utc + (3600000 * offset));
            
            setTime(cityTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [offset]);

    return (
        <li className="flex justify-between items-center group cursor-default">
            <span className="text-gray-400 group-hover:text-white transition-colors">{city}</span>
            <div className="flex items-center gap-2 text-white/60 group-hover:text-martian-red transition-colors bg-white/5 px-2 py-1 rounded-sm">
                <Clock size={12} />
                <span>{time}</span>
            </div>
        </li>
    );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
