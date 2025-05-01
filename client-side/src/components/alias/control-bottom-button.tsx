import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

interface Props {
  text: string;
  route: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const ControlBottomButton: React.FC<Props> = ({
  className,
  text,
  handleClick,
  route,
}) => {
  return (
    <div className="fixed bottom-0 right-0 left-0 flex items-center justify-between w-full p-6">
      <Link href={route}>
        <Button className="bg-white text-[#5B21B6] text-2xl rounded-2xl border border-[#5b21b6a1] py-6 px-10 w-[100px]">
          {"<-"}
        </Button>
      </Link>
      <Button
        className="bg-white text-[#5B21B6] text-2xl rounded-2xl border border-[#5b21b6a1] py-6 px-10 w-[240px]"
        onClick={handleClick}
      >
        {text}
      </Button>
    </div>
  );
};
