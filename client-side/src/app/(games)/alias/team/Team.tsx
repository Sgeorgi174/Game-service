import { AliasTitle } from "@/components/alias/alias-title";
import React from "react";

interface Props {
  className?: string;
}

export const TeamPage: React.FC<Props> = ({ className }) => {
  return (
    <div className="p-6">
      <AliasTitle title="Элиас" text="Создание команды" />
    </div>
  );
};
