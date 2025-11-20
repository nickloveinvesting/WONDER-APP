import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

// Use system fonts as fallback for Google Fonts
// This prevents build failures in offline environments

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
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
