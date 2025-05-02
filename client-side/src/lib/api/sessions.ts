import { Setting } from "@/types/settings.types";
import { Team } from "@/types/teams.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Session = {
  id: string;
  gameId: string;
  teams?: Team[];
  settings?: Setting[];
};

export const SessionsApi = {
  getById: async (id: string): Promise<Session> => {
    const response = await fetch(`${API_URL}/session/${id}`, {
      credentials: "include", // Отправляем куки
    });
    if (!response.ok) throw new Error("Сессия не найдена");
    return response.json();
  },

  create: async (gameId: string): Promise<Session> => {
    const response = await fetch(`${API_URL}/session/create/${gameId}`, {
      method: "POST",
      credentials: "include", // Сервер установит куку
    });
    if (!response.ok) throw new Error("Ошибка создания сессии");
    return response.json();
  },
};
