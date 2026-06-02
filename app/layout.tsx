import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Net-Work | WNBA & Women's Hoops Intelligence Platform",
  description:
    "AI-powered women's basketball education platform. WNBA & NCAAW player evaluation, 3D court visualizations, and the Truth Meter — because your group chat needs real ball knowledge.",
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
      "AI-powered women's basketball education. 3D court visualizations, advanced stats, and the Truth Meter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-background text-foreground font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
