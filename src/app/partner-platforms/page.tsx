import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import PartnerPlatformsHero from '@/components/ui/PartnerPlatformsHero';
import PartnerPlatformsSection from '@/components/ui/PartnerPlatformsSection';
import ServicesSolutionsPortfolio from '@/components/ui/ServicesSolutionsPortfolio';

import servicesData from '@/data/services.json';
import siteData from '@/data/content.json';

export default function PartnerPlatformsPage() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar data={siteData.navbar} />
      </div>

      <PartnerPlatformsHero data={servicesData.partnerPlatforms} />
      <PartnerPlatformsSection data={servicesData.partnerPlatforms} />
      <ServicesSolutionsPortfolio data={servicesData.solutionsPortfolio} />

      <Footer data={siteData.footer} />
    </main>
  );
}
