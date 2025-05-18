import { Router } from 'express';
import { approveRecipe, findPendingApprovalRecipes, rejectRecipe } from '../../controller/recipe.controller';
import { hasRole } from '../../middleware/auth';

const router = Router();

// Admin-only endpoints for recipe approval
router.get('/recipes/pending', hasRole('admin'), findPendingApprovalRecipes);
router.patch('/recipes/:id/approve', hasRole('admin'), approveRecipe);
router.delete('/recipes/:id/reject', hasRole('admin'), rejectRecipe);

export default router; 