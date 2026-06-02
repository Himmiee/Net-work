import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

/**
 * 🤖 Next.js Serverless Route: /api/coach
 * ----------------------------------------------------
 * Accepts 3D coordinate positions, formats a prompt, and queries 
 * the Gemini API to return real-time tactical reviews.
 */
export async function POST(request: Request) {
  try {
    const { playName, playerName, offensePositions, defensePositions } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Check if user has set up their API key
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json(
        { 
          text: "🏀 Spacing review offline. To unlock live coaching, please paste your actual Gemini API Key inside the .env.local file in the project root directory!" 
        },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format coordinates list into readable lines
    const offenseText = offensePositions.map((pos: number[], i: number) => 
      `Offense Player ${i + 1} (${i === 0 ? playerName : "Teammate"}): Position [X: ${pos[0].toFixed(1)}, Z: ${pos[2].toFixed(1)}]`
    ).join("\n");

    const defenseText = defensePositions.map((pos: number[], i: number) => 
      `Defender ${i + 1}: Position [X: ${pos[0].toFixed(1)}, Z: ${pos[2].toFixed(1)}]`
    ).join("\n");

    const prompt = `
You are an expert women's basketball (WNBA/NCAAW) tactical analyst and coach.
Analyze the following half-court spacing setup.

Play Preset: ${playName}
Focal Player: ${playerName}

Coordinates (Basket is at [X: 7.5, Z: 0.0]):
${offenseText}

Defenders:
${defenseText}

Provide a brief, tactical review (max 60 words). Discuss:
1. Spacing (is the court open or clogged?).
2. Where the open pass or driving lane is.

Use professional coaching vocabulary. Keep it punchy.
CRITICAL: Do NOT use any markdown formatting, asterisks (**), or bold tags in your response. Output only plain, raw text.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "AI Coach is review the play, please try again.";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AI Coach API error:", error);
    const errStr = error.message || "";
    if (errStr.includes("429") || errStr.includes("quota") || errStr.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json({ 
        text: "🏀 AI Coach: Spacing feed rate-limited! You've hit the Gemini API free-tier quota limit. Please check back in a few seconds." 
      });
    }
    return NextResponse.json(
      { text: `AI Coach: Error analyzing coordinates: ${error.message}` },
      { status: 500 }
    );
  }
}
