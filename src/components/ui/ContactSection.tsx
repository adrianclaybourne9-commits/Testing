'use client';

import React, { useEffect, useRef } from 'react';
import { Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ContactSectionProps = {
  data: {
    email: string;
    address: string;
  };
};

export default function ContactSection({ data }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-info',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        '.contact-map',
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
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
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Info Side */}
          <div className="lg:w-[30%] w-full contact-info space-y-8">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Our Office</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Pune, India</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {data.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-16 h-[1px] bg-white/10" />

            <div>
              <h2 className="text-3xl font-black text-white mb-6">Direct Contact</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <a href={`mailto:${data.email}`} className="text-gray-400 leading-relaxed text-lg hover:text-cyan-400 transition-colors">
                    {data.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:w-[70%] w-full contact-map relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
            <div className="relative w-full h-[500px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
