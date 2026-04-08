import rateLimit from 'express-rate-limit';

/** Giới hạn đăng ký / đăng nhập / grant role — chống brute-force nhẹ. */
export const authPublicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
