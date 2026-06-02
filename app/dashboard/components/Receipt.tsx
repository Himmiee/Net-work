import React, { useRef } from "react";
import { toPng } from "html-to-image";

interface ReceiptProps {
  activePlayerName: string;
  selectedPlay: string;
  evaluationResult: { rating: number; text: string };
}

export default function Receipt({
  activePlayerName,
  selectedPlay,
  evaluationResult,
}: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleExportPNG = () => {
    if (!receiptRef.current) return;
    toPng(receiptRef.current, { cacheBust: true, backgroundColor: "#0b1710" })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `net-work-receipt-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error("Error exporting receipt image:", err));
  };

  const handleExportPDF = () => {
    if (!receiptRef.current) return;
    toPng(receiptRef.current, { cacheBust: true, backgroundColor: "#0b1710" })
      .then((dataUrl) => {
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;
        printWindow.document.write(`
          <html>
            <head>
              <title>Ball Knowledge Receipt</title>
              <style>
                body {
                  background-color: #060e0a;
                  margin: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                img {
                  max-width: 340px;
                  border: 1px dashed rgba(45, 158, 106, 0.4);
                  border-radius: 12px;
                }
                @media print {
                  body { background-color: #ffffff; }
                  img { max-width: 100%; border: none; }
                }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" />
              <script>
                window.onload = function() {
                  window.print();
                  window.close();
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      })
      .catch((err) => console.error("Error generating PDF:", err));
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Styled Receipt Stub for Screenshot/Print */}
      <div
        ref={receiptRef}
        className="p-5 border border-dashed border-net-green/35 bg-[#0b1710] font-mono text-net-cream rounded-xl text-left"
      >
        <div className="title text-center text-xs font-bold text-net-green tracking-wider uppercase">
          *** BALL KNOWLEDGE ***
        </div>
        <div className="text-[10px] text-net-cream-dim/40 text-center mt-1">
          NET-WORK TACTICAL RECEIPT
        </div>
        <div className="divider border-t border-dashed border-net-green/20 my-3" />
        <div className="space-y-1 text-[10px] text-net-cream-dim/70">
          <p>PLAYER: {activePlayerName}</p>
          <p>PLAY  : {selectedPlay}</p>
          <p>DATE  : {new Date().toLocaleDateString()}</p>
        </div>
        <div className="divider border-t border-dashed border-net-green/20 my-3" />
        <div className="text-center">
          <span className="text-[10px] text-net-cream-dim/40 block">SCORE:</span>
          <span className="rating text-3xl font-extrabold text-net-green">{evaluationResult.rating}%</span>
        </div>
        <div className="divider border-t border-dashed border-net-green/20 my-3" />
        <div className="critique text-[11px] leading-relaxed text-net-cream-dim/95">
          {evaluationResult.text}
        </div>
        <div className="divider border-t border-dashed border-net-green/20 my-3" />
        <div className="text-[9px] text-net-cream-dim/30 text-center uppercase tracking-wider">
          * thank you for watching games *
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleExportPNG}
          className="flex-1 bg-net-surface-light/40 hover:bg-net-surface-light text-net-cream text-[10px] font-mono py-2 rounded-lg border border-net-border/50 transition-colors cursor-pointer"
        >
          Export PNG
        </button>
        <button
          onClick={handleExportPDF}
          className="flex-1 bg-net-surface-light/40 hover:bg-net-surface-light text-net-cream text-[10px] font-mono py-2 rounded-lg border border-net-border/50 transition-colors cursor-pointer"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
