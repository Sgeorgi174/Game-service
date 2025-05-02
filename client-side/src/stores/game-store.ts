import { GamesApi, Game } from "@/lib/api/games";
import { create } from "zustand";

interface GameStore {
  // State
  games: Game[];
  selectedGameId: string | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;

  // Actions
  setGames: (games: Game[]) => void;
  setSelectedGame: (gameId: string) => void;
  clearSelectedGame: () => void;
  setSearchQuery: (query: string) => void;
  fetchGames: () => Promise<void>;
  getSelectedGame: () => Game | null;
  getFilteredGames: () => Game[];
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  games: [],
  selectedGameId: null,
  isLoading: false,
  error: null,
  searchQuery: "",

  // Actions
  setGames: (games) => set({ games }),
  setSelectedGame: (gameId) => set({ selectedGameId: gameId }),
  clearSelectedGame: () => set({ selectedGameId: null }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchGames: async () => {
    set({ isLoading: true, error: null });
    try {
      const games = await GamesApi.getAll();
      set({ games, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        isLoading: false,
      });
    }
  },

  getSelectedGame: () => {
    const { games, selectedGameId } = get();
    return selectedGameId
      ? games.find((game) => game.id === selectedGameId) ?? null
      : null;
  },

  getFilteredGames: () => {
    const { games, searchQuery } = get();
    return games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },
}));
