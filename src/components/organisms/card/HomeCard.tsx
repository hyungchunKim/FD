import Image from "next/image";
import React from "react";

interface ICardProps {
  src: string;
  alt: string;
}

const HomeCard = ({ src, alt }: ICardProps) => {
  return (
    <div className="animate-slide-up h-[502px] w-[340px] rounded-md">
      <Image src={src} width={340} height={502} alt={alt} />
    </div>
  );
};

export default HomeCard;
