import React from "react";

function BigSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden md:block bg-secondary w-1/4 md:w-48 ">
      {children}
    </div>
  );
}

export default BigSidebar;
