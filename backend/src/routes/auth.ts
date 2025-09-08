import { Router } from 'express';
import { login, logout, getMe, register } from '@/controllers/authController';
import { authenticate } from '@/middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/me', authenticate, getMe);

export default router;
