import { Link } from "react-router-dom";
import Recipes from "../../recipes/components/Recipes";

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-bold mb-2">Doctor's Corner</h2>
          <p className="mb-4">
            Here you can contact a nutritionist or schedule an appointment.
          </p>
          <Link
            to="/doctors"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Find a Doctor
          </Link>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-bold mb-2">Weight Chart</h2>
          <p className="mb-2">Target Weight: 150 lbs</p>
          <p className="mb-2">Actual Weight: 200 lbs</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Update Weight
          </button>
        </div>

        {/* Add other cards for exercise, labs, and recipes */}
      </div>
    </div>
  );
};

export default Dashboard;
