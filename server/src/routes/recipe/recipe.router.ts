import { Request, Response, NextFunction, Router } from 'express';
import { JWTPayload } from '../../types/JWTPayload';
import { deleteByRecipeId, findAll, findByRecipeId } from '../../controller/recipe.controller';
import { hasRole } from '../../middleware/auth';

const router = Router();

router.get('/', hasRole('user'), findAll);
router.get('/:id', hasRole('user'), findByRecipeId);
router.delete('/:id', hasRole('admin'), deleteByRecipeId);

export default router;