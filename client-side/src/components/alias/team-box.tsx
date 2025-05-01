import { Member } from "@/types/members.types";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  id?: string;
  title: string;
  image?: string;
  points?: number;
  sessionId?: string;
  members?: Member[];
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const TeamBox: React.FC<Props> = ({
  handleClick,
  title,
  image,
  points,
  sessionId,
}) => {
  return (
    <div onClick={handleClick} className="flex flex-col gap-2 items-center">
      <Image
        width={150}
        height={150}
        alt={`Аватар команды ${title}`}
        src={image ? image : "/alias/no-image.png"}
      />
      <p className="font-extrabold text-[18px] w-[95px] text-center text-[#5B21B6]">
        {title}
      </p>
    </div>
  );
};
