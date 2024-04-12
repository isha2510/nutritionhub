import Card from "../../../app/components/Card/Card";
import WeightChart from "../../weight/components/Weight";
import { cardsDetails } from "../utils/utils";

const Dashboard = () => {
  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex p-4 flex-wrap gap-8">
        {cardsDetails.map((cd, index) => {
          return (
            <div
              className="w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/4 mb-4"
              key={index}
            >
              <div className="h-full flex">
                <Card
                  title={cd.title}
                  buttonLink={cd.buttonLink}
                  buttonName={cd.buttonName}
                  description={cd.description}
                  image={cd.image}
                />
              </div>
            </div>
          );
        })}

        <div className="w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/4 mb-4">
          <div className="h-full flex">
            <WeightChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
