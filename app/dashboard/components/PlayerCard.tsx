import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toPng } from "html-to-image";
import { Player } from "../data/players";
import GlassPlayerCard from "./GlassPlayerCard";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const advMetrics: Record<string, { netRtg: string; usg: string }> = {
    clark: { netRtg: "+14.2", usg: "31.5%" }, wilson: { netRtg: "+16.8", usg: "32.8%" },
    ionescu: { netRtg: "+11.5", usg: "26.4%" }, boston: { netRtg: "+9.2", usg: "21.0%" },
    bueckers: { netRtg: "+12.0", usg: "28.5%" },
  };

  const metrics = advMetrics[player.id] || { netRtg: "+8.5", usg: "25.0%" };

  const handleExportPNG = (targetRef = cardRef) => {
    if (!targetRef.current) return;
    toPng(targetRef.current, { cacheBust: true, backgroundColor: "#060e0a" })
      .then((url) => {
        const link = document.createElement("a");
        link.download = `${player.id}-scouting-card.png`;
        link.href = url;
        link.click();
      })
      .catch((err) => console.error(err));
  };

  const handleExportPDF = (targetRef = cardRef) => {
    if (!targetRef.current) return;
    toPng(targetRef.current, { cacheBust: true, backgroundColor: "#060e0a" })
      .then((url) => {
        const w = window.open("", "_blank");
        if (!w) return;
        w.document.write(`<html><head><title>${player.name} Scouting Card</title><style>
          body { background-color: #060e0a; margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
          img { max-width: 320px; border-radius: 20px; border: 1px solid rgba(45, 158, 106, 0.35); box-shadow: 0 12px 40px rgba(45, 158, 106, 0.25); }
          @media print { body { background-color: #ffffff; } img { max-width: 100%; box-shadow: none; border: none; } }
        </style></head><body><img src="${url}" /><script>window.onload = function() { window.print(); window.close(); }</script></body></html>`);
        w.document.close();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 w-full justify-start">
      {/* 💳 Stats & Ratings Card Preview */}
      <GlassPlayerCard player={player} metrics={metrics} ref={cardRef} />

      {/* 🚀 Export & Bio controls (Mobile Scaled) */}
      <div className="flex-1 flex flex-col justify-between h-full py-1 space-y-3 sm:space-y-4 w-full max-w-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] sm:text-xs font-mono text-net-green font-bold">
              #{player.number}
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-net-cream uppercase tracking-tight">
              {player.name} Scouting Bio
            </h3>
          </div>
          <p className="text-[11px] sm:text-xs text-net-cream-dim/70 leading-relaxed">
            {player.bio}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="sm:px-5 bg-net-green/10 hover:bg-net-green/20 text-net-green text-[11px] sm:text-xs font-mono py-2 sm:py-2.5 rounded-xl border border-net-green/35 transition-colors cursor-pointer whitespace-nowrap text-center"
          >
            Preview Card
          </button>
          <button
            onClick={() => handleExportPNG()}
            className="sm:px-5 bg-net-surface-light/40 hover:bg-net-surface-light text-net-cream text-[11px] sm:text-xs font-mono py-2 sm:py-2.5 rounded-xl border border-net-border/50 transition-colors cursor-pointer whitespace-nowrap text-center"
          >
            Export PNG
          </button>
          <button
            onClick={() => handleExportPDF()}
            className="sm:px-5 bg-net-surface-light/40 hover:bg-net-surface-light text-net-cream text-[11px] sm:text-xs font-mono py-2 sm:py-2.5 rounded-xl border border-net-border/50 transition-colors cursor-pointer whitespace-nowrap text-center"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* 🔍 Lightbox Card Preview Modal (Full-Screen Showroom) */}
      {isPreviewOpen && mounted && createPortal(
        <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 overflow-y-auto select-none p-6">
          <div className="flex flex-col items-center justify-center min-h-full w-full relative py-12">
            {/* Close Button top-right */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-0 right-0 text-net-cream hover:text-net-green transition-colors text-xs font-mono cursor-pointer border border-net-border/40 bg-net-surface-light/30 px-4 py-2 rounded-xl shadow-lg"
            >
              ✕ Close Preview
            </button>

            {/* Spacing wrapper for scaled player card to prevent overlapping siblings */}
            <div className="w-full flex items-center justify-center py-12 sm:py-20 md:py-24">
              <div className="scale-115 sm:scale-140 md:scale-150 transition-transform origin-center shrink-0">
                <GlassPlayerCard player={player} metrics={metrics} />
              </div>
            </div>

            {/* Bottom Action buttons */}
            <div className="flex gap-4 w-full max-w-xs mt-4 relative z-10">
              <button
                onClick={() => handleExportPNG()}
                className="flex-1 bg-net-green/20 hover:bg-net-green/35 text-net-green text-xs font-mono py-3 rounded-xl border border-net-green/40 transition-colors cursor-pointer text-center"
              >
                Export PNG
              </button>
              <button
                onClick={() => handleExportPDF()}
                className="flex-1 bg-net-surface-light/40 hover:bg-net-surface-light text-net-cream text-xs font-mono py-3 rounded-xl border border-net-border/50 transition-colors cursor-pointer text-center"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
