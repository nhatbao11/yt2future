import { prisma } from '../../lib/prisma.js';

export async function sendFeedback(input: { userId: string; content: string; rating: number }) {
  return prisma.feedback.create({
    data: {
      content: input.content,
      userId: input.userId,
      rating: input.rating,
      status: 'PENDING',
    },
  });
}

export async function getHomeFeedbacks() {
  const feedbacksRaw = await prisma.feedback.findMany({
    where: { status: 'APPROVED' },
    include: { user: { select: { fullName: true, avatarUrl: true } } },
    take: 10,
    orderBy: { createdAt: 'desc' },
  });
  return feedbacksRaw.filter((f) => f.user);
}

export async function getPendingFeedbacks() {
  return prisma.feedback.findMany({
    where: { status: 'PENDING' },
    include: { user: { select: { fullName: true, avatarUrl: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAllFeedbacks() {
  return prisma.feedback.findMany({
    include: { user: { select: { fullName: true, avatarUrl: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function reviewFeedback(id: string, status: 'APPROVED' | 'REJECTED') {
  return prisma.feedback.update({
    where: { id },
    data: { status },
    include: { user: { select: { fullName: true } } },
  });
}

export async function findFeedbackForDelete(id: string) {
  return prisma.feedback.findUnique({
    where: { id },
    include: { user: { select: { fullName: true } } },
  });
}

export async function deleteFeedbackById(id: string) {
  return prisma.feedback.delete({
    where: { id },
  });
}
