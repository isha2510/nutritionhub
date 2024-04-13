import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LinkButton from "../../../app/components/Button/LinkButton";

// Define the data for the chart
const data = [
  {
    date: "2023-03-01",
    weight: 175,
  },
  {
    date: "2023-03-15",
    weight: 173,
  },
  {
    date: "2023-04-01",
    weight: 170,
  },
  {
    date: "2023-04-15",
    weight: 168,
  },
  {
    date: "2023-05-01",
    weight: 165,
  },
];

// Define the WeightChart component
const WeightChart = () => {
  return (
    <div className="bg-white border-stroke rounded-lg shadow-default px-5 pt-7.5 pb-5 mr-7 dark:border-strokedark dark:bg-boxdark">
      <div className="flex min-w-47.5 justify-between">
        <div className="w-full pl-8 pb-4">
          <p className="font-semibold text-primary">Target Weight</p>
          <p className="text-sm font-medium">60Kg</p>
        </div>
        <div className="w-full">
          <p className="font-semibold text-primary">Current Weight</p>
          <p className="text-sm font-medium">70Kg</p>
        </div>
      </div>
      <ResponsiveContainer height={182}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="p-5">
        <LinkButton name="Update Weight" link="/updateweigth" />
      </div>
    </div>
  );
};

// Export the WeightChart component
export default WeightChart;
