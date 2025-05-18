import { Request, Response } from "express";
import MRecipe, { IRecipe, TRecipe } from "../model/Recipe";
import chalk from "chalk";
import HttpStatus from 'http-status-codes';
import { CustomRequest } from "../middleware/auth";
import MTags, { TTags } from "../model/Tags";


export async function findAll(req: Request, res: Response) {
    const filter: any = {};
    
    // Apply isApproved filter if present in query
    if (req.query.isApproved !== undefined) {
        filter.isApproved = req.query.isApproved === 'true';
    }
    
    const recipes = await MRecipe.find(filter).populate({
        path: "user",
        select: "email",
    }).populate({
        path: "tags",
        select: "tag"
    }); // it gives us all recipes with user email
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
        const recipe = req.body as TRecipe;
        const tags = req.body.tags as [{ _id: string }];
        const updatedTags = tags.map(t => t._id);
        const newRecipe = new MRecipe({ ...recipe, user: req?.user._id, tags: updatedTags });
        const recipeToUpdate = await MRecipe.findByIdAndUpdate(req.params.id, newRecipe);
        console.log(chalk.magentaBright("inside create Recipe:"), newRecipe);
        res.status(HttpStatus.OK).send({ message: "Resource updated successfully" });
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
        recipe.approvedBy = req.user._id;
        await recipe.save();
        
        console.log(chalk.greenBright(`Recipe ${recipeId} approved by admin ${req.user.email}`));
        res.status(HttpStatus.OK).send({ message: 'Recipe approved successfully', recipe });
    } catch (error) {
        console.error(chalk.redBright('Error approving recipe:'), error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Failed to approve recipe' });
    }
}

export async function rejectRecipe(req: Request, res: Response) {
    try {
        const recipeId = req.params.id;
        const { reason } = req.body;
        
        const recipe = await MRecipe.findByIdAndDelete(recipeId);
        
        if (!recipe) {
            return res.status(HttpStatus.NOT_FOUND).send({ error: 'Recipe not found' });
        }
        
        console.log(chalk.yellowBright(`Recipe ${recipeId} rejected. Reason: ${reason}`));
        res.status(HttpStatus.OK).send({ message: 'Recipe rejected and removed', recipe });
    } catch (error) {
        console.error(chalk.redBright('Error rejecting recipe:'), error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Failed to reject recipe' });
    }
}