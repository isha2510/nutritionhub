import { Document, Schema, Types, model } from "mongoose";
import MUser from "./User";

export type TRecipe = {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  user: string;
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
  imgage: String,
  user: {
    type: Types.ObjectId,
    ref: MUser,
    required: true
  }

}, { timestamps: true });


const MReceipe = model<IRecipe>('recipes', recipeSchema);

export default MReceipe;