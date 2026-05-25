import React from 'react';
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import siteData from "@/data/content.json";
import servicesData from "@/data/services.json";

import ServicesHero from "@/components/ui/ServicesHero";
import CustomAiSection from "@/components/ui/CustomAiSection";
import DataServicesSection from "@/components/ui/DataServicesSection";
import PartnerPlatformsSection from "@/components/ui/PartnerPlatformsSection";
import ServicesSolutionsPortfolio from "@/components/ui/ServicesSolutionsPortfolio";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar data={siteData.navbar} />
      </div>
      <ServicesHero data={servicesData.hero} />
      <CustomAiSection data={servicesData.customAi} />
      <DataServicesSection data={servicesData.dataServices} />
      <Footer data={siteData.footer} />
    </main>
  );
}