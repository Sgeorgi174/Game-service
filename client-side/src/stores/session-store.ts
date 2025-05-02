import { create } from "zustand";
import { Session, SessionsApi } from "@/lib/api/sessions";

interface SessionStore {
  session: Session | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSession: (session: Session) => void;
  createSession: (gameId: string) => Promise<Session>;
  loadSession: (sessionId: string) => Promise<Session>;
}

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  isLoading: false,
  error: null,

  setSession: (session) => set({ session, error: null }),

  createSession: async (gameId) => {
    set({ isLoading: true });
    try {
      const session = await SessionsApi.create(gameId);
      set({ session, isLoading: false });
      return session;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Ошибка создания сессии",
        isLoading: false,
      });
      throw error;
    }
  },

  loadSession: async (sessionId) => {
    set({ isLoading: true });
    try {
      const session = await SessionsApi.getById(sessionId);
      set({ session, isLoading: false });
      return session;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Ошибка загрузки сессии",
        isLoading: false,
      });
      throw error;
    }
  },
}));
