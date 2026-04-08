"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 py-6">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Net-Work" width={24} height={24} className="rounded-md" />
        <span className="text-sm font-bold tracking-tight text-net-cream">
          Net-Work
        </span>
        <span className="text-[9px] font-mono text-net-cream-dim/30 uppercase tracking-widest ml-2">
          Women&apos;s Hoops
        </span>
      </div>
      <span className="text-[10px] font-mono text-net-cream-dim/30">
        Coming 2026
      </span>
    </nav>
  );
}
