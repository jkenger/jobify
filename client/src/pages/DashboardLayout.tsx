import Wrapper from "@/components/wrappers/Dashboard";
import Navbar from "@/components/Navbar";
import { useState, createContext, useContext } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { BigSidebar, SmallSidebar } from "@/components";
import { CurrentUser, DashboardContextType, ILoader } from "@/types";
import fetch from "@/utils/fetch";
import { toast } from "@/components/ui/use-toast";

const DashboardContext = createContext({});

export async function loader(): Promise<ILoader<CurrentUser> | Response> {
  try {
    const { data } = await fetch.get("/users/current-user");
    return {
      data,
    };
  } catch (error) {
    return redirect("/login");
  }
}

function DashboardLayout() {
  const { data } = useLoaderData() as ILoader<CurrentUser>;
  const user = data.message;

  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  async function logoutUser() {
    navigate("/login");
    await fetch.post("/users/logout");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  }

  const value = {
    user,
    showSidebar,
    toggleSidebar,
    setShowSidebar,
    logoutUser,
  } as DashboardContextType;

  return (
    <DashboardContext.Provider value={value}>
      <Wrapper>
        <main className="flex w-screen h-screen">
          {showSidebar && (
            <>
              <SmallSidebar />
              <BigSidebar />
            </>
          )}
          <div className="leftSide basis-full">
            <Navbar />
            <div className="p-4">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}

export const useDashboard = (): DashboardContextType => {
  const result = useContext(DashboardContext) as DashboardContextType;
  if (result === undefined) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider"
    );
  }
  return result;
};
export default DashboardLayout;
