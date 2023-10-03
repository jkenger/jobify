import StatCard from "@/components/StatCard";
import StatsContainer from "@/components/StatsContainer";
import { Description, Heading, SpaceRow, toast } from "@/components/ui";
import { adminQuery } from "@/context/AllJobsProvider";
import { CatchError, IAdminLoader, Links } from "@/types";

import { QueryClient, UseQueryResult, useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";

export const loader = (queryCLient: QueryClient) => async () => {
  try {
    return await queryCLient.ensureQueryData(adminQuery());
  } catch (error) {
    const err = error as CatchError;
    toast({
      title: "Error",
      description: err.response.data.msg,
    });
    return redirect(Links.DASHBOARD);
  }
};

function Admin() {
  const data = useQuery(adminQuery()) as UseQueryResult<IAdminLoader>;
  const jobs = data?.data?.jobs;
  const users = data?.data?.users;
  return (
    <div className="space-y-4">
      <SpaceRow>
        <Heading>Stats</Heading>
        <Description>
          Explore job statistics to stay in the know. Monitor pending
          applications, track scheduled interviews, and stay informed about jobs
          declined by candidates, all in one convenient dashboard.
        </Description>
      </SpaceRow>
      <SpaceRow>
        <StatsContainer col={2}>
          <StatCard labelText="current users" value={users} />
          <StatCard labelText="current jobs" value={jobs} />
        </StatsContainer>
      </SpaceRow>
    </div>
  );
}

export default Admin;
