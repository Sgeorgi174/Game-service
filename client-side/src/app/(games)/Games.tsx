"use client";

import { GameList } from "@/components/common/game-list";
import { Input } from "@/components/ui/input";
import { Game } from "@/lib/api/games";
import { useGameStore } from "@/stores/game-store";
import { useEffect } from "react";

export const GamesPage = ({ initialGames }: { initialGames: Game[] }) => {
  const {
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    getFilteredGames,
    setGames,
    fetchGames,
  } = useGameStore();

  // Initialize store with server data
  useEffect(() => {
    if (initialGames.length > 0) {
      setGames(initialGames);
    } else {
      fetchGames();
    }
  }, [initialGames, setGames, fetchGames]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredGames = getFilteredGames();

  return (
    <div className="flex flex-col items-center p-6">
      <p className="text-[#5B21B6] font-bold">
        Найди лучшую игру для своей компании!
      </p>

      <Input
        type="text"
        placeholder="Поиск по играм"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="py-3 px-3 border-[#5b21b6a1] rounded-2xl bg-white w-[300px] mt-4"
      />

      {filteredGames.length === 0 ? (
        <div className="mt-4">Игр не найдено</div>
      ) : (
        <GameList games={filteredGames} />
      )}
    </div>
  );
};
