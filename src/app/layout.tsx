import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CTAL AI - AI-Powered Operating System for Growth",
    template: "%s | CTAL AI",
  },
  description:
    "Transform your business with AI-powered automation. From lead generation to customer success, CTAL AI connects marketing, sales, CRM, learning, and operations into one scalable ecosystem.",
  keywords: [
    "AI automation",
    "CRM",
    "lead generation",
    "customer management",
    "business growth",
    "Nigeria",
    "Africa",
  ],
  authors: [{ name: "CoreSkills Transformational Academy Limited" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ctalai.vercel.app",
    siteName: "CTAL AI",
    title: "CTAL AI - AI-Powered Operating System for Growth",
    description:
      "Transform your business with AI-powered automation. From lead generation to customer success.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CTAL AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CTAL AI - AI-Powered Operating System for Growth",
    description:
      "Transform your business with AI-powered automation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
