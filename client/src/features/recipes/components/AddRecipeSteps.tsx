/* eslint-disable react/no-unescaped-entities */
const AddRecipeSteps = () => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-wrap">
        <div className="flex relative pt-10 pb-20 sm:items-center md:w-full mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
            1
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-12 h-12"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M12,2v20M22,12H2"
                />
              </svg>
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-black dark:text-white mb-1 text-xl">
                Add The Recipe
              </h2>
              <p className="leading-relaxed">
                During this step, users input all the necessary details for
                their recipe, including ingredients and instructions. It's the
                foundation of their culinary creation.
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-full mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
            2
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-12 h-12"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M18,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C20,2.9,19.1,2,18,2z"
                />
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="22"
                />
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  x1="4"
                  y1="8"
                  x2="20"
                  y2="8"
                />
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  x1="4"
                  y1="14"
                  x2="20"
                  y2="14"
                />
              </svg>
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-black dark:text-white mb-1 text-xl">
                Submit for Review
              </h2>
              <p className="leading-relaxed">
                Once the recipe is filled out, users submit it for review. It's
                like handing over their culinary masterpiece to the judges.
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-full mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
            3
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-12 h-12"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-black dark:text-white mb-1 text-xl">
                Approved
              </h2>
              <p className="leading-relaxed">
                After submission, an admin carefully examines the recipe. If it
                meets the criteria, it receives the coveted approval stamp. 🌟
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-10 sm:items-center md:w-full mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
            4
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-12 h-12"
                viewBox="0 0 24 24"
              >
                <path d="M21 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-black dark:text-white mb-1 text-xl">
                Publish
              </h2>
              <p className="leading-relaxed">
                {" "}
                Voilà! The recipe is now ready for the world. It graces the
                virtual "wall" of culinary delights, waiting to be savored by
                others. Bon appétit! 🍽️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeSteps;
