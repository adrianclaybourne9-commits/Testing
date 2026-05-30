'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Briefcase,
  CalendarClock,
  BrainCircuit,
  ArrowRight,
  type LucideIcon
} from 'lucide-react';
import gsap from 'gsap';

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  CalendarClock,
  BrainCircuit,
  ArrowRight
};

function Icon({ name, className }: { name: string; className?: string }) {
  const LucideComponent = iconMap[name];
  if (!LucideComponent) return null;
  return <LucideComponent className={className} />;
}

type CustomAiSectionProps = {
  data: {
    title: string;
    description: string;
    categories: Array<{
      title: string;
      icon: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    }>;
  };
};

export default function CustomAiSection({ data }: CustomAiSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: sectionRef.current }
    );
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="py-32 relative bg-gray-950 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#73B8BF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">{data.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed">{data.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          <div className="lg:w-1/3 space-y-4">
            {data.categories.map((cat, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden group ${isActive
                    ? 'bg-white/[0.05] border-[#73B8BF]/50 shadow-[0_0_30px_rgba(115,184,191,0.15)]'
                    : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/20'
                    }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#73B8BF]/10 to-transparent opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'group-hover:opacity-50'}`} />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-[#73B8BF]/20 text-[#73B8BF]' : 'bg-gray-800 text-gray-500'
                        }`}>
                        <Icon name={cat.icon} className="w-6 h-6" />
                      </div>
                      <h3 className={`text-lg font-bold transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {cat.title.split('&')[0]} <br />
                        {cat.title.includes('&') && <span className="text-sm font-medium text-gray-500">& {cat.title.split('&')[1]}</span>}
                      </h3>
                    </div>

                    <div className={`transition-all duration-500 transform ${isActive ? 'translate-x-0 opacity-100 text-[#73B8BF]' : '-translate-x-4 opacity-0'}`}>
                      <Icon name="ArrowRight" className="w-5 h-5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:w-2/3">
            <div className="h-full bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2rem] border border-white/5 p-8 md:p-12 backdrop-blur-sm">
              <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full content-start">
                {data.categories[activeTab].items.map((item, i) => (
                  <div
                    key={`${activeTab}-${i}`}
                    className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#73B8BF]/30 transition-colors group"
                  >
                    <div className="absolute top-0 left-6 w-12 h-[1px] bg-gradient-to-r from-[#73B8BF] to-transparent opacity-50 group-hover:w-24 transition-all duration-500" />
                    <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#73B8BF] shadow-[0_0_10px_#73B8BF]" />
                      {item.title}
                    </h4>
                    <p className="text-gray-200 leading-relaxed text-base group-hover:text-white transition-colors">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
