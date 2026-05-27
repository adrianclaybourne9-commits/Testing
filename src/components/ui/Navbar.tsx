'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

type NavLink = {
    title: string;
    href: string;
};

type NavbarProps = {
    data: {
        links: NavLink[];
        cta: string;
        ctaHref?: string;
    };
};

export default function Navbar({ data }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navLinks = data.links;
    const ctaText = data.cta;

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    return (
        <div className="w-full max-w-[1400px] mx-auto relative z-50">
            {/* Desktop & Mobile Header Bar */}
            <div className="h-24 flex justify-between items-center px-6 md:px-12 mt-4 relative z-50">
                <Link href="/" className="flex-shrink-0 group" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/images/hero/logo_light.webp" alt="logo" className="h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex h-16 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 items-center px-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] space-x-2 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link, index) => (
                        <a href={link.href} key={index} className="whitespace-nowrap text-gray-300 hover:text-white px-6 py-2.5 rounded-full transition-all duration-300 text-[18px] font-medium tracking-wide">
                            {link.title}
                        </a>
                    ))}
                </div>

                {/* Desktop CTA Button */}
                <div className="flex-shrink-0 hidden md:block">
                    <MagneticButton strength={0.4}>
                        <Link href={data.ctaHref || '/contact-us'} className="inline-block bg-[#75BABC] hover:bg-[#62A6A8] text-white px-7 py-3 rounded-full text-[18px] font-bold transition-all duration-300 shadow-[0_0_20px_rgba(117,186,188,0.3)] hover:shadow-[0_0_30px_rgba(117,186,188,0.5)] relative z-20">
                            {ctaText}
                        </Link>
                    </MagneticButton>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-white p-2 focus:outline-none relative z-50 hover:text-[#75BABC] transition-colors duration-300" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Fullscreen Overlay Menu */}
            <div 
                className={`md:hidden fixed inset-0 z-40 bg-gray-950/98 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center items-center ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="flex flex-col items-center space-y-8 px-6 w-full max-w-md">
                    {navLinks.map((link, index) => (
                        <div 
                            key={index}
                            className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <a 
                                href={link.href} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="whitespace-nowrap text-gray-300 hover:text-white text-2xl min-[400px]:text-3xl md:text-4xl font-black tracking-widest uppercase relative group block py-2 text-center"
                            >
                                {link.title}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#75BABC] to-transparent transition-all duration-500 group-hover:w-full" />
                            </a>
                        </div>
                    ))}
                    
                    <div 
                        className={`pt-10 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: `${navLinks.length * 100}ms` }}
                    >
                        <Link 
                            href={data.ctaHref || '/contact-us'} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-center inline-block bg-white/5 hover:bg-[#75BABC] border border-white/10 hover:border-transparent text-white px-8 py-5 rounded-full text-xl font-bold tracking-widest uppercase transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_40px_rgba(117,186,188,0.4)]"
                        >
                            {ctaText}
                        </Link>
                    </div>
                </div>
                
                {/* Decorative Glows */}
                <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#75BABC]/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
            </div>
        </div>
    );
}