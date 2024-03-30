import Card from "../../../app/components/Card/Card";
import WeightChart from "../../weight/components/Weight";
import nutritionist from "../../../app/assets/nutritionist.jpg";
import exercise from "../../../app/assets/exercise.avif";
import recipe from "../../../app/assets/recipe.jpeg";
import report from "../../../app/assets/report.avif";

const Dashboard = () => {
  const cardsDetails = [
    {
      title: "Nutritionist Corner",
      description:
        "Find a nutritionist and take first step for the healthy diet.",
      buttonName: "Find a Nutritionist",
      buttonLink: "/nutritionist",
      image: nutritionist,
    },
    {
      title: "Recipes Corner",
      description:
        "Find the tasty recipes list and save your time while cooking.",
      buttonName: "Find a Recipe",
      buttonLink: "/recipes",
      image: recipe,
    },
    {
      title: "Exercise Corner",
      description:
        "Find the perfect exercise for yourself to achieve your goals.",
      buttonName: "Check Out Exercises",
      buttonLink: "/exercise",
      image: exercise,
    },
    {
      title: "Health Report Corner",
      description:
        "Here you can see your reports or upload new reports for analysis.",
      buttonName: "See Reports/Upload Reports",
      buttonLink: "/reports",
      image: report,
    },
  ];
  return (
    <div className="container mx-auto flex">
      {/* <h1 className="text-3xl font-bold mb-4">Dashboard</h1> */}

      <div className="flex flex-row p-4 flex-wrap">
        {cardsDetails.slice(0, -1).map((cd, index) => {
          return (
            <div className="w-1/3 mb-4" key={index}>
              <Card
                title={cd.title}
                buttonLink={cd.buttonLink}
                buttonName={cd.buttonName}
                description={cd.description}
                image={cd.image}
              />
            </div>
          );
        })}

        <div className="flex-grow mb-4">
          <WeightChart />
        </div>
        <div className="w-1/3 mb-4">
          <Card
            title={cardsDetails[3].title}
            buttonLink={cardsDetails[3].buttonLink}
            buttonName={cardsDetails[3].buttonName}
            description={cardsDetails[3].description}
            image={cardsDetails[3].image}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
