import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "ARGUED - Think Deeply Together",
  description: "A philosophical conversation platform where curious minds explore ideas together—from casual questions to deep debates.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'ARGUED - Think Deeply Together',
    description: 'A philosophical conversation platform where curious minds explore ideas together—from casual questions to deep debates.',
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
