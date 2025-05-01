import React from "react";

interface Props {
  title: string;
  text: string;
  className?: string;
}

export const AliasTitle: React.FC<Props> = ({ title, text }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-[#5B21B6] font-bold text-5xl">{title}</h2>
      <p className="text-[#5B21B6] text-[14px]">{text}</p>
    </div>
  );
};
