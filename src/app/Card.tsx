/* eslint-disable @next/next/no-img-element */
import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";

const Card = ({
  imageURL,
  name,
  message,
  divRef,
}: {
  imageURL: string;
  name: { to: string; from: string };
  message?: string;
  divRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageURL})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      ref={divRef}
      className="lg:w-1/2 w-full h-[280px] rounded-[6px] relative"
    >
      {message && (
        <div className="flex h-full items-center gap-2 rounded-[6px] flex-col justify-center px-4 py-2 absolute bottom-0 bg-black dark:bg-white bg-opacity-65 dark:bg-opacity-65 w-full">
          <p className=" font-bold text-[16px] dark:text-black w text-white pt-6">
            {"Happy Valentine's Day, "}
            <span className=" not-italic">{name.to}</span>
          </p>
          <div className="w-3/5 border-white dark:border-black border-b-[0.2px]"></div>
          <p className="text-[18px] font-medium  text-white dark:text-black w-4/5 max-h-44 text-center py-4">
            {message}
          </p>
          <div className=" w-3/5 border-white dark:border-black border-b-[0.2px]"></div>
          <p className="text-[16px] font-bold dark:text-black w text-white">
            {`${name.from}`}
          </p>
          <HeartIcon fontSize={"12px"} className="text-[#e6194c]" />
        </div>
      )}
    </div>
  );
};

export default Card;
