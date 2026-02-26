import express from 'express';
import { getConfig, updateConfig } from '../controllers/configController.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = express.Router();
router.get('/', getConfig); // Publicly accessible for the portfolio
router.post('/', protectAdmin, updateConfig); // Protected for you

export default router;