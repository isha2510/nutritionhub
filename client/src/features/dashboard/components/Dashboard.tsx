import LinkButton from "../../../app/components/Button/LinkButton";

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      {/* <h1 className="text-3xl font-bold mb-4">Dashboard</h1> */}

      <div className="flex flex-wrap -mx-4 mt-4">
        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-4">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Nutritionist Corner</h2>
            <p className="mb-4">
              Find a nutritionist and take first step for the healthy diet.
            </p>
            <LinkButton
              name=" Find a Nutritionist"
              link="/nutritionist"
            ></LinkButton>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Recipes Corner</h2>
            <p className="mb-4">
              Find the tasty recipes list and save your time while cooking. No
              more wasting time on what to cook.
            </p>
            <LinkButton name="Find a Recipe" link="/recipes"></LinkButton>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Weight Chart</h2>
            <p className="mb-2">Target Weight: 150 lbs</p>
            <p className="mb-2">Actual Weight: 200 lbs</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Update Weight
            </button>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Exercise Corner</h2>
            <p className="mb-4">
              Find the perfect exercise for yourself to achieve your goals.
            </p>
            <LinkButton
              name="Check Out Exercises"
              link="/exercise"
            ></LinkButton>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Health Report Corner</h2>
            <p className="mb-4">
              Here you can see your reports or upload new reports for analysis.
            </p>
            <LinkButton
              name="See Reports/Upload Reports"
              link="/reports"
            ></LinkButton>
          </div>
        </div>

        {/* Add other cards for exercise, labs, and recipes */}
      </div>
    </div>
  );
};

export default Dashboard;
