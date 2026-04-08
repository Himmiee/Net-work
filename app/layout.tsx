import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Net-Work | WNBA & Women's Hoops Intelligence Platform",
  description:
    "AI-powered women's basketball education platform. WNBA & NCAAW player evaluation, 3D court visualizations, and the Bullshit Meter — because your group chat needs real ball knowledge.",
  keywords: [
    "WNBA",
    "NCAAW",
    "women's basketball",
    "basketball analytics",
    "player evaluation",
    "basketball IQ",
    "AI sports",
  ],
  openGraph: {
    title: "Net-Work | WNBA & Women's Hoops Intelligence Platform",
    description:
      "AI-powered women's basketball education. 3D court visualizations, advanced stats, and the Bullshit Meter.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
