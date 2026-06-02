"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RosterSidebar from "./components/RosterSidebar";
import AICoachSidebar from "./components/AICoachSidebar";
import CourtWorkspace from "./components/CourtWorkspace";
import Header from "./components/Header";
import { players } from "./data/players";
import { playPositions } from "./data/plays";

export default function DashboardPage() {
  const [selectedPlay, setSelectedPlay] = useState("Pick & Roll");
  const [selectedPlayerId, setSelectedPlayerId] = useState("clark");
  const [mobileTab, setMobileTab] = useState<"roster" | "court" | "ai">("court");
  const [claimText, setClaimText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<null | { rating: number; text: string }>(null);
  const [isRosterCollapsed, setIsRosterCollapsed] = useState(false);
  const [isCoachCollapsed, setIsCoachCollapsed] = useState(false);

  const activePlayer = players.find((p) => p.id === selectedPlayerId) || players[0];

  // Call the serverless AI Coach API using React Query for automated caching
  const { data: aiFeedbackData, isLoading: isFeedbackLoading, error: feedbackError } = useQuery({
    queryKey: ["coachFeedback", selectedPlay, selectedPlayerId],
    queryFn: async () => {
      const playData = playPositions[selectedPlay] || playPositions["Pick & Roll"];
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playName: selectedPlay,
          playerName: activePlayer.name,
          offensePositions: playData.offense,
          defensePositions: playData.defense,
        }),
      });
      if (!res.ok) throw new Error("Error loading spacing feedback.");
      const data = await res.json();
      return data.text as string;
    },
  });

  const aiFeedback = isFeedbackLoading
    ? "Coach is analyzing spacing..."
    : feedbackError
    ? "AI Coach: Error connecting to tactical analysis feed."
    : aiFeedbackData || "AI Coach: No spacing feedback available.";

  const handleEvaluateClaim = async () => {
    if (!claimText.trim()) return;
    setIsEvaluating(true);
    setEvaluationResult(null);

    const playData = playPositions[selectedPlay] || playPositions["Pick & Roll"];

    try {
      const res = await fetch("/api/bullshit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          claimText,
          playerName: activePlayer.name,
          playName: selectedPlay,
          playerStats: activePlayer.stats,
          playerAttributes: activePlayer.attributes,
          offensePositions: playData.offense,
          defensePositions: playData.defense,
          allPlayers: players,
        }),
      });

      if (!res.ok) throw new Error("Failed to evaluate claim.");
      const data = await res.json();
      setEvaluationResult({
        rating: data.rating,
        text: data.text,
      });

      // Confetti triggers on high score claims!
      if (data.rating >= 60) {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#2d9e6a", "#f5f0e8", "#fdb315"],
        });
      }
    } catch (err: any) {
      console.error(err);
      setEvaluationResult({
        rating: 0,
        text: `Error evaluating claim: ${err.message || "Please check connection."}`,
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-background text-foreground flex flex-col overflow-hidden font-sans">
      <Header />

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
          isCollapsed={isRosterCollapsed}
        />

        <CourtWorkspace
          selectedPlay={selectedPlay}
          activePlayer={activePlayer}
          isVisible={mobileTab === "court"}
          isRosterCollapsed={isRosterCollapsed}
          isCoachCollapsed={isCoachCollapsed}
          onToggleRoster={() => setIsRosterCollapsed(!isRosterCollapsed)}
          onToggleCoach={() => setIsCoachCollapsed(!isCoachCollapsed)}
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
          aiFeedback={aiFeedback}
          isFeedbackLoading={isFeedbackLoading}
          isCollapsed={isCoachCollapsed}
        />
      </div>
    </div>
  );
}
