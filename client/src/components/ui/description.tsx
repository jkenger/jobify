import React from "react";

type Props = {
  children: React.ReactNode;
};

function Description({ children }: Props) {
  return <p className="text-muted-foreground ">{children}</p>;
}

export default Description;
