import { useState } from "react";
import { useAnalyzeRecipeMutation } from "../api/aiApi";
import { RecipeInsights } from "../types/aiTypes";
import {
  FaBrain,
  FaChartPie,
  FaLightbulb,
  FaUtensils,
  FaExclamationTriangle,
  FaCheckCircle,
  FaLeaf,
  FaSpinner,
} from "react-icons/fa";

interface RecipeAIInsightsProps {
  recipeId: string;
}

const HealthScoreBadge = ({ score, label }: { score: number; label: string }) => {
  const getColor = () => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-yellow-500";
    if (score >= 4) return "text-orange-500";
    return "text-red-500";
  };

  const getBgColor = () => {
    if (score >= 8) return "bg-green-50 dark:bg-green-900/20";
    if (score >= 6) return "bg-yellow-50 dark:bg-yellow-900/20";
    if (score >= 4) return "bg-orange-50 dark:bg-orange-900/20";
    return "bg-red-50 dark:bg-red-900/20";
  };

  return (
    <div className={`flex items-center gap-3 ${getBgColor()} rounded-lg p-4`}>
      <div className={`text-3xl font-bold ${getColor()}`}>{score}/10</div>
      <div>
        <div className="text-sm text-bodydark">Health Score</div>
        <div className={`font-semibold ${getColor()}`}>{label}</div>
      </div>
    </div>
  );
};

