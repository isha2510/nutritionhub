import nutritionist from "../../../app/assets/nutritionist.jpg";
import exercise from "../../../app/assets/exercise.avif";
import recipe from "../../../app/assets/recipe.jpeg";
import report from "../../../app/assets/report.avif";

export const cardsDetails = [
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
    buttonName: "Reports Section",
    buttonLink: "/reports",
    image: report,
  },
];
