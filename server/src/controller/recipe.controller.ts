import { Request, Response } from "express";
import MRecipe, { IRecipe, TRecipe } from "../model/Recipe";
import chalk from "chalk";
import HttpStatus from 'http-status-codes';
import { CustomRequest } from "../middleware/auth";
import MTags, { TTags } from "../model/Tags";
import { Types } from "mongoose";


export async function findAll(req: CustomRequest, res: Response) {
    // We'll create a filter that shows:
    // 1. All approved recipes, OR
    // 2. User's own recipes (regardless of approval status)
    const filter: { $or: Array<{[key: string]: any}> } = { 
        $or: [{ isApproved: true }] 
    };
    
    // If user is authenticated, include their recipes regardless of approval status
    if (req.user && req.user._id) {
        filter.$or.push({ user: req.user._id });
    }
    
    const recipes = await MRecipe.find(filter).populate({
        path: "user",
        select: "email",
    }).populate({
        path: "tags",
        select: "tag"
    });
    res.send(recipes);
};

export async function findByRecipeId(req: Request, res: Response) {
    const recipe = await MRecipe.findById(req.params.id).populate({
        path: "user",
        select: "email"
    }).populate({
        path: "tags",
        select: "tag"
    });
    res.send(recipe);
}

export async function createRecipe(req: CustomRequest, res: Response) {
    console.log(chalk.magentaBright("inside create Recipe:"), req.body as TRecipe);
    if (req.user) {
        const recipe = req.body as TRecipe;
        const tags = req.body.tags as [{ _id: string }];
        const updatedTags = tags.map(t => t._id);
        const newRecipe = new MRecipe({ ...recipe, user: req.user._id, tags: updatedTags });
        await newRecipe.save();
        console.log(chalk.greenBright("Recipe created success.."));
        res.status(HttpStatus.CREATED).send();
    } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'user is not present please relogin.' });
    }

}

export async function editByRecipeId(req: CustomRequest, res: Response) {
    if (req.user) {
        try {
            const recipe = req.body as TRecipe;
            
            // Get the existing recipe to preserve fields not included in the update
            const existingRecipe = await MRecipe.findById(req.params.id);
            if (!existingRecipe) {
                return res.status(HttpStatus.NOT_FOUND).send({ error: 'Recipe not found' });
            }
            
            // Handle tags safely - use existing tags if not provided in update
            let updatedTags;
            if (req.body.tags) {
                const tags = req.body.tags as [{ _id: string }];
                updatedTags = tags.map(t => t._id);
            } else {
                // Keep existing tags if none provided
                updatedTags = existingRecipe.tags;
            }
            
            // Create an update object with all fields explicitly set
            const updateData = {
                title: recipe.title,
                description: recipe.description,
                cuisine: recipe.cuisine,
                ingredients: recipe.ingredients || existingRecipe.ingredients,
                instructions: recipe.instructions || existingRecipe.instructions,
                image: recipe.image || existingRecipe.image,
                tags: updatedTags,
                user: req?.user._id,
                isApproved: false, // Reset approval status
                prepTime: recipe.prepTime || "", // Ensure prepTime is stored properly
                cookTime: recipe.cookTime || "", // Ensure cookTime is stored properly
                $unset: {} as any // For fields to remove
            };
            
            // If approvedBy exists, unset it
            if (existingRecipe.approvedBy) {
                updateData.$unset.approvedBy = "";
            }
            
            // If rejectionReason exists, unset it
            if (existingRecipe.rejectionReason) {
                updateData.$unset.rejectionReason = "";
            }
            
            // Use findByIdAndUpdate with proper options
            const updatedRecipe = await MRecipe.findByIdAndUpdate(
                req.params.id, 
                updateData, 
                { new: true, runValidators: true }
            );
            
            console.log(chalk.magentaBright("Recipe updated with timing info:"), {
                title: updatedRecipe?.title,
                prepTime: updatedRecipe?.prepTime,
                cookTime: updatedRecipe?.cookTime
            });
            
            res.status(HttpStatus.OK).send({ 
                message: "Recipe updated successfully and submitted for re-approval",
                requiresApproval: true
            });
        } catch (error) {
            console.error(chalk.redBright("Error updating recipe:"), error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ 
                error: 'Failed to update recipe',
                details: error instanceof Error ? error.message : String(error)
            });
        }
    }
    else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'user is not present please relogin.' });
    }
}

export async function deleteByRecipeId(req: Request, res: Response) {
    console.log(chalk.redBright("deleting Recipe from collection: ", req.params.id));
    const recipeToDelete = await MRecipe.findByIdAndDelete(req.params.id);
    console.log(chalk.greenBright("Recipe deleted successfully"), recipeToDelete);
    res.status(HttpStatus.OK).send(recipeToDelete);
}

export async function findPendingApprovalRecipes(req: Request, res: Response) {
    const pendingRecipes = await MRecipe.find({ isApproved: false }).populate({
        path: "user",
        select: "email",
    });
    res.send(pendingRecipes);
}

export async function approveRecipe(req: CustomRequest, res: Response) {
    try {
        const recipeId = req.params.id;
        
        if (!req.user) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Admin user info not found' });
        }

        const recipe = await MRecipe.findById(recipeId);
        
        if (!recipe) {
            return res.status(HttpStatus.NOT_FOUND).send({ error: 'Recipe not found' });
        }

        recipe.isApproved = true;
        recipe.approvedBy = req.user._id as unknown as string;
        await recipe.save();
        
        console.log(chalk.greenBright(`Recipe ${recipeId} approved by admin ${req.user.email}`));
        res.status(HttpStatus.OK).send({ message: 'Recipe approved successfully', recipe });
    } catch (error) {
        console.error(chalk.redBright('Error approving recipe:'), error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Failed to approve recipe' });
    }
}

export async function rejectRecipe(req: CustomRequest, res: Response) {
    try {
        const recipeId = req.params.id;
        const { reason } = req.body;
        
        if (!req.user) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Admin user info not found' });
        }
        
        const recipe = await MRecipe.findById(recipeId);
        
        if (!recipe) {
            return res.status(HttpStatus.NOT_FOUND).send({ error: 'Recipe not found' });
        }
        
        // Store rejection reason and mark as not approved
        recipe.isApproved = false;
        recipe.rejectionReason = reason;
        await recipe.save();
        
        console.log(chalk.yellowBright(`Recipe ${recipeId} rejected. Reason: ${reason}`));
        res.status(HttpStatus.OK).send({ message: 'Recipe rejected', recipe });
    } catch (error) {
        console.error(chalk.redBright('Error rejecting recipe:'), error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Failed to reject recipe' });
    }
}