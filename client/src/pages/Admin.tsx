import StatCard from "@/components/StatCard";
import StatsContainer from "@/components/StatsContainer";
import { Description, Heading, SpaceRow, toast } from "@/components/ui";
import { IAdminLoader, Links } from "@/types";
import fetch from "@/utils/fetch";
import { redirect, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const response = await fetch.get("/users/admin/app-stats");

    return response.data.message;
  } catch (error) {
    toast({
      title: "Error 401",
      description: "You are not authorized to view this page",
    });
    return redirect(Links.DASHBOARD);
  }
}

function Admin() {
  const { users, jobs } = useLoaderData() as IAdminLoader;
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
