"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 md:px-16 py-6">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Net-Work" width={24} height={24} className="rounded-md" />
        <span className="text-sm font-bold tracking-tight text-net-cream">
          Net-Work
        </span>
        <span className="text-[9px] font-mono text-net-cream-dim/30 uppercase tracking-widest ml-2 hidden sm:inline-block">
          Women&apos;s Hoops
        </span>
      </div>
      <Link
        href="/dashboard"
        className="text-xs font-mono border border-net-green/30 text-net-green hover:bg-net-green/10 px-4 py-2 rounded-full transition-colors cursor-pointer"
      >
        Workspace →
      </Link>
    </nav>
  );
}
