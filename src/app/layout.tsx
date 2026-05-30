import type { Metadata } from "next";
import { Geist, Geist_Mono, Darker_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://neudhi23.com'),
  title: {
    default: "Neudhi23 | Business Solutions Provider",
    template: "%s | Neudhi23"
  },
  description: "As a Business Solutions Provider, Neudhi23 leverages a Partner eco-system to orchestrate proprietary assets, partner platforms, and custom software engineering.",
  keywords: ["Neudhi23", "Business Solutions", "Digital Transformation", "Custom Software", "ERP", "CRM", "Wealth Management", "Tech Consulting"],
  authors: [{ name: "Neudhi23" }],
  creator: "Neudhi23",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neudhi23.com",
    title: "Neudhi23 | Business Solutions Provider",
    description: "Architecting Next-Generation Digital Ecosystems and Enterprise Solutions.",
    siteName: "Neudhi23",
    images: [
      {
        url: "/logo-exact.png",
        width: 1200,
        height: 630,
        alt: "Neudhi23 Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neudhi23 | Business Solutions Provider",
    description: "Architecting Next-Generation Digital Ecosystems and Enterprise Solutions.",
    images: ["/logo-exact.png"],
  },
  icons: {
    icon: "/logo-exact.png",
    apple: "/logo-exact.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${darkerGrotesque.variable} dark`}
    >
      <body className="bg-background text-foreground min-h-screen md:cursor-none overflow-x-hidden">
        <CustomCursor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
