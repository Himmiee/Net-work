"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      {/* Big 404 background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20rem] md:text-[30rem] font-bold tracking-tighter text-net-green/3 leading-none">
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Net-Work"
          width={48}
          height={48}
          className="rounded-xl mb-8"
        />

        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-net-green mb-6">
          Airball
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-net-cream mb-4">
          Shot&apos;s off.
        </h1>

        <p className="text-base text-net-cream-dim/50 max-w-sm leading-relaxed mb-3">
          This page didn&apos;t make the roster.
        </p>
        <p className="text-sm text-net-cream-dim/30 max-w-xs mb-12">
          The page you&apos;re looking for has been traded, waived, or
          never existed in our system.
        </p>

        {/* Fake stat line for the 404 */}
        <div className="flex items-center gap-6 mb-12 text-net-cream-dim/20">
          {[
            { stat: "0", label: "PTS" },
            { stat: "0", label: "REB" },
            { stat: "0", label: "AST" },
            { stat: "404", label: "ERR" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-xl md:text-2xl font-bold font-mono text-net-cream/40">
                {s.stat}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-net-green/30 text-net-green text-sm font-medium px-6 py-3 rounded-full hover:bg-net-green/10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to the court
        </Link>
      </div>
    </div>
  );
}
