import React, { forwardRef } from "react";
import Image from "next/image";
import { Player } from "../data/players";

interface GlassPlayerCardProps {
  player: Player;
  metrics: { netRtg: string; usg: string };
}

const GlassPlayerCard = forwardRef<HTMLDivElement, GlassPlayerCardProps>(
  ({ player, metrics }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full max-w-sm rounded-2xl border border-net-green/30 bg-linear-to-br from-[#0b1710] to-net-dark/95 p-4 sm:p-5 shadow-2xl relative overflow-hidden shrink-0 group hover:border-net-green/60 transition-all duration-300 select-none"
      >
        {/* Grid Watermark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,158,106,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,158,106,0.02)_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />

        {/* Card Header */}
        <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono text-net-green uppercase tracking-wider relative z-10">
          <span>{player.team}</span>
          <span>#{player.number}</span>
        </div>

        {/* Identity & Avatar Layout */}
        <div className="flex items-center gap-3 mt-2 sm:mt-3 relative z-10">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl border border-net-green/20 overflow-hidden bg-net-surface/60 shrink-0">
            {player.id === "clark" ? (
              <Image
                src="/clark.png"
                alt="Player Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 48px, 64px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl bg-net-green/5">
                {player.logo}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-net-cream leading-tight uppercase tracking-tight">
              {player.name}
            </h4>
            <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-net-green">
              {player.position} · ACTIVE ROSTER
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-5 gap-1 sm:gap-1.5 mt-3 sm:mt-4 relative z-10">
          {[
            { v: player.stats.PPG, l: "PPG" },
            { v: player.stats.APG || "-", l: "APG" },
            { v: player.stats.RPG || "-", l: "RPG" },
            { v: metrics.netRtg, l: "NET RTG" },
            { v: metrics.usg, l: "USG%" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-net-green/5 border border-net-green/10 rounded-lg p-1 sm:p-1.5 text-center min-w-0"
            >
              <div className="text-[9px] sm:text-[11px] font-bold text-net-green font-mono truncate">
                {item.v}
              </div>
              <div className="text-[6px] sm:text-[7px] text-net-cream-dim/40 font-mono uppercase tracking-tighter truncate">
                {item.l}
              </div>
            </div>
          ))}
        </div>

        {/* Spacing Ratings & Strengths */}
        <div className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4 relative z-10">
          {Object.entries(player.attributes).map(([key, val]) => (
            <div key={key}>
              <div className="flex justify-between text-[8px] sm:text-[9px] font-mono mb-0.5">
                <span className="text-net-cream-dim/50 uppercase truncate max-w-[150px]">{key}</span>
                <span className="text-net-green font-bold">{val}%</span>
              </div>
              <div className="h-0.5 sm:h-1 bg-net-surface-light rounded-full overflow-hidden">
                <div
                  className="h-full bg-net-green rounded-full transition-all duration-500"
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

GlassPlayerCard.displayName = "GlassPlayerCard";
export default GlassPlayerCard;
