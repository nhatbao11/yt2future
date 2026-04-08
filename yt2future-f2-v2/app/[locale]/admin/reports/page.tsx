'use client';
import React, { useCallback, useEffect, useState } from 'react';
import FallbackImage from '@/components/common/FallbackImage';
import { reportService } from '@/features/reports/api/reportApi';
import {
  X,
  Plus,
  RefreshCcw,
  FileSearch,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import CreateReportPage from '@/components/common/CreateReportPage';
import { AdminReportTableRow } from './AdminReportTableRow';
import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

type AdminReport = {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  pdfUrl?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  category?: { name?: string };
};

export default function AdminReportsPage() {
  const t = useTranslations('admin.reportsPage');
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<AdminReport | null>(null);
  const [editingReport, setEditingReport] = useState<AdminReport | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadReports = useCallback(
    async (pageNo: number = 1) => {
      setLoading(true);
      try {
        const res = await reportService.getAllReportsAdmin(pageNo);
        if (res.success) {
          setReports(res.reports);
          setTotalPages(res.totalPages);
          setPage(pageNo);
        }
      } catch {
        toast.error(t('toast.connectionError'));
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    loadReports(1);
  }, [loadReports]);

  const handleReview = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await reportService.reviewReport(id, status);
      if (res.success) {
        toast.success(status === 'APPROVED' ? t('toast.approved') : t('toast.rejected'));
        loadReports(page);
      }
    } catch {
      toast.error(t('toast.actionError'));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      try {
        await reportService.deleteReport(id);
        toast.success(t('toast.deleted'));
        loadReports(page);
      } catch {
        toast.error(t('toast.deleteError'));
      }
    }
  };

  const handleEdit = (report: AdminReport) => {
    setEditingReport(report);
    setIsModalOpen(true);
  };

  const openPreview = (report: AdminReport) => {
    if (!report.pdfUrl) {
      setPreviewData(report);
      return;
    }
    if (shouldOpenPdfExternally()) {
      window.open(getPdfViewerSrc(report.pdfUrl), '_blank', 'noopener,noreferrer');
      return;
    }
    setPreviewData(report);
  };
  const getPdfViewerSrc = (pdfUrl: string) =>
    `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}#view=FitH&zoom=page-fit&navpanes=0`;
  const shouldOpenPdfExternally = () => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua);
    const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    return iOS || iPadOS;
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FileSearch size={28} className="text-gray-600" /> {t('title')}
          </h2>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">
            {t('subtitle', { count: reports.length, page })}
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setEditingReport(null);
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-yellow-500 text-white px-6 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-yellow-600 transition-all rounded-md"
          >
            <Plus size={16} /> {t('create')}
          </button>
          <button
            onClick={() => loadReports(page)}
            className="p-3 border border-gray-300 bg-white hover:bg-gray-50 transition-all rounded-md"
          >
            <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-32 text-center text-sm text-gray-500">{t('loading')}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-700">
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {[
                      <th key="h1" className="p-4 w-[450px]">
                        {t('table.document')}
                      </th>,
                      <th key="h2" className="p-4 w-48">
                        {t('table.category')}
                      </th>,
                      <th key="h3" className="p-4 w-32 text-center">
                        {t('table.status')}
                      </th>,
                      <th key="h4" className="p-4 w-40 text-center">
                        {t('table.actions')}
                      </th>,
                      <th key="h5" className="w-auto" aria-hidden />,
                    ]}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {reports.map((report) => (
                    <AdminReportTableRow
                      key={report.id}
                      report={report}
                      onPreview={openPreview}
                      onReview={handleReview}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION - Đồng bộ style với Admin Dashboard */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {t('pagination', { page, totalPages })}
                </span>
                <div className="flex gap-2">
                  <PaginationBtn
                    Icon={ChevronLeft}
                    onClick={() => loadReports(page - 1)}
                    disabled={page === 1}
                  />
                  <PaginationBtn
                    Icon={ChevronRight}
                    onClick={() => loadReports(page + 1)}
                    disabled={page === totalPages}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* PREVIEW MODAL */}
      {previewData && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-3 lg:p-8">
          <div className="bg-white w-full h-[100dvh] sm:h-[94dvh] sm:max-w-[98vw] xl:max-w-7xl border border-gray-200 sm:rounded-lg shadow-xl p-3 md:p-6 xl:p-8 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 xl:gap-8 h-full">
              {/* PDF VIEWER */}
              <div className="lg:col-span-8 xl:col-span-9 bg-gray-100 border border-gray-200 rounded-lg relative overflow-hidden min-h-[52dvh] sm:min-h-[56dvh] lg:min-h-0">
                {/* intentionally no direct open/download action here */}
                <iframe
                  src={!previewData.pdfUrl ? '' : getPdfViewerSrc(previewData.pdfUrl)}
                  className="w-full h-[52dvh] sm:h-[56dvh] lg:h-full border-0"
                  title={t('pdfViewerTitle')}
                />
                {!previewData.pdfUrl && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-red-600 font-semibold">
                    <AlertCircle size={48} className="mb-4" /> {t('pdfMissing')}
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between min-h-0">
                <div className="space-y-4 md:space-y-5 xl:space-y-6 overflow-y-auto max-h-[28dvh] sm:max-h-[30dvh] lg:max-h-[calc(94dvh-220px)] xl:max-h-[50vh] pr-2">
                  <div className="space-y-2">
                    <label className="text-xs text-yellow-600 font-semibold uppercase tracking-wide">
                      {t('coverLabel')}
                    </label>
                    <div className="relative aspect-video border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <FallbackImage
                        src={previewData.thumbnail || '/Logo.jpg'}
                        className="object-cover"
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                      {t('detailsLabel')}
                    </label>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight pb-2 border-b border-gray-200">
                      {previewData.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
                      "{previewData.description || t('noDescription')}"
                    </p>
                  </div>
                </div>

                {/* CLOSE BUTTON */}
                <div className="mt-4 md:mt-8">
                  <button
                    onClick={() => setPreviewData(null)}
                    className="w-full py-3 md:py-4 bg-gray-900 text-white font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-all rounded-md"
                  >
                    {t('closePreview')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white w-full max-w-5xl border border-gray-200 rounded-lg shadow-xl overflow-y-auto max-h-[95vh] relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
            >
              <X size={24} />
            </button>
            <CreateReportPage
              onClose={() => {
                setIsModalOpen(false);
                loadReports(page);
              }}
              initialData={editingReport ?? undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Pagination Helper
function PaginationBtn({
  Icon,
  onClick,
  disabled,
}: {
  Icon: LucideIcon;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="p-2 border border-gray-300 bg-white hover:bg-gray-50 transition-all rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <Icon size={16} />
    </button>
  );
}
