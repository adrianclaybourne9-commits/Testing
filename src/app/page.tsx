'use client';

import Navbar from "@/components/ui/Navbar";
import HeroCarousel from "@/components/ui/HeroCarousel";
import Offerings from "@/components/ui/Offerings";
import ProductsPlatform from "@/components/ui/ProductsPlatform";
import SolutionsPortfolio from "@/components/ui/SolutionsPortfolio";
import Footer from "@/components/ui/Footer";
import siteData from "@/data/content.json";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar data={siteData.navbar} />
      </div>

      <HeroCarousel slides={siteData.hero} />
      <Offerings data={siteData.offerings} />
      <SolutionsPortfolio data={siteData.solutionsPortfolio} />
      <ProductsPlatform data={siteData.productsPlatform} />
      <Footer data={siteData.footer} />
    </main>
  );
}

