import { IMonthlyApplications } from "@/types";
import {
  ResponsiveContainer,
  BarChart as Chart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

type Props = {
  data: IMonthlyApplications[];
};

function BarChart({ data }: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
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
        <Bar
          dataKey="count"
          fill="var(--hex-primary)"
          stroke="var(--hex-primary)"
          radius={[4, 4, 0, 0]}
        />
      </Chart>
    </ResponsiveContainer>
  );
}

export default BarChart;
