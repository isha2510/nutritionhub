import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <LineChart
        width={400}
        height={350}
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
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Weight Chart
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Track your weight goals and stay on top of your health.
        </p>
        <LinkButton name="Update target weight" link="/updateweigth" />
      </div>
    </div>
  );
};

// Export the WeightChart component
export default WeightChart;
