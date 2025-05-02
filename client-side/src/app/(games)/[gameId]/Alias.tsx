"use client";

import { AliasTitle } from "@/components/alias/alias-title";
import { ControlBottomButton } from "@/components/alias/control-bottom-button";
import { TeamList } from "@/components/alias/team-list";
import { useSessionStore } from "@/stores/session-store";
import { useRouter } from "next/navigation";
import React from "react";

export const AliasPage = () => {
  const router = useRouter();
  const { session, isLoading, error } = useSessionStore();

  if (isLoading) return <div className="p-4 text-center">Загрузка игры...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  if (!session) return <div className="p-4 text-center">Сессия не создана</div>;

  return (
    <div className="relative min-h-screen p-6 flex flex-col">
      <div className="w-full flex flex-col items-center">
        <AliasTitle title="Элиас" text="Создание или выбор команды" />
        <TeamList />
      </div>
      <ControlBottomButton
        text="Продолжить"
        route="/"
        handleClick={() => router.push(`/${session.gameId}/setting`)}
      />
    </div>
  );
};
