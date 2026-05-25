'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail } from 'lucide-react';

export default function ContactHero() {
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
      <div className="absolute inset-0 z-0 bg-gray-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center opacity-0 mt-8 flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-gray-300 uppercase mb-10 backdrop-blur-md">
          <Mail className="w-4 h-4 text-cyan-400" /> Get In Touch
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          Contact Us
        </h1>
        
        <p className="text-2xl md:text-3xl font-medium text-gray-200 tracking-tight leading-snug max-w-3xl mx-auto">
          We'd love to hear from you. Reach out to discuss how we can engineer your digital transformation.
        </p>

      </div>
    </section>
  );
}
