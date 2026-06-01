'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        pillRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40, rotateX: 10 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.2 },
          '-=0.8'
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.9'
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-40 pb-20 md:pt-48 md:pb-32 min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <div
          ref={pillRef}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#73B8BF]/10 border border-[#73B8BF]/20 text-[15px] font-bold tracking-[0.2em] text-[#73B8BF] uppercase mb-10 backdrop-blur-md"
        >
          <Mail className="w-4 h-4" />
          <span>reachus@neudhi23.com</span>
        </div>
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
        >
          Contact Us
        </h1>

        <p
          ref={textRef}
          className="text-lg md:text-2xl font-light text-gray-400 tracking-wide leading-relaxed max-w-2xl mx-auto"
        >
          We'd love to hear from you. Reach out to discuss how we can engineer your digital transformation.
        </p>
      </div>
    </section>
  );
}
