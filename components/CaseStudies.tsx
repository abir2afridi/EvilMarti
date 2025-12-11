import React, { useEffect, useRef, useState } from 'react';
import { CaseStudy } from '../types';

const cases: CaseStudy[] = [
  {
    id: '1',
    clientName: 'Bolt.new',
    logoText: 'bolt.new',
    description: "Evil Martians and StackBlitz: tech partners since 2021. Our engineers helped scale their WebContainers platform from pioneering browser IDE to bolt.new—the AI-powered tool that hit $20M+ ARR in just 2 months and disrupted the industry of vibe coding.",
    tags: ['Rails', 'React', 'WebSocket'],
    stats: [
        { label: 'total funding', value: '$113M' },
        { label: 'by GV', value: 'Backed' }
    ],
    featured: true
  },
  {
     id: '2',
     clientName: 'Teleport',
     logoText: 'Teleport',
     description: "Evil Martians has partnered with Teleport since 2020, engineering enterprise-ready features for their open-source infrastructure access platform. Our engineering and design teams work across the platform.",
     tags: ['Developer Tools', 'Go', 'Wasm', 'Jamstack'],
     stats: [
         { label: 'by Kleiner Perkins, Y Combinator', value: 'Backed' }
     ]
  },
  {
    id: '3',
    clientName: 'Recraft',
    logoText: 'R',
    description: "Recraft is shaping the future of AI-driven creativity. Our collaboration introduced a custom Discord bot, streamlining client acquisition and engagement.",
    tags: ['Business Tools', 'AI', 'JavaScript', 'LLMs', 'Neural Networks'],
    stats: [
        { label: 'total funding', value: '$42M' },
        { label: 'users', value: '1M+' }
    ]
  },
   {
    id: '4',
    clientName: 'Wallarm',
    logoText: 'wallarm',
    description: "We helped Wallarm, an API security platform, redesign and optimize their Go-based event processing pipeline that handles critical security data through NATS messaging.",
    tags: ['Developer Tools', 'Cyber Security', 'Performance & scalability', 'Ruby', 'Rails', 'PostgreSQL'],
    stats: [
        { label: 'Protected apps and APIs', value: '20,000+' }
    ]
  }
];

export const CaseStudies: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Observer for Cards Grid
    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            gridObserver.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (containerRef.current) {
      gridObserver.observe(containerRef.current);
    }
    
    // Observer for Header
    const headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsHeaderVisible(true);
              headerObserver.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
  
      if (headerRef.current) {
        headerObserver.observe(headerRef.current);
      }

    return () => {
        gridObserver.disconnect();
        headerObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] py-24 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={headerRef} 
          className={`mb-24 max-w-4xl transition-all duration-1000 ease-out ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.9] mb-12 tracking-tight text-black dark:text-white">
            We build<br/>
            <span className="font-bold">developer tools</span> that<br/>
            <span className="font-bold text-martian-red">developers love</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            We work with 40+ early-stage startups each year. Investors from Conviction, Blossom Capital, SignalFire, Heavybit, Uncork Capital recommend us to their portfolio companies.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {cases.map((project, idx) => (
             <div 
                key={project.id} 
                style={{ transitionDelay: isVisible ? `${idx * 150}ms` : '0ms' }}
                className={`flex flex-col justify-between border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12 transition-all duration-700 ease-out hover:duration-300 hover:shadow-2xl hover:border-black/20 dark:hover:border-white/20 hover:-translate-y-1 bg-white dark:bg-[#111] group ${project.featured ? 'lg:row-span-2 bg-gradient-to-br from-blue-50 to-indigo-50/30 dark:from-blue-900/20 dark:to-indigo-900/20' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
             >
                <div>
                  <div className="flex flex-wrap gap-2 mb-12">
                      {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/20 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-white/5 transition-all duration-300 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black cursor-default">
                              {tag}
                          </span>
                      ))}
                  </div>

                  <div className="mb-10 h-16 flex items-center text-black dark:text-white">
                      {project.logoText === 'R' ? (
                          <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black text-4xl font-serif italic shadow-lg">R</div>
                      ) : project.logoText === 'bolt.new' ? (
                           <div className="text-5xl font-black italic tracking-tighter">bolt<span className="text-blue-600 dark:text-blue-400">.new</span></div>
                      ) : project.logoText === 'Teleport' ? (
                           <div className="flex items-center gap-2 text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                               <div className="w-10 h-10 border-4 border-slate-800 dark:border-slate-100 rounded-full border-t-transparent animate-spin-slow" />
                               Teleport
                           </div>
                      ) : project.logoText === 'wallarm' ? (
                          <div className="text-5xl font-bold tracking-tight text-orange-600 dark:text-orange-500">wallarm</div>
                      ) : (
                          <h3 className="text-4xl font-bold font-display italic">{project.logoText}</h3>
                      )}
                  </div>

                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-12 font-light">
                      {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-gray-100/50 dark:border-white/10">
                    <div className="flex flex-wrap gap-x-12 gap-y-4">
                        {project.stats.map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl md:text-5xl font-light font-display text-black dark:text-white mb-1">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-16 text-center">
            <button className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-martian-red dark:hover:bg-martian-red dark:hover:text-white transition-colors duration-300">
                All clients
            </button>
        </div>
      </div>
    </div>
  );
};