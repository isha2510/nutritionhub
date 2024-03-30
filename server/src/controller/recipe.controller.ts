import { Request, Response } from "express";
import MRecipe, { IRecipe } from "../model/Recipe";
import chalk from "chalk";
import HttpStatus from 'http-status-codes';


export async function findAll(req: Request, res: Response) {
    const recipes = await MRecipe.find({}).populate({
        path: "user",
        select: "email",
    }); // it gives us all recipes with user email
    res.send(recipes);
};

export async function findByRecipeId(req: Request, res: Response) {
    const recipe = await MRecipe.findById(req.params.id).populate({
        path: "user",
        select: "email"
    });
    res.send(recipe);
}

export async function deleteByRecipeId(req: Request, res: Response) {
    console.log(chalk.redBright("deleting Recipe from collection: ", req.params.id));
    const recipeToDelete = await MRecipe.findByIdAndDelete(req.params.id);
    console.log(chalk.greenBright("Recipe deleted successfully"), recipeToDelete);
    res.status(HttpStatus.OK).send(recipeToDelete);
}