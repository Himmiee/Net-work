"use client";

import { ArrowRight } from "lucide-react";

export default function BottomCTA() {
  return (
    <section className="px-8 md:px-16 py-24 md:py-40">
      <div className="max-w-7xl mx-auto text-center scroll-reveal">
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-net-green mb-6">
          Waitlist Open
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-net-cream mb-6">
          Be the smartest in your group chat.
        </h2>
        <p className="text-sm text-net-cream-dim/60 mb-12 max-w-md mx-auto leading-relaxed">
          Join the private beta. Get early access to the 3D court engine,
          the AI Hot Take Scorer, and advanced player evaluation intelligence.
        </p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            (document.querySelector("input[type='email']") as HTMLInputElement)?.focus();
          }}
          className="inline-flex items-center gap-3 border border-net-green/30 text-net-green text-sm font-medium px-8 py-4 rounded-full hover:bg-net-green/10 transition-colors group"
        >
          Get Early Access
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
