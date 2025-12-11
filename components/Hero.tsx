import React, { useEffect, useRef, useState, useMemo } from 'react';

// Custom CSS for Glitch Animation & HUD
const styles = `
@keyframes glitch-1 {
  0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); opacity: 0; }
  5% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); opacity: 1; }
  10% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); opacity: 1; }
  15% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); opacity: 1; }
  20% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); opacity: 1; }
  25% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); opacity: 1; }
  30% { clip-path: inset(0% 0 0% 0); transform: translate(0, 0); opacity: 0; }
  100% { clip-path: inset(0% 0 0% 0); transform: translate(0, 0); opacity: 0; }
}
@keyframes glitch-2 {
  0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); opacity: 0; }
  5% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); opacity: 1; }
  10% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); opacity: 1; }
  15% { clip-path: inset(30% 0 20% 0); transform: translate(1px, -2px); opacity: 1; }
  20% { clip-path: inset(10% 0 80% 0); transform: translate(-1px, 1px); opacity: 1; }
  25% { clip-path: inset(40% 0 10% 0); transform: translate(2px, 1px); opacity: 1; }
  30% { clip-path: inset(0% 0 0% 0); transform: translate(0, 0); opacity: 0; }
  100% { clip-path: inset(0% 0 0% 0); transform: translate(0, 0); opacity: 0; }
}
@keyframes scan-vertical {
  0% { top: -100%; }
  100% { top: 100%; }
}
.animate-glitch-1 {
  animation: glitch-1 5s infinite linear alternate-reverse;
}
.animate-glitch-2 {
  animation: glitch-2 5s infinite linear alternate-reverse;
  animation-delay: 0.2s;
}
.animate-scan-vertical {
  animation: scan-vertical 2s linear infinite;
}
`;

interface GlitchTextProps {
  text: string;
  baseClass: string;
  mainClass?: string;
  className?: string;
  delay?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, baseClass, mainClass = "text-white", className = "", delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    let interval: any;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    
    // Initial random state
    setDisplayText(text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));

    const startTimeout = setTimeout(() => {
        let iteration = 0;
        
        interval = setInterval(() => {
            setDisplayText(prev => 
                text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setIsScrambling(false);
            }

            iteration += 1 / 3;
        }, 30);
    }, delay);

    return () => {
        clearTimeout(startTimeout);
        if (interval) clearInterval(interval);
    }
  }, [text, delay]);

  return (
    <div className={`relative inline-block group ${className}`}>
      {/* Main Text */}
      <h1 className={`${baseClass} ${mainClass} relative z-10`}>
        {isScrambling ? displayText : text}
      </h1>
      
      {/* Glitch Layers - Only show when text is stable */}
      {!isScrambling && (
        <>
            <h1 
                className={`${baseClass} absolute inset-0 z-0 text-red-600 opacity-0 animate-glitch-1 mix-blend-screen pointer-events-none`}
                aria-hidden="true"
                style={{ clipPath: 'inset(0 0 0 0)' }}
            >
                {text}
            </h1>

            <h1 
                className={`${baseClass} absolute inset-0 z-0 text-cyan-400 opacity-0 animate-glitch-2 mix-blend-screen pointer-events-none`}
                aria-hidden="true"
                style={{ clipPath: 'inset(0 0 0 0)' }}
            >
                {text}
            </h1>
        </>
      )}
    </div>
  );
};

// Scramble Text Effect
const ScrambleText = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [start, setStart] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!start) return;
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, start]);

  return <span className={className}>{displayText}</span>;
};

// HUD Overlay Component
const HeroHUD = () => (
  <div className="absolute inset-0 pointer-events-none z-30 p-6 md:p-12 flex flex-col justify-between select-none mix-blend-screen overflow-hidden">
    {/* Top Row */}
    <div className="flex justify-between items-start">
       {/* Top Left */}
       <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white"></div>
              <div className="h-px w-12 bg-white/30"></div>
          </div>
          <div className="text-[10px] font-mono text-white/50 tracking-[0.2em] ml-4">
             SYS.INIT.V2.5
          </div>
       </div>

       {/* Top Right */}
       <div className="flex items-start gap-2">
           <div className="text-[10px] font-mono text-white/50 tracking-[0.2em] text-right hidden md:block">
              SIGNAL<br/>STRONG
           </div>
           <div className="w-1.5 h-1.5 border border-white/50"></div>
       </div>
    </div>

    {/* Bottom Row */}
    <div className="flex justify-between items-end">
       {/* Bottom Left */}
       <div className="flex items-end gap-2">
          <div className="w-1.5 h-1.5 border border-white/50"></div>
          <div className="text-[10px] font-mono text-white/50 tracking-[0.2em] hidden md:block">
              LAT: 40.7128<br/>LON: -74.0060
          </div>
       </div>
       
       {/* Bottom Right - Scroll Indicator */}
       <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-3 text-[10px] font-mono text-white/50 tracking-[0.2em] uppercase">
             <span className="animate-pulse">Scroll</span>
             <div className="h-16 w-px bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[30%] bg-white animate-scan-vertical"></div>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="h-px w-12 bg-white/30"></div>
             <div className="w-1.5 h-1.5 bg-white"></div>
          </div>
       </div>
    </div>
  </div>
);

// Efficient Star Layer using box-shadow
const StarLayer = React.memo(({ count, size, opacity, className }: { count: number; size: number; opacity: number, className?: string }) => {
  const boxShadow = useMemo(() => {
    let val = '';
    for (let i = 0; i < count; i++) {
      val += `${Math.random() * 300}vw ${Math.random() * 300}vh white, `;
    }
    return val.slice(0, -2);
  }, [count]);

  return (
    <div className={className} style={{ width: size, height: size, boxShadow, opacity }}></div>
  );
});

