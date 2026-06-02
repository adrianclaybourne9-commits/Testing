import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proprietary Platforms',
  description: 'Enterprise Grade Scale Products including AI integrations, FinTech solutions, and ERP.',
  openGraph: {
    title: 'Proprietary Platforms | Neudhi23',
    description: 'Enterprise Grade Scale Products including AI integrations, FinTech solutions, and ERP.',
  }
};

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ProductsHero from '@/components/ui/ProductsHero';
import ProductShowcase from '@/components/ui/ProductShowcase';

import productsData from '@/data/products.json';
import siteData from '@/data/content.json';

export default function ProprietaryProductsPage() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar data={siteData.navbar} />
      </div>

      <ProductsHero data={productsData.hero} />

      <div className="relative z-10">
        {productsData.products.map((product, index) => (
          <ProductShowcase
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>

      <Footer data={siteData.footer} />
    </main>
  );
}
