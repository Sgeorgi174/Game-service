"use client";
import React from "react";
import { CreateTeamBox } from "./create-team-box";
import { TeamBox } from "./team-box";
import { useSessionStore } from "@/stores/session-store";
import { useRouter } from "next/navigation";

interface Props {}

export const TeamList: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { session } = useSessionStore();

  return (
    <div className="flex items-start justify-around gap-y-3 flex-wrap w-full mt-14">
      <CreateTeamBox
        handleClick={() => router.push(`/${session?.gameId}/team`)}
      />
      {session?.teams &&
        session?.teams.map((team) => (
          <TeamBox
            title={team.title}
            image={team.image ? team.image : "/alias/no-image.png"}
          />
        ))}
    </div>
  );
};
