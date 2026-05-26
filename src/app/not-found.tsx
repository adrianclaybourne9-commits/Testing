'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import gsap from 'gsap';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        '.glitch-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          '.content-fade',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          '-=0.4'
        );

      gsap.to('.float-element', {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#73B8BF]/5 rounded-full blur-[120px] float-element" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 float-element" style={{ animationDelay: '-2s' }} />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="relative mb-8 glitch-text">
          <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#73B8BF] via-indigo-400 to-[#8FA8D9] drop-shadow-2xl select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-40 pointer-events-none" />
        </div>

        <h2 className="content-fade text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
          System Coordinates Lost
        </h2>
        <p className="content-fade text-lg text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
          The autonomous agents have searched the entire data pipeline, but the page you are looking for does not exist in this sector.
        </p>

        <div className="content-fade flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative flex items-center gap-3 px-8 py-4 rounded-xl bg-white/[0.03] border border-[#73B8BF]/30 hover:border-[#73B8BF]/80 hover:bg-[#73B8BF]/10 transition-all duration-300 w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#73B8BF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <ArrowLeft className="w-5 h-5 text-[#73B8BF] group-hover:-translate-x-1 transition-transform" />
            <span className="relative z-10 font-semibold text-white tracking-wide">Return to Core</span>
          </Link>

          <Link
            href="/services"
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-transparent border border-white/10 hover:bg-white/[0.02] hover:border-white/20 transition-all duration-300 w-full sm:w-auto text-gray-300 hover:text-white"
          >
            <Search className="w-5 h-5" />
            <span className="font-semibold tracking-wide">Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
