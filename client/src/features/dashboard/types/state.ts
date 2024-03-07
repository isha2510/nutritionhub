export interface RootState {
  recipes: {
    recipes: Recipe[]; // Replace Recipe with your actual recipe interface
  };
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  image: string;
}
