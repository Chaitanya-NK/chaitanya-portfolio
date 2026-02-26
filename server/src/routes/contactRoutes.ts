import express from 'express';
import { getMessages, updateMessageStatus, deleteMessage, sendMessage } from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = express.Router();
router.get('/', protectAdmin, getMessages);
router.post('/', sendMessage);
router.patch('/:id', protectAdmin, updateMessageStatus);
router.delete('/:id', protectAdmin, deleteMessage);

export default router;