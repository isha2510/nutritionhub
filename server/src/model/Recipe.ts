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
  isApproved: boolean;
  approvedBy?: string;
  rejectionReason?: string;
  prepTime?: string;
  cookTime?: string;
};

export interface IRecipe extends Omit<Document, keyof TRecipe>, TRecipe { }

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
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: MUser
  },
  rejectionReason: {
    type: String
  },
  prepTime: {
    type: String
  },
  cookTime: {
    type: String
  }

}, { timestamps: true });

recipeSchema.virtual('prepTimeFormatted').get(function() {
  return this.prepTime || '';
});

recipeSchema.virtual('cookTimeFormatted').get(function() {
  return this.cookTime || '';
});

recipeSchema.set('toObject', { virtuals: true });
recipeSchema.set('toJSON', { virtuals: true });

const MReceipe = model<IRecipe>('recipes', recipeSchema);

export default MReceipe;