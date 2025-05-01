"use client";

import { useSession } from "@/app/hooks/useSession";
import { useGameStore } from "@/stores/game-store";
import { useEffect } from "react";

export const AliasPage = ({ className }: { className?: string }) => {
  const { selectedGameId } = useGameStore();
  const { isLoading, error, createSession, hasSession } = useSession();

  useEffect(() => {
    if (!isLoading && !hasSession && selectedGameId) {
      createSession(selectedGameId).catch(() => {
        // Ошибка уже обработана в хуке
      });
    }
  }, [isLoading, hasSession, selectedGameId]);

  if (isLoading) return <div>Загрузка сессии...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!hasSession) return <div>Подготовка к игре...</div>;

  return (
    <div className={className}>
      <h1 className="text-2xl font-bold">Игровая сессия</h1>
      <div className="mt-4 space-y-2">
        <p>ID игры: {selectedGameId}</p>
      </div>
    </div>
  );
};
