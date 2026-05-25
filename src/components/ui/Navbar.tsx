'use client';

import Link from 'next/link';
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
    const navLinks = data.links;
    const ctaText = data.cta;

    return (
        <>
            <div className="w-screen h-24 flex justify-center items-center mt-2">
                <div className="w-[85vw] max-w-6xl h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex justify-between items-center px-8 shadow-lg">
                    <div className="flex items-center gap-10">
                        <Link href="/">
                            <img src="/images/hero/logo_light.webp" alt="logo" className="h-8 w-auto object-contain" />
                        </Link>

                        <div className="hidden md:flex justify-center items-center space-x-8">
                            {navLinks.map((link, index) => (
                                <a href={link.href} key={index} className="text-white hover:text-[#73B8BF] transition-colors text-sm font-medium tracking-wide">
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <MagneticButton strength={0.4}>
                            <Link href={data.ctaHref || '/ContactUs'} className="inline-block bg-[#73B8BF] hover:bg-[#5da0a7] text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-md relative z-20">
                                {ctaText}
                            </Link>
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </>
    );
}