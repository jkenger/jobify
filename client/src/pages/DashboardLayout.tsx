import Wrapper from "@/components/wrappers/Dashboard";
import Navbar from "@/components/Navbar";
import { useState, createContext, useContext, useEffect } from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { BigSidebar, SmallSidebar } from "@/components";
import {
  CatchError,
  CurrentUser,
  DashboardContextType,
  ILoader,
  QueryKeys,
} from "@/types";
import fetch from "@/utils/fetch";
import { toast } from "@/components/ui/use-toast";
import { QueryClient, UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const DashboardContext = createContext({});

const userQuery = () => {
  return {
    queryKey: [QueryKeys.USER],
    queryFn: async () => {
      try {
        return await fetch.get("/users/current-user");
      } catch (error) {
        const err = error as CatchError;
        return err.response.data.msg;
      }
    },
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async (): Promise<ILoader<CurrentUser> | Response> => {
    try {
      return await queryClient.ensureQueryData(userQuery());
    } catch (error) {
      return redirect("/login");
    }
  };

function DashboardLayout() {
  const { data } = useQuery(userQuery()) as UseQueryResult<AxiosResponse>;

  const user = data?.data.message;
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
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

  fetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuth(false);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (isAuth) return;
    logoutUser();
  }, [isAuth]);

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
