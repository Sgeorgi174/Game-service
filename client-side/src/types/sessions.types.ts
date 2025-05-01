import { Setting } from "./settings.types";
import { Team } from "./teams.types";

export type Session = {
  id: string;
  gameId: string;
  createdAt: string;
  updatedAt: string;
  teams?: Team[];
  settings?: Setting[];
};
