export interface NutritionAnalysis {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servings: number;
  healthScore: number;
  healthLabel: string;
  benefits: string[];
  warnings: string[];
  tips: string[];
  dietaryLabels: string[];
}

export interface MealPlanSuggestion {
  mealType: string;
  suggestion: string;
  reason: string;
}

export interface RecipeInsights {
  nutrition: NutritionAnalysis;
  mealPlanSuggestions: MealPlanSuggestion[];
  summary: string;
}

export interface DashboardInsights {
  weeklyTip: string;
  nutritionAdvice: string;
  recipeRecommendations: string[];
  healthGoalTips: string[];
  motivationalNote: string;
}
