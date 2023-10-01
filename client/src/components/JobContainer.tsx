import { JobCard, JobCardTag, JobCardContainer } from "@/components";
import { DeleteDialog, Description, Heading } from "@/components/ui";
import { MdLocationPin } from "react-icons/md";
import { GiSuitcase } from "react-icons/gi";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { BiCircle } from "react-icons/bi";
import day from "dayjs";
import { useAllJobs } from "@/context/AllJobsProvider";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { Links } from "@/types";
import Pagination from "./Pagination";
function JobContainer() {
  const { data } = useAllJobs();
  const {
    message: { jobs, totalJobs },
  } = data.data;

  if (!jobs?.length)
    return (
      <JobCardContainer>
        <h1>No jobs found</h1>
      </JobCardContainer>
    );
  return (
    <div className="flex flex-col gap-4 ">
      <Heading>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </Heading>
      <JobCardContainer>
        {jobs.map((job) => (
          <JobCard key={job._id}>
            <JobCard.Header logo={job.position}>
              <Heading>{job.position}</Heading>
              <Description>{job.company}</Description>
            </JobCard.Header>
            <JobCard.Content>
              <JobCardTag icon={<MdLocationPin />}>
                {job.jobLocation}
              </JobCardTag>
              <JobCardTag icon={<BsFillCalendar2DateFill />}>
                {day(job?.createdAt).format("MMM D, YYYY")}
              </JobCardTag>
              <JobCardTag icon={<GiSuitcase />}>{job.jobType}</JobCardTag>
              <JobCardTag icon={<BiCircle />}>{job.jobStatus}</JobCardTag>
            </JobCard.Content>
            <JobCard.Footer>
              <Link
                className={buttonVariants({
                  size: "sm",
                })}
                to={`${Links.EDIT_JOB}/${job._id}`}
              >
                Edit
              </Link>
              <DeleteDialog id={job._id}>Delete</DeleteDialog>
            </JobCard.Footer>
          </JobCard>
        ))}
      </JobCardContainer>
      <Pagination />
    </div>
  );
}

export default JobContainer;
