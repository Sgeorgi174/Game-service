import React from "react";
import { Input } from "../ui/input";
import { useTeamStore } from "@/stores/team-store";

interface Props {
  title: string;
  className?: string;
}

export const InputForTeam: React.FC<Props> = ({ className, title }) => {
  const { teamName, setTeamName } = useTeamStore();

  return (
    <div className="w-full mt-10">
      <p className="text-[#5B21B6] text-[14px]">{title}</p>
      <Input
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="py-3 px-3 border-[#5b21b6a1] rounded-2xl bg-white w-full mt-1"
      />
    </div>
  );
};
