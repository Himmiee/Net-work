"use client";

import { Flame, Box, BarChart3, MessageCircle, Gamepad2, Share2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { Icon: LucideIcon; title: string; desc: string; tag: string }[] = [
  { Icon: Flame, title: "Bullshit Meter", desc: "Paste any hoops claim. Get a 0–100% Ball Knowledge Rating with receipts.", tag: "AI" },
  { Icon: Box, title: "3D Court", desc: "See spacing, screening, and plays on an interactive Three.js court.", tag: "3D" },
  { Icon: BarChart3, title: "Player Eval", desc: "Advanced stats explained simply. Radar charts. AI scouting reports.", tag: "Data" },
  { Icon: MessageCircle, title: "AI Mentor", desc: "Ask anything about basketball. Instant, verified data-driven insights.", tag: "Chat" },
  { Icon: Gamepad2, title: "GM Mode", desc: "Cap space sim. Make roster moves. AI projects team performance.", tag: "Game" },
  { Icon: Share2, title: "Receipts", desc: "Shareable stat cards and scouting reports for your group chat.", tag: "Share" },
];

export default function FeaturesSection() {
  return (
    <section className="px-8 md:px-16 py-24 md:py-40">
      <div className="max-w-7xl mx-auto">
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-net-green mb-4">
          Six Tools
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-net-cream mb-20 max-w-xl scroll-reveal">
          Everything your group chat doesn&apos;t know they need.
        </h2>

        <div className="space-y-0">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group flex items-start gap-6 md:gap-12 py-8 border-t border-net-border/30 hover:bg-net-surface/30 transition-colors px-4 -mx-4 rounded-lg cursor-default scroll-reveal"
            >
              <span className="text-[11px] font-mono text-net-cream-dim/20 pt-1 w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="w-10 h-10 rounded-xl bg-net-green/8 flex items-center justify-center shrink-0 group-hover:bg-net-green/15 transition-colors">
                <f.Icon className="w-5 h-5 text-net-green/60 group-hover:text-net-green transition-colors" />
              </div>

              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8">
                <h3 className="text-lg md:text-xl font-semibold text-net-cream group-hover:text-net-emerald transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-net-cream-dim/40 max-w-sm leading-relaxed group-hover:text-net-cream-dim/60 transition-colors">
                  {f.desc}
                </p>
              </div>

              <span className="hidden md:block text-[9px] font-mono uppercase tracking-widest text-net-cream-dim/20 pt-1.5 shrink-0">
                {f.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
