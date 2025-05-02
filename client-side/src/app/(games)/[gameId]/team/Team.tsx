"use client";

import { AliasTitle } from "@/components/alias/alias-title";
import { ControlBottomButton } from "@/components/alias/control-bottom-button";
import { InputForTeam } from "@/components/alias/input-for-team";
import { useSessionStore } from "@/stores/session-store";

import React from "react";

interface Props {
  className?: string;
}

export const TeamPage: React.FC<Props> = ({ className }) => {
  const { session } = useSessionStore();
  return (
    <div className="relative min-h-screen p-6 w-full flex flex-col ">
      <div className="w-full flex flex-col items-center">
        <AliasTitle title="Элиас" text="Создание команды" />
        <InputForTeam title="Название команды" />
      </div>
      <ControlBottomButton
        text="Создать"
        route={`/${session?.gameId}`}
        handleClick={() =>
          console.log({
            team: "team",
            member: [{ name: "Durak" }, { name: "Pupok" }],
          })
        }
      />
    </div>
  );
};
