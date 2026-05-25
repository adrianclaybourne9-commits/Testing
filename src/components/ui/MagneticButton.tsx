'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticButton({ children, className = '', strength = 0.5 }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.8,
        ease: 'power3.out'
      });
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={buttonRef} className={`inline-block cursor-pointer ${className}`}>
      {children}
    </div>
  );
}
