import express from 'express';
import { getSkills, addSkill, deleteSkill } from '../controllers/skillController.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = express.Router();
router.get('/', getSkills);
router.post('/', protectAdmin, addSkill);
router.delete('/:id', protectAdmin, deleteSkill);
export default router;