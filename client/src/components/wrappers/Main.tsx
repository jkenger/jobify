import React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 w-full h-screen md:w-2/3 md:mx-auto">{children}</div>
  );
}

export default Main;
