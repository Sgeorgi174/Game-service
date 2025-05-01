"use client";

import { useSession } from "@/app/hooks/useSession";
import { AliasTitle } from "@/components/alias/alias-title";
import { ControlBottomButton } from "@/components/alias/control-bottom-button";
import { TeamList } from "@/components/alias/team-list";
import { useGameStore } from "@/stores/game-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AliasPage = () => {
  const router = useRouter();
  const { selectedGameId } = useGameStore();
  const { isLoading, error, createSession, hasSession } = useSession();

  useEffect(() => {
    if (!isLoading && !hasSession && selectedGameId) {
      createSession(selectedGameId);
    }
  }, [isLoading, hasSession, selectedGameId]);

  if (isLoading) return <div>Загрузка сессии...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!hasSession) return <div>Подготовка к игре...</div>;

  return (
    <div className="relative min-h-screen p-6 w-full flex flex-col ">
      <div className="w-full flex flex-col items-center">
        <AliasTitle title="Элиас" text="Создание или выбор команды" />
        <TeamList />
      </div>
      <ControlBottomButton
        text="Продолжить"
        route="/"
        handleClick={() => router.push("/alias/setting")}
      />
    </div>
  );
};
