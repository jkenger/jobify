import ChartsContainer from "@/components/ChartsContainer";
import StatCard from "@/components/StatCard";
import StatsContainer from "@/components/StatsContainer";
import { Description, Heading, SpaceRow, toast } from "@/components/ui";
import { CatchError, IStats, Response } from "@/types";
import fetch from "@/utils/fetch";
import { useLoaderData } from "react-router-dom";

export async function loader(): Promise<IStats | Response> {
  try {
    const response = await fetch.get("/jobs/stats");
    return response.data;
  } catch (err) {
    const error = err as CatchError;
    toast({
      title: "Error",
      description: error.response.data.msg,
      variant: "destructive",
    });
    return error;
  }
}

function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData() as IStats;
  console.log(defaultStats, monthlyApplications);
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
        <StatsContainer col={3}>
          {/* 
            1 : 1 col
            2 : 2 col
            0 L 3 col
          */}
          <StatCard
            labelText="pending applications"
            value={defaultStats.pending}
          />
          <StatCard
            labelText="interviews scheduled"
            value={defaultStats.interview}
          />
          <StatCard labelText="jobs declined" value={defaultStats.rejected} />
        </StatsContainer>
        {monthlyApplications?.length > 1 && (
          <ChartsContainer data={monthlyApplications} />
        )}
      </SpaceRow>
    </div>
  );
}

export default Stats;
