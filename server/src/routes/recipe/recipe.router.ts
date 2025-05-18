import { Request, Response, NextFunction, Router } from 'express';
import { JWTPayload } from '../../types/JWTPayload';
import { createRecipe, deleteByRecipeId, findAll, findByRecipeId, editByRecipeId } from '../../controller/recipe.controller';
import { hasRole } from '../../middleware/auth';

const router = Router();

// Middleware to filter only approved recipes
const filterApprovedRecipes = (req: Request, res: Response, next: NextFunction) => {
    req.query.isApproved = 'true'; // Only return approved recipes
    next();
};

// Routes
router.get('/', hasRole('user','admin'), filterApprovedRecipes, findAll);
router.post('/', hasRole('user','admin'), createRecipe);
router.get('/:id', hasRole('user','admin'), findByRecipeId);
router.put('/:id', hasRole('user','admin'), editByRecipeId);
router.delete('/:id', hasRole('user','admin'), deleteByRecipeId);

export default router;