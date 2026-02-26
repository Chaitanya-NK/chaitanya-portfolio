import express from 'express';
import { getExperiences, createExperience, deleteExperience } from '../controllers/experienceController.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = express.Router();

router.get('/', getExperiences);
router.post('/', protectAdmin, createExperience);
router.delete('/:id', protectAdmin, deleteExperience);

export default router;