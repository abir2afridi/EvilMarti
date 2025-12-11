import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Blog: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] py-32 px-6 md:px-12 border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div 
        ref={sectionRef} 
        className={`max-w-7xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[0.95] mb-20 text-center md:text-left tracking-tight text-black dark:text-white">
          Read our legendary <span className="font-bold border-b-[6px] border-martian-dark dark:border-white inline-block leading-[0.8]">blog</span>,<br/>
          meet us at <span className="font-bold">events</span><br/>
          around the world
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Blog Post 1 - Retro Office */}
            <div className="group cursor-pointer relative overflow-hidden rounded-2xl h-[520px] bg-[#3a4a6b] flex flex-col justify-end p-10 text-white transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
                {/* Background Art */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3a4a6b] via-[#3a4a6b]/80 to-transparent z-10 opacity-90"></div>
                
                {/* Image Asset */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1587829745501-f9b502d57a73?auto=format&fit=crop&q=80&w=1000"
                        alt="Retro Tech"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                    />
                </div>

                <div className="absolute top-8 left-8 flex gap-3 z-20">
                    <span className="bg-[#cc9933] text-black text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">Blog Post</span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm border border-white/20">Open Source</span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm border border-white/20">Ruby</span>
                </div>
                
                <div className="relative z-20">
                    <h3 className="text-3xl md:text-4xl font-bold font-display leading-[1.1] mb-4 group-hover:underline decoration-4 underline-offset-4 decoration-[#cc9933]">
                        Unparser: real life lessons migrating Ruby tools from Parser to Prism
                    </h3>
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-white/70 font-mono tracking-wide">November 25, 2025</p>
                         <ArrowRight className="w-5 h-5 text-[#cc9933] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                </div>
            </div>

            {/* Blog Post 2 - Design Dark */}
            <div className="group cursor-pointer relative overflow-hidden rounded-2xl h-[520px] bg-[#050505] flex flex-col justify-end p-10 text-white transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
                 <div className="absolute top-8 left-8 flex gap-3 z-20">
                    <span className="bg-white text-black text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">Blog Post</span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm border border-white/20">Design</span>
                </div>

                 {/* Abstract Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1000"
                        alt="Abstract Fluid"
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>

                <div className="relative z-20">
                    <h3 className="text-3xl md:text-4xl font-bold font-display leading-[1.1] mb-4 group-hover:underline decoration-4 underline-offset-4 decoration-purple-500">
                        Vibecoding tools can learn from design UX and win over everyone
                    </h3>
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-white/70 font-mono tracking-wide">November 19, 2025</p>
                        <ArrowRight className="w-5 h-5 text-purple-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                </div>
            </div>

            {/* Event Post - Blue Vibrant */}
            <div className="group cursor-pointer rounded-2xl bg-[#2b5bf5] p-10 h-[420px] flex flex-col justify-between text-white relative overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:bg-[#1a4bd8]">
                 <div className="flex gap-3 flex-wrap relative z-10">
                    <span className="bg-white text-blue-600 text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">Blog Post</span>
                    <span className="bg-blue-800/50 text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">Infrastructure</span>
                </div>
                
                {/* Background Image */}
                 <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
                        alt="Global Network"
                        className="w-full h-full object-cover opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-700 grayscale"
                    />
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-10 text-[12rem] font-black tracking-tighter select-none scale-150 group-hover:scale-[1.6] transition-transform duration-700 pointer-events-none">
                    SERA
                </div>
                
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-4">
                        Real-time magic, no elixirs: optimizing Sera with AnyCable
                    </h3>
                    <p className="text-sm text-white/70 font-mono tracking-wide">March 1, 2023</p>
                </div>
            </div>

            {/* Blog Post - Yellow Warning */}
             <div className="group cursor-pointer rounded-2xl bg-[#fff566] p-10 h-[420px] flex flex-col justify-between text-black relative overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:bg-[#ffed4d]">
                 <div className="flex gap-3 flex-wrap relative z-10">
                    <span className="bg-martian-green text-black text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">Blog Post</span>
                    <span className="bg-black/5 text-black text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">Design</span>
                </div>

                <div className="absolute inset-0 overflow-hidden">
                     <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800"
                        alt="Minimal Yellow"
                        className="absolute -right-20 -bottom-20 w-[80%] h-[80%] object-contain opacity-20 mix-blend-multiply rotate-12 group-hover:rotate-6 group-hover:scale-105 transition-transform duration-700"
                     />
                </div>
                
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-4">
                        Handling errors in a non-geek interface
                    </h3>
                    <p className="text-sm text-black/60 font-mono tracking-wide">October 31, 2016</p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};