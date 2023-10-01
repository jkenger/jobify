import { IJobs, ILoader } from "@/types";
import { createContext, useContext } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

type TAllJobsContext = {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  onSetParams: (name: string, value: Array<string | number>) => void;
  data: ILoader<IJobs>;
};

const AllJobsContext = createContext<TAllJobsContext | null>(null);

function AllJobsProvider({ children }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const data = useLoaderData() as ILoader<IJobs>;
  function onSetParams(name: string, value: Array<string | number>) {
    searchParams.set(name, value.join(","));
    if (value.length === 0) searchParams.delete(name);
    setSearchParams(searchParams);
  }
  const value = {
    searchParams,
    data,
    setSearchParams,
    onSetParams,
  };
  return (
    <AllJobsContext.Provider value={value}>{children}</AllJobsContext.Provider>
  );
}

function useAllJobs() {
  const context = useContext(AllJobsContext) as TAllJobsContext;
  if (context === undefined) {
    throw new Error("AllJobsContext must be used within AllJobsProvider");
  }

  return context;
}

export { AllJobsProvider, useAllJobs };
