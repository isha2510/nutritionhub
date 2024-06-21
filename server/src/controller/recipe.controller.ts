import { Request, Response } from "express";
import MRecipe, { IRecipe, TRecipe } from "../model/Recipe";
import chalk from "chalk";
import HttpStatus from 'http-status-codes';
import { CustomRequest } from "../middleware/auth";
import MTags, { TTags } from "../model/Tags";


export async function findAll(req: Request, res: Response) {
    const recipes = await MRecipe.find({}).populate({
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