import React from "react";

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
}: AICoachSidebarProps) {
  return (
    <aside
      className={`w-full lg:w-80 border-l border-net-border bg-net-surface/30 p-6 flex flex-col justify-between overflow-y-auto shrink-0 ${
        isVisible ? "flex" : "hidden lg:flex"
      }`}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-net-green mb-3">
            AI Coach Assistant
          </h2>
          <div className="bg-net-surface-light/30 border border-net-border/40 rounded-xl p-4 min-h-[160px] flex flex-col justify-between">
            <p className="text-[11px] text-net-cream/90 leading-relaxed font-mono">
              {activePlayerName}&apos;s off-ball positioning in {selectedPlay} forces defenders to stay tightly attached. Spacing rating:{" "}
              <span className="text-net-green font-bold">
                {activePlayerGravity > 90 ? "ELITE" : "MODERATE"}
              </span>.
            </p>
            <p className="text-[10px] text-net-cream-dim/40 leading-normal mt-3">
              💡 Move the nodes in the 3D court to see how the spacing index changes.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-net-green mb-3">
            Bullshit Meter
          </h2>
          <textarea
            value={claimText}
            onChange={(e) => onClaimTextChange(e.target.value)}
            placeholder="Paste a hoops opinion (e.g., 'Sabrina's spacing doesn't open the paint...')"
            className="w-full h-24 bg-net-surface-light/20 border border-net-border/60 rounded-xl p-3 text-xs text-net-cream placeholder-net-cream-dim/30 outline-none focus:border-net-green transition-colors resize-none"
          />
          <button
            onClick={onEvaluate}
            disabled={isEvaluating}
            className="w-full mt-2 bg-net-green/10 hover:bg-net-green/20 text-net-green text-xs font-medium py-2.5 rounded-lg border border-net-green/30 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isEvaluating ? "Analyzing..." : "Evaluate Claim"}
          </button>

          {evaluationResult && (
            <div className="mt-4 p-4 rounded-xl border border-net-green/20 bg-net-green/4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-mono text-net-green uppercase tracking-wider">
                  Knowledge score
                </span>
                <span className="text-xs font-bold text-net-green">
                  {evaluationResult.rating}%
                </span>
              </div>
              <p className="text-[11px] text-net-cream-dim/80 leading-relaxed">
                {evaluationResult.text}
              </p>
            </div>
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
