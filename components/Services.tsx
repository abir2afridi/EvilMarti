import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
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
    <div className="bg-[#f2fdf9] dark:bg-[#050505] text-black dark:text-white pt-48 pb-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-300">
       {/* Decorative gradient blur */}
       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,#a7f3d0,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,#1e293b,transparent_70%)] opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none blur-3xl transition-colors duration-300"></div>

      <div 
        ref={sectionRef} 
        className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.9] mb-12 tracking-tight dark:text-white">
              Solve your<br/>
              <span className="font-bold">problems,</span><br/>
              <span className="font-bold relative inline-block">
                ship value
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-black dark:text-white" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-300 mb-12 font-light">
              Hire us to take your product from PoC to MVP, iterate to PMF and scale efficiently through explosive growth.
            </p>

            <button className="group bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-lg font-bold text-lg hover:bg-martian-red dark:hover:bg-martian-red dark:hover:text-white transition-all duration-300 inline-flex items-center gap-3">
              All services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-2">
             <ServiceItem title="Design engineering" />
             <ServiceItem title="AI integration" />
             <ServiceItem title="SDKs, extensions & plugins" />
             <ServiceItem title="Real-time features" />
             <ServiceItem title="Performance & scalability" />
             <ServiceItem title="Devtools startup advisory" />
          </div>

        </div>
      </div>
    </div>
  );
};

const ServiceItem: React.FC<{ title: string }> = ({ title }) => (
  <div className="group cursor-pointer border-b border-black/10 dark:border-white/10 py-6 md:py-8 flex items-center justify-between hover:border-black dark:hover:border-white transition-colors duration-300">
    <h3 className="text-2xl md:text-4xl font-display font-medium group-hover:translate-x-4 transition-transform duration-300">
      {title}
    </h3>
    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-martian-red" />
  </div>
);