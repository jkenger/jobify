import { Description, Heading, Separator, SpaceRow } from "@/components/ui";

import { JobContainer, FilterContainer } from "@/components";

import { AllJobsProvider } from "@/context/AllJobsProvider";

import { allJobsQuery } from "@/context/AllJobsProvider";

import { QueryClient } from "@tanstack/react-query";

import { CatchError } from "@/types";

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const queryParams = `?${new URLSearchParams(params).toString()}`;
    try {
      await queryClient.ensureQueryData(allJobsQuery(queryParams));
      return { params, queryParams };
    } catch (error) {
      const err = error as CatchError;
      return err.response.data.msg;
    }
  };

function AllJobs() {
  return (
    <AllJobsProvider>
      <SpaceRow>
        <Heading>All Jobs</Heading>
        <Description>
          Explore a wide array of career opportunities from various companies in
          our comprehensive job listings. Whether you're a seasoned professional
          or just starting your career journey, our listings provide a diverse
          range of job openings. Click on any job title to discover more details
          and begin your application process. Your next career move awaits.
        </Description>
      </SpaceRow>
      <Separator className="my-6" />

      <SpaceRow className="space-y-6">
        <FilterContainer />
        <JobContainer />
      </SpaceRow>
    </AllJobsProvider>
  );
}

export default AllJobs;
