'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const iconMap: Record<string, any> = {
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Facebook: FacebookIcon,
  Github: GithubIcon,
};

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterSocial = { platform: string; href: string; icon: string };

export type FooterData = {
  brand: { name: string; tagline: string; logo: string };
  columns: FooterColumn[];
  contact: { email: string; phone?: string; address: string };
  socials: FooterSocial[];
  copyright: string;
  legal: FooterLink[];
};

export default function Footer({ data }: { data: FooterData }) {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    if (footerRef.current) {
      const cols = footerRef.current.querySelectorAll('.footer-col');
      gsap.fromTo(
        cols,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <footer ref={footerRef} id="footer" className="relative bg-gray-950 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24">
        <div
          ref={ctaRef}
          className="relative rounded-3xl overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#73B8BF]/20 via-indigo-600/15 to-purple-600/20 blur-2xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-14 md:px-16 md:py-16 bg-white/[0.02] backdrop-blur-md">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                Ready to Transform<br />
                <span className="bg-gradient-to-r from-[#73B8BF] to-indigo-400 bg-clip-text text-transparent">
                  Your Business?
                </span>
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Let's discuss how our solutions can drive your digital transformation journey.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/ContactUs"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-gray-950 font-bold text-base hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl relative z-20"
              >
                Contact Us
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          <div className="footer-col lg:col-span-6 lg:pr-16">
            <img
              src={data.brand.logo}
              alt={data.brand.name}
              className="h-8 w-auto mb-6"
            />
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-xs">
              {data.brand.tagline}
            </p>

            <div className="space-y-4">
              <a href={`mailto:${data.contact.email}`} className="flex items-center gap-3 text-gray-400 hover:text-[#73B8BF] transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#73B8BF]/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">{data.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm pt-1.5">{data.contact.address}</span>
              </div>
            </div>
          </div>

          {data.columns.map((col, idx) => (
            <div key={idx} className="footer-col lg:col-span-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-6">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}


        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 text-center md:text-left">
            {data.copyright}
          </p>

          <div className="flex items-center gap-6">
            {data.legal.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {data.socials.map((social, idx) => {
              const SocialIcon = iconMap[social.icon] || LinkedinIcon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.platform}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <SocialIcon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
