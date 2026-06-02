import React from "react";
import { Player } from "../data/players";
import BasketballCourt3D from "./BasketballCourt3D";

interface CourtWorkspaceProps {
  selectedPlay: string;
  activePlayer: Player;
  isVisible: boolean;
}

export default function CourtWorkspace({
  selectedPlay,
  activePlayer,
  isVisible,
}: CourtWorkspaceProps) {
  return (
    <main
      className={`flex-1 h-full relative bg-net-dark/20 flex flex-col justify-between ${
        isVisible ? "flex" : "hidden lg:flex"
      }`}
    >
      {/* Floating Instructions Banner */}
      <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none flex items-center justify-between">
        <div className="bg-net-surface/90 border border-net-border/60 rounded-xl px-4 py-2.5 backdrop-blur-md">
          <p className="text-[10px] font-mono text-net-cream-dim/40 uppercase tracking-wider">
            Current Setup
          </p>
          <h4 className="text-xs font-bold text-net-cream mt-0.5">
            {selectedPlay} with {activePlayer.name}
          </h4>
        </div>
      </div>

      {/* 3D Render Area */}
      <div className="flex-1 w-full relative p-4">
        <BasketballCourt3D activePlayer={activePlayer} />
      </div>

      {/* Player Spacing Detail Drawer */}
      <div className="border-t border-net-border bg-net-surface/60 backdrop-blur-md p-6 shrink-0 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono text-net-green font-bold">
                #{activePlayer.number}
              </span>
              <h3 className="text-base font-bold text-net-cream">
                {activePlayer.name} Spacing Profile
              </h3>
            </div>
            <p className="text-xs text-net-cream-dim/70 leading-relaxed">
              {activePlayer.bio}
            </p>
          </div>

          {/* Attributes Progress Bars */}
          <div className="w-full md:w-64 space-y-2 shrink-0">
            {Object.entries(activePlayer.attributes).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-net-cream-dim/50">{key}</span>
                  <span className="text-net-green font-bold">{val}%</span>
                </div>
                <div className="h-1 bg-net-surface-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-net-green rounded-full transition-all duration-500"
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
