import { Router } from 'express';
import { userCheck, requireAuth } from '../../middleware/auth';
import { 
  getUserFavorites,
  getUserFavoriteIds,
  addFavorite, 
  removeFavorite, 
  checkFavorite, 
  countFavorites 
} from '../../controller/favorite.controller';

const router = Router();

// All favorites routes require authentication
router.use(requireAuth);

// Get all user favorites
router.get('/', getUserFavorites);

// Get just the IDs of favorited recipes (more efficient)
router.get('/ids', getUserFavoriteIds);

// Check if a recipe is favorited
router.get('/check/:recipeId', checkFavorite);

// Count favorites for a recipe
router.get('/count/:recipeId', countFavorites);

// Add a recipe to favorites
router.post('/:recipeId', addFavorite);

// Remove a recipe from favorites
router.delete('/:recipeId', removeFavorite);

export default router; 