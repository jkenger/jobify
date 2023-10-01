import React from "react";

type Props = {
  children: React.ReactNode;
};

function Dashboard({ children }: Props) {
  return <div className="w-full h-full">{children}</div>;
}

export default Dashboard;