const NutritionBar = ({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) => (
  <div className="flex items-center justify-between py-2 border-b border-stroke dark:border-strokedark last:border-0">
    <span className="text-sm text-bodydark">{label}</span>
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${color}`}
      />
      <span className="font-semibold text-black dark:text-white">
        {value}
        <span className="text-xs font-normal text-bodydark ml-1">{unit}</span>
      </span>
    </div>
  </div>
);

const RecipeAIInsights = ({ recipeId }: RecipeAIInsightsProps) => {
  const [analyzeRecipe, { isLoading }] = useAnalyzeRecipeMutation();
  const [insights, setInsights] = useState<RecipeInsights | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "nutrition" | "suggestions" | "tips"
  >("nutrition");

  const handleAnalyze = async () => {
    try {
      setError(null);
      const result = await analyzeRecipe(recipeId).unwrap();
      setInsights(result);
    } catch (err) {
      setError("Failed to analyze recipe. Please try again.");
      console.error("AI analysis error:", err);
    }
  };

  if (!insights && !isLoading) {
    return (
      <div className="bg-white dark:bg-boxdark rounded-xl overflow-hidden shadow-default">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <FaBrain className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-black dark:text-white">
                AI Nutrition Analysis
              </h3>
              <p className="text-sm text-bodydark">
                Powered by Claude AI
              </p>
            </div>
          </div>
          <p className="text-sm text-bodydark mb-4">
            Get detailed nutrition metrics, health insights, and meal planning
            suggestions powered by AI.
          </p>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
          <button
            onClick={handleAnalyze}
            className="w-full py-2.5 px-4 text-sm font-medium text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaBrain className="w-4 h-4" />
            Analyze with AI
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-boxdark rounded-xl overflow-hidden shadow-default">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <FaBrain className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-black dark:text-white">
                AI Nutrition Analysis
              </h3>
              <p className="text-sm text-bodydark">Analyzing recipe...</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <FaSpinner className="w-8 h-8 text-purple-500 animate-spin mb-4" />
            <p className="text-sm text-bodydark">
              Claude AI is analyzing this recipe...
            </p>
            <p className="text-xs text-bodydark mt-1">
              Estimating nutrition, health score, and meal suggestions
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!insights) return null;

  const { nutrition, mealPlanSuggestions, summary } = insights;

  return (
    <div className="bg-white dark:bg-boxdark rounded-xl overflow-hidden shadow-default">
      {/* Header */}
      <div className="p-6 border-b border-stroke dark:border-strokedark">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <FaBrain className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="font-semibold text-black dark:text-white">
              AI Nutrition Analysis
            </h3>
            <p className="text-sm text-bodydark">Powered by Claude AI</p>
          </div>
        </div>
        <p className="text-sm text-body dark:text-bodydark">{summary}</p>
      </div>

      {/* Health Score + Dietary Labels */}
      <div className="p-6 border-b border-stroke dark:border-strokedark">
        <HealthScoreBadge
          score={nutrition.healthScore}
          label={nutrition.healthLabel}
        />
        {nutrition.dietaryLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {nutrition.dietaryLabels.map((label, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium"
              >
                <FaLeaf className="w-3 h-3" />
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stroke dark:border-strokedark">
        {(
          [
            { key: "nutrition", label: "Nutrition", icon: FaChartPie },
            { key: "suggestions", label: "Meal Plan", icon: FaUtensils },
            { key: "tips", label: "Tips", icon: FaLightbulb },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 py-3 px-4 text-center text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === tab.key
                ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400"
                : "text-body dark:text-bodydark hover:text-black dark:hover:text-white"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "nutrition" && (
          <div>
            {/* Macro grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {nutrition.calories}
                </span>
                <span className="text-xs text-bodydark">kcal / serving</span>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                <span className="block text-2xl font-bold text-green-600 dark:text-green-400">
                  {nutrition.servings}
                </span>
                <span className="text-xs text-bodydark">servings</span>
              </div>
            </div>

            {/* Detailed nutrients */}
            <NutritionBar
              label="Protein"
              value={nutrition.protein}
              unit="g"
              color="bg-blue-500"
            />
            <NutritionBar
              label="Carbohydrates"
              value={nutrition.carbs}
              unit="g"
              color="bg-green-500"
            />
            <NutritionBar
              label="Fat"
              value={nutrition.fat}
              unit="g"
              color="bg-yellow-500"
            />
            <NutritionBar
              label="Fiber"
              value={nutrition.fiber}
              unit="g"
              color="bg-orange-500"
            />
            <NutritionBar
              label="Sugar"
              value={nutrition.sugar}
              unit="g"
              color="bg-red-500"
            />
            <NutritionBar
              label="Sodium"
              value={nutrition.sodium}
              unit="mg"
              color="bg-purple-500"
            />
          </div>
        )}

        {activeTab === "suggestions" && (
          <div className="space-y-3">
            {mealPlanSuggestions.map((meal, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-meta-4 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaUtensils className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold text-black dark:text-white text-sm">
                    {meal.mealType}
                  </span>
                </div>
                <p className="text-sm text-black dark:text-white mb-1">
                  {meal.suggestion}
                </p>
                <p className="text-xs text-bodydark">{meal.reason}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tips" && (
          <div className="space-y-4">
            {/* Benefits */}
            {nutrition.benefits.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-black dark:text-white mb-2 flex items-center gap-2">
                  <FaCheckCircle className="w-4 h-4 text-green-500" />
                  Health Benefits
                </h4>
                <ul className="space-y-1.5">
                  {nutrition.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="text-sm text-body dark:text-bodydark pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-400 before:rounded-full"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {nutrition.warnings.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-black dark:text-white mb-2 flex items-center gap-2">
                  <FaExclamationTriangle className="w-4 h-4 text-orange-500" />
                  Dietary Warnings
                </h4>
                <ul className="space-y-1.5">
                  {nutrition.warnings.map((warning, i) => (
                    <li
                      key={i}
                      className="text-sm text-body dark:text-bodydark pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-orange-400 before:rounded-full"
                    >
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            {nutrition.tips.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-black dark:text-white mb-2 flex items-center gap-2">
                  <FaLightbulb className="w-4 h-4 text-yellow-500" />
                  How to Make It Healthier
                </h4>
                <ul className="space-y-1.5">
                  {nutrition.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="text-sm text-body dark:text-bodydark pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-yellow-400 before:rounded-full"
                    >
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Re-analyze button */}
      <div className="p-4 border-t border-stroke dark:border-strokedark">
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full py-2 px-4 text-xs font-medium text-center text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
        >
          Re-analyze Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeAIInsights;
