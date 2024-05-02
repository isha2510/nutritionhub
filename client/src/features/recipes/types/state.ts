export interface RootState {
  recipes: {
    recipes: Recipe[]; // Replace Recipe with your actual recipe interface
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
  tags?: string[];
}
