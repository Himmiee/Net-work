import React from "react";

export default function Header() {
  return (
    <header className="h-16 border-b border-net-border flex items-center justify-between px-4 sm:px-6 z-10 bg-net-surface/80 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold tracking-tight text-net-cream whitespace-nowrap">
          Net-Work<span className="hidden sm:inline"> Workspace</span>
        </span>
        <span className="text-[9px] font-mono text-net-green uppercase tracking-widest px-2.5 py-0.5 border border-net-green/30 rounded-full hidden md:inline-block">
          Tactical Playbook
        </span>
      </div>
      <a
        href="/"
        className="text-xs font-mono text-net-cream-dim/60 hover:text-net-green transition-colors whitespace-nowrap"
      >
        <span className="sm:hidden">← Exit</span>
        <span className="hidden sm:inline">← Exit to Landing</span>
      </a>
    </header>
  );
}
