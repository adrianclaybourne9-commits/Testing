import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: '100+ Years of Collective Expertise. We design fit-for-purpose business solutions and agile operating models.',
  openGraph: {
    title: 'About Us | Neudhi23',
    description: '100+ Years of Collective Expertise. We design fit-for-purpose business solutions and agile operating models.',
  }
};

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AboutHero from '@/components/ui/AboutHero';
import AboutIntro from '@/components/ui/AboutIntro';
import AboutPillars from '@/components/ui/AboutPillars';
import AboutExperience from '@/components/ui/AboutExperience';
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
      {/* <AboutPillars data={aboutData.pillars} /> */}
      <AboutExperience data={aboutData.experience} />
      <AboutPhilosophy data={aboutData.philosophy} />

      <Footer data={siteData.footer} />
    </main>
  );
}
