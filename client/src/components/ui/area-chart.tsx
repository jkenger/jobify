import { IMonthlyApplications } from "@/types";
import {
  ResponsiveContainer,
  AreaChart as Chart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Area,
  YAxis,
} from "recharts";

type Props = {
  data: IMonthlyApplications[];
};

function AreaChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart data={data} className="mt-5 -ml-10">
        <CartesianGrid />
        <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          allowDecimals={false}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Area
          type="natural"
          dataKey="count"
          fill="var(--hex-primary)"
          stroke="var(--hex-primary)"
        />
      </Chart>
    </ResponsiveContainer>
  );
}

export default AreaChart;
