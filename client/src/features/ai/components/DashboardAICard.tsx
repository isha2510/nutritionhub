import {
  FaBrain,
  FaLightbulb,
  FaUtensils,
  FaBullseye,
  FaHeart,
  FaSpinner,
  FaSyncAlt,
} from "react-icons/fa";
import { useGetDashboardInsightsQuery } from "../api/aiApi";

const DashboardAICard = () => {
  const { data: insights, isLoading, error, refetch } =
    useGetDashboardInsightsQuery();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-default border border-stroke dark:border-strokedark h-full flex flex-col">
        <div className="p-5 border-b border-stroke dark:border-strokedark">
          <div className="flex items-center gap-2">
            <FaBrain className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-bold text-black dark:text-white">
              AI Nutrition Insights
            </h3>
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <FaSpinner className="w-8 h-8 text-purple-500 animate-spin mb-4" />
          <p className="text-sm text-bodydark">
            Claude AI is analyzing your recipes...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-default border border-stroke dark:border-strokedark h-full flex flex-col">
        <div className="p-5 border-b border-stroke dark:border-strokedark">
          <div className="flex items-center gap-2">
            <FaBrain className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-bold text-black dark:text-white">
              AI Nutrition Insights
            </h3>
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <p className="text-sm text-bodydark mb-4">
            Unable to load AI insights.
          </p>
          <button
            onClick={() => refetch()}
            className="py-2 px-4 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
          >
            <FaSyncAlt className="w-3 h-3" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-default border border-stroke dark:border-strokedark h-full flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-stroke dark:border-strokedark flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaBrain className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-bold text-black dark:text-white">
            AI Nutrition Insights
          </h3>
        </div>
        <button
          onClick={() => refetch()}
          className="text-bodydark hover:text-purple-500 transition-colors"
          title="Refresh insights"
        >
          <FaSyncAlt className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 flex-grow space-y-5 overflow-auto">
        {/* Weekly Tip */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
              Weekly Tip
            </span>
          </div>
          <p className="text-sm text-body dark:text-bodydark">
            {insights.weeklyTip}
          </p>
        </div>

        {/* Nutrition Advice */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaHeart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-black dark:text-white">
              Personalized Advice
            </span>
          </div>
          <p className="text-sm text-body dark:text-bodydark">
            {insights.nutritionAdvice}
          </p>
        </div>

        {/* Recipe Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaUtensils className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-black dark:text-white">
              Try These Recipes
            </span>
          </div>
          <ul className="space-y-2">
            {insights.recipeRecommendations.map((rec, i) => (
              <li
                key={i}
                className="text-sm text-body dark:text-bodydark bg-gray-50 dark:bg-meta-4 rounded px-3 py-2"
              >
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Health Goal Tips */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaBullseye className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-black dark:text-white">
              Health Goals
            </span>
          </div>
          <ul className="space-y-1.5">
            {insights.healthGoalTips.map((tip, i) => (
              <li
                key={i}
                className="text-sm text-body dark:text-bodydark pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-blue-400 before:rounded-full"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Motivational Note */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 text-center">
          <p className="text-sm italic text-body dark:text-bodydark">
            "{insights.motivationalNote}"
          </p>
          <p className="text-xs text-bodydark mt-1">- Claude AI Nutritionist</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAICard;
