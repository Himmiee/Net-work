"use client";

const stats = ["ORTG", "DRTG", "TS%", "USG%", "PER", "VORP", "BPM", "WS/48"];

export default function StatsTicker() {
  return (
    <section className="border-y border-net-border/30 py-5 overflow-hidden">
      <div className="flex animate-[scroll_30s_linear_infinite] gap-12 whitespace-nowrap">
        {[...stats, ...stats, ...stats, ...stats].map((s, i) => (
          <span key={i} className="text-xs font-mono text-net-green/35">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
