import express from 'express';
import * as feedbackController from '../../controllers/feedbackController.js';
import { verifyToken, isAdmin } from '../../middlewares/authMiddleware.js';
import { z } from 'zod';
import { validateBody, validateParams } from '../../middlewares/validate.js';

const router = express.Router();
const sendFeedbackBodySchema = z.object({
  content: z.string().trim().min(1).max(2000),
  rating: z.coerce.number().int().min(1).max(5).optional(),
});
const reviewFeedbackBodySchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['APPROVED', 'REJECTED']),
});
const feedbackIdParamsSchema = z.object({
  id: z.string().uuid(),
});

router.post(
  '/send',
  verifyToken,
  validateBody(sendFeedbackBodySchema),
  feedbackController.sendFeedback
);
router.get('/home', feedbackController.getHomeFeedbacks);
router.get('/pending', verifyToken, isAdmin, feedbackController.getPendingFeedbacks);
router.get('/all', verifyToken, isAdmin, feedbackController.getAllFeedbacks);
router.post(
  '/review',
  verifyToken,
  isAdmin,
  validateBody(reviewFeedbackBodySchema),
  feedbackController.reviewFeedback
);
router.delete(
  '/:id',
  verifyToken,
  isAdmin,
  validateParams(feedbackIdParamsSchema),
  feedbackController.deleteFeedback
);

export default router;
