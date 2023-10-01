import { UserRole } from "@/types";
import fetch from "@/utils/fetch";
import { createContext, useContext, useState } from "react";

interface IUserProvider {
  email: string;
  name: string;
  lastName: string;
  role: UserRole[];
  location: string;
}

const userContext = createContext<IUserProvider | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserProvider>({} as IUserProvider);

  async function getUser() {
    try {
      const data = await fetch.get("/users/current-user");
      const user = data.data?.message as IUserProvider;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }
  getUser();

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

function useUser() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
