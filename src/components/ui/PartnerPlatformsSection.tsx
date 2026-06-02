'use client';

import React, { useEffect, useRef } from 'react';
import {
  Users,
  Landmark,
  TrendingUp,
  Monitor,
  Settings,
  Wrench,
  Link as LinkIcon,
  ArrowRightLeft,
  LifeBuoy,
  type LucideIcon,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Users,
  Landmark,
  TrendingUp,
  Monitor,
  Settings,
  Wrench,
  Link: LinkIcon,
  ArrowRightLeft,
  LifeBuoy
};

function Icon({ name, className }: { name: string; className?: string }) {
  const LucideComponent = iconMap[name];
  if (!LucideComponent) return null;
  return <LucideComponent className={className} />;
}

type PartnerPlatformsSectionProps = {
  data: {
    title: string;
    description: string;
    pillars: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    portfolio: {
      title: string;
      description: string;
      categories: Array<{
        title: string;
        items: string[];
      }>;
    };
    services: {
      title: string;
      description: string;
      items: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
    };
  };
};

export default function PartnerPlatformsSection({ data }: PartnerPlatformsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.bento-item');
      gsap.fromTo(
        elements,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      const cards = document.querySelectorAll('.parallax-card');
      cards.forEach(card => {
        card.addEventListener('mousemove', (e: any) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card.querySelector('.parallax-inner'), {
            x: x * 0.05,
            y: y * 0.05,
            duration: 0.5,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card.querySelector('.parallax-inner'), {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-0 pb-32 relative bg-gray-950 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

          <div className="bento-item parallax-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 relative p-[1px] rounded-[2rem] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-transparent to-green-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="parallax-inner w-full h-full bg-gray-900/80 backdrop-blur-xl rounded-[2rem] p-8 lg:p-10 border border-white/10 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-3xl font-black text-white mb-3">{data.portfolio.title}</h3>
                <p className="text-gray-400 text-lg mb-8">{data.portfolio.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.portfolio.categories.map((cat, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="font-bold text-blue-300 text-sm tracking-wide uppercase">{cat.title}</h4>
                    <ul className="space-y-2">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-300 group/item cursor-default">
                          <CheckCircle2 className="w-4 h-4 text-green-400/50 group-hover/item:text-green-400 transition-colors" />
                          <span className="group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {data.pillars.map((pillar, idx) => {
            const colors = [
              "from-blue-500/20 to-blue-500/5 text-blue-400",
              "from-red-500/20 to-red-500/5 text-red-400",
              "from-green-500/20 to-green-500/5 text-green-400",
              "from-yellow-500/20 to-yellow-500/5 text-yellow-400"
            ];
            const color = colors[idx % colors.length];
            const [bgGradient, textColor] = color.split(' text-');

            return (
              <div key={idx} className="bento-item parallax-card col-span-1 md:col-span-1 lg:col-span-1 row-span-1 relative p-[1px] rounded-[2rem] overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="parallax-inner w-full h-full bg-white/[0.02] backdrop-blur-md rounded-[2rem] p-8 border border-white/5 group-hover:border-white/10 transition-colors flex flex-col relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/[0.05] text-${textColor} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon name={pillar.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white capitalize tracking-wider">{pillar.title}</h3>
                  <p className="text-base text-gray-200 leading-relaxed flex-1 group-hover:text-white transition-colors">{pillar.description}</p>
                </div>
              </div>
            );
          })}

          {/* Services Section Header (Pulled Out) */}
          <div className="bento-item col-span-1 md:col-span-3 lg:col-span-4 text-center mt-20 mb-4">
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] text-gray-300 uppercase mb-6">
              <Settings className="w-4 h-4" /> Comprehensive Services
            </div> */}
            <h3 className="text-3xl md:text-5xl font-black text-[#75BABC] mb-6">{data.services.title}</h3>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">{data.services.description}</p>
          </div>

          {/* Services Grid */}
          <div className="col-span-1 md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.items.map((item, idx) => (
              <div key={idx} className="bento-item parallax-card relative p-[1px] rounded-[2rem] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="parallax-inner w-full h-full bg-gray-900/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 relative z-10 flex flex-col gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:scale-110 transition-all duration-500">
                    <Icon name={item.icon} className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl mb-3 flex items-center gap-2 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-base">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
