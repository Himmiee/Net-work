import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

/**
 * 📊 Next.js Serverless Route: /api/bullshit
 * ----------------------------------------------------
 * Evaluates a user's basketball claim (hot take) against
 * player attributes, stats, and 3D play coordinates.
 * Returns a structured credibility score and critique using Gemini.
 */
export async function POST(request: Request) {
  try {
    const { 
      claimText, 
      playerName, 
      playName, 
      playerStats, 
      playerAttributes, 
      offensePositions, 
      defensePositions,
      allPlayers
    } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json(
        {
          rating: 50,
          verdict: "Offline Mode",
          text: "🏀 Spacing review offline. To unlock the real-time Bullshit Meter, please paste your actual Gemini API Key inside the .env.local file in the project root directory!"
        },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format coordinates list into readable lines
    const offenseText = offensePositions?.map((pos: number[], i: number) => 
      `Offense Player ${i + 1} (${i === 0 ? playerName : "Teammate"}): Position [X: ${pos[0].toFixed(1)}, Z: ${pos[2].toFixed(1)}]`
    ).join("\n") || "No offense positions provided.";

    const defenseText = defensePositions?.map((pos: number[], i: number) => 
      `Defender ${i + 1}: Position [X: ${pos[0].toFixed(1)}, Z: ${pos[2].toFixed(1)}]`
    ).join("\n") || "No defense positions provided.";

    const allPlayersText = allPlayers?.map((p: any) => 
      `- ${p.name} (${p.team}, #${p.number}): Stats=${JSON.stringify(p.stats)}, Attributes=${JSON.stringify(p.attributes)}, Bio: ${p.bio}`
    ).join("\n") || "No full roster stats provided.";

    const statsStr = JSON.stringify(playerStats || {});
    const attributesStr = JSON.stringify(playerAttributes || {});

    const prompt = `
You are the ultimate basketball truth-teller and analyst. Evaluate this fan's hot take / claim.

Focal Player: ${playerName}
Player Stats: ${statsStr}
Player Attributes: ${attributesStr}

Available Roster & Comparison Players:
${allPlayersText}

Play Setup: ${playName}
Offense Coordinates:
${offenseText}
Defense Coordinates:
${defenseText}

Fan's Hot Take / Claim:
"${claimText}"

Evaluate this claim based on actual statistics, spacing attributes (like Gravity Pull), and the active coordinate positioning on the court.
Be critical but fair. If the claim is factually false or tactically absurd based on the spacing, give it a low rating. If it has merit, rate it highly.

Return a JSON object conforming to the schema with:
1. rating: integer from 0 to 100 (where 0 is completely false/bullshit and 100 is absolute basketball truth).
2. verdict: a short label representing the category:
   - 0-20: "Airball"
   - 21-40: "Brick"
   - 41-60: "Rim Out"
   - 61-80: "Swish"
   - 81-100: "Nothing but Net"
3. text: a punchy, factual explanation summarizing the verdict and why, checking the claim directly against stats, attributes, or positioning. Max 70 words. Keep it professional yet sharp. Do NOT use any markdown formatting, asterisks, or bold tags.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            rating: { type: "INTEGER", description: "A rating from 0 (completely false/bullshit) to 100 (complete basketball truth)" },
            verdict: { type: "STRING", description: "Verdict string: Airball, Brick, Rim Out, Swish, or Nothing but Net" },
            text: { type: "STRING", description: "A punchy, factual explanation of why the claim is rated this way, max 70 words" }
          },
          required: ["rating", "verdict", "text"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI model");
    }

    const data = JSON.parse(resultText);
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Bullshit Meter API error:", error);
    const errStr = error.message || "";
    if (errStr.includes("429") || errStr.includes("quota") || errStr.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json({
        rating: 0,
        verdict: "Error",
        text: "🏀 Spacing review rate-limited! You've hit the Gemini free-tier quota limit. Please wait a few seconds and try again."
      });
    }
    return NextResponse.json(
      { 
        rating: 0, 
        verdict: "Error", 
        text: `Error evaluating claim: ${error.message}` 
      },
      { status: 500 }
    );
  }
}
