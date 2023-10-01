import { useRef } from "react";

import { IoAddCircleOutline, IoClose } from "react-icons/io5";

import { JobSort, JobStatus, JobType } from "@/types";
import { Input, Button, DropdownSelect, FilterButton } from "@/components/ui";
import { useAllJobs } from "@/context/AllJobsProvider";
import { Form } from "react-router-dom";

function FilterContainer() {
  const { searchParams, onSetParams, setSearchParams } = useAllJobs();
  const jobStatus = searchParams.get("jobStatus")?.split(",") || [];
  const jobType = searchParams.get("jobType")?.split(",") || [];
  const sort = searchParams.get("sort") || (JobSort.NEWEST as JobSort);

  const jobStatusfilter = useRef([]);
  const jobTypefilter = useRef([]);

  const jobStatusOptions = Object.values(JobStatus);
  const jobTypeOptions = Object.values(JobType);

  const debounce = (onChange: (value: string) => void) => {
    let timer: NodeJS.Timeout;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onChange(e.target.value);
      }, 300);
    };
  };

  function onClearFilters() {
    jobStatusfilter.current = [];
    jobTypefilter.current = [];
    onSetParams("jobStatus", []);
    onSetParams("jobType", []);
    onSetParams("sort", [JobSort.NEWEST]);
    setSearchParams(new URLSearchParams());
  }

  return (
    <Form className="flex flex-col-reverse items-center gap-2 lg:flex-row ">
      <Input
        type="text"
        placeholder="Filter jobs.."
        className="basis-1/3 "
        onChange={
          // onSetParams("search", [e.target.value]);
          debounce((value) => {
            onSetParams("search", [value]);
          })
        }
      />
      <FilterButton
        icon={<IoAddCircleOutline />}
        title="job status"
        paramName="jobStatus"
        list={jobStatus}
        setList={onSetParams}
        filter={jobStatusfilter}
        options={jobStatusOptions}
      >
        Job Status
      </FilterButton>
      <FilterButton
        icon={<IoAddCircleOutline />}
        title="job type"
        paramName="jobType"
        list={jobType}
        setList={onSetParams}
        filter={jobTypefilter}
        options={jobTypeOptions}
      >
        Job Type
      </FilterButton>

      <DropdownSelect
        name="sort"
        defaultValue={sort}
        onValueChange={(value) => onSetParams("sort", [value])}
        labelText="Sort By"
        options={Object.values(JobSort)}
      />
      {jobStatus?.length || jobType?.length || sort !== JobSort.NEWEST ? (
        <Button
          variant="ghost"
          className="space-x-2 flex justify-center items-center w-full md:w-auto"
          onClick={onClearFilters}
        >
          <span>Clear Filters</span>
          <IoClose />
        </Button>
      ) : (
        ""
      )}
    </Form>
  );
}

export default FilterContainer;
