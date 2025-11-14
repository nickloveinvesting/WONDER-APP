import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "PhiloDuel - Where Philosophy Comes Alive",
  description: "Engage in fair, AI-judged philosophical debates. Build reputation, find your community, and sharpen your mind.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'PhiloDuel - Where Philosophy Comes Alive',
    description: 'Engage in fair, AI-judged philosophical debates. Build reputation, find your community, and sharpen your mind.',
    images: ['/logo-black.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
