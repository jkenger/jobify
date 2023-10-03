import { CatchError, IJobs, ILoader, QueryKeys } from "@/types";
import fetch from "@/utils/fetch";
import { AxiosResponse } from "axios";
import { createContext, useContext } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

type TAllJobsContext = {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  onSetParams: (name: string, value: Array<string | number>) => void;
  queryParams: string;
};

const AllJobsContext = createContext<TAllJobsContext | null>(null);

const allJobsQuery = (queryParams: string) => {
  return {
    queryKey: [QueryKeys.JOBS, queryParams],
    queryFn: async () => {
      try {
        return await fetch.get(`/jobs${queryParams}`);
      } catch (error) {
        const err = error as CatchError;
        return err.response.data.msg;
      }
    },
    keepPreviousData: true,
  };
};

const singleJobQuery = (id: string) => {
  return {
    queryKey: [QueryKeys.JOB, id],
    queryFn: async () => {
      try {
        return await fetch.get(`/jobs/${id}`);
      } catch (error) {
        const err = error as CatchError;
        return err.response.data.msg;
      }
    },
  };
};

const statsQuery = () => {
  return {
    queryKey: [QueryKeys.STATS],
    queryFn: async () => {
      try {
        return (await fetch.get(`/jobs/stats`)) as AxiosResponse<
          ILoader<IJobs>
        >;
      } catch (error) {
        const err = error as CatchError;
        return err.response.data.msg;
      }
    },
  };
};

const adminQuery = () => {
  return {
    queryKey: [QueryKeys.ADMIN],
    queryFn: async () => {
      try {
        return await fetch.get("/users/admin/app-stats");
      } catch (error) {
        const err = error as CatchError;
        return err.response.data.msg;
      }
    },
  };
};

function AllJobsProvider({ children }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { queryParams } = useLoaderData() as { queryParams: string };
  function onSetParams(name: string, value: Array<string | number>) {
    searchParams.set(name, value.join(","));
    if (value.length === 0) searchParams.delete(name);
    setSearchParams(searchParams);
  }
  const value = {
    searchParams,
    queryParams,
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

export {
  AllJobsProvider,
  useAllJobs,
  allJobsQuery,
  singleJobQuery,
  statsQuery,
  adminQuery,
};
