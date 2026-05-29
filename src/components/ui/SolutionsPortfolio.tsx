'use client';

import React, { useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
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
  Layers,
  type LucideIcon,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  Calendar,
};

const colorMap: Record<string, string> = {
  blue: 'group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] group-hover:border-blue-500/50',
  indigo: 'group-hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)] group-hover:border-indigo-500/50',
  amber: 'group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)] group-hover:border-amber-500/50',
  rose: 'group-hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.3)] group-hover:border-rose-500/50',
  orange: 'group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)] group-hover:border-orange-500/50',
  emerald: 'group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] group-hover:border-emerald-500/50',
  cyan: 'group-hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] group-hover:border-cyan-500/50',
  purple: 'group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] group-hover:border-purple-500/50',
  pink: 'group-hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)] group-hover:border-pink-500/50',
  teal: 'group-hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.3)] group-hover:border-teal-500/50',
};

const iconColorMap: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-500/10',
  indigo: 'text-indigo-400 bg-indigo-500/10',
  amber: 'text-amber-400 bg-amber-500/10',
  rose: 'text-rose-400 bg-rose-500/10',
  orange: 'text-orange-400 bg-orange-500/10',
  emerald: 'text-emerald-400 bg-emerald-500/10',
  cyan: 'text-cyan-400 bg-cyan-500/10',
  purple: 'text-purple-400 bg-purple-500/10',
  pink: 'text-pink-400 bg-pink-500/10',
  teal: 'text-teal-400 bg-teal-500/10',
};

export type SolutionItem = {
  domain: string;
  solution: string;
  description: string;
  icon: string;
  color: string;
  href?: string;
};

export type SolutionsData = {
  sectionBadge: string;
  sectionTitle: string;
  sectionDescription: string;
  disclaimer: string;
  items: SolutionItem[];
};

export default function SolutionsPortfolio({ data }: { data: SolutionsData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container) return;
      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="solutions-portfolio"
      className="bg-gray-950"
    >
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-center"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-10" />
        </div>

        <div className="w-full px-6 md:px-12 xl:px-24 z-20 pointer-events-none shrink-0">
          <div className="max-w-7xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase mb-6">
              <Layers className="w-3.5 h-3.5" />
              {data.sectionBadge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              {data.sectionTitle}
            </h2>
            <p className="max-w-2xl text-base md:text-lg text-gray-400 leading-relaxed">
              {data.sectionDescription}
            </p>
          </div>
        </div>

        <div
          ref={trackRef}
          className="relative flex items-center gap-6 md:gap-8 px-6 md:px-12 xl:px-24 mt-12 md:mt-16 z-30 w-max"
        >
          {data.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Layers;
            const hoverClass = colorMap[item.color] || colorMap.blue;
            const iconClass = iconColorMap[item.color] || iconColorMap.blue;

            return (
              <Link
                key={idx}
                id={item.solution.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                href={item.href || `/partner-platforms#solution-${idx}`}
                className={`group relative flex flex-col justify-between w-[320px] md:w-[380px] h-[360px] p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-500 cursor-pointer shrink-0 ${hoverClass}`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${iconClass}`}>
                      <IconComponent className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                      {item.domain}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug group-hover:text-white transition-colors">
                    {item.solution}
                  </h3>

                  <p className="text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <span className="text-sm font-bold text-white tracking-wide uppercase">Explore Module</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-6 right-6 text-6xl font-black text-white/[0.03] group-hover:text-white/[0.05] transition-colors pointer-events-none select-none">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
              </Link>
            );
          })}
          <div className="w-[10vw] md:w-[20vw] shrink-0" />
        </div>
        <div className="absolute bottom-8 left-0 w-full px-6 md:px-12 xl:px-24 z-20 pointer-events-none">
          <p className="text-xs md:text-sm text-gray-500 italic">
            {data.disclaimer}
          </p>
        </div>

      </div>
    </section>
  );
}
