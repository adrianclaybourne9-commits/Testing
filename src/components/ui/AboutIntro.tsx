'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AboutIntroProps = {
  data: {
    subtitle: string;
    description: string;
  };
};

export default function AboutIntro({ data }: AboutIntroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.intro-image',
        { opacity: 0, scale: 0.95, x: -30 },
        {
          opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        '.intro-text > *',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative bg-gray-950 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <div className="lg:w-1/2 w-full intro-image relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/about/team.png"
                alt="Neudhi23 Expert Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:w-1/2 w-full intro-text">
            <h2 className="text-lg md:text-xl lg:text-2xl font-normal text-gray-200 tracking-tight leading-snug mb-8">
              {data.subtitle}
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mb-8" />

            <div className="space-y-6">
              {data.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-white text-lg md:text-xl leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}