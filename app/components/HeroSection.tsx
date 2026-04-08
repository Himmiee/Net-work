"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const words = ["spacing", "screening", "ORTG", "TS%", "pick-and-roll", "floor spacing"];

const floatingStats = [
  { v: "112.5", l: "ORTG", pos: "top-4 -left-8" },
  { v: "58.2%", l: "TS%", pos: "bottom-12 -left-4" },
  { v: "24.7", l: "PER", pos: "top-1/3 -right-6" },
];

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Hero content */}
      <div className="flex-1 flex items-center px-8 md:px-16 pb-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-net-green mb-8">
              WNBA · NCAAW · The W
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.9] text-net-cream mb-6">
              They don&apos;t
              <br />
              know what
              <br />
              <span className="relative inline-block">
                <span className="gradient-text" key={activeWord}>
                  {words[activeWord]}
                </span>
              </span>
              <br />
              means.
            </h1>

            <p className="text-base text-net-cream-dim/60 max-w-sm leading-relaxed mb-10">
              AI-powered basketball intelligence for the people who actually
              watch the games — and the ones who need to start.
            </p>

            {/* Email */}
            <div className="max-w-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 border-b border-net-border bg-transparent px-1 py-3 text-sm text-net-cream placeholder-net-cream-dim/30 outline-none focus:border-net-green transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 text-sm font-medium text-net-green hover:text-net-emerald transition-colors cursor-pointer group"
                  >
                    Notify
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              ) : (
                <p className="text-sm text-net-green py-3">
                  ✓ You&apos;re in. Ball knowledge incoming.
                </p>
              )}
            </div>
          </div>

          {/* Right — Hero image */}
          <div className="relative hidden lg:block">
            <div
              className="relative w-full aspect-square max-w-lg ml-auto"
              style={{ animation: "float 8s ease-in-out infinite" }}
            >
              <Image
                src="/hero-court.png"
                alt="Net-Work basketball analytics"
                fill
                sizes="(max-width: 1024px) 0, 512px"
                className="object-contain"
                priority
              />
            </div>
            {/* Floating stat chips */}
            {floatingStats.map((s) => (
              <div
                key={s.l}
                className={`absolute ${s.pos} flex items-center gap-2 border border-net-border bg-net-surface/80 backdrop-blur-md rounded-full px-3 py-1.5`}
                style={{ animation: "float-delayed 6s ease-in-out infinite" }}
              >
                <span className="text-[11px] font-mono font-bold text-net-green">
                  {s.v}
                </span>
                <span className="text-[9px] font-mono text-net-cream-dim/40">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[9px] font-mono text-net-cream-dim/20 uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-net-cream-dim/20" />
      </div>
    </section>
  );
}
