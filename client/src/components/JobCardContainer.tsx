import React from "react";

type Props = {
  children: React.ReactNode;
};

function JobCardContainer({ children }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
      {children}
    </div>
  );
}

export default JobCardContainer;
