'use client';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import FallbackImage from '@/components/common/FallbackImage';
import { adminService } from '@/features/admin/api/adminApi';
import { Trash2, RefreshCcw, ChevronLeft, ChevronRight, UserCog, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  role: 'ADMIN' | 'CTV' | 'MEMBER' | 'USER';
  roleTitle?: string;
};

export default function AdminUsersPage() {
  const t = useTranslations('admin.usersPage');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllUsers();
      setUsers(data || []);
    } catch {
      toast.error(t('toast.serverBusy'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  }, [users, currentPage]);

  const handleUpdateRole = async (userId: string, newRole: AdminUser['role']) => {
    const roleTitleMap: Record<AdminUser['role'], string> = {
      ADMIN: t('roleTitle.ADMIN'),
      CTV: t('roleTitle.CTV'),
      MEMBER: t('roleTitle.MEMBER'),
      USER: t('roleTitle.USER'),
    };

    try {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: newRole, roleTitle: roleTitleMap[newRole] } : u
        )
      );

      const res = await adminService.updateUserRole(userId, newRole);

      if (res.success) {
        toast.success(t('toast.roleUpdated'));
        window.dispatchEvent(new Event('refreshLogs'));
      }
    } catch {
      fetchUsers();
      toast.error(t('toast.roleUpdateError'));
    }
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (window.confirm(t('confirmDelete', { userName }))) {
      try {
        await adminService.deleteUser(userId);
        toast.success(t('toast.deleted', { userName }));
        const newList = users.filter((u) => u.id !== userId);
        setUsers(newList);
        const newTotalPages = Math.ceil(newList.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) setCurrentPage(newTotalPages);
      } catch {
        toast.error(t('toast.deleteError'));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <UserCog size={28} className="text-gray-600" /> {t('title')}
          </h2>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">
            {t('subtitle', { count: users.length, page: currentPage })}
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-3 border border-gray-300 hover:bg-gray-50 transition-all rounded-md bg-white"
        >
          <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-3 border-gray-200 border-t-gray-900 animate-spin rounded-full"></div>
          <p className="font-semibold text-gray-600 uppercase text-xs tracking-wide">
            {t('loading')}
          </p>
        </div>
      ) : (
        /* TABLE */
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px] border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                  <th className="p-4">{t('table.memberTitle')}</th>
                  <th className="p-4">{t('table.contact')}</th>
                  <th className="p-4 text-center">{t('table.role')}</th>
                  <th className="p-4 text-right">{t('table.actions')}</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-900">
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                        <FallbackImage
                          src={user.avatarUrl || '/Logo.jpg'}
                          className="object-cover"
                          alt="avatar"
                          fill
                          sizes="44px"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.fullName}</div>
                        <div className="text-xs text-yellow-600 font-medium flex items-center gap-1 mt-0.5">
                          <ShieldCheck size={10} /> {user.roleTitle || t('roleTitle.USER')}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-600">{user.email}</td>
                    <td className="p-4 text-center">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateRole(user.id, e.target.value as AdminUser['role'])
                        }
                        className={`px-4 py-2 rounded-md text-xs font-semibold border border-gray-300 outline-none cursor-pointer transition-all ${
                          user.role === 'ADMIN'
                            ? 'bg-red-50 text-red-700'
                            : user.role === 'CTV'
                              ? 'bg-yellow-50 text-yellow-700'
                              : user.role === 'MEMBER'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="CTV">CTV</option>
                        <option value="MEMBER">MEMBER</option>
                        <option value="USER">USER</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(user.id, user.fullName)}
                        className="p-2.5 bg-white border border-gray-300 text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all rounded-md"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              {t('pagination', { page: currentPage, totalPages: totalPages || 1 })}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-2 border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-md"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-2 border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-md"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
