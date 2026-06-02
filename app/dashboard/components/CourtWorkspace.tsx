import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Player } from "../data/players";
import BasketballCourt3D from "./BasketballCourt3D";
import PlayerCard from "./PlayerCard";

interface CourtWorkspaceProps {
  selectedPlay: string;
  activePlayer: Player;
  isVisible: boolean;
  isRosterCollapsed: boolean;
  isCoachCollapsed: boolean;
  onToggleRoster: () => void;
  onToggleCoach: () => void;
}

export default function CourtWorkspace({
  selectedPlay,
  activePlayer,
  isVisible,
  isRosterCollapsed,
  isCoachCollapsed,
  onToggleRoster,
  onToggleCoach,
}: CourtWorkspaceProps) {
  return (
    <main
      className={`flex-1 h-full relative bg-net-dark/20 flex flex-col justify-between overflow-hidden ${
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

      {/* 3D Render Area with Floating Sidebar Toggle Buttons */}
      <div className="flex-1 w-full relative p-4 min-h-0">
        {/* Left Toggle (Roster Sidebar) */}
        <button
          onClick={onToggleRoster}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg bg-net-surface/80 border border-net-border/60 hover:bg-net-surface hover:border-net-green transition-all flex items-center justify-center cursor-pointer shadow-lg pointer-events-auto"
          title={isRosterCollapsed ? "Expand Roster" : "Collapse Roster"}
        >
          {isRosterCollapsed ? (
            <ChevronRight className="w-4 h-4 text-net-green" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-net-cream" />
          )}
        </button>

        {/* Right Toggle (AI Coach Sidebar) */}
        <button
          onClick={onToggleCoach}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg bg-net-surface/80 border border-net-border/60 hover:bg-net-surface hover:border-net-green transition-all flex items-center justify-center cursor-pointer shadow-lg pointer-events-auto"
          title={isCoachCollapsed ? "Expand AI Coach" : "Collapse AI Coach"}
        >
          {isCoachCollapsed ? (
            <ChevronLeft className="w-4 h-4 text-net-green" />
          ) : (
            <ChevronRight className="w-4 h-4 text-net-cream" />
          )}
        </button>

        <BasketballCourt3D activePlayer={activePlayer} selectedPlay={selectedPlay} />
      </div>

      {/* Player Spacing Detail Drawer (Collapsible/Scrollable to prevent mobile clipping) */}
      <div className="border-t border-net-border bg-net-surface/60 backdrop-blur-md p-4 sm:p-6 shrink-0 z-10 max-h-[45vh] lg:max-h-[35vh] overflow-y-auto">
        <PlayerCard player={activePlayer} />
      </div>
    </main>
  );
}
