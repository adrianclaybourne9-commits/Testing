'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;

    if (!dot || !outline) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(outline, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0,
      });

      gsap.to(outline, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        gsap.to(outline, { scale: 1.8, backgroundColor: "rgba(115, 184, 191, 0.2)", border: "1px solid transparent", duration: 0.2 });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        gsap.to(outline, { scale: 1, backgroundColor: "transparent", border: "1px solid #73B8BF", duration: 0.2 });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
      }
    };

    const onMouseDown = () => {
      gsap.to(outline, { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(outline, { scale: 1, duration: 0.1 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#73B8BF] pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#8FA8D9] pointer-events-none z-[10000] hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
