'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

type ProductsHeroProps = {
  data: {
    title: string;
    subtitle: string;
  };
};

export default function ProductsHero({ data }: ProductsHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 z-0">
        <Image
          src="/products-hero-bg.png"
          alt="Abstract Proprietary Platforms Background"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/70 to-gray-950" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] translate-y-1/2" />
      </div>

      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center opacity-0 mt-8">
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          {data.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium">
          {data.subtitle}
        </p>
      </div>
    </section>
  );
}
