import { create } from "zustand";
import { TeamsApi } from "@/lib/api/teams";
import { Team } from "@/types/teams.types";

interface TeamStore {
  teams: Team[];
  currentTeam: Team | null;
  loading: boolean;
  error: string | null;
  teamName: string;

  // Базовые методы
  setTeams: (teams: Team[]) => void;
  setCurrentTeam: (team: Team | null) => void;
  setTeamName: (name: string) => void;

  // Основные действия
  fetchTeams: () => Promise<void>;
  createTeam: (title: string, image?: string) => Promise<Team>;
  removeTeam: (id: string) => Promise<void>;
}

export const useTeamStore = create<TeamStore>((set) => ({
  // Начальное состояние
  teams: [],
  currentTeam: null,
  loading: false,
  error: null,
  teamName: "", // Инициализируем пустой строкой

  // Простые сеттеры
  setTeams: (teams) => set({ teams }),
  setCurrentTeam: (team) => set({ currentTeam: team }),
  setTeamName: (teamName) => set({ teamName }), // Исправленный синтаксис

  // Загрузка команд
  fetchTeams: async () => {
    set({ loading: true, error: null });
    try {
      const team = await TeamsApi.getBySession();
      set({ teams: [team], loading: false });
    } catch (err) {
      set({ error: "Не удалось загрузить команды", loading: false });
    }
  },

  // Создание команды
  createTeam: async (title, image = "") => {
    set({ loading: true });
    try {
      const newTeam = await TeamsApi.create({ title, image });
      set((state) => ({
        teams: [...state.teams, newTeam],
        currentTeam: newTeam,
        loading: false,
      }));
      return newTeam;
    } catch {
      set({ error: "Ошибка создания команды", loading: false });
      throw new Error("Create failed");
    }
  },

  // Удаление команды
  removeTeam: async (id) => {
    set({ loading: true });
    try {
      await TeamsApi.delete(id);
      set((state) => ({
        teams: state.teams.filter((t) => t.id !== id),
        currentTeam: state.currentTeam?.id === id ? null : state.currentTeam,
        loading: false,
      }));
    } catch {
      set({ error: "Ошибка удаления", loading: false });
    }
  },
}));
