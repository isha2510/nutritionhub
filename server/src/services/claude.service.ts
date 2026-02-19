import Anthropic from "@anthropic-ai/sdk";
import dotenv from 'dotenv';

dotenv.config();

const client = new Anthropic();

function extractJSON(text: string): string {
  // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  return text.trim();
}

export interface RecipeData {
  title: string;
  description: string;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  tags?: Array<{ tag: string }>;
}

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

/**
 * Analyze a single recipe for detailed nutrition metrics and health insights.
 */
export async function analyzeRecipe(
  recipe: RecipeData
): Promise<RecipeInsights> {
  const prompt = `You are a professional nutritionist AI. Analyze this recipe and provide detailed nutrition metrics.

Recipe: "${recipe.title}"
Description: ${recipe.description || "N/A"}
Cuisine: ${recipe.cuisine || "N/A"}
Ingredients: ${recipe.ingredients?.join(", ") || "N/A"}
Instructions: ${recipe.instructions?.join(" | ") || "N/A"}
Prep Time: ${recipe.prepTime || "N/A"}
Cook Time: ${recipe.cookTime || "N/A"}

Respond ONLY with a valid JSON object (no markdown, no code fences) matching this exact structure:
{
  "nutrition": {
    "calories": <number - estimated total calories per serving>,
    "protein": <number - grams of protein per serving>,
    "carbs": <number - grams of carbohydrates per serving>,
    "fat": <number - grams of fat per serving>,
    "fiber": <number - grams of fiber per serving>,
    "sugar": <number - grams of sugar per serving>,
    "sodium": <number - milligrams of sodium per serving>,
    "servings": <number - estimated number of servings>,
    "healthScore": <number 1-10 - overall health rating>,
    "healthLabel": "<string - one of: Excellent, Very Good, Good, Fair, Poor>",
    "benefits": ["<string - health benefit 1>", "<string - health benefit 2>", "<string - health benefit 3>"],
    "warnings": ["<string - any dietary warnings or allergens>"],
    "tips": ["<string - tip to make it healthier>", "<string - another tip>"],
    "dietaryLabels": ["<string - e.g., High Protein, Low Carb, Vegetarian, Gluten-Free, etc.>"]
  },
  "mealPlanSuggestions": [
    {"mealType": "Breakfast", "suggestion": "<what to pair with for breakfast>", "reason": "<why>"},
    {"mealType": "Lunch", "suggestion": "<what to pair with for lunch>", "reason": "<why>"},
    {"mealType": "Dinner", "suggestion": "<what to pair with for dinner>", "reason": "<why>"}
  ],
  "summary": "<2-3 sentence overall nutritional summary of this recipe>"
}

Be accurate with nutritional estimates based on standard ingredient portions.`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    return JSON.parse(extractJSON(responseText)) as RecipeInsights;
  } catch {
    throw new Error("Failed to parse AI nutrition analysis response");
  }
}

/**
 * Analyze multiple recipes to generate dashboard-level insights.
 */
export async function analyzeDashboardInsights(
  recipes: RecipeData[]
): Promise<DashboardInsights> {
  const recipesSummary = recipes
    .slice(0, 10)
    .map(
      (r, i) =>
        `${i + 1}. "${r.title}" - ${r.cuisine || "Unknown"} cuisine, Ingredients: ${(r.ingredients || []).slice(0, 5).join(", ")}`
    )
    .join("\n");

  const prompt = `You are a professional nutritionist AI. Based on the user's recipe collection, provide personalized nutrition dashboard insights.

User's recipes:
${recipesSummary}

Respond ONLY with a valid JSON object (no markdown, no code fences):
{
  "weeklyTip": "<a practical weekly nutrition tip based on their cooking patterns>",
  "nutritionAdvice": "<personalized nutrition advice based on their recipe collection - what they're doing well and what to improve>",
  "recipeRecommendations": ["<recipe idea 1 they should try>", "<recipe idea 2>", "<recipe idea 3>"],
  "healthGoalTips": ["<actionable health tip 1>", "<actionable health tip 2>", "<actionable health tip 3>"],
  "motivationalNote": "<a short encouraging note about their nutrition journey>"
}`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    return JSON.parse(extractJSON(responseText)) as DashboardInsights;
  } catch {
    throw new Error("Failed to parse AI dashboard insights response");
  }
}
