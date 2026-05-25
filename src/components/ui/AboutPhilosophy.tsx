'use client';

import React, { useEffect, useRef } from 'react';
import { TrendingUp, Target, ShieldCheck, type LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Target
};

type AboutPhilosophyProps = {
  data: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    partnerCallout: {
      title: string;
      tags: string[];
      description: string;
    };
  };
};

export default function AboutPhilosophy({ data }: AboutPhilosophyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.philosophy-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );

      gsap.fromTo(
        '.partner-callout',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
              {data.title}
            </h2>
            <p className="text-xl text-gray-400 font-light mb-12">
              {data.subtitle}
            </p>

            <div className="space-y-12">
              {data.items.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || TrendingUp;
                return (
                  <div key={idx} className="philosophy-item flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="partner-callout relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-blue-500/30 via-green-500/20 to-red-500/30 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[#0a0a0a] rounded-[2.5rem] m-[1px]" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-green-500/5 to-red-500/10 rounded-[2.5rem] mix-blend-screen" />
              
              <div className="relative z-10 p-10 md:p-14 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 mb-8">
                  {data.partnerCallout.title}
                </h3>
                
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {data.partnerCallout.tags.map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-md mx-auto">
                  {data.partnerCallout.description}
                </p>

                <MagneticButton strength={0.2}>
                  <a href="/PartnerPlatforms" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-gray-900 bg-white rounded-full hover:bg-gray-200 transition-colors pointer-events-none">
                    Explore Partner Platforms
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
