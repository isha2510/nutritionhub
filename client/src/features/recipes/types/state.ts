export interface RootState {
  recipes: {
    recipes: Recipe[]; // Replace Recipe with your actual recipe interface
  };
  tags: {
    tags: Tag[];
  };
}

interface User {
  _id: number;
  email: string;
}

export interface Recipe {
  _id?: number;
  title: string;
  description: string;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  user?: User;
  tags?: Tag[];
  isApproved?: boolean;
  rejectionReason?: string;
  approvedBy?: string;
  prepTime?: string;
  cookTime?: string;
}

export interface Tag {
  _id?: string;
  sub?: string;
  tag: string;
}

export interface Options extends Tag {
  value: string;
  lable: string;
}

export interface InputRecipeTag {
  value?: string;
  label: string;
  __isNew__?: boolean;
}

export type UpdateRecipeParams = {
  id: string;
  recipe: Recipe;
};

export interface RejectionParams {
  id: string;
  reason: string;
}
