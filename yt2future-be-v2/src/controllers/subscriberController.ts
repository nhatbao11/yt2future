import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const subscribeEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({ success: false, message: 'Duplicate email' });
    }

    // Lưu theo múi giờ GMT+7
    const now = new Date();
    const utc7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    await prisma.subscriber.create({
      data: {
        email,
        createdAt: utc7Time,
      },
    });

    return res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscribe Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
