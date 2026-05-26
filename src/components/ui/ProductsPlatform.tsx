'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Target,
  Crosshair,
  Activity,
  LayoutDashboard,
  FileText,
  Server,
  FileCheck,
  Puzzle,
  RefreshCcw,
  ShieldCheck,
  Send,
  BarChart2,
  Box,
  type LucideIcon,
  ChevronRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const iconMap: Record<string, LucideIcon> = {
  Target,
  Crosshair,
  Activity,
  LayoutDashboard,
  FileText,
  Server,
  FileCheck,
  Puzzle,
  RefreshCcw,
  ShieldCheck,
  Send,
  BarChart2,
};

const colorMap: Record<string, { gradient: string; text: string; bgGlow: string }> = {
  cyan: {
    gradient: 'from-cyan-400 to-blue-500',
    text: 'text-cyan-400',
    bgGlow: 'bg-cyan-900/20'
  },
  indigo: {
    gradient: 'from-indigo-400 to-purple-500',
    text: 'text-indigo-400',
    bgGlow: 'bg-indigo-900/20'
  }
};

export type ProductFeature = {
  icon: string;
  title: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  tagline: string;
  color: string;
  features: ProductFeature[];
};

export type ProductsData = {
  sectionBadge: string;
  sectionTitle: string;
  sectionDescription: string;
  products: Product[];
};

function FeatureCard({ feature, index, colorTheme }: { feature: ProductFeature; index: number; colorTheme: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = iconMap[feature.icon] || Box;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.05] transition-colors duration-500`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorTheme.bgGlow} border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
        <IconComponent className={`w-6 h-6 ${colorTheme.text}`} strokeWidth={1.5} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-2 tracking-wide leading-tight">{feature.title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function ProductsPlatform({ data }: { data: ProductsData }) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="products-platform" className="relative bg-gray-950 overflow-hidden pt-24 pb-32">

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-950 to-transparent" />
      </div>

      <div ref={headerRef} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-28 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-6">
          <Box className="w-3.5 h-3.5" />
          {data.sectionBadge}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
          {data.sectionTitle.split('-')[0]} - <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            {data.sectionTitle.split('-')[1]}
          </span>
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed">
          {data.sectionDescription}
        </p>
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col space-y-32 md:space-y-40">
        {data.products.map((product, idx) => {
          const colorTheme = colorMap[product.color] || colorMap.cyan;
          const isReversed = idx % 2 !== 0;

          return (
            <div id={product.id} key={product.id} className="relative flex flex-col lg:flex-row gap-12 xl:gap-20 items-stretch scroll-mt-24">

              <div className={`w-full lg:w-5/12 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="flex flex-col lg:sticky lg:top-32">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                    <span className={`bg-gradient-to-r ${colorTheme.gradient} bg-clip-text text-transparent`}>
                      {product.name.split('|')[0]}
                    </span>
                    <br />
                    <span className="text-2xl md:text-3xl lg:text-4xl opacity-90">
                      {product.name.split('|')[1]}
                    </span>
                  </h3>
                  <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8">
                    {product.tagline}
                  </p>

                  <div className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900 border border-white/10 shadow-2xl group cursor-pointer">
                    <div className="absolute inset-4 rounded-2xl border border-white/5 bg-gray-950 overflow-hidden flex flex-col p-6">
                      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className={`w-24 h-2 rounded-full ${colorTheme.bgGlow}`} />
                      </div>

                      <div className="flex-1 flex items-end gap-2 px-2">
                        {[40, 70, 45, 90, 65, 80, 55, 100, 75, 85].map((height, i) => (
                          <div
                            key={i}
                            className={`w-full rounded-t-sm bg-gradient-to-t ${colorTheme.gradient} opacity-50 group-hover:opacity-80 transition-all duration-700`}
                            style={{
                              height: `${height}%`,
                              transitionDelay: `${i * 50}ms`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <Link href="/contact-us" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-gray-950 font-bold hover:bg-gray-200 transition-colors shadow-xl">
                      Request Demo
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className={`w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 lg:mt-0 ${isReversed ? 'lg:order-1' : ''} content-start md:content-center`}>
                {product.features.map((feature, fIdx) => (
                  <FeatureCard
                    key={fIdx}
                    feature={feature}
                    index={fIdx}
                    colorTheme={colorTheme}
                  />
                ))}
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
