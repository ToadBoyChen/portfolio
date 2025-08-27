import type { ReactElement } from 'react';

// All your type definitions now live here, clean and reusable.
export type Difficulty = "Trivial" | "Easy" | "Normal" | "Hard" | "Heroic";
export type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export interface JourneyStep {
  title: string;
  date: string;
  location: string;
  description: string;
  questType: string;
  difficulty: Difficulty;
  recommendedLevel: number;
  recommendedSkills: string[];
  progress: number;
  animationFrames: string[];
  rewards: {
    type: "XP" | "Skill" | "Item";
    name: string;
    amount?: number;
    icon: ReactElement;
  }[];
  specialItem: string;
  specialItemFrames: string[];
  specialItemRarity: Rarity;
}