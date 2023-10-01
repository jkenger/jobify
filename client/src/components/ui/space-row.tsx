import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function SpaceRow({ children, className = "space-y-2" }: Props) {
  return <div className={className}>{children}</div>;
}

export default SpaceRow;
