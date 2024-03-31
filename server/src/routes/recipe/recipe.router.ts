import { Request, Response, NextFunction, Router } from 'express';
import { JWTPayload } from '../../types/JWTPayload';
import { createRecipe, deleteByRecipeId, findAll, findByRecipeId } from '../../controller/recipe.controller';
import { hasRole } from '../../middleware/auth';

const router = Router();

router.get('/', hasRole('user','admin'), findAll);
router.post('/', hasRole('user','admin'), createRecipe);
router.get('/:id', hasRole('user','admin'), findByRecipeId);
router.delete('/:id', hasRole('user','admin'), deleteByRecipeId);

export default router;