'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import MagneticButton from './MagneticButton';
import {
  Brain,
  Bot,
  Cpu,
  Database,
  BarChart3,
  TrendingUp,
  Handshake,
  Puzzle,
  Code2,
  Layers,
  MessageSquare,
  CalendarClock,
  BookOpen,
  Zap,
  Settings2,
  ArrowRight,
  Users,
  Landmark,
  Monitor,
  type LucideIcon,
} from 'lucide-react';
import gsap from 'gsap';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Bot,
  Cpu,
  Database,
  BarChart3,
  TrendingUp,
  Handshake,
  Puzzle,
  Code2,
  Layers,
  MessageSquare,
  CalendarClock,
  BookOpen,
  Zap,
  Settings2,
  ArrowRight,
  Users,
  Landmark,
  Monitor,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const LucideComponent = iconMap[name];
  if (!LucideComponent) return null;
  return <LucideComponent className={className} />;
}

export type OfferingSubFeature = {
  icon: string;
  title: string;
  description: string;
};

export type OfferingFeature = {
  icon: string;
  title: string;
  description: string;
};

export type OfferingItem = {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  image: string;
  accentGradient: string;
  accentBorder: string;
  subFeaturesLabel?: string;
  features: OfferingFeature[];
  subFeatures?: OfferingSubFeature[];
  pillars?: {
    icon: string;
    title: string;
    description: string;
  }[];
  partnerLogo?: {
    text: string;
    image: string;
  };
  imageLabel?: string;
};

export type OfferingsData = {
  sectionBadge: string;
  sectionTitle: string;
  sectionDescription: string;
  items: OfferingItem[];
};

type OfferingsProps = {
  data: OfferingsData;
};

function OfferingSection({ card, index }: { card: OfferingItem; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subFeaturesRef = useRef<HTMLDivElement>(null);
  const bottomCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              imageRef.current,
              { opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.92 },
              { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }
            );
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: 'power3.out' }
            );
            if (subFeaturesRef.current) {
              gsap.fromTo(
                subFeaturesRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.9, delay: 0.4, ease: 'power3.out' }
              );
            }
            if (bottomCtaRef.current) {
              gsap.fromTo(
                bottomCtaRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
              );
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const isReversed = index % 2 !== 0;

  return (
    <div ref={sectionRef} className="relative group waterfall-section">
      <div
        className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${card.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none`}
      />

      <div
        className={`relative flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
          } gap-10 lg:gap-16 ${card.id === 'partner-products' ? 'items-stretch' : 'items-center'}`}
      >
        <div ref={imageRef} className="w-full lg:w-[45%] opacity-0">
          <div className="mb-8">
            {card.imageLabel ? (
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-[#75BABC] mb-3 leading-tight">
                {card.imageLabel}
              </div>
            ) : (
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight lg:whitespace-nowrap ${card.id === 'partner-products' ? 'text-[#75BABC]' : 'text-white'}`}>
                {card.title}
              </h2>
            )}
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
              {card.tagline}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-2xl group/img">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent z-10" />
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-[320px] lg:h-[420px] object-cover transition-transform duration-700 group-hover/img:scale-105"
            />
          </div>

          {card.partnerLogo && card.id !== 'partner-products' && (
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm md:text-base font-bold tracking-widest text-white">{card.partnerLogo.text}</span>
              <img src={card.partnerLogo.image} alt={card.partnerLogo.text} className="h-10 md:h-12 w-auto" />
            </div>
          )}

          {card.id !== 'partner-products' && (
            <div className="mt-6 flex justify-start">
              <MagneticButton strength={0.4}>
                <Link href={card.id === 'ai-agents' || card.id === 'data-analytics' ? '/service' : '/partner-platform'} className="relative overflow-hidden inline-flex items-center justify-center px-7 py-3 text-sm font-bold text-white border border-white/20 bg-white/5 rounded-full transition-all group/btn hover:border-transparent hover:shadow-[0_0_20px_rgba(117,186,188,0.3)]">
                  <span className="absolute inset-0 bg-[#75BABC] translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 rounded-full" />
                  <span className="relative z-10 flex items-center text-white transition-colors duration-300">
                    Explore more <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </span>
                </Link>
              </MagneticButton>
            </div>
          )}
        </div>

        <div ref={contentRef} className="w-full lg:w-[55%] opacity-0 flex flex-col justify-between">
          <div>
            {card.imageLabel && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
                {card.title}
              </h2>
            )}
            <div className="space-y-4 mb-6">
              {card.features.map((feature, fIdx) => (
                <div
                  key={fIdx}
                  className={`relative overflow-hidden rounded-xl bg-white/[0.04] backdrop-blur-sm border ${card.accentBorder} p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/30 hover:shadow-lg`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#73B8BF]/30 to-[#8FA8D9]/30 flex items-center justify-center text-[#73B8BF]">
                      <Icon name={feature.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1.5 tracking-wide capitalize">
                        {feature.title}
                      </h4>
                      <p className="text-base text-gray-200 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {card.pillars && card.pillars.length > 0 && (
              <div className="mb-8 p-6 rounded-2xl border border-white/10 bg-white/[0.01]">
                <h5 className="text-sm md:text-base font-bold tracking-[0.2em] text-[#73B8BF] uppercase mb-4">
                  Platforms
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {card.pillars.map((pillar, pIdx) => (
                    <div key={pIdx} className="group/pillar relative rounded-xl bg-white/[0.02] border border-white/5 p-4 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400">
                          <Icon name={pillar.icon} className="w-4 h-4" />
                        </div>
                        <h5 className="text-base font-bold text-white tracking-wide capitalize">{pillar.title}</h5>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed group-hover/pillar:text-white transition-colors">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {card.subFeatures && card.subFeatures.length > 0 && card.id !== 'partner-products' && (
              <div className="mt-6">
                <h5 className="text-sm md:text-base font-bold tracking-[0.2em] text-[#73B8BF] uppercase mb-4">
                  {card.subFeaturesLabel || 'Capabilities'}
                </h5>
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${card.subFeatures.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-3`}>
                  {card.subFeatures.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="group/sub relative rounded-lg bg-white/[0.03] border border-white/10 p-4 transition-all duration-300 hover:bg-white/[0.07] hover:border-[#73B8BF]/40 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#73B8BF] group-hover/sub:text-white transition-colors">
                          <Icon name={sub.icon} className="w-5 h-5" />
                        </span>
                        <h6 className="text-base font-bold text-white tracking-wide capitalize">
                          {sub.title}
                        </h6>
                      </div>
                      <p className="text-base text-gray-200 leading-relaxed">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {card.subFeatures && card.subFeatures.length > 0 && card.id === 'partner-products' && (
        <div className="w-full mt-16 opacity-0" ref={subFeaturesRef}>
          <h5 className="text-sm md:text-base font-bold tracking-[0.2em] text-[#73B8BF] uppercase mb-8 text-center">
            {card.subFeaturesLabel || 'Capabilities'}
          </h5>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${card.subFeatures.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}>
            {card.subFeatures.map((sub, sIdx) => (
              <div
                key={sIdx}
                className="group/sub relative rounded-xl bg-white/[0.03] border border-white/10 p-6 transition-all duration-300 hover:bg-white/[0.07] hover:border-[#73B8BF]/40 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#73B8BF] group-hover/sub:text-white transition-colors">
                    <Icon name={sub.icon} className="w-6 h-6" />
                  </span>
                  <h6 className="text-lg font-bold text-white tracking-wide capitalize">
                    {sub.title}
                  </h6>
                </div>
                <p className="text-base text-gray-200 leading-relaxed">
                  {sub.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {card.id === 'partner-products' && (
        <div className="w-full mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-6 opacity-0" ref={bottomCtaRef}>
          {card.partnerLogo && (
            <div className="flex items-center gap-4">
              <span className="text-lg md:text-xl font-bold tracking-widest text-white">{card.partnerLogo.text}</span>
              <img src={card.partnerLogo.image} alt={card.partnerLogo.text} className="h-10 md:h-12 w-auto" />
            </div>
          )}
          <MagneticButton strength={0.4}>
            <Link href="/partner-platform" className="relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white border border-white/20 bg-white/5 rounded-full transition-all group/btn hover:border-transparent hover:shadow-[0_0_20px_rgba(117,186,188,0.3)]">
              <span className="absolute inset-0 bg-[#75BABC] translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 rounded-full" />
              <span className="relative z-10 flex items-center text-white transition-colors duration-300">
                Explore more <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </span>
            </Link>
          </MagneticButton>
        </div>
      )}
    </div>
  );
}

export default function Offerings({ data }: OfferingsProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              el,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="offerings"
      className="relative py-24 md:py-32 bg-gray-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-600/5 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-violet-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="text-center mb-20 opacity-0">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#73B8BF]/10 border border-[#73B8BF]/20 text-[15px] font-bold tracking-[0.2em] text-[#73B8BF] uppercase mb-6">
            <Settings2 className="w-3.5 h-3.5" />
            {data.sectionBadge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
            {data.sectionTitle}
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white leading-relaxed">
            {data.sectionDescription}
          </p>
        </div>

        <div className="space-y-24 lg:space-y-32 waterfall-container">
          {data.items.map((card, idx) => (
            <OfferingSection key={card.id} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
