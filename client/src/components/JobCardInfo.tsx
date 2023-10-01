import React from "react";
import { IconContext } from "react-icons";
import { MdLocationPin } from "react-icons/md";

type Props = {
  children: React.ReactNode;
};

function JobCardInfo({ children }: Props) {
  return (
    <div className="flex items-center gap-1">
      <IconContext.Provider
        value={{
          className: "text-primary text-xl",
        }}
      >
        <MdLocationPin />
      </IconContext.Provider>
      {children}
    </div>
  );
}

export default JobCardInfo;
