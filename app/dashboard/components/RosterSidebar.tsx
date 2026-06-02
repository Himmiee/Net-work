import React from "react";
import { players } from "../data/players";

interface RosterSidebarProps {
  selectedPlay: string;
  onSelectPlay: (play: string) => void;
  selectedPlayerId: string;
  onSelectPlayerId: (id: string) => void;
  isVisible: boolean;
  isCollapsed?: boolean;
}

export default function RosterSidebar({
  selectedPlay,
  onSelectPlay,
  selectedPlayerId,
  onSelectPlayerId,
  isVisible,
  isCollapsed = false,
}: RosterSidebarProps) {
  return (
    <aside
      className={`transition-all duration-300 ease-in-out shrink-0 bg-net-surface/30 flex flex-col justify-between overflow-y-auto ${
        isCollapsed
          ? "w-0 opacity-0 overflow-hidden border-r-0 p-0"
          : "w-full lg:w-80 border-r border-net-border p-6"
      } ${isVisible ? "flex" : "hidden lg:flex"}`}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-net-green mb-3">
            Tactical Presets
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {["Five Out", "Pick & Roll", "Pin Down", "Iso Corner"].map((play) => (
              <button
                key={play}
                onClick={() => onSelectPlay(play)}
                className={`text-left text-[11px] px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                  selectedPlay === play
                    ? "border-net-green bg-net-green/8 text-net-cream"
                    : "border-transparent text-net-cream-dim/50 hover:text-net-cream hover:bg-net-surface-light/40"
                }`}
              >
                {play}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-net-green mb-3">
            Select Spacing Target
          </h2>
          <div className="space-y-3">
            {players.map((player) => (
              <button
                key={player.id}
                onClick={() => onSelectPlayerId(player.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                  selectedPlayerId === player.id
                    ? "border-net-green bg-net-surface-light/60"
                    : "border-net-border bg-net-surface/10 hover:border-net-green/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ backgroundColor: `${player.color}15`, color: player.color }}
                  >
                    {player.logo}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-net-cream group-hover:text-net-emerald transition-colors">
                      {player.name}
                    </div>
                    <div className="text-[10px] text-net-cream-dim/40 font-mono">
                      {player.team} · {player.position}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-net-green/70">
                  #{player.number}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-net-border/30 mt-6">
        <span className="text-[9px] font-mono text-net-cream-dim/30">
          Whiteboard v0.1.0
        </span>
      </div>
    </aside>
  );
}
