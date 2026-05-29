'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

type ServicesHeroProps = {
  data: {
    title: string;
    subtitle: string;
  };
};

export default function ServicesHero({ data }: ServicesHeroProps) {
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
          src="/services-hero-bg.png"
          alt="Abstract Data Background"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#73B8BF]/10 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center opacity-0 mt-8">
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl">
          {data.title.includes('&') ? (
            <>
              {data.title.split('&')[0]} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73B8BF] to-[#8FA8D9]">
                & {data.title.split('&').slice(1).join('&')}
              </span>
            </>
          ) : (
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              {data.title}
            </span>
          )}
        </h1>
        {data.subtitle && (
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-300 leading-relaxed font-light">
            {data.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
