const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Game = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const GamesApi = {
  getAll: async (): Promise<Game[]> => {
    const response = await fetch(`${API_URL}/game/all`);
    if (!response.ok) throw new Error("Failed to fetch games");
    return await response.json();
  },

  getById: async (id: string): Promise<Game> => {
    const response = await fetch(`${API_URL}/game/${id}`);
    if (!response.ok) throw new Error("Failed to fetch game");
    return await response.json();
  },
};
