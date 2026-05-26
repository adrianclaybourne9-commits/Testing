import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AboutHero from '@/components/ui/AboutHero';
import AboutIntro from '@/components/ui/AboutIntro';
import AboutPillars from '@/components/ui/AboutPillars';
import AboutPhilosophy from '@/components/ui/AboutPhilosophy';

import siteData from '@/data/content.json';
import aboutData from '@/data/about.json';

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar data={siteData.navbar} />
      </div>
      
      <AboutHero data={aboutData.hero} />
      <AboutIntro data={aboutData.hero} />
      <AboutPillars data={aboutData.pillars} />
      <AboutPhilosophy data={aboutData.philosophy} />
      
      <Footer data={siteData.footer} />
    </main>
  );
}
