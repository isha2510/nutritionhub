import { Router } from "express";
import { hasRole } from "../../middleware/auth";
import {
  analyzeRecipeById,
  getDashboardInsights,
} from "../../controller/ai.controller";

const router = Router();

// Analyze a specific recipe with Claude AI
router.post("/analyze-recipe/:id", hasRole("user", "admin"), analyzeRecipeById);

// Get AI-powered dashboard insights
router.get(
  "/dashboard-insights",
  hasRole("user", "admin"),
  getDashboardInsights
);

export default router;
