import type { ReactElement } from 'react';

export interface SpriteSheetData {
  spriteSheet: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  fps?: number;
}

export type Difficulty = "Trivial" | "Easy" | "Normal" | "Hard" | "Heroic" | "Deadly";
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
  animationFrames: SpriteSheetData;
  rewards: {
    name: string;
    amount?: number;
    icon: ReactElement;
  }[];
  specialItem: string;
  specialItemFrames: SpriteSheetData;
  specialItemRarity: Rarity;
  prerequisites?: string[];
}