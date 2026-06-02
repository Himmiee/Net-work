import React from "react";
import Receipt from "./Receipt";

interface AICoachSidebarProps {
  activePlayerName: string;
  selectedPlay: string;
  activePlayerGravity: number;
  claimText: string;
  onClaimTextChange: (text: string) => void;
  isEvaluating: boolean;
  evaluationResult: null | { rating: number; text: string };
  onEvaluate: () => void;
  isVisible: boolean;
  aiFeedback: string;
  isFeedbackLoading: boolean;
  isCollapsed?: boolean;
}

export default function AICoachSidebar({
  activePlayerName,
  selectedPlay,
  activePlayerGravity,
  claimText,
  onClaimTextChange,
  isEvaluating,
  evaluationResult,
  onEvaluate,
  isVisible,
  aiFeedback,
  isFeedbackLoading,
  isCollapsed = false,
}: AICoachSidebarProps) {
  return (
    <aside
      className={`transition-all duration-300 ease-in-out shrink-0 bg-net-surface/30 flex flex-col justify-between overflow-y-auto ${
        isCollapsed
          ? "w-0 opacity-0 overflow-hidden border-l-0 p-0"
          : "w-full lg:w-80 border-l border-net-border p-6"
      } ${isVisible ? "flex" : "hidden lg:flex"}`}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-net-green mb-3">
            AI Coach Assistant
          </h2>
          <div className="bg-net-surface-light/30 border border-net-border/40 rounded-xl p-4 min-h-[140px] flex flex-col justify-between">
            {isFeedbackLoading ? (
              <p className="text-[11px] font-mono text-net-green animate-pulse">
                Coach is analyzing spacing...
              </p>
            ) : (
              <p className="text-[11px] text-net-cream/90 leading-relaxed font-mono">
                {aiFeedback}
              </p>
            )}
            <p className="text-[10px] text-net-cream-dim/40 leading-normal mt-3">
              💡 Spacing rating:{" "}
              <span className="text-net-green font-bold">
                {activePlayerGravity > 90 ? "ELITE" : "MODERATE"}
              </span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-net-green mb-3">
            Truth Meter
          </h2>
          <textarea
            value={claimText}
            onChange={(e) => onClaimTextChange(e.target.value)}
            placeholder="Paste a hoops opinion (e.g., 'Sabrina's spacing doesn't open the paint...')"
            className="w-full h-20 bg-net-surface-light/20 border border-net-border/60 rounded-xl p-3 text-xs text-net-cream placeholder-net-cream-dim/30 outline-none focus:border-net-green transition-colors resize-none"
          />
          <button
            onClick={onEvaluate}
            disabled={isEvaluating}
            className="w-full mt-2 bg-net-green/10 hover:bg-net-green/20 text-net-green text-xs font-medium py-2.5 rounded-lg border border-net-green/30 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isEvaluating ? "Analyzing..." : "Evaluate Claim"}
          </button>

          {evaluationResult && (
            <Receipt
              activePlayerName={activePlayerName}
              selectedPlay={selectedPlay}
              evaluationResult={evaluationResult}
            />
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-net-border/30 text-right mt-6">
        <span className="text-[9px] font-mono text-net-cream-dim/30">
          Cloud Config: Local
        </span>
      </div>
    </aside>
  );
}
