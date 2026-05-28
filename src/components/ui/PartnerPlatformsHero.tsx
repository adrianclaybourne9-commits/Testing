'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Settings } from 'lucide-react';
import gsap from 'gsap';

type PartnerPlatformsHeroProps = {
  data: {
    title: string;
    description: string;
    zohoDescription?: string;
  };
};

export default function PartnerPlatformsHero({ data }: PartnerPlatformsHeroProps) {
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
    <>
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
        <Image
          src="/partner-hero-bg.png"
          alt="Partner Platforms Hero Background"
          fill
          priority
          className="object-cover opacity-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/50 to-gray-950" />
      </div>

      <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col justify-center items-center opacity-0 mt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-8">
          <Settings className="w-4 h-4" /> Strategic Partnership
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight drop-shadow-2xl text-white">
          Partner Platforms
          {/* Partner <span className="font-light italic text-gray-400">&</span> Platforms */}
        </h1>

        <div className="inline-block mb-8">
          {/* <span className="text-xl md:text-3xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 drop-shadow-lg">
            Powered by Zoho
          </span> */}
        </div>

        <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed font-light drop-shadow-md">
          {data.description}
        </p>
      </div>
    </section>

    {data.zohoDescription && (
      <section className="relative py-12 md:py-16 bg-gray-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center mb-10">
            <img src="/zoho.svg" alt="Zoho" className="h-10 md:h-12 w-auto" />
          </div>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
            {data.zohoDescription}
          </p>
        </div>
      </section>
    )}
    </>
  );
}
