'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { reportService } from '@/features/reports/api/reportApi';
import { categoryApi } from '@/features/categories/api/categoryApi';
import { Search, PlusCircle, X, ChevronDown, ArrowRight, BookOpen } from 'lucide-react';
import CreateReportPage from '@/components/common/CreateReportPage';
import InlinePdfViewer from '@/components/common/InlinePdfViewer';
import { useTranslations, useLocale } from 'next-intl';

export default function SectorPage() {
  const t = useTranslations('sector_page');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [reports, setReports] = useState<
    Array<{
      id: string;
      title: string;
      description?: string;
      thumbnail?: string;
      pdfUrl: string;
      createdAt: string;
      category?: { name?: string };
      user?: { fullName?: string };
    }>
  >([]);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [activeCatId, setActiveCatId] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ role?: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readingPdfUrl, setReadingPdfUrl] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getPdfViewerSrc = (pdfUrl: string) =>
    `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}#view=FitH&zoom=page-fit&navpanes=0`;
  const openPdf = (pdfUrl: string) => {
    setReadingPdfUrl(pdfUrl);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/auth/me?v=${Date.now()}`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
        }
      } catch (err) {
        console.error('Auth fetch error:', err);
      }
    };
    fetchUser();
    categoryApi.getCategories().then((res) => {
      if (res.success) setCategories(res.categories);
    });
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    if (categoryParam) {
      const catId = parseInt(categoryParam, 10);
      if (!isNaN(catId)) {
        setActiveCatId(catId);
      } else {
        const matched = categories.find(
          (c: any) =>
            c.slug === categoryParam ||
            c.name.toLowerCase().includes(categoryParam.toLowerCase()) ||
            (categoryParam === 'doanh-nghiep' && c.name.toLowerCase().includes('doanh nghiệp')) ||
            (categoryParam === 'acca' && c.name.toLowerCase().includes('acca'))
        );
        if (matched) {
          setActiveCatId(matched.id);
        }
      }
    } else {
      setActiveCatId(undefined);
    }
    setPage(1);
  }, [categories, categoryParam]);

  const loadReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await reportService.getPublicReports(page, activeCatId, searchQuery);
      if (data.success) {
        setReports(data.reports);
        setTotalPages(data.totalPages);
      }
    } finally {
      setLoading(false);
    }
  }, [page, activeCatId, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(loadReports, 300);
    return () => clearTimeout(timer);
  }, [loadReports]);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title={t('title')} />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        {/* TOP CONTROLS */}
        <div className="mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-slate-200 pb-8">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-transparent border-b border-slate-300 pl-8 pr-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 outline-none focus:border-[#0a192f] transition-all"
              />
              <Search
                className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>

            {/* Category Dropdown */}
            <div
              className="relative w-full lg:w-64"
              onMouseEnter={() => setIsFilterOpen(true)}
              onMouseLeave={() => setIsFilterOpen(false)}
            >
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between gap-4 border-b border-slate-300 px-2 py-3 text-sm text-[#0a192f] font-medium hover:border-[#0a192f] transition-all"
              >
                <span className="truncate">
                  {categories.find((c) => c.id === activeCatId)?.name || t('category_select')}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute left-0 top-full mt-2 w-full bg-white border border-slate-200 shadow-xl transition-all z-50 ${isFilterOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
              >
                <button
                  onClick={() => {
                    setActiveCatId(undefined);
                    setPage(1);
                    setIsFilterOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 text-sm hover:bg-slate-50 border-b border-slate-100 text-slate-600 font-medium transition-colors"
                >
                  {t('all_categories')}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCatId(cat.id);
                      setPage(1);
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-5 py-3 text-sm hover:bg-slate-50 border-b border-slate-100 text-slate-600 font-medium transition-colors last:border-0"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add Report Button for Admin/CTV */}
          {userData?.role === 'CTV' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#0a192f] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#0f2445] transition-colors"
            >
              <PlusCircle size={16} /> {t('add_report')}
            </button>
          )}
        </div>

        {/* REPORTS GRID */}
        {loading ? (
          <div className="flex items-center justify-center py-32 text-sm text-slate-400 font-medium tracking-widest uppercase animate-pulse">
            {t('syncing')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {reports.map((report) => (
              <div
                key={report.id}
                onClick={() => openPdf(report.pdfUrl)}
                className="group flex flex-col cursor-pointer border border-slate-200 bg-white hover:border-[#0a192f]/30 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Image Wrapper */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100 border-b border-slate-200">
                  <Image
                    src={report.thumbnail || '/Logo.jpg'}
                    alt={report.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0a192f]">
                      {report.category?.name || 'Uncategorized'}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {new Date(report.createdAt).toLocaleDateString(
                        locale === 'vi' ? 'vi-VN' : 'en-US'
                      )}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-4">
                    {report.title}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                    {report.description || t('no_desc')}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      BY {report.user?.fullName}
                    </span>
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#0a192f] group-hover:text-blue-600 transition-colors">
                      {t('details')}{' '}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center gap-6 border-t border-slate-200 pt-8">
            <button
              disabled={page === 1}
              onClick={(e) => {
                e.stopPropagation();
                setPage(page - 1);
              }}
              className="text-xs font-bold uppercase tracking-widest text-[#0a192f] disabled:opacity-30 hover:text-blue-600 transition-colors"
            >
              {t('prev')}
            </button>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {t('page')} {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={(e) => {
                e.stopPropagation();
                setPage(page + 1);
              }}
              className="text-xs font-bold uppercase tracking-widest text-[#0a192f] disabled:opacity-30 hover:text-blue-600 transition-colors"
            >
              {t('next')}
            </button>
          </div>
        )}

        {/* CLEAN PDF VIEWER MODAL */}
        {readingPdfUrl && (
          <div className="fixed inset-0 z-[9999] bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-7xl h-[95vh] flex flex-col relative shadow-2xl">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-white">
                <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-3 text-[#0a192f]">
                  <BookOpen size={16} className="text-blue-600" /> {t('modal_title')}
                </span>

                <button
                  onClick={() => setReadingPdfUrl(null)}
                  className="p-2 text-slate-400 hover:text-[#0a192f] hover:bg-slate-100 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-hidden bg-slate-100">
                <InlinePdfViewer
                  src={getPdfViewerSrc(readingPdfUrl)}
                  className="w-full h-full"
                  title={t('viewer_title')}
                />
              </div>
            </div>
          </div>
        )}

        {/* ADD REPORT MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <div className="bg-white w-full max-w-5xl relative overflow-y-auto max-h-[95vh] shadow-2xl">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-50">
                <span className="text-xs font-bold tracking-widest uppercase text-[#0a192f]">
                  Create Report
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#0a192f] hover:bg-slate-200 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <CreateReportPage
                  onClose={() => {
                    setIsModalOpen(false);
                    loadReports();
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
