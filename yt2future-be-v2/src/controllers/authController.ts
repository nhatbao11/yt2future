import type { Request, Response } from 'express';
import AuthService from '../services/authService.js';
import { prisma } from '../lib/prisma.js';
import { getErrorMessage } from '../utils/errors.js';

function authErrorMessage(error: unknown, req: Request): string {
  const message = getErrorMessage(error);
  return message.startsWith('auth.') ? req.t(message) : message;
}

/**
 * 1. ĐĂNG KÝ
 */
export const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: req.t('auth.registerSuccess'),
      userId: user.id,
    });
  } catch (error: unknown) {
    res.status(400).json({ success: false, message: authErrorMessage(error, req) });
  }
};

/**
 * 2. ĐĂNG NHẬP THƯỜNG
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { token, user } = await AuthService.loginUser(req.body);

    // Lưu Token vào Cookie để các Request sau tự đính kèm
    res.cookie('yt2future_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.json({
      success: true,
      message: req.t('auth.loginSuccess'),
      user,
      token, // Trả về Token để FE (Server Action) có thể lấy và set Cookie
    });
  } catch (error: unknown) {
    res.status(400).json({ success: false, message: authErrorMessage(error, req) });
  }
};

/**
 * 3. LẤY THÔNG TIN NGƯỜI DÙNG HIỆN TẠI (GET ME)
 * Sửa lại req.user.id cho khớp với Middleware
 */
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.getMe(req.user!.id);
    res.json({ success: true, user });
  } catch (error: unknown) {
    res.status(404).json({ success: false, message: authErrorMessage(error, req) });
  }
};

/**
 * 4. ĐĂNG XUẤT
 */
export const logout = (req: Request, res: Response) => {
  res.clearCookie('yt2future_token', { path: '/', httpOnly: true, sameSite: 'lax' });
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).json({ success: true, message: req.t('auth.logoutSuccess') });
};

/**
 * 5. ĐĂNG NHẬP GOOGLE
 * Sửa lại để nhận toàn bộ profile (email, name, picture)
 */
export const grantGoogleRole = async (req: Request, res: Response) => {
  try {
    // Nhận cả object profile từ FE gửi lên
    const profile = req.body;
    const { token, user } = await AuthService.grantGoogleRole(profile);

    res.cookie('yt2future_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.json({ success: true, user, token });
  } catch (error: unknown) {
    console.error('Google Auth Backend Error:', getErrorMessage(error));
    const message = getErrorMessage(error);
    const finalMessage = message.startsWith('auth.')
      ? req.t(message)
      : req.t('auth.googleAuthError');
    res.status(400).json({ success: false, message: finalMessage });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { fullName, avatarUrl } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        fullName: fullName || undefined,
        avatarUrl: avatarUrl || undefined,
      },
    });

    res.json({
      success: true,
      message: 'Đã cập nhật hồ sơ thành công sếp ơi!',
      user: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        avatarUrl: updatedUser.avatarUrl,
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Lỗi cập nhật DB!',
      error: getErrorMessage(error),
    });
  }
};
