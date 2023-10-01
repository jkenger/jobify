import React from "react";

function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="font-bold text-2xl text-primary">{children}</h1>;
}

export default Heading;
