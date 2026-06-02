export interface PlayPositions {
  offense: [number, number, number][]; // 5 player coordinates
  defense: [number, number, number][]; // 5 matching defender coordinates
}

export const playPositions: Record<string, PlayPositions> = {
  "Five Out": {
    offense: [
      [1.0, 0.5, 3.5],   // PG (Top Left)
      [1.0, 0.5, -3.5],  // SG (Top Right)
      [0.0, 0.5, 0.0],   // SF (Active - Ball Handler at Logo)
      [5.5, 0.5, 4.5],   // PF (Corner Left)
      [5.5, 0.5, -4.5],  // C (Corner Right)
    ],
    defense: [
      [2.0, 0.5, 2.8],
      [2.0, 0.5, -2.8],
      [1.2, 0.5, 0.0],
      [5.8, 0.5, 3.5],
      [5.8, 0.5, -3.5],
    ],
  },
  "Pick & Roll": {
    offense: [
      [1.2, 0.5, 2.5],   // PG (Active - Ball Handler)
      [3.0, 0.5, 1.2],   // C (Screener setting screen)
      [1.0, 0.5, -3.5],  // SG (Weakside Spacer)
      [6.5, 0.5, -4.5],  // PF (Corner Spacer)
      [6.0, 0.5, 0.0],   // SF (Rolling to Paint)
    ],
    defense: [
      [1.8, 0.5, 2.0],   // Guarding ball
      [3.5, 0.5, 0.5],   // Screener defender (Drop coverage)
      [2.0, 0.5, -2.8],
      [6.0, 0.5, -3.5],
      [5.0, 0.5, 0.0],   // Paint helper
    ],
  },
  "Pin Down": {
    offense: [
      [5.5, 0.5, 3.8],   // SG (Active - Shooting off Screen)
      [4.2, 0.5, 2.0],   // PF (Screener setting Pin Down)
      [1.0, 0.5, -1.0],  // PG (Passer at Logo)
      [1.5, 0.5, -4.0],  // SF (Wing spacer)
      [6.5, 0.5, -3.0],  // C (Low post box out)
    ],
    defense: [
      [4.8, 0.5, 3.5],   // Chasing shooter
      [3.8, 0.5, 1.5],
      [2.0, 0.5, -0.8],
      [2.2, 0.5, -3.2],
      [6.8, 0.5, -2.2],
    ],
  },
  "Iso Corner": {
    offense: [
      [6.5, 0.5, 4.5],   // SG (Active - Isolated in Corner)
      [1.0, 0.5, 3.0],   // PG (Spaced out)
      [1.0, 0.5, -3.0],  // SF (Spaced out)
      [1.5, 0.5, 0.0],   // PF (Spaced out at Logo)
      [6.5, 0.5, -4.5],  // C (Opposite block corner)
    ],
    defense: [
      [5.8, 0.5, 3.8],   // Defending iso one-on-one
      [2.0, 0.5, 2.5],
      [2.0, 0.5, -2.5],
      [2.5, 0.5, 0.0],
      [6.8, 0.5, -3.5],
    ],
  },
};
