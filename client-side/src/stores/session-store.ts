// stores/session-store.ts
import { create } from "zustand";
import { Team } from "@/types/teams.types";
import { Setting } from "@/types/settings.types";

interface SessionState {
  sessionId: string | null;
  gameId: string | null;
  teams: Team[];
  settings: Setting[];
  setSession: (data: Partial<SessionState>) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  gameId: null,
  teams: [],
  settings: [],

  setSession: (data) => set((state) => ({ ...state, ...data })),

  clearSession: () =>
    set({
      sessionId: null,
      gameId: null,
      teams: [],
      settings: [],
    }),
}));
