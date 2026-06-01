'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

type AboutHeroProps = {
  data: {
    title: string;
    subtitle: string;
    description: string;
  };
};

export default function AboutHero({ data }: AboutHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/about-hero-bg.png"
          alt="About Us Background"
          fill
          priority
          className="object-cover opacity-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/70 to-gray-950" />
      </div>

      <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center opacity-0 mt-8 flex flex-col items-center">

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#73B8BF]/10 border border-[#73B8BF]/20 text-[15px] font-bold tracking-[0.2em] text-[#73B8BF] uppercase mb-10 backdrop-blur-md">
          <Sparkles className="w-4 h-4" /> 100+ Years of Collective Expertise
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          {data.title}
        </h1>

      </div>
    </section>
  );
}
