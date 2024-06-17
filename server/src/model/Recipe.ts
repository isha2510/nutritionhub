import { Document, Schema, Types, model } from "mongoose";
import MUser from "./User";
import MTags from "./Tags";

export type TRecipe = {
  title: string;
  description: string;
  cuisine: string;
  tags: string[];
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
  cuisine: {
    type: String
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: MTags
  }],
  ingredients: [String],
  instructions: [String],
  image: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: MUser,
    required: true
  }

}, { timestamps: true });


const MReceipe = model<IRecipe>('recipes', recipeSchema);

export default MReceipe;