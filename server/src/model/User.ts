import { Document, Schema, model } from "mongoose";

export type TUser = {
  sub: string; // id from auth0
  name: string;
  nickname: string;
  email: string;
};

export interface IUser extends TUser, Document { }

const userSchema: Schema = new Schema({
  sub: {
    type: String,
    required: true
  },
  name: String,
  nickname: String,
  email: {
    type: String,
    required: true,
    unique: true
  }

}, { timestamps: true });


const MUser = model<IUser>('users', userSchema);

export default MUser;