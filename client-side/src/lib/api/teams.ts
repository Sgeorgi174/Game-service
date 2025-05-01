import { Team } from "@/types/teams.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const TeamsApi = {
  getAll: async (): Promise<Team[]> => {
    const response = await fetch(`${API_URL}/team/session`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch teams");
    return await response.json();
  },

  getById: async (id: string): Promise<Team> => {
    const response = await fetch(`${API_URL}/game/${id}`);
    if (!response.ok) throw new Error("Failed to fetch game");
    return await response.json();
  },
};
