'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
        }
      });

      tl.fromTo('.preloader-logo',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
        .to('.preloader-progress', { width: '100%', duration: 1.2, ease: 'power2.inOut' }, '-=0.4')
        .to('.preloader-overlay', { yPercent: -100, duration: 1, ease: 'power4.inOut', delay: 0.2 })
        .set('.preloader-container', { display: 'none' });
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="preloader-container fixed inset-0 z-[10000] pointer-events-none flex flex-col">
      <div className="preloader-overlay absolute inset-0 bg-gray-950 flex flex-col items-center justify-center z-50">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#75BABC]/10 rounded-full blur-[80px]" />

        <div className="relative z-10 flex flex-col items-center">
          <img src="/logo-exact.png" alt="Neudhi23" className="preloader-logo h-12 md:h-16 w-auto object-contain mb-10 opacity-0" />

          <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="preloader-progress w-0 h-full bg-[#75BABC] shadow-[0_0_10px_#75BABC]"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
