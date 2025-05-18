import { Document, Schema, model } from "mongoose";
import MUser from "./User";
import MRecipe from "./Recipe";

export type TFavorite = {
  user: string;
  recipe: string;
};

export interface IFavorite extends Omit<Document, keyof TFavorite>, TFavorite { }

const favoriteSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: MUser,
    required: true
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: MRecipe,
    required: true
  }
}, { timestamps: true });

// Create a compound index to prevent duplicate favorites
favoriteSchema.index({ user: 1, recipe: 1 }, { unique: true });

const MFavorite = model<IFavorite>('favorites', favoriteSchema);

export default MFavorite; 