import Card from "../../../app/components/Card/Card";
import WeightChart from "../../weight/components/Weight";
import { cardsDetails } from "../utils/utils";

const Dashboard = () => {
  return (
    <div>
      <div className="mx-auto flex p-4 flex-wrap gap-8">
        {cardsDetails.map((cd, index) => {
          return (
            <div
              className="sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 mb-4"
              key={index}
            >
              <div className="h-full">
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

        <div className="lg:flex-grow-0 xl:flex-grow-0 md:flex-grow-0 sm:w-full md:w-full lg:w-1/2 xl:w-1/3 mb-4 sm:flex-grow">
          {/* <div className="h-full flex"> */}
          <WeightChart />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
