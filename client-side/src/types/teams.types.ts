import { Member } from "./members.types";

export interface Team {
  id: string;
  title: string;
  image: string;
  points?: number;
  members?: Member[];
}
