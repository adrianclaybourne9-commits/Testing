'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  CreditCard,
  Landmark,
  Factory,
  HeartPulse,
  ShoppingCart,
  TrendingUp,
  PhoneCall,
  Users,
  Megaphone,
  Calendar,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  CreditCard,
  Landmark,
  Factory,
  HeartPulse,
  ShoppingCart,
  TrendingUp,
  PhoneCall,
  Users,
  Megaphone,
  Calendar
};

const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-400' },
  indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', dot: 'bg-indigo-400' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
  rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', dot: 'bg-rose-400' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-400' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', dot: 'bg-purple-400' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', dot: 'bg-pink-400' },
  teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', dot: 'bg-teal-400' },
};

function Icon({ name, className }: { name: string; className?: string }) {
  const LucideComponent = iconMap[name];
  if (!LucideComponent) return null;
  return <LucideComponent className={className} />;
}

type ServicesSolutionsPortfolioProps = {
  data: {
    title: string;
    description: string;
    items: Array<{
      domain: string;
      solution: string;
      description: string;
      icon: string;
      color: string;
      features: string[];
    }>;
  };
};

export default function ServicesSolutionsPortfolio({ data }: ServicesSolutionsPortfolioProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [data.items]);

  const activeItem = data.items[activeIndex] || data.items[0];
  const activeColors = colorMap[activeItem.color] || colorMap.blue;

  return (
    <section className="pt-24 pb-12 relative bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">{data.title}</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">{data.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">

          <div className="lg:w-2/5 hidden lg:block">
            <div className="sticky top-32 h-[500px] w-full rounded-[2rem] overflow-hidden flex items-center justify-center transition-all duration-700 ease-in-out border border-white/10 shadow-2xl" style={{ backgroundColor: '#111' }}>
              <div
                className={`absolute inset-0 opacity-40 transition-colors duration-1000 blur-3xl ${activeColors.bg.replace('/20', '/40')}`}
              />

              <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 scale-100 hover:scale-105">
                <div className={`w-32 h-32 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md shadow-2xl transition-colors duration-700 ${activeColors.bg} border border-white/10`}>
                  <Icon name={activeItem.icon} className={`w-16 h-16 transition-colors duration-700 ${activeColors.text}`} />
                </div>
                <h3 className={`text-xl font-bold uppercase tracking-[0.2em] transition-colors duration-700 ${activeColors.text}`}>
                  {activeItem.domain}
                </h3>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 space-y-24 pb-0">
            {data.items.map((item, idx) => {
              const colors = colorMap[item.color] || colorMap.blue;
              const isActive = activeIndex === idx;

              return (
                <div
                  key={idx}
                  data-index={idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`transition-all duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-30 lg:opacity-40 hover:opacity-100'}`}
                >
                  <div className="lg:hidden flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.text}`}>
                      <Icon name={item.icon} className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>{item.domain}</span>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 text-white">{item.solution}</h3>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl">{item.description}</p>

                  <div className="space-y-4 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    {item.features.map((feature, fIdx) => {
                      const [boldPart, rest] = feature.split(':');
                      return (
                        <div key={fIdx} className="flex gap-4">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 ${colors.dot}`} />
                          <p className="text-base text-gray-300 leading-relaxed">
                            {rest ? (
                              <>
                                <strong className="text-white">{boldPart}:</strong>
                                {rest}
                              </>
                            ) : (
                              feature
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
