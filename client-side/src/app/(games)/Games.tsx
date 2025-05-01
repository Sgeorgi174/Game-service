import { GameList } from "@/components/common/game-list";
import { Input } from "@/components/ui/input";
import { GamesApi } from "@/lib/api/games";
import { Games } from "@/types/games.types";
import React from "react";

interface Props {
  className?: string;
}

export const GamesPage: React.FC<Props> = async () => {
  const games: Games[] = await GamesApi.getAll();

  {
    games.length === 0 && <div>Игр не найдено</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <p className="text-[#5B21B6] font-bold">
        Найди лучшую игру для своей компании!
      </p>

      <Input
        type="text"
        placeholder="Поиск по играм"
        className="py-3 px-3 border-[#5b21b6a1] rounded-2xl bg-white w-[300px] mt-4"
      />

      <GameList games={games} />
    </div>
  );
};
