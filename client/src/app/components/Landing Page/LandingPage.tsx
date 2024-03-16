import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import recipe from "../../assets/recipe.jpeg";
import neutritionist from "../../assets/nutritionist.jpg";
import exercise from "../../assets/exercise.avif";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="carousel-container">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        stopOnHover={false}
        emulateTouch={true}
        swipeable={true}
        centerMode={true}
        centerSlidePercentage={50}
        dynamicHeight={false}
      >
        <div>
          <img src={recipe} alt="Recipe" />
          <p className="legend">Delicious Recipe</p>
        </div>
        <div>
          <img src={neutritionist} alt="Nutritionist" />
          <p className="legend">Expert Nutritionist</p>
        </div>
        <div>
          <img src={exercise} alt="Exercise" />
          <p className="legend">Customised Exercises</p>
        </div>
      </Carousel>
    </div>
  );
};

export default LandingPage;
