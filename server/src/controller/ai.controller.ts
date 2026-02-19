import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import MRecipe from "../model/Recipe";
import {
  analyzeRecipe,
  analyzeDashboardInsights,
  RecipeData,
} from "../services/claude.service";
import HttpStatus from "http-status-codes";
import chalk from "chalk";

/**
 * POST /api/ai/analyze-recipe/:id
 * Analyze a single recipe for nutrition metrics using Claude AI.
 */
export async function analyzeRecipeById(req: CustomRequest, res: Response) {
  try {
    const recipe = await MRecipe.findById(req.params.id)
      .populate({ path: "tags", select: "tag" });

    if (!recipe) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ error: "Recipe not found" });
    }

    const recipeData: RecipeData = {
      title: recipe.title,
      description: recipe.description,
      cuisine: recipe.cuisine,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      tags: recipe.tags as unknown as Array<{ tag: string }>,
    };

    console.log(
      chalk.cyanBright(`[AI] Analyzing recipe: "${recipe.title}"`)
    );

    const insights = await analyzeRecipe(recipeData);

    console.log(
      chalk.greenBright(`[AI] Analysis complete for: "${recipe.title}"`)
    );

    res.status(HttpStatus.OK).json(insights);
  } catch (error) {
    console.error(chalk.redBright("[AI] Error analyzing recipe:"), error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Failed to analyze recipe",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

/**
 * GET /api/ai/dashboard-insights
 * Get AI-powered nutrition insights for the dashboard based on user's recipes.
 */
export async function getDashboardInsights(req: CustomRequest, res: Response) {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: "User not authenticated" });
    }

    // Get user's recipes (both their own and approved ones)
    const recipes = await MRecipe.find({
      $or: [{ user: req.user._id }, { isApproved: true }],
    })
      .populate({ path: "tags", select: "tag" })
      .limit(10);

    if (!recipes.length) {
      return res.status(HttpStatus.OK).json({
        weeklyTip:
          "Start by adding some recipes to get personalized nutrition insights!",
        nutritionAdvice:
          "Add recipes to your collection and we'll analyze your dietary patterns.",
        recipeRecommendations: [
          "Try a simple grilled chicken salad",
          "Make a vegetable stir-fry",
          "Prepare overnight oats for breakfast",
        ],
        healthGoalTips: [
          "Aim for 5 servings of fruits and vegetables daily",
          "Stay hydrated - drink at least 8 glasses of water",
          "Include protein in every meal",
        ],
        motivationalNote:
          "Every healthy meal starts with a single recipe. Start your collection today!",
      });
    }

    const recipesData: RecipeData[] = recipes.map((r) => ({
      title: r.title,
      description: r.description,
      cuisine: r.cuisine,
      ingredients: r.ingredients,
      instructions: r.instructions,
      prepTime: r.prepTime,
      cookTime: r.cookTime,
      tags: r.tags as unknown as Array<{ tag: string }>,
    }));

    console.log(
      chalk.cyanBright(
        `[AI] Generating dashboard insights for ${recipes.length} recipes`
      )
    );

    const insights = await analyzeDashboardInsights(recipesData);

    console.log(chalk.greenBright("[AI] Dashboard insights generated"));

    res.status(HttpStatus.OK).json(insights);
  } catch (error) {
    console.error(
      chalk.redBright("[AI] Error generating dashboard insights:"),
      error
    );
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Failed to generate dashboard insights",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
