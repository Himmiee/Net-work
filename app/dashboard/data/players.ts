export interface PlayerAttributes {
  "3PT Shooting": number;
  "Playmaking": number;
  "Gravity Pull": number;
  "Paint Threat": number;
}

export interface PlayerStats {
  PPG: string;
  APG?: string;
  RPG?: string;
  BPG?: string;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  number: string;
  logo: string;
  color: string;
  stats: PlayerStats;
  attributes: PlayerAttributes;
  bio: string;
}

export const players: Player[] = [
  {
    id: "clark",
    name: "Caitlin Clark",
    team: "Indiana Fever",
    position: "PG",
    number: "22",
    logo: "🔥",
    color: "#fdb315",
    stats: { PPG: "19.2", APG: "8.2", RPG: "5.7" },
    attributes: {
      "3PT Shooting": 99,
      "Playmaking": 96,
      "Gravity Pull": 99,
      "Paint Threat": 72,
    },
    bio: "Unprecedented shooting range that pulls defensive lines out past 30 feet, opening massive rolling lanes inside.",
  },
  {
    id: "wilson",
    name: "A'ja Wilson",
    team: "Las Vegas Aces",
    position: "C",
    number: "22",
    logo: "♠️",
    color: "#e31837",
    stats: { PPG: "26.9", APG: "2.3", RPG: "11.9", BPG: "2.6" },
    attributes: {
      "3PT Shooting": 68,
      "Playmaking": 75,
      "Gravity Pull": 88,
      "Paint Threat": 99,
    },
    bio: "Dominant interior scorer and rim protector. Draws doubles in the low post, creating wide-open kickout spots.",
  },
  {
    id: "ionescu",
    name: "Sabrina Ionescu",
    team: "New York Liberty",
    position: "SG",
    number: "20",
    logo: "🗽",
    color: "#6cace4",
    stats: { PPG: "18.2", APG: "6.2", RPG: "4.4" },
    attributes: {
      "3PT Shooting": 94,
      "Playmaking": 88,
      "Gravity Pull": 92,
      "Paint Threat": 74,
    },
    bio: "Elite shooter off the screen and pick-and-roll general. Excellent spacing gravity on the weak side.",
  },
  {
    id: "boston",
    name: "Aliyah Boston",
    team: "Indiana Fever",
    position: "C",
    number: "7",
    logo: "🌾",
    color: "#12284c",
    stats: { PPG: "14.0", RPG: "8.9", APG: "3.2" },
    attributes: {
      "3PT Shooting": 55,
      "Playmaking": 82,
      "Gravity Pull": 78,
      "Paint Threat": 94,
    },
    bio: "High IQ rolling center. Seals defenders efficiently and acts as a secondary hub for high-low passing.",
  },
  {
    id: "bueckers",
    name: "Paige Bueckers",
    team: "UConn Huskies",
    position: "PG",
    number: "5",
    logo: "🐾",
    color: "#0e2240",
    stats: { PPG: "21.9", APG: "3.8", RPG: "5.2" },
    attributes: {
      "3PT Shooting": 88,
      "Playmaking": 92,
      "Gravity Pull": 86,
      "Paint Threat": 82,
    },
    bio: "Calculated mid-range assassin and fluid pick-and-roll ball handler. Reads defensive collapses instantly.",
  },
];
