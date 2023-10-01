import React from "react";
import { Button, Heading, SpaceRow } from "./ui";
import { GiTruce } from "react-icons/gi";
import { BsBarChartFill } from "react-icons/bs";
import { FaChartArea } from "react-icons/fa";
import BarChart from "./ui/bar-chart";
import AreaChart from "./ui/area-chart";
import { IStats } from "@/types";

function ChartsContainer({ data }: { data: IStats["monthlyApplications"] }) {
  const [barChart, setBarChart] = React.useState(GiTruce);
  return (
    <SpaceRow>
      <Heading>Monthly Applications</Heading>
      <Button
        onClick={() => setBarChart(!barChart)}
        variant="outline"
        className=" text-primary focus:text-primary rounded-full"
      >
        {" "}
        <span className="flex items-center gap-2 ">
          {barChart ? (
            <>
              <FaChartArea />
            </>
          ) : (
            <>
              <BsBarChartFill />
            </>
          )}
        </span>
      </Button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </SpaceRow>
  );
}

export default ChartsContainer;
