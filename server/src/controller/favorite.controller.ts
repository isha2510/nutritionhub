import { Response } from "express";
import MFavorite from "../model/Favorite";
import { CustomRequest } from "../middleware/auth";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";

// Get all favorites for the current user
export async function getUserFavorites(req: CustomRequest, res: Response) {
  try {
    // User is guaranteed to exist due to userCheck middleware
    const favorites = await MFavorite.find({ user: req.user!._id })
      .populate({
        path: "recipe",
        populate: {
          path: "user",
          select: "email"
        }
      })
      .populate({
        path: "recipe",
        populate: {
          path: "tags",
          select: "tag"
        }
      });

    // Extract just the recipe data from favorites
    const favoriteRecipes = favorites.map(favorite => favorite.recipe);
    
    res.json(favoriteRecipes);
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch favorites" });
  }
}

// Get just the IDs of favorited recipes (more efficient)
export async function getUserFavoriteIds(req: CustomRequest, res: Response) {
  try {
    // User is guaranteed to exist due to userCheck middleware
    const favorites = await MFavorite.find({ user: req.user!._id })
      .select('recipe')
      .lean();

    // Extract just the recipe IDs
    const favoriteIds = favorites.map(favorite => favorite.recipe.toString());
    
    res.json({ favoriteIds });
  } catch (error) {
    console.error("Error fetching user favorite IDs:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch favorite IDs" });
  }
}

// Add a recipe to favorites
export async function addFavorite(req: CustomRequest, res: Response) {
  try {
    const { recipeId } = req.params;
    
    // Validate that recipeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid recipe ID" });
    }

    // Check if already favorited
    const existingFavorite = await MFavorite.findOne({
      user: req.user!._id,
      recipe: recipeId
    });

    if (existingFavorite) {
      return res.status(HttpStatus.OK).json({ message: "Recipe already in favorites", favorited: true });
    }

    // Create new favorite
    const newFavorite = new MFavorite({
      user: req.user!._id,
      recipe: recipeId
    });

    await newFavorite.save();
    
    res.status(HttpStatus.CREATED).json({ message: "Recipe added to favorites", favorited: true });
  } catch (error: any) {
    console.error("Error adding favorite:", error);
    
    // If duplicate key error, it means the user has already favorited this recipe
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(HttpStatus.CONFLICT).json({ message: "Recipe already in favorites", favorited: true });
    }
    
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to add favorite" });
  }
}

// Remove a recipe from favorites
export async function removeFavorite(req: CustomRequest, res: Response) {
  try {
    const { recipeId } = req.params;
    
    // Validate that recipeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid recipe ID" });
    }

    const result = await MFavorite.findOneAndDelete({
      user: req.user!._id,
      recipe: recipeId
    });

    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "Recipe not found in favorites", favorited: false });
    }

    res.status(HttpStatus.OK).json({ message: "Recipe removed from favorites", favorited: false });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to remove favorite" });
  }
}

// Check if a recipe is favorited by the current user
export async function checkFavorite(req: CustomRequest, res: Response) {
  try {
    const { recipeId } = req.params;
    
    // Validate that recipeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid recipe ID" });
    }

    const favorite = await MFavorite.findOne({
      user: req.user!._id,
      recipe: recipeId
    });

    res.json({ favorited: !!favorite });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to check favorite status" });
  }
}

// Count favorites for a recipe
export async function countFavorites(req: CustomRequest, res: Response) {
  try {
    const { recipeId } = req.params;
    
    // Validate that recipeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid recipe ID" });
    }

    const count = await MFavorite.countDocuments({ recipe: recipeId });

    res.json({ count });
  } catch (error) {
    console.error("Error counting favorites:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to count favorites" });
  }
} 