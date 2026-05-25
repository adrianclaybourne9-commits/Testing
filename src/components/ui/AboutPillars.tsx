'use client';

import React, { useEffect, useRef } from 'react';
import { Code, Handshake, Zap, type LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Code,
  Handshake,
  Zap
};

const colorMap: Record<string, { bg: string; text: string; dot: string; gradient: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400', gradient: 'from-blue-500/20 to-blue-500/5' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-400', gradient: 'from-green-500/20 to-green-500/5' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400', gradient: 'from-amber-500/20 to-amber-500/5' },
};

type AboutPillarsProps = {
  data: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
      color: string;
      features: string[];
    }>;
  };
};

export default function AboutPillars({ data }: AboutPillarsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.pillar-card');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative bg-gray-950">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white">{data.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Code;
            const colors = colorMap[item.color] || colorMap.blue;

            return (
              <div 
                key={idx} 
                className="pillar-card relative p-[1px] rounded-3xl overflow-hidden group bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-colors duration-500"
              >
                <div className="absolute inset-0 z-0 bg-gray-900 rounded-3xl" />
                <div className={`absolute inset-0 z-0 bg-gradient-to-b ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`} />
                
                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${colors.bg} border border-white/5`}>
                    <IconComponent className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 text-base mb-8">
                    {item.description}
                  </p>

                  <div className="space-y-4 bg-black/20 p-6 rounded-2xl border border-white/5 flex-grow flex flex-col justify-start">
                    {item.features.map((feature, fIdx) => {
                      const splitIdx = feature.indexOf(':');
                      if (splitIdx !== -1) {
                        const boldPart = feature.substring(0, splitIdx);
                        const rest = feature.substring(splitIdx + 1);
                        return (
                          <div key={fIdx} className="flex gap-3 items-start">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${colors.dot}`} />
                            <p className="text-sm text-gray-300 leading-relaxed">
                              <strong className="text-white font-semibold">{boldPart}:</strong>
                              {rest}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <div key={fIdx} className="flex gap-3 items-start">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${colors.dot}`} />
                          <p className="text-sm text-gray-300 leading-relaxed">{feature}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
