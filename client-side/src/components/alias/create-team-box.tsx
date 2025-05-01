import { Plus } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const CreateTeamBox: React.FC<Props> = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="flex flex-col gap-2 items-center">
      <div className="w-[150px] h-[150px] flex items-center justify-center bg-[#C898CC] rounded-full border-8 border-[#5B21B6]">
        <Plus color="white" size={50} />
      </div>
      <p className="font-extrabold text-[18px] w-[95px] text-center text-[#5B21B6]">
        Добавить команду
      </p>
    </div>
  );
};
