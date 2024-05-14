import { Document, Schema, model } from "mongoose";
import MUser from "./User";

export type TTags = {
  sub: string; // id from auth0
  tag: string;
};

export interface ITags extends TTags, Document { }

const tagsSchema: Schema = new Schema({
  sub: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: MUser
  },
  tag: {
    type: String,
    required: true,
    unique: true // Ensure tags are unique for a user (optional)
  },

});


const MTags = model<ITags>('tags', tagsSchema);

export default MTags;