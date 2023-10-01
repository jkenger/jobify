import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

import { IconContext } from "react-icons";
import { capitalize } from "@/utils/capitalize";

type Props = {
  children?: React.ReactNode;
};

function JobCard({ children }: Props) {
  return <Card>{children}</Card>;
}

function JobCardHeader({
  children,
  logo = "Jobify",
}: {
  children: React.ReactNode;
  logo: string;
}) {
  return (
    <CardHeader>
      <div className="flex space-x-4 items-center ">
        <div className="w-16 h-16 bg-primary opacity-75 text-white rounded-md flex items-center justify-center">
          <span className="text-2xl font-semibold">{capitalize(logo[0])}</span>
        </div>
        <div className="space-y-2">{children}</div>
      </div>
    </CardHeader>
  );
}

function JobCardContent({ children }: { children?: React.ReactNode }) {
  return (
    <CardContent>
      <div className="flex flex-col flex-wrap md:flex-row gap-3">
        {children}
      </div>
    </CardContent>
  );
}

function JobCardFooter({ children }: { children?: React.ReactNode }) {
  return (
    <CardFooter>
      <div className="space-x-2 flex justify-start basis-full">{children}</div>
    </CardFooter>
  );
}

// Content Tags
export function JobCardTag({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <JobCardTagWrapper icon={icon}>
      {capitalize(children as string)}
    </JobCardTagWrapper>
  );
}

function JobCardTagWrapper({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center w-max gap-1 bg-secondary text-secondary-foreground px-1 py-.5 rounded-sm border text-sm ">
      <IconContext.Provider
        value={{
          className: "text-primary text-sm",
        }}
      >
        {icon}
      </IconContext.Provider>
      <span>{capitalize(children as string)}</span>
    </div>
  );
}

JobCard.Header = JobCardHeader;
JobCard.Content = JobCardContent;
JobCard.Footer = JobCardFooter;

export default JobCard;
