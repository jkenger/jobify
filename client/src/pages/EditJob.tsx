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
  CatchError,
  IJob,
  ILoader,
  JobStatus,
  JobType,
  Links,
  Response as TypeResponse,
} from "@/types";
import fetch from "@/utils/fetch";
import {
  Form,
  Params,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

export async function loader({
  params,
}: {
  params: Params;
}): Promise<ILoader<IJob> | Response> {
  const id = params.id;

  // if no id, show error
  if (!id) {
    toast({
      title: "Error",
      description: "Job not found",
    });
  }

  // fetch job
  try {
    const data = await fetch.get(`/jobs/${id}`);
    const { message: job } = data.data;
    return job;
  } catch (err) {
    const error = err as CatchError;
    toast({
      title: "Error",
      description: error.response.data.msg,
      variant: "destructive",
    });
    return redirect(Links.JOBS);
  }
}

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
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
}

function EditJob() {
  const data = useLoaderData() as IJob;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
        <div className="flex flex-col max-w-2xl">
          <Form method="post" className="space-y-8">
            <FormRowInput
              labelText="Company"
              name="company"
              defaultValue={data.company}
              descriptionText="The name of the company you applied for."
            />
            <FormRowInput
              labelText="Position"
              name="position"
              defaultValue={data.position}
              descriptionText="The position you applied for."
            />
            <FormRowInput
              labelText="Job Location"
              name="jobLocation"
              defaultValue={data.jobLocation}
              descriptionText="The location of the job."
            />
            <FormRowSelect
              name="jobStatus"
              defaultValue={JobStatus.PENDING}
              labelText="Job Status"
              list={Object.values(JobStatus)}
              descriptionText="The status of the job."
            />
            <FormRowSelect
              name="jobType"
              defaultValue={JobType.FULL_TIME}
              labelText="Job Type"
              list={Object.values(JobType)}
              descriptionText="The type of job."
            />
            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </Form>
        </div>
      </SpaceRow>
    </>
  );
}

export default EditJob;
