import { Setting } from "@/types/settings.types";
import { Team } from "@/types/teams.types";

// lib/api/sessions.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Session = {
  id: string;
  gameId: string;
  createdAt: string;
  updatedAt: string;
  teams?: Team[];
  settings?: Setting[];
};

export const SessionsApi = {
  getById: async (id: string): Promise<Session> => {
    const response = await fetch(`${API_URL}/session/${id}`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Сессия не найдена");
    return await response.json();
  },

  create: async (gameId: string): Promise<Session> => {
    const response = await fetch(`${API_URL}/session/create/${gameId}`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Ошибка создания сессии");
    return await response.json();
  },
};
