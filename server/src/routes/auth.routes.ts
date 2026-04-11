import express from 'express';
import { login, signup, getMe } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', verifyToken, getMe);

export default router;