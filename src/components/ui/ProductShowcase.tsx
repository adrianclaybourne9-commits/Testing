'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Target,
  Users,
  Compass,
  LineChart,
  Settings,
  LayoutDashboard,
  Link as LinkIcon,
  FileText,
  Plug,
  RefreshCw,
  Search,
  ShieldCheck,
  Send,
  Monitor,
  type LucideIcon,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Target,
  Users,
  Compass,
  LineChart,
  Settings,
  LayoutDashboard,
  Link: LinkIcon,
  FileText,
  Plug,
  RefreshCw,
  Search,
  ShieldCheck,
  Send,
  Monitor,
};

type ProductFeature = {
  title: string;
  description: string;
  icon: string;
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  features: ProductFeature[];
};

type ProductShowcaseProps = {
  product: Product;
  index: number;
};

const colorConfig: Record<string, { bg: string, text: string, gradient: string, border: string }> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    gradient: 'from-emerald-950 via-gray-950 to-gray-950',
    border: 'border-emerald-500/20'
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    gradient: 'from-indigo-950 via-gray-950 to-gray-950',
    border: 'border-indigo-500/20'
  }
};

export default function ProductShowcase({ product, index }: ProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPinnedRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);

  const colors = colorConfig[product.color] || colorConfig.emerald;
  const isReversed = index % 2 !== 0;

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const right = rightScrollRef.current;

      if (!right) return;

      const cards = right.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: isReversed ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, [isReversed]);

  return (
    <section ref={containerRef} className={`relative pt-24 pb-32 bg-gradient-to-b ${colors.gradient} border-b border-white/5`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20 relative items-stretch">

        <div className={`w-full lg:w-5/12 pt-8 ${isReversed ? 'lg:order-2' : ''}`}>
          <div ref={leftPinnedRef} className="w-full flex flex-col lg:sticky lg:top-32">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${colors.bg} ${colors.border} text-xs font-bold tracking-[0.2em] ${colors.text} uppercase mb-4 self-start`}>
              <Settings className="w-4 h-4" /> {product.subtitle}
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {product.name.split('|')[0]}
            </h2>

            <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="relative w-full aspect-video md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
              <div className={`absolute inset-0 opacity-40 transition-colors duration-1000 blur-3xl ${colors.bg}`} />
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>
        
        <div ref={rightScrollRef} className={`w-full lg:w-7/12 flex flex-col gap-6 pt-8 ${isReversed ? 'lg:order-1' : ''}`}>
          {product.features.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon] || CheckCircle2;
            return (
              <div
                key={idx}
                className="feature-card p-8 rounded-[2rem] bg-gray-900/40 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 ${colors.bg} rounded-full blur-[60px] opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none`} />

                <div className="flex gap-6 relative z-10">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                    <IconComponent className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-white/90 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {feature.description}
                    </p>
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
