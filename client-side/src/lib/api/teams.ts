import { Team } from "@/types/teams.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const TeamsApi = {
  getById: async (id: string): Promise<Team> => {
    const response = await fetch(`${API_URL}/team/${id}`);
    if (!response.ok) throw new Error("Failed to fetch game");
    return await response.json();
  },

  getBySession: async (): Promise<Team> => {
    const response = await fetch(`${API_URL}/team/session`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch game");
    return await response.json();
  },

  create: async (data: { title: string; image: string }): Promise<Team> => {
    const response = await fetch(`${API_URL}/team/create`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to fetch game");
    return await response.json();
  },

  update: async (
    data: { title: string; image: string },
    id: string
  ): Promise<Team> => {
    const response = await fetch(`${API_URL}/team/update/${id}`, {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to fetch game");
    return await response.json();
  },

  delete: async (id: string): Promise<Team> => {
    const response = await fetch(`${API_URL}/team/delete/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to fetch game");
    return await response.json();
  },
};
