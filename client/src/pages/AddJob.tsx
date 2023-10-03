import {
  Button,
  Description,
  Heading,
  Separator,
  SpaceRow,
  toast,
} from "@/components/ui";
import { FormRowSelect, FormRowInput } from "@/components";
import {
  CatchError,
  DashboardContextType,
  JobStatus,
  JobType,
  Links,
  QueryKeys,
} from "@/types";
import fetch from "@/utils/fetch";
import {
  Form,
  useNavigation,
  useOutletContext,
  redirect,
} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();

    const data = Object.fromEntries(formData.entries());
    if (!data.company || !data.position) {
      toast({
        title: "Error",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return null;
    }
    try {
      await fetch.post("/jobs", data);
      queryClient.invalidateQueries([QueryKeys.JOBS]);
      toast({
        title: "Job added",
        description: "Your job has been added to the listings.",
      });
      return redirect(Links.JOBS);
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

function AddJob() {
  const { user } = useOutletContext() as DashboardContextType;
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <SpaceRow>
        <Heading>Add Job</Heading>
        <Description>
          Use this form to add a new job posting to our listings. Fill in the
          details below to provide information about the position and attract
          potential candidates.
        </Description>
      </SpaceRow>
      <Separator className="my-6" />
      <div className="flex flex-col max-w-2xl">
        <Form method="post" className="space-y-8">
          <FormRowInput
            name="position"
            labelText="Position *"
            descriptionText="Enter the position title for this job posting."
          />
          <FormRowInput
            name="company"
            labelText="Company *"
            descriptionText="Enter the company name for this job posting."
          />

          <FormRowInput
            name="jobLocation"
            labelText="Job Location"
            defaultValue={user.location}
            descriptionText="Enter the job location for this job posting."
          />

          <FormRowSelect
            name="jobStatus"
            defaultValue={JobStatus.PENDING}
            labelText="Job Status"
            list={Object.values(JobStatus)}
          />
          <FormRowSelect
            name="jobType"
            defaultValue={JobType.FULL_TIME}
            labelText="Job Type"
            list={Object.values(JobType)}
          />
          <Button type="submit" disabled={isSubmitting}>
            Add job
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddJob;
