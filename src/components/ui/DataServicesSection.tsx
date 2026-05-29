'use client';

import React, { useEffect, useRef } from 'react';
import {
  Database,
  Filter,
  BarChart,
  LineChart,
  type LucideIcon
} from 'lucide-react';
import gsap from 'gsap';

const iconMap: Record<string, LucideIcon> = {
  Database,
  Filter,
  BarChart,
  LineChart
};

function Icon({ name, className }: { name: string; className?: string }) {
  const LucideComponent = iconMap[name];
  if (!LucideComponent) return null;
  return <LucideComponent className={className} />;
}

type DataServicesSectionProps = {
  data: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
};

export default function DataServicesSection({ data }: DataServicesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.waterfall-card');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">{data.title}</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">{data.description}</p>
        </div>
        
        {/* Uniform Grid Layout */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {data.items.map((item, idx) => (
            <div 
              key={idx} 
              className="waterfall-card flex flex-col w-full h-full p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#73B8BF]/40 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#73B8BF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shrink-0">
                <Icon name={item.icon} className="w-7 h-7 text-[#73B8BF]" />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-base text-gray-400 leading-relaxed flex-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
