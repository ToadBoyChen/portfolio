import { create } from 'zustand';

interface JourneyState {
  progress: number;
  setProgress: (newProgress: number | ((prev: number) => number)) => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  progress: 0,
  setProgress: (newProgress) =>
    set((state) => ({
      progress: typeof newProgress === 'function' ? newProgress(state.progress) : newProgress,
    })),
}));