import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Reach out to discuss how we can engineer your digital transformation.',
  openGraph: {
    title: 'Contact Us | Neudhi23',
    description: 'Reach out to discuss how we can engineer your digital transformation.',
  }
};

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ContactHero from '@/components/ui/ContactHero';
import ContactSection from '@/components/ui/ContactSection';
import ZohoContactForm from '@/components/ui/ZohoContactForm';

import siteData from '@/data/content.json';

export default function ContactUsPage() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar data={siteData.navbar} />
      </div>

      <ContactHero />
      <ZohoContactForm />
      <ContactSection data={siteData.footer.contact} />


      <Footer data={siteData.footer} />
    </main>
  );
}
