"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-net-border/30 py-8 px-8 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Net-Work" width={16} height={16} className="rounded-sm" />
          <span className="text-xs font-bold text-net-cream">Net-Work</span>
          <span className="text-[9px] text-net-cream-dim/20">© 2026</span>
        </div>
        <p className="text-[10px] text-net-cream-dim/20 font-mono">
          WNBA · NCAAW · The W
        </p>
      </div>
    </footer>
  );
}
