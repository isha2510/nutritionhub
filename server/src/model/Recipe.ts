import { Document, Schema, model } from "mongoose";

export type TRecipe = {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
};

export interface IRecipe extends TRecipe, Document { }

const recipeSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  ingredients: [String],
  instructions: [String],
  imgage: String

}, { timestamps: true });


const Receipe = model<IRecipe>('recipes', recipeSchema);

export default Receipe;