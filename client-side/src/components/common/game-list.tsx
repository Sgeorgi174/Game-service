"use client";

import type { Games } from "@/types/games.types";
import React from "react";
import { ButtonForGames } from "./button-for-games";
import { useGameStore } from "@/stores/game-store";

interface GameListProps {
  games: Games[];
}

export const GameList: React.FC<GameListProps> = ({ games }) => {
  const { selectedGameId, setSelectedGame } = useGameStore();
  return (
    <div className="flex flex-col w-full gap-6 mt-11">
      {games &&
        games.map((item) => (
          <div key={item.id}>
            <div
              onClick={() => setSelectedGame(item.id)}
              className={`rounded-2xl w-full p-4 border bg-white ${
                selectedGameId === item.id
                  ? "border-[#5B21B6] shadow-md"
                  : "border-[#5b21b6a1]"
              }`}
            >
              <div>
                <h2 className="text-2xl text-[#5B21B6]">{item.title}</h2>
              </div>
              <p className="text-[#4c4c4c] text-[15px] mt-1.5">
                {item.description}
              </p>
            </div>
            {item.id === selectedGameId && (
              <div className="flex justify-between mt-4">
                <ButtonForGames
                  text="Играть"
                  route={`${selectedGameId}`}
                  onClick={() => setSelectedGame(item.id)}
                />
                <ButtonForGames text="Правила" />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
