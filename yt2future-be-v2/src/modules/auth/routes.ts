import { Router } from 'express';
import {
  register,
  login,
  getMe,
  logout,
  grantGoogleRole,
  updateUserProfile,
} from '../../controllers/authController.js';
import { isAdmin, verifyToken } from '../../middlewares/authMiddleware.js';
import { authPublicLimiter } from '../../middlewares/authRateLimit.js';
import { z } from 'zod';
import { validateBody } from '../../middlewares/validate.js';

const router = Router();
const registerSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().email(),
  password: z.string().min(6),
  avatarUrl: z.string().url().optional().or(z.literal('')).optional(),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
const googleSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().min(1).optional(),
  picture: z.string().url().optional().or(z.literal('')).optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')).optional(),
});
const updateUserSchema = z.object({
  fullName: z.string().trim().min(1).max(120).optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')).optional(),
});

router.post('/register', authPublicLimiter, validateBody(registerSchema), register);
router.post('/login', authPublicLimiter, validateBody(loginSchema), login);
router.post('/logout', logout);
router.post('/grant-google-role', authPublicLimiter, validateBody(googleSchema), grantGoogleRole);

router.get('/me', verifyToken, getMe);
router.put('/update-user', verifyToken, validateBody(updateUserSchema), updateUserProfile);

router.get('/admin', verifyToken, isAdmin, (_req, res) => {
  res.json({ message: 'Dữ liệu mật cho Admin' });
});

export default router;
