'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { reportService } from '@/features/reports/api/reportApi';
import { categoryApi } from '@/features/categories/api/categoryApi';
import { Search, PlusCircle, X, FileText } from 'lucide-react';
import CreateReportPage from '@/components/common/CreateReportPage';
import InlinePdfViewer from '@/components/common/InlinePdfViewer';
import PageHeader from '@/components/layout/PageHeader';
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
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug?: string }>>(
    []
  );
  const [activeCatId, setActiveCatId] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ role?: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readingPdf, setReadingPdf] = useState<{ url: string; title: string } | null>(null);

  const getPdfViewerSrc = (pdfUrl: string) =>
    `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}#pagemode=thumbs&navpanes=1&view=FitH`;

  const openPdf = (pdfUrl: string, title?: string) => {
    setReadingPdf({ url: pdfUrl, title: title || t('modal_title') });
  };

  // Lock body scroll when modal or PDF viewer is open
  useEffect(() => {
    if (readingPdf || isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [readingPdf, isModalOpen]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (readingPdf) setReadingPdf(null);
        if (isModalOpen) setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readingPdf, isModalOpen]);

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
          (c) =>
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

  // Extract distinct years from reports
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    reports.forEach((r) => {
      if (r.createdAt) {
        const y = new Date(r.createdAt).getFullYear();
        if (!isNaN(y)) years.add(y);
      }
    });
    if (years.size === 0) {
      return [2026, 2025, 2024];
    }
    return Array.from(years).sort((a, b) => b - a);
  }, [reports]);

  // Client-side year filter
  const filteredReports = useMemo(() => {
    if (!selectedYear) return reports;
    return reports.filter((r) => {
      if (!r.createdAt) return false;
      return new Date(r.createdAt).getFullYear() === selectedYear;
    });
  }, [reports, selectedYear]);

  const formatReportDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return locale === 'vi' ? `Tháng ${month}/${year}` : `${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
      <PageHeader title={t('title')} />

      <main className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-10 md:py-14 grow">
        {/* Header Intro - Đồng nhất bố cục với các tab khác (Services, About, etc.) */}
        <div className="mb-10 max-w-4xl border-b border-slate-200 pb-8">
          <p className="mb-3 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-navy)]">
            {t('badge')}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 md:text-lg">
            {t('metaDescription')}
          </p>
        </div>

        {/* FILTER & CONTROL BAR - Two Rows of Filter Pills & Count */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          {/* Left: Report Count with Document Icon */}
          <div className="flex items-center justify-between lg:justify-start gap-4">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[var(--brand-navy)]" />
              <h2 className="font-extrabold text-base md:text-lg text-slate-900 uppercase tracking-wide">
                {t('report_list')} ({filteredReports.length})
              </h2>
            </div>

            {/* Add Report for CTV on mobile */}
            {userData?.role === 'CTV' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="lg:hidden flex items-center gap-1.5 bg-[var(--brand-navy)] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[var(--brand-navy-soft)] transition-colors shadow-sm"
              >
                <PlusCircle size={14} /> {t('add_report')}
              </button>
            )}
          </div>

          {/* Right: Search + 2 Filter Pill Rows */}
          <div className="flex flex-col gap-3">
            {/* Search + Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search Bar */}
              <div className="relative w-full sm:w-60">
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full bg-white border border-slate-200 rounded-full pl-8 pr-3 py-1.5 text-xs text-[#0a192f] placeholder-slate-400 outline-none focus:border-[var(--brand-navy)] transition-all shadow-sm"
                />
                <Search
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={14}
                />
              </div>

              {/* All Categories Pill */}
              <button
                onClick={() => {
                  setActiveCatId(undefined);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm cursor-pointer ${
                  activeCatId === undefined
                    ? 'bg-[var(--brand-navy-deep)] border-[var(--brand-navy-deep)] text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t('all_categories')}
              </button>

              {/* Dynamic Category Pills */}
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCatId(cat.id);
                    setPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm cursor-pointer ${
                    activeCatId === cat.id
                      ? 'bg-[var(--brand-navy-deep)] border-[var(--brand-navy-deep)] text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}

              {/* Add Report Button for CTV on desktop */}
              {userData?.role === 'CTV' && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden lg:flex items-center gap-1.5 bg-[var(--brand-navy)] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[var(--brand-navy-soft)] transition-colors shadow-sm ml-auto cursor-pointer"
                >
                  <PlusCircle size={14} /> {t('add_report')}
                </button>
              )}
            </div>

            {/* Year Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedYear(null)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm cursor-pointer ${
                  selectedYear === null
                    ? 'bg-[var(--brand-yellow)] border-[var(--brand-yellow)] text-[var(--brand-navy-deep)] font-extrabold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t('all_years')}
              </button>

              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm cursor-pointer ${
                    selectedYear === year
                      ? 'bg-[var(--brand-yellow)] border-[var(--brand-yellow)] text-[var(--brand-navy-deep)] font-extrabold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t('year_prefix')} {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* REPORTS GRID */}
        {loading ? (
          <div className="flex items-center justify-center py-32 text-sm text-slate-400 font-medium tracking-widest uppercase animate-pulse">
            {t('syncing')}
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-200 mt-8 shadow-sm">
            <p className="text-slate-500 font-medium text-sm">{t('no_desc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => openPdf(report.pdfUrl, report.title)}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Thumbnail Area with badges */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={report.thumbnail || '/Logo.jpg'}
                      alt={report.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Top-Left Category Badge */}
                    <span className="absolute top-3 left-3 z-10 bg-[var(--brand-navy-deep)]/90 backdrop-blur-sm text-white font-extrabold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                      {report.category?.name || 'Research'}
                    </span>

                    {/* Top-Right Month/Year Badge */}
                    <span className="absolute top-3 right-3 z-10 bg-[var(--brand-yellow)] text-[var(--brand-navy-deep)] font-black text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider shadow-sm">
                      {formatReportDate(report.createdAt)}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 md:p-6 pb-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-3">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-slate-500">
                        BY {report.user?.fullName || 'YT Insight'}
                      </span>
                      <span>
                        {new Date(report.createdAt).toLocaleDateString(
                          locale === 'vi' ? 'vi-VN' : 'en-US'
                        )}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-[var(--brand-navy)] transition-colors leading-snug line-clamp-2 mb-3">
                      {report.title}
                    </h3>

                    <p className="text-xs md:text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4 font-normal">
                      {report.description || t('no_desc')}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button (styled like Co 4 La) */}
                <div className="px-5 md:px-6 pb-5 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPdf(report.pdfUrl, report.title);
                    }}
                    className="w-full border-2 border-[var(--brand-navy)] text-[var(--brand-navy)] group-hover:bg-[var(--brand-navy)] group-hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider shadow-sm group-hover:shadow-md cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>{t('details')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-6 border-t border-slate-200 pt-8">
            <button
              disabled={page === 1}
              onClick={(e) => {
                e.stopPropagation();
                setPage(page - 1);
              }}
              className="text-xs font-bold uppercase tracking-widest text-[var(--brand-navy)] disabled:opacity-30 hover:text-[var(--brand-yellow)] transition-colors cursor-pointer"
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
              className="text-xs font-bold uppercase tracking-widest text-[var(--brand-navy)] disabled:opacity-30 hover:text-[var(--brand-yellow)] transition-colors cursor-pointer"
            >
              {t('next')}
            </button>
          </div>
        )}

        {/* MODAL XEM BÁO CÁO / PDF - CHUẨN ĐỒNG BỘ 100% VỚI MODAL FOOTER */}
        {readingPdf && (
          <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 sm:flex sm:items-center sm:justify-center sm:p-3 lg:p-4 cursor-pointer"
            onClick={() => setReadingPdf(null)}
          >
            <div
              className="bg-white w-full h-[100dvh] sm:h-[94dvh] sm:max-w-[96vw] lg:max-w-7xl lg:h-[92vh] flex flex-col shadow-2xl overflow-hidden border-2 border-[var(--brand-navy)] sm:rounded-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[var(--brand-navy-deep)] px-4 py-3 md:p-4 flex justify-between items-center">
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  <FileText className="text-[var(--brand-yellow)] shrink-0" size={20} />
                  <span className="text-white text-xs md:text-sm font-black uppercase tracking-widest truncate">
                    {readingPdf.title}
                  </span>
                </div>

                <button
                  onClick={() => setReadingPdf(null)}
                  className="bg-[var(--brand-navy)] text-white p-1.5 hover:bg-[var(--brand-yellow)] hover:text-[#12243f] hover:rotate-90 transition-all cursor-pointer shrink-0 rounded-lg"
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="bg-gray-100 h-[calc(100dvh-56px)] sm:h-[calc(94dvh-56px)] lg:h-auto lg:flex-1">
                <InlinePdfViewer
                  src={getPdfViewerSrc(readingPdf.url)}
                  className="w-full h-full"
                  title={readingPdf.title}
                />
              </div>
            </div>
          </div>
        )}

        {/* ADD REPORT MODAL */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white w-full max-w-5xl relative overflow-y-auto max-h-[95vh] shadow-2xl rounded-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-50">
                <span className="text-xs font-bold tracking-widest uppercase text-[#0a192f]">
                  Create Report
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-[#0a192f] hover:bg-slate-200 rounded-full transition-all cursor-pointer"
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
