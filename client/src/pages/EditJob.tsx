import { FormRowInput, FormRowSelect } from "@/components";
import {
  Button,
  Description,
  Heading,
  Separator,
  SpaceRow,
  toast,
} from "@/components/ui";
import {
  JobStatus,
  JobType,
  Links,
  QueryKeys,
  Response as TypeResponse,
} from "@/types";
import fetch from "@/utils/fetch";
import { QueryClient, UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  Form,
  Params,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { singleJobQuery } from "@/context/AllJobsProvider";
import { AxiosResponse } from "axios";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    const id = params.id as string;

    // if no id, show error
    if (!id) {
      toast({
        title: "Error",
        description: "Job not found",
      });
    }
    // fetch job
    await queryClient.ensureQueryData(singleJobQuery(id));
    return { id };
  };

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: { request: Request; params: Params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const id = params.id;
    if (!formData) {
      toast({
        title: "Warning",
        description: "Fill out the form",
        variant: "warning",
      });
      return null;
    }
    if (!id) {
      toast({
        title: "Error 404",
        description: "Job not found",
        variant: "destructive",
      });
      return redirect(Links.JOBS);
    }

    try {
      await fetch.patch(`/jobs/${id}`, entries);
      toast({
        title: "Success",
        description: "Job updated",
      });
      queryClient.invalidateQueries([QueryKeys.JOB, id]);
      queryClient.invalidateQueries([QueryKeys.JOBS]);
      return redirect(Links.JOBS);
    } catch (err) {
      const error = err as TypeResponse;
      toast({
        title: "Error",
        description: error.response.data.msg,
        variant: "destructive",
      });
      return error;
    }
  };

function EditJob() {
  const { id } = useLoaderData() as { id: string };
  const { data, isLoading } = useQuery(
    singleJobQuery(id)
  ) as UseQueryResult<AxiosResponse>;
  const job = data?.data?.message;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <SpaceRow>
        <Heading>Edit Job</Heading>
        <Description>
          Update and refine job details effortlessly with our user-friendly
          editing feature. Make necessary changes to your job listing to attract
          the right candidates and keep your opportunities up-to-date.
        </Description>
      </SpaceRow>
      <Separator className="my-6" />
      <SpaceRow>
        {job && (
          <div className="flex flex-col max-w-2xl">
            <Form method="post" className="space-y-8">
              <FormRowInput
                labelText="Company"
                name="company"
                defaultValue={job.company}
                descriptionText="The name of the company you applied for."
              />
              <FormRowInput
                labelText="Position"
                name="position"
                defaultValue={job.position}
                descriptionText="The position you applied for."
              />
              <FormRowInput
                labelText="Job Location"
                name="jobLocation"
                defaultValue={job.jobLocation}
                descriptionText="The location of the job."
              />
              <FormRowSelect
                name="jobStatus"
                defaultValue={job.jobStatus}
                labelText="Job Status"
                list={Object.values(JobStatus)}
                descriptionText="The status of the job."
              />
              <FormRowSelect
                name="jobType"
                defaultValue={job.jobType}
                labelText="Job Type"
                list={Object.values(JobType)}
                descriptionText="The type of job."
              />
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </Form>
          </div>
        )}
        {!job && <p>Job not found</p>}
      </SpaceRow>
    </>
  );
}

export default EditJob;
