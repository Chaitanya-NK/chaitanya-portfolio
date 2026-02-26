import express from 'express';
import { getEducation, addEducation, deleteEducation } from '../controllers/educationController.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = express.Router();
router.get('/', getEducation);
router.post('/', protectAdmin, addEducation);
router.delete('/:id', protectAdmin, deleteEducation);
export default router;