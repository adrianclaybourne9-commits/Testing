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


    return (
        <div className="w-full max-w-[1400px] mx-auto relative z-50">
            <div className="h-24 flex justify-between items-center px-6 md:px-12 mt-4 relative z-50">
                <Link href="/" className="flex-shrink-0 group" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/logo-exact.png" alt="logo" className="h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                </Link>

                <div className="hidden lg:flex h-16 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 items-center px-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] space-x-2 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link, index) => (
                        <a href={link.href} key={index} className="whitespace-nowrap text-gray-300 hover:text-white px-6 py-2.5 rounded-full transition-all duration-300 text-[18px] font-medium tracking-wide">
                            {link.title}
                        </a>
                    ))}
                </div>

                <div className="flex-shrink-0 hidden md:block">
                    <MagneticButton strength={0.4}>
                        <Link href={data.ctaHref || '/contact-us'} className="inline-block bg-[#75BABC] hover:bg-[#62A6A8] text-white px-7 py-3 rounded-full text-[18px] font-bold transition-all duration-300 shadow-[0_0_20px_rgba(117,186,188,0.3)] hover:shadow-[0_0_30px_rgba(117,186,188,0.5)] relative z-20">
                            {ctaText}
                        </Link>
                    </MagneticButton>
                </div>

                <button
                    className="md:hidden text-white p-2 focus:outline-none relative z-50 hover:text-[#75BABC] transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            <div
                className={`md:hidden absolute top-[110px] left-4 right-4 z-40 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col py-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
            >
                <div className="flex flex-col space-y-2 px-6 w-full">
                    {navLinks.map((link, index) => (
                        <div
                            key={index}
                            className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <a
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-300 hover:text-white text-lg min-[400px]:text-xl font-bold tracking-wider capitalize block py-3 border-b border-white/5"
                            >
                                {link.title}
                            </a>
                        </div>
                    ))}

                    <div
                        className={`pt-6 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        style={{ transitionDelay: `${navLinks.length * 50}ms` }}
                    >
                        <Link
                            href={data.ctaHref || '/contact-us'}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-center inline-block bg-[#75BABC] hover:bg-[#62A6A8] text-white px-6 py-4 rounded-full text-lg font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(117,186,188,0.3)] hover:shadow-[0_0_30px_rgba(117,186,188,0.5)]"
                        >
                            {ctaText}
                        </Link>
                    </div>
                </div>

                <div className="absolute top-0 -left-10 w-40 h-40 rounded-full bg-[#75BABC]/10 blur-[50px] pointer-events-none" />
            </div>
        </div>
    );
}