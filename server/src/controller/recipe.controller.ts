import { Request, Response } from "express";
import Receipe, { IRecipe } from "../model/Recipe";
import chalk from "chalk";
import HttpStatus from 'http-status-codes';


export async function findAll(req: Request, res: Response) {
    const recipes = await Receipe.find({}); // it gives us all recipes
    res.send(recipes);
};

export async function findByRecipeId(req: Request, res: Response) {
    const recipes = await Receipe.findById(req.params.id);
    res.send(recipes);
}

export async function deleteByRecipeId(req: Request, res: Response) {
    console.log(chalk.redBright("deleting Recipe from collection: ", req.params.id));
    const recipeToDelete = await Receipe.findByIdAndDelete(req.params.id);
    console.log(chalk.greenBright("Recipe deleted successfully"), recipeToDelete);
    res.status(HttpStatus.OK).send(recipeToDelete);
}