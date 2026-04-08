import { Role } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';

const ROLE_TITLE_MAP: Record<string, string> = {
  ADMIN: 'Quản trị viên',
  CTV: 'Cộng tác viên',
  MEMBER: 'Hội viên chính thức',
  USER: 'Thành viên mới',
};

export async function listUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      avatarUrl: true,
      role: true,
      roleTitle: true,
    },
    orderBy: { fullName: 'asc' },
  });
}

export async function updateUserRole(userId: string, role: Role) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      role,
      roleTitle: ROLE_TITLE_MAP[role] ?? 'Thành viên',
    },
  });
}

export type RemoveUserFailureCode = 'NOT_FOUND' | 'SELF' | 'ADMIN_TARGET' | 'DELETE_FAILED';

export async function removeUser(
  id: string,
  adminId: string
): Promise<{ ok: true; email: string } | { ok: false; code: RemoveUserFailureCode }> {
  const userToDelete = await prisma.user.findUnique({ where: { id } });
  if (!userToDelete) {
    return { ok: false, code: 'NOT_FOUND' };
  }
  if (id === adminId) {
    return { ok: false, code: 'SELF' };
  }
  if (userToDelete.role === 'ADMIN') {
    return { ok: false, code: 'ADMIN_TARGET' };
  }
  try {
    await prisma.user.delete({ where: { id } });
    return { ok: true, email: userToDelete.email };
  } catch {
    return { ok: false, code: 'DELETE_FAILED' };
  }
}

export async function getAuditLogsPage(page: number) {
  const limit = 5;
  const skip = (page - 1) * limit;

  const [logs, total] = await prisma.$transaction([
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.auditLog.count(),
  ]);

  return {
    logs,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getDashboardStats() {
  const [totalUsers, totalReports, pendingReports, totalCategories] = await Promise.all([
    prisma.user.count(),
    prisma.report.count({ where: { status: 'APPROVED' } }),
    // "Chờ duyệt" được hiểu là chưa được duyệt đăng (status != APPROVED).
    prisma.report.count({ where: { status: { not: 'APPROVED' } } }),
    prisma.category.count(),
  ]);

  return {
    totalUsers,
    totalReports,
    pendingReports,
    totalCategories,
  };
}
