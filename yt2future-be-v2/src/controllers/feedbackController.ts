import type { NextFunction, Request, Response } from 'express';
import { createLog } from '../services/logService.js';
import { AppError } from '../utils/AppError.js';
import { getErrorMessage } from '../utils/errors.js';
import * as feedbackService from '../modules/feedback/feedbackService.js';

export const sendFeedback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, rating } = req.body;
    const userId = req.user!.id;

    await feedbackService.sendFeedback({
      userId,
      content,
      rating: Number(rating) || 5,
    });
    res.json({ success: true, message: req.t('feedback.sendSuccess') });
  } catch (error: unknown) {
    console.error('[FeedbackController] sendFeedback failed:', getErrorMessage(error));
    next(new AppError(req.t('feedback.sendError'), 500, 'FEEDBACK_SEND_FAILED'));
  }
};

export const getHomeFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbacks = await feedbackService.getHomeFeedbacks();
    res.json({ success: true, feedbacks });
  } catch (error: unknown) {
    console.error('[FeedbackController] getHomeFeedbacks failed:', getErrorMessage(error));
    next(new AppError(req.t('feedback.fetchHomeError'), 500, 'FEEDBACK_HOME_FETCH_FAILED'));
  }
};

export const getPendingFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbacks = await feedbackService.getPendingFeedbacks();
    res.json({ success: true, feedbacks });
  } catch (error: unknown) {
    console.error('[FeedbackController] getPendingFeedbacks failed:', getErrorMessage(error));
    next(new AppError(req.t('feedback.fetchPendingError'), 500, 'FEEDBACK_PENDING_FETCH_FAILED'));
  }
};

export const getAllFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();
    res.json({ success: true, feedbacks });
  } catch (error: unknown) {
    console.error('[FeedbackController] getAllFeedbacks failed:', getErrorMessage(error));
    next(new AppError(req.t('feedback.fetchAllError'), 500, 'FEEDBACK_ALL_FETCH_FAILED'));
  }
};

export const reviewFeedback = async (req: Request, res: Response, next: NextFunction) => {
  const { id, status } = req.body as { id: string; status: 'APPROVED' | 'REJECTED' };
  const admin = req.user!;
  try {
    const feedback = await feedbackService.reviewFeedback(id, status);

    const actionLabel = status === 'APPROVED' ? 'DUYỆT PHẢN HỒI' : 'TỪ CHỐI PHẢN HỒI';
    const actionText = status === 'APPROVED' ? req.t('admin.approved') : req.t('admin.rejected');
    const detail = req.t('admin.feedbackReviewed', {
      action: actionText,
      user: feedback.user?.fullName,
    });

    await createLog(admin, actionLabel, detail);

    res.json({ success: true, message: req.t('feedback.reviewSuccess', { status }) });
  } catch (error: unknown) {
    console.error('[FeedbackController] reviewFeedback failed:', getErrorMessage(error));
    next(new AppError(req.t('feedback.reviewError'), 400, 'FEEDBACK_REVIEW_FAILED'));
  }
};

export const deleteFeedback = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const admin = req.user!;
  try {
    const feedback = await feedbackService.findFeedbackForDelete(id!);

    if (!feedback) {
      return next(new AppError(req.t('feedback.notFound'), 404, 'FEEDBACK_NOT_FOUND'));
    }

    await feedbackService.deleteFeedbackById(id!);

    const detail = req.t('admin.feedbackDeleted', { user: feedback.user?.fullName });
    await createLog(admin, 'XÓA PHẢN HỒI', detail);

    res.json({ success: true, message: req.t('feedback.deleteSuccess') });
  } catch (error: unknown) {
    console.error('[FeedbackController] deleteFeedback failed:', getErrorMessage(error));
    next(new AppError(req.t('feedback.deleteError'), 400, 'FEEDBACK_DELETE_FAILED'));
  }
};