export const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const starsFarRef = useRef<HTMLDivElement>(null);
  const starsMidRef = useRef<HTMLDivElement>(null);
  const starsNearRef = useRef<HTMLDivElement>(null);
  const redPlanetRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const bottomPlanetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Animation state refs
  const targetMouseRef = useRef({ x: 0, y: 0 }); // Target mouse position
  const currentMouseRef = useRef({ x: 0, y: 0 }); // Current interpolated mouse position
  const scrollRef = useRef(0);
  const requestRef = useRef<number>(0);
  
  // Entry animation state
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger entry animation after mount
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseRef.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2
      };

      // Update Spotlight Position directly for responsiveness
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.06), transparent 40%)`;
      }
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateAnimation = () => {
      const time = performance.now() * 0.0005; 
      
      // Smoothly interpolate mouse values
      currentMouseRef.current.x = lerp(currentMouseRef.current.x, targetMouseRef.current.x, 0.05);
      currentMouseRef.current.y = lerp(currentMouseRef.current.y, targetMouseRef.current.y, 0.05);

      const { x: mx, y: my } = currentMouseRef.current;
      const sy = scrollRef.current;

      // Parallax Factors with Eased Mouse Values
      if (bgRef.current) bgRef.current.style.transform = `translate3d(${mx * -3}px, ${my * -3}px, 0)`;
      
      // Nebula drifts with time and reacts slightly to mouse
      if (nebulaRef.current) nebulaRef.current.style.transform = `translate3d(${mx * -8 + Math.sin(time * 0.5) * 20}px, ${my * -8 + Math.cos(time * 0.5) * 20}px, 0) rotate(${time * 2}deg)`;
      
      // Deep Space Parallax
      if (starsFarRef.current) starsFarRef.current.style.transform = `translate3d(${mx * -10 - (time * 5)}px, ${my * -10 + sy * 0.05}px, 0)`;
      if (starsMidRef.current) starsMidRef.current.style.transform = `translate3d(${mx * -20 - (time * 15)}px, ${my * -20 + sy * 0.1}px, 0)`;
      if (starsNearRef.current) starsNearRef.current.style.transform = `translate3d(${mx * -40 - (time * 30)}px, ${my * -40 + sy * 0.2}px, 0)`;
      
      // 3D Spheres & Foreground - Add Rotation for Depth
      if (redPlanetRef.current) {
         redPlanetRef.current.style.transform = `translate3d(${mx * -45}px, ${my * -45 + sy * 0.15}px, 0) rotateY(${mx * 10}deg) rotateX(${-my * 10}deg)`;
      }
      
      if (orbitsRef.current) {
         orbitsRef.current.style.transform = `translate3d(${mx * -25}px, ${my * -25}px, 0) rotate(${sy * 0.02 + time * 5}deg) rotateX(${my * 15}deg) rotateY(${mx * 15}deg)`;
      }

      if (bottomPlanetRef.current) {
          bottomPlanetRef.current.style.transform = `translate3d(${mx * -70}px, ${my * -70 + sy * -0.1}px, 0) rotateY(${mx * 15}deg) rotateX(${-my * 15}deg)`;
      }
      
      if (contentRef.current) contentRef.current.style.transform = `translate3d(${mx * -12}px, ${my * -12}px, 0)`;

      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[120vh] bg-[#0a0a0a] overflow-hidden flex flex-col perspective-1000 -mb-32 cursor-crosshair">
       <style>{styles}</style>
       
       <HeroHUD />

       {/* Background Layers */}
       <div ref={bgRef} className="absolute inset-0 bg-[#0a0a0a] pointer-events-none will-change-transform">
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
          
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,#1a0b2e_0%,transparent_50%)] opacity-40"></div>
          <div className="absolute top-[20%] right-[-20%] w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,#0f172a_0%,transparent_60%)] opacity-30"></div>
       </div>

       {/* Spotlight Effect */}
       <div ref={spotlightRef} className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"></div>

       {/* Nebulae Layer */}
       <div ref={nebulaRef} className="absolute inset-[-50%] w-[200%] h-[200%] pointer-events-none will-change-transform opacity-30 mix-blend-screen">
          <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-purple-900/40 rounded-full blur-[100px]"></div>
          <div className="absolute top-[50%] right-[30%] w-[50vw] h-[50vw] bg-blue-900/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] left-[20%] w-[30vw] h-[30vw] bg-indigo-900/20 rounded-full blur-[80px]"></div>
       </div>

       {/* Dynamic Star Layers */}
       <div ref={starsFarRef} className="absolute top-[-50vh] left-[-50vw] w-[200vw] h-[200vh] pointer-events-none will-change-transform">
           <StarLayer count={300} size={1} opacity={0.4} />
       </div>
       <div ref={starsMidRef} className="absolute top-[-50vh] left-[-50vw] w-[200vw] h-[200vh] pointer-events-none will-change-transform">
           <StarLayer count={150} size={2} opacity={0.6} />
       </div>
       <div ref={starsNearRef} className="absolute top-[-50vh] left-[-50vw] w-[200vw] h-[200vh] pointer-events-none will-change-transform">
           <StarLayer count={50} size={3} opacity={0.9} />
       </div>

       {/* Orbits */}
       <div ref={orbitsRef} className="absolute inset-0 pointer-events-none will-change-transform opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white rounded-full scale-150 md:scale-100"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-dashed border-white/50 rounded-full rotate-45"></div>
       </div>

       {/* Red Planet */}
       <div ref={redPlanetRef} className="absolute top-[12%] right-[5%] md:right-[15%] z-10 will-change-transform">
           {/* Glow behind planet */}
           <div className="absolute inset-0 bg-red-600 blur-[100px] opacity-30 scale-150 rounded-full animate-pulse-slow"></div>
           <div className="relative w-32 h-32 md:w-56 md:h-56 group cursor-pointer transition-transform duration-500 hover:scale-105">
               <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ff4d4d_0%,#cc0000_50%,#4a0000_100%)] shadow-[0_0_50px_rgba(220,38,38,0.4)] transition-shadow duration-500 group-hover:shadow-[0_0_80px_rgba(220,38,38,0.6)]"></div>
               {/* Texture & Atmosphere */}
               <div className="absolute inset-0 rounded-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
               <div className="absolute -inset-4 rounded-full bg-red-500/10 blur-xl group-hover:bg-red-500/20 transition-colors"></div>
           </div>
       </div>

       {/* Bottom Planet (Saturn-like) */}
       <div ref={bottomPlanetRef} className="absolute bottom-[20%] left-[10%] z-10 will-change-transform hidden md:block">
            <div className="relative w-48 h-48 opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-105">
                 <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#eab308_0%,#a16207_60%,#422006_100%)] shadow-2xl"></div>
                 {/* Rings */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[30%] border-[12px] border-white/10 rounded-[50%] -rotate-12 border-t-white/20 border-l-white/5"></div>
            </div>
       </div>

       {/* Main Content */}
       <div ref={contentRef} className="relative z-20 container mx-auto px-6 pt-24 md:pt-32 flex flex-col items-center min-h-screen">
            
            {/* Inner Wrapper for Fade Animation */}
            <div className={`w-full max-w-5xl relative transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                {/* Intro Line */}
                <div className="mb-8 pl-2 md:pl-20 border-l-2 border-martian-red/50">
                    <p className="text-white/80 font-sans text-sm md:text-lg max-w-xs md:max-w-md leading-relaxed tracking-wide pl-6 h-[4.5em]">
                        <ScrambleText text="We design and develop high performance developer tools for startups and enterprises." delay={800} />
                    </p>
                </div>

                {/* Main Title Block */}
                <div className="relative leading-[0.85] font-black tracking-[-0.04em]">
                    {/* Row 1 */}
                    <GlitchText 
                      text="EVIL"
                      baseClass="text-[16vw] md:text-[140px] lg:text-[180px] font-display select-none ml-[-0.05em]"
                      mainClass="text-white mix-blend-difference"
                      delay={0}
                    />

                    {/* Row 2 */}
                    <div className="flex items-center gap-4 md:gap-8 ml-[10%] md:ml-[15%] relative">
                         <GlitchText 
                            text="MARTI"
                            baseClass="text-[16vw] md:text-[140px] lg:text-[180px] font-display select-none z-20"
                            mainClass="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400"
                            delay={200}
                         />
                         
                         {/* Japanese text vertically aligned next to MARTI */}
                         <div className="hidden md:flex flex-col gap-0 text-white font-black text-4xl md:text-6xl leading-none opacity-80 pt-4 z-0">
                            <span className="drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">邪</span>
                            <span>悪</span>
                         </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex justify-end pr-[5%] md:pr-[15%] relative">
                        <GlitchText 
                           text="ANS"
                           baseClass="text-[16vw] md:text-[140px] lg:text-[180px] font-display select-none z-10"
                           mainClass="text-white"
                           delay={400}
                        />
                         {/* Large Japanese Character Overlay */}
                        <div className="absolute -right-4 -bottom-10 md:right-0 md:bottom-0 text-[#0a0a0a] text-[25vw] md:text-[240px] font-black leading-none -z-10 select-none pointer-events-none" 
                             style={{ textShadow: '-1px -1px 0 rgba(255,255,255,0.2), 1px -1px 0 rgba(255,255,255,0.2), -1px 1px 0 rgba(255,255,255,0.2), 1px 1px 0 rgba(255,255,255,0.2)' }}>
                           火星人
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex-grow"></div>
            
       </div>
       
       {/* Bottom Fog Fade to match next section */}
       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none z-20 transition-colors duration-300"></div>
    </div>
  );
};