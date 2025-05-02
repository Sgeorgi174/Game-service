import { GamesApi } from "@/lib/api/games";
import { GamesPage } from "./Games";

export default async function Page() {
  const games = await GamesApi.getAll();
  return <GamesPage initialGames={games} />;
}
