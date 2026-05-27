'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export type Slide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  image: string;
};

type HeroCarouselProps = {
  slides: Slide[];
};

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (isAnimating) return;
    changeSlide((currentSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    changeSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const changeSlide = (newIndex: number) => {
    setIsAnimating(true);

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setCurrentSlide(newIndex);

        gsap.fromTo(contentRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
        setIsAnimating(false);
      }
    });
  };

  if (!slides || slides.length === 0) return null;
  const current = slides[currentSlide];

  return (
    <div className="relative w-screen h-[100vh] overflow-hidden bg-gray-900 text-white">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Right Edge Vertical Indicators */}
      <div className="hidden md:flex absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 -mt-16 z-30 flex-col items-center space-y-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isAnimating && idx !== currentSlide) changeSlide(idx);
            }}
            className={`h-[3px] rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-white' : 'w-5 bg-white/30 hover:bg-white/50'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 flex flex-col justify-center">

        <div ref={contentRef} className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 pr-12 md:pr-0">

          <div className="max-w-2xl">
            <h3 className="text-sm md:text-base font-bold tracking-[0.2em] text-[#73B8BF] mb-4 uppercase">
              {current.subtitle}
            </h3>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              {current.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="w-full lg:w-auto max-w-md flex flex-col space-y-6 pb-1">

            <div className="flex flex-col space-y-4">
              {current.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8FA8D9] flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-bold text-gray-200">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <button 
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center p-1 mb-2">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
        <span className="text-[10px] text-white/90 uppercase tracking-[0.3em] font-bold">Scroll</span>
      </button>
    </div>
  );
}
