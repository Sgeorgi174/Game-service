import { create } from "zustand";

interface GameStore {
  selectedGameId: string | null;
  setSelectedGame: (gameId: string) => void;
  clearSelectedGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  selectedGameId: null,
  setSelectedGame: (gameId) => set({ selectedGameId: gameId }),
  clearSelectedGame: () => set({ selectedGameId: null }),
}));
