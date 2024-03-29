export interface RootState {
  recipes: {
    recipes: Recipe[]; // Replace Recipe with your actual recipe interface
  };
}

export interface Recipe {
  _id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  image: string;
}
