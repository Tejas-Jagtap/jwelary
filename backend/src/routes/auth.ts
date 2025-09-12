import { Router } from 'express';
import { login, logout, getMe, register, refreshToken } from '@/controllers/authController';
import { authenticate } from '@/middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.post('/refresh', refreshToken);
router.get('/me', authenticate, getMe);

export default router;
