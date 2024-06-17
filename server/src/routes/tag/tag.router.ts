import { Router } from 'express';
import { createTag, findAllTags } from '../../controller/tag.controller';
import { hasRole } from '../../middleware/auth';

const router = Router();

router.get('/', hasRole('user','admin'), findAllTags);
router.post('/', hasRole('user','admin'), createTag);

export default router;