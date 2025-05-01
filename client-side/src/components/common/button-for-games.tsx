import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  text: string;
  route?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ButtonForGames: React.FC<Props> = ({ text, route, className }) => {
  return (
    <Link href={`/${route}`}>
      <Button
        className={cn(
          "bg-white text-[#5B21B6] text-2xl rounded-2xl border border-[#5b21b6a1] py-6 px-10",
          className
        )}
      >
        {text}
      </Button>
    </Link>
  );
};
