import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const OpenSource: React.FC = () => {
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
    <div className="relative py-32 px-6 md:px-12 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300">
      {/* Background Gradient Blob */}
      <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,#ccff00,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,#4d6600,transparent_60%)] opacity-30 blur-[100px] pointer-events-none transition-colors duration-300" />

      <div 
        ref={sectionRef} 
        className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight text-black dark:text-white">
            Open Source<br/>
            <span className="font-light italic font-serif">is in our DNA</span>
          </h2>
          
          <div className="flex gap-12 mt-12 md:mt-0 relative">
             <div className="relative">
                <div className="text-6xl lg:text-7xl font-black font-display text-martian-green mix-blend-multiply dark:mix-blend-normal">123</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-2 text-black dark:text-white">projects with</div>
             </div>
             <div>
                <div className="text-6xl lg:text-7xl font-black font-display text-black dark:text-white">180K+</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-2 text-black dark:text-white">stars and climbing</div>
                {/* Decorative sparkle */}
                <div className="absolute -top-4 -right-8 text-4xl text-martian-green animate-pulse">✨</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PostCSS Card (Large) */}
          <div className="lg:col-span-2 border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12 bg-white dark:bg-[#111] flex flex-col md:flex-row gap-12 items-center md:items-start group hover:border-black dark:hover:border-white hover:shadow-xl transition-all duration-300 relative overflow-hidden">
             {/* Hover subtle glow */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-50/50 to-transparent dark:via-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
             
             <div className="flex-1 relative z-10">
                <div className="flex gap-2 mb-8">
                    {['PostCSS', 'CSS', 'JavaScript'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/20 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-white/5 transition-all duration-300 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black cursor-default">
                        {tag}
                      </span>
                    ))}
                </div>
                <h3 className="text-4xl font-bold font-display mb-6 group-hover:text-red-600 transition-colors text-black dark:text-white">PostCSS</h3>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                    One of the most popular and most depended-on npm libraries, PostCSS transforms CSS using an extensible plugins API. With more than 200 plugins, developers can lint CSS, support variables and mixins, and more.
                </p>
                <div className="flex gap-12 border-t border-gray-100 dark:border-white/10 pt-8">
                    <div>
                        <div className="text-4xl font-light font-display text-black dark:text-white">300M+</div>
                        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">monthly downloads</div>
                    </div>
                     <div>
                        <div className="text-4xl font-light font-display text-black dark:text-white">Used</div>
                        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">in Webpack and Stylelint</div>
                    </div>
                </div>
             </div>
             {/* Logo Representation - Geometric Alchemy Symbol style */}
             <div className="w-48 h-48 relative flex-shrink-0 opacity-90 group-hover:scale-105 transition-transform duration-500">
                 <div className="absolute inset-0 border-[8px] border-[#dd3a0a] rounded-full"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[70%] h-[70%] border-[4px] border-[#dd3a0a] rotate-45"></div>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[40%] h-[40%] rounded-full border-[4px] border-[#dd3a0a]"></div>
                 </div>
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#dd3a0a] rounded-full"></div>
             </div>
          </div>

           <div className="lg:col-span-2 text-center mt-12">
                <button className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-martian-green hover:text-black dark:hover:bg-martian-green dark:hover:text-black transition-colors duration-300">
                    All projects
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};