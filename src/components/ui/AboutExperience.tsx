'use client';

import React, { useEffect, useRef } from 'react';
import { 
  Building, 
  Globe, 
  Link as LinkIcon, 
  CreditCard, 
  TrendingUp, 
  Database, 
  PieChart, 
  Users, 
  ShieldCheck, 
  type LucideIcon 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Building,
  Globe,
  Link: LinkIcon,
  CreditCard,
  TrendingUp,
  Database,
  PieChart,
  Users,
  ShieldCheck
};

type AboutExperienceProps = {
  data: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
};

export default function AboutExperience({ data }: AboutExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: (idx % 3) * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative bg-gray-950 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20 experience-header">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-6">
            <Building className="w-3.5 h-3.5" />
            Track Record
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            
            return (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 flex flex-col items-start gap-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-blue-500 group-hover:via-cyan-500 group-hover:to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-t-3xl" />
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-500 shadow-xl">
                  <IconComponent className="w-7 h-7 text-blue-400 group-hover:text-cyan-400 transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-blue-200 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
