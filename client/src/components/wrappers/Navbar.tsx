import React from "react";

function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full p-4 bg-secondary">
      {children}
    </div>
  );
}

export default Navbar;
