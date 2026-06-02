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
  features?: string[];
  footnote?: string;
};

export type SolutionsData = {
  sectionBadge: string;
  sectionTitle: string;
  sectionDescription: string;
  disclaimer: string;
  groups: {
    title: string;
    items: SolutionItem[];
  }[];
};

function AgnosticGroupSection({ group, groupIdx, data }: { group: SolutionsData['groups'][0], groupIdx: number, data: SolutionsData }) {
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

      gsap.to(track, {
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
  }, [group]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center bg-gray-950"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-10" />
      </div>

      <div className="w-full px-6 md:px-12 xl:px-24 z-20 pointer-events-none shrink-0 pt-12 md:pt-0">
        <div className="max-w-7xl">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#73B8BF]/10 border border-[#73B8BF]/20 text-[15px] font-bold tracking-[0.2em] text-[#73B8BF] uppercase mb-6">
              <Layers className="w-3.5 h-3.5" />
              {data.sectionBadge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#75BABC] leading-tight mb-5">
              {data.sectionTitle}
            </h2>
            <p className="max-w-2xl text-lg md:text-xl text-white leading-relaxed">
              {data.sectionDescription}
            </p>
          </div>

          <div className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md pt-6 pb-6 mb-10 flex items-center gap-4 md:gap-6 pointer-events-auto">
            <div className="w-8 md:w-12 h-1 bg-[#73B8BF] rounded-full shrink-0"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              {group.title}
            </h3>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative flex items-center gap-6 md:gap-8 px-6 md:px-12 xl:px-24 mt-8 md:mt-10 z-30 w-max"
      >

        {group.items.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Layers;
          const hoverClass = colorMap[item.color] || colorMap.blue;
          const iconClass = iconColorMap[item.color] || iconColorMap.blue;

          return (
            <Link
              key={`${groupIdx}-${idx}`}
              id={item.solution.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              href={item.href || `/partner-platform#solution-${groupIdx}-${idx}`}
              className={`group relative flex flex-col justify-between w-[320px] md:w-[380px] h-[360px] p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-500 cursor-pointer shrink-0 ${hoverClass}`}
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${iconClass}`}>
                    <IconComponent className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-bold tracking-widest text-[#73B8BF] uppercase">
                    {item.domain}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 leading-snug group-hover:text-[#75BABC] transition-colors">
                  {item.solution}
                </h3>

                <p className="text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.description}
                </p>
                {item.footnote && (
                  <p className="mt-4 text-sm italic text-[#73B8BF] transition-colors">
                    {item.footnote}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mt-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                <span className="text-sm font-bold text-white tracking-wide uppercase">Explore More</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          );
        })}
        <div className="w-[10vw] md:w-[20vw] shrink-0" />
      </div>
    </div>
  );
}

const getImageForSolution = (solutionName: string) => {
  const map: Record<string, string> = {
    'Standalone Payment Gateway': 'payment_gateway_real_1780315051344.png',
    'Unified eCommerce': 'unified_ecommerce_real_1780315065466.png',
    'Omnichannel Digital Marketing': 'digital_marketing_real_1780315081144.png',
    'Holistic Event Management Platform': 'event_management_real_1780315097066.png',
    'Enterprise Collaboration Suite': 'collaboration_suite_real_1780315119392.png',
    'Non-Profit, Non-Govt NGO, & Temple Operations': 'non_profit_ops_real_1780315136959.png',
    'Production Planning ERP': 'manufacturing_erp_real_1780315154903.png',
    'Healthcare Centre Business Operations': 'healthcare_ops_new_1780314755657.png',
    'Investment Product Master': 'investment_master_new_1780314777419.png',
    'Cloud CRM & Integrated Telephony': 'cloud_crm_new_1780314792853.png',
  };
  return map[solutionName] || 'unified_ecommerce_real_1780315065466.png';
};

function SpecificGroupSection({ group, groupIdx, data }: { group: SolutionsData['groups'][0], groupIdx: number, data: SolutionsData }) {
  return (
    <div className="relative w-full pt-24 pb-12 bg-gray-950">
      <div className="w-full px-6 md:px-12 xl:px-24 z-20">
        <div className="max-w-5xl mx-auto">
          <div className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md pt-6 pb-6 mb-10 flex items-center gap-4 pointer-events-auto">
            <div className="w-8 h-1 bg-[#73B8BF] rounded-full"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              {group.title}
            </h3>
          </div>

          <div className="relative">
            {group.items.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Layers;
              const hoverClass = colorMap[item.color] || colorMap.blue;
              const iconClass = iconColorMap[item.color] || iconColorMap.blue;

              return (
                <div
                  key={`${groupIdx}-${idx}`}
                  className="w-full mb-12 last:mb-0 sticky"
                  style={{ top: `${100 + idx * 60}px` }}
                >
                  <Link
                    id={item.solution.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                    href={item.href || `/partner-platform#solution-${groupIdx}-${idx}`}
                    className={`group relative flex flex-col rounded-[2rem] bg-[#0a0c10] border border-white/5 shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer w-full ${hoverClass}`}
                  >

                    {/* TOP TAB (Always visible when stacked) */}
                    <div className="w-full px-8 md:px-12 h-[60px] flex items-center border-b border-white/5 bg-[#0a0c10] z-20 relative shrink-0">
                      <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#73B8BF] uppercase">
                        {item.domain}
                      </span>
                    </div>

                    {/* BOTTOM CONTENT AREA */}
                    <div className="flex flex-col lg:flex-row w-full p-8 md:p-12 gap-10 lg:gap-16 relative z-10 bg-[#0a0c10] items-center">

                      {/* LEFT SIDE: Image (1/4 width) */}
                      <div className="lg:w-1/4 shrink-0 relative min-h-[200px] lg:min-h-[240px] w-full rounded-2xl overflow-hidden border border-white/5 shadow-xl">
                        <div className="absolute inset-0 bg-gray-800"></div>
                        <img
                          src={`/images/portfolio/${getImageForSolution(item.solution)}`}
                          alt={item.solution}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </div>

                      {/* RIGHT SIDE: Title, Text and Button (3/4 width) */}
                      <div className="lg:w-3/4 flex flex-col justify-center">
                        <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6 group-hover:text-[#75BABC] transition-colors">
                          {item.solution}
                        </h3>

                        <p className={`text-lg lg:text-xl text-white leading-relaxed group-hover:text-gray-200 transition-colors ${item.features || item.footnote ? 'mb-4' : 'mb-10'}`}>
                          {item.description}
                        </p>

                        {item.footnote && (
                          <p className={`text-base italic text-[#73B8BF] transition-colors ${item.features ? 'mb-6' : 'mb-10'}`}>
                            {item.footnote}
                          </p>
                        )}

                        {item.features && item.features.length > 0 && (
                          <ul className="flex flex-col gap-3 mb-10">
                            {item.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-3 text-white group-hover:text-gray-200 transition-colors">
                                <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#73B8BF] shrink-0 shadow-[0_0_8px_rgba(115,184,191,0.8)]"></div>
                                <span className="text-base lg:text-lg leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="inline-flex items-center gap-3 text-sm font-bold text-white tracking-wide uppercase w-max group-hover:text-gray-300 transition-colors">
                          <span>Explore More</span>
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <ArrowRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {groupIdx === data.groups.length - 1 && (
        <div className="max-w-5xl mx-auto px-6 md:px-12 xl:px-24 mt-8">
          <p className="text-xs md:text-sm text-gray-500 italic border-t border-white/10 pt-6">
            {data.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function SolutionsPortfolio({ data }: { data: SolutionsData }) {
  return (
    <section id="solutions-portfolio" className="bg-gray-950">
      {data.groups.map((group, idx) => (
        idx === 0
          ? <AgnosticGroupSection key={idx} group={group} groupIdx={idx} data={data} />
          : <SpecificGroupSection key={idx} group={group} groupIdx={idx} data={data} />
      ))}
    </section>
  );
}
