import ChartsContainer from "@/components/ChartsContainer";
import StatCard from "@/components/StatCard";
import StatsContainer from "@/components/StatsContainer";
import { Description, Heading, SpaceRow, toast } from "@/components/ui";
import { statsQuery } from "@/context/AllJobsProvider";
import { CatchError, IStats, Response } from "@/types";
import { QueryClient, useQuery } from "@tanstack/react-query";

export const loader =
  (queryClient: QueryClient) => async (): Promise<IStats | Response | null> => {
    try {
      return await queryClient.ensureQueryData(statsQuery());
    } catch (err) {
      const error = err as CatchError;
      toast({
        title: "Error",
        description: error.response.data.msg,
        variant: "destructive",
      });
      return error;
    }
  };

function Stats() {
  const {
    data: { data: stats },
  } = useQuery(statsQuery()) as { data: { data: IStats } };
  const { defaultStats, monthlyApplications } = stats;
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
