"use client";

import React, { useState } from "react";
import RosterSidebar from "./components/RosterSidebar";
import AICoachSidebar from "./components/AICoachSidebar";
import CourtWorkspace from "./components/CourtWorkspace";
import { players } from "./data/players";

export default function DashboardPage() {
  const [selectedPlay, setSelectedPlay] = useState("Pick & Roll");
  const [selectedPlayerId, setSelectedPlayerId] = useState("clark");
  const [mobileTab, setMobileTab] = useState<"roster" | "court" | "ai">("court");
  const [claimText, setClaimText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<null | { rating: number; text: string }>(null);

  const activePlayer = players.find((p) => p.id === selectedPlayerId) || players[0];

  const handleEvaluateClaim = () => {
    if (!claimText.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationResult({
        rating: 32,
        text: `Claim evaluated: Spacing data shows Sabrina's off-ball positioning creates a 14% higher open-shot rate for trailing forwards than claimed. Rating: Airball.`,
      });
    }, 1500);
  };

  return (
    <div className="w-screen h-screen bg-background text-foreground flex flex-col overflow-hidden font-sans">
      {/* 1. Header Navigation */}
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

      {/* 2. Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-net-border bg-net-surface/50 shrink-0">
        {(["roster", "court", "ai"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={`flex-1 py-3 text-xs font-mono border-b-2 capitalize transition-all cursor-pointer ${
              mobileTab === tab
                ? "border-net-green text-net-cream bg-net-green/5"
                : "border-transparent text-net-cream-dim/40"
            }`}
          >
            {tab === "ai" ? "AI Feedback" : tab === "court" ? "3D Playboard" : tab}
          </button>
        ))}
      </div>

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        <RosterSidebar
          selectedPlay={selectedPlay}
          onSelectPlay={setSelectedPlay}
          selectedPlayerId={selectedPlayerId}
          onSelectPlayerId={setSelectedPlayerId}
          isVisible={mobileTab === "roster"}
        />

        <CourtWorkspace
          selectedPlay={selectedPlay}
          activePlayer={activePlayer}
          isVisible={mobileTab === "court"}
        />

        <AICoachSidebar
          activePlayerName={activePlayer.name}
          selectedPlay={selectedPlay}
          activePlayerGravity={activePlayer.attributes["Gravity Pull"]}
          claimText={claimText}
          onClaimTextChange={setClaimText}
          isEvaluating={isEvaluating}
          evaluationResult={evaluationResult}
          onEvaluate={handleEvaluateClaim}
          isVisible={mobileTab === "ai"}
        />
      </div>
    </div>
  );
}
