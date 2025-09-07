import type { SpriteSheetData } from './JourneyTypes';


const FRAME_SIZE = 96;
const DEFAULT_FPS = 3;
const spriteSheetModules = import.meta.glob<{ default: string }>(
  '../../animation/**/*-*frame.png', 
  { eager: true }
);

const generatedAnimations = Object.entries(spriteSheetModules).reduce(
  (acc, [path, module]) => {
    const filename = path.split('/').pop();
    if (!filename) return acc;

    const match = filename.match(/^(.*?)-(\d+)frame\.png$/);
    if (!match) {
      console.warn(`Skipping file with invalid name format: ${filename}`);
      return acc;
    }

    const [, name, frameCountStr] = match;
    const frameCount = parseInt(frameCountStr, 10);
    const animationData: SpriteSheetData = {
      spriteSheet: module.default,
      frameCount,
      frameWidth: FRAME_SIZE,
      frameHeight: FRAME_SIZE,
      fps: DEFAULT_FPS,
    };

    acc[name] = animationData;
    return acc;
  },
  {} as Record<string, SpriteSheetData>
);

export const animations = generatedAnimations;