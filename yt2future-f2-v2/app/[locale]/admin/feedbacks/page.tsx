'use client';
import React, { useCallback, useEffect, useState } from 'react';
import FallbackImage from '@/components/common/FallbackImage';
import { adminService } from '@/features/admin/api/adminApi';
import {
  Check,
  X,
  MessageSquare,
  ListFilter,
  Clock,
  CheckCircle2,
  Calendar,
  Star,
  Trash2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';

export default function AdminFeedback() {
  const locale = useLocale();
  const t = useTranslations('admin.feedbacks');
  const [list, setList] = useState<
    Array<{
      id: string;
      content: string;
      rating: number;
      status: 'PENDING' | 'APPROVED' | 'REJECTED';
      createdAt: string;
      user?: { fullName?: string; avatarUrl?: string | null };
    }>
  >([]);
  const [filter, setFilter] = useState<'PENDING' | 'ALL'>('PENDING');
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const feedbacks =
        filter === 'PENDING'
          ? await adminService.getPendingFeedbacks()
          : await adminService.getAllFeedbacks();
      setList(feedbacks || []);
    } catch (err) {
      console.error(t('consoleLoadError'), err);
    } finally {
      setLoading(false);
    }
  }, [filter, t]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await adminService.reviewFeedback(id, status);
      toast.success(status === 'APPROVED' ? t('toast.approved') : t('toast.rejected'));
      loadData();
    } catch {
      toast.error(t('toast.actionError'));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminService.deleteFeedback(id);
      toast.success(t('toast.deleteSuccess'));
      setDeleteConfirm(null);
      loadData();
    } catch {
      toast.error(t('toast.deleteError'));
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* HEADER SECTION - MINIMALIST */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-200">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 font-semibold text-xs uppercase tracking-wide">
            {t('console')}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageSquare size={28} className="text-gray-600" /> {t('title')}
          </h1>
        </div>

        {/* TAB FILTER - CLEAN */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setFilter('PENDING')}
            className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-xs uppercase transition-all rounded-md ${
              filter === 'PENDING'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock size={14} /> {t('tabs.pending')}
          </button>
          <button
            onClick={() => setFilter('ALL')}
            className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-xs uppercase transition-all rounded-md ${
              filter === 'ALL'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ListFilter size={14} /> {t('tabs.all')}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-10 h-10 border-3 border-gray-300 border-t-gray-900 animate-spin rounded-full"></div>
          <p className="font-semibold text-gray-600 uppercase text-xs tracking-wide">
            {t('loading')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {list.map((fb) => (
            <div
              key={fb.id}
              className="group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="p-5 space-y-4 flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gray-200">
                      <FallbackImage
                        src={fb.user?.avatarUrl || '/Logo.jpg'}
                        className="object-cover"
                        alt="User"
                        fill
                        sizes="44px"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{fb.user?.fullName}</h4>
                      <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                        <Calendar size={11} />{' '}
                        {new Date(fb.createdAt).toLocaleDateString(
                          locale === 'vi' ? 'vi-VN' : 'en-US'
                        )}
                      </div>
                    </div>
                  </div>

                  {fb.status !== 'PENDING' ? (
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                        fb.status === 'APPROVED'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {fb.status === 'APPROVED' ? t('status.approved') : t('status.rejected')}
                    </span>
                  ) : (
                    <div className="bg-yellow-50 text-yellow-600 p-1.5 rounded-md">
                      <Clock size={14} />
                    </div>
                  )}
                </div>

                {/* RATING */}
                <div className="flex gap-1 items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < fb.rating ? '#eab308' : 'none'}
                      className={i < fb.rating ? 'text-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-gray-700">({fb.rating}/5)</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-gray-800 text-sm leading-relaxed italic">"{fb.content}"</p>
                </div>
              </div>

              {/* ACTION BUTTONS - CLEAN */}
              <div className="border-t border-gray-200">
                {fb.status === 'PENDING' ? (
                  <div className="grid grid-cols-2">
                    <button
                      onClick={() => handleAction(fb.id, 'APPROVED')}
                      className="flex items-center justify-center gap-2 bg-green-50 text-green-700 py-3.5 font-semibold text-xs uppercase hover:bg-green-100 transition-colors"
                    >
                      <Check size={16} /> {t('actions.approve')}
                    </button>
                    <button
                      onClick={() => handleAction(fb.id, 'REJECTED')}
                      className="flex items-center justify-center gap-2 bg-red-50 text-red-700 py-3.5 font-semibold text-xs uppercase hover:bg-red-100 transition-colors border-l border-gray-200"
                    >
                      <X size={16} /> {t('actions.reject')}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(fb.id)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-3.5 font-semibold text-xs uppercase hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} /> {t('actions.deleteFeedback')}
                  </button>
                )}
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <div className="col-span-full py-32 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center">
              <CheckCircle2 size={48} className="text-gray-300 mb-3" />
              <p className="text-gray-400 font-semibold uppercase text-xs tracking-wide">
                {t('empty')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-bold text-gray-900 text-lg">{t('confirm.title')}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-sm leading-relaxed">{t('confirm.body')}</p>
            </div>
            <div className="p-6 bg-gray-50 flex gap-3 justify-end border-t border-gray-200">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-md hover:bg-gray-50 transition-colors"
              >
                {t('confirm.cancel')}
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-5 py-2.5 bg-red-600 text-white font-semibold text-sm rounded-md hover:bg-red-700 transition-colors"
              >
                {t('confirm.deleteNow')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
