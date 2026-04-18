'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from '@/components/common/Link';
import ServiceDetailView from '@/components/services/ServiceDetailView';
import { serviceApi, type ServiceUpsertBody } from '@/features/services/api/serviceApi';
import type { SectionContent, ServiceDetailRecord } from '@/features/services/types';
import {
  emptySectionContent,
  isSectionContentEmpty,
  normalizeSectionContentForSave,
  parseSectionContentUnknown,
} from '@/features/services/admin/sectionContentModel';
import { ExternalLink, Plus, RefreshCcw, Save, Trash2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';
import { locales, type Locale } from '@/i18n/request';
import { ServiceCatalogCard } from '@/features/services/ServiceCatalogCard';
import { getAdminServicesPageCopy } from '@/features/services/admin/adminServicesPageCopy';
import {
  enHasOwnPartnerLogos,
  mergePartnerLogosForAdminDetail,
} from '@/features/services/pickServiceLocale';
import { uploadServiceImage } from '@/features/services/uploadServiceImage';

const formInputClass =
  'w-full min-w-[8rem] rounded-md border border-gray-400 bg-white px-2 py-1.5 text-sm text-gray-900 shadow-sm focus:border-[#1f4fa0] focus:outline-none focus:ring-2 focus:ring-[#1f4fa0]/30';

/** Ô thứ tự: không tăng min-width, ẩn spinner để không đè lên checkbox */
const sortOrderInputClass = `${formInputClass} min-w-0 max-w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`;

type FormState = {
  slug: string;
  sortOrder: string;
  published: boolean;
  listTitleVi: string;
  listExcerptVi: string;
  listTitleEn: string;
  listExcerptEn: string;
  listImageUrl: string;
  contentVi: SectionContent;
  contentEn: SectionContent;
  useEnglishDetail: boolean;
};

/** Ba ô pill trên thẻ preview — đồng bộ với `heroStats` trong Hero đầu trang. */
function padHeroStatsThree(raw: string[] | null | undefined): string[] {
  const a = raw ?? [];
  return [a[0] ?? '', a[1] ?? '', a[2] ?? ''];
}

/** Chuẩn hoá khi gửi API / cột catalogPills — lọc dòng rỗng. */
function heroStatsLinesToSavedArray(lines: string[]): string[] {
  return lines.map((s) => s.trim()).filter((s) => s.length > 0);
}

/**
 * Đồng bộ từ 3 ô pill trên thẻ → `heroStats`: không trim từng lần gõ.
 * Nếu trim ngay, khoảng trắng cuối chữ (đang gõ từ tiếp theo) bị mất → không gõ được cách.
 */
function catalogPillLinesToHeroStats(lines: string[]): string[] {
  const a = lines.slice(0, 3);
  return [a[0] ?? '', a[1] ?? '', a[2] ?? ''];
}

function serviceToFormState(s: ServiceDetailRecord): FormState {
  return {
    slug: s.slug,
    sortOrder: String(s.sortOrder),
    published: s.published,
    listTitleVi: s.listTitleVi,
    listExcerptVi: s.listExcerptVi,
    listTitleEn: s.listTitleEn ?? '',
    listExcerptEn: s.listExcerptEn ?? '',
    listImageUrl: s.listImageUrl ?? '',
    contentVi: parseSectionContentUnknown(s.contentVi),
    contentEn: s.contentEn ? parseSectionContentUnknown(s.contentEn) : emptySectionContent(),
    useEnglishDetail: Boolean(s.contentEn),
  };
}

const emptyForm = (sortOrder: string): FormState => ({
  slug: '',
  sortOrder,
  published: false,
  listTitleVi: '',
  listExcerptVi: '',
  listTitleEn: '',
  listExcerptEn: '',
  listImageUrl: '',
  contentVi: emptySectionContent(),
  contentEn: emptySectionContent(),
  useEnglishDetail: false,
});

export default function AdminServicesPage() {
  const t = useTranslations('admin.servicesPage');
  const tForm = useTranslations('admin.servicesPage.form');
  const tList = useTranslations('services_list');
  const rawLocale = useLocale();
  const locale: Locale = locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : 'vi';
  const adminPageCopy = useMemo(() => getAdminServicesPageCopy(locale), [locale]);

  const [rows, setRows] = useState<ServiceDetailRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(() => emptyForm('0'));
  const [modalOpen, setModalOpen] = useState(false);
  const [detailTab, setDetailTab] = useState<'vi' | 'en'>('vi');
  const [portalMounted, setPortalMounted] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const isEditMode = editingId !== null;

  useEffect(() => {
    setPortalMounted(true);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await serviceApi.listAdmin();
      if (res.success) {
        setRows(res.services);
      } else {
        toast.error(t('toast.loadError'));
      }
    } catch {
      toast.error(t('toast.loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    load();
  }, [load]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setDetailTab('vi');
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen, closeModal]);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    window.scrollTo(0, 0);
    modalScrollRef.current?.scrollTo(0, 0);
  }, [modalOpen]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm(String(rows.length)));
    setDetailTab('vi');
    setModalOpen(true);
  };

  const openEditModal = (s: ServiceDetailRecord) => {
    setEditingId(s.id);
    setForm(serviceToFormState(s));
    setDetailTab('vi');
    setModalOpen(true);
  };

  const catalogEditLabelsBase = useMemo(
    () => ({
      lead: tList('cardLeadLabel'),
      outline: tList('cardOutlineLabel'),
      cta: tList('cardCta'),
      teaserHint: tList('cardTeaserHint'),
      emptyCardImageEditHint: tList('cardEmptyImageEdit'),
      excerptPlaceholder: tForm('detail.placeholders.catalogExcerpt'),
      pillLinePlaceholder: adminPageCopy.catalogPillLinePlaceholder,
      imageUrlPlaceholder: tForm('detail.placeholders.catalogImageUrl'),
      imageUploadButton: adminPageCopy.imageUploadButton,
      imageUrlOrUploadHint: adminPageCopy.imageUrlOrUploadHint,
    }),
    [tList, tForm, adminPageCopy]
  );

  const parsePayload = (): ServiceUpsertBody | null => {
    if (!form.listTitleVi.trim() || !form.listExcerptVi.trim()) {
      toast.error(tForm('catalogViIncomplete'));
      return null;
    }
    if (isSectionContentEmpty(form.contentVi)) {
      toast.error(tForm('detail.emptyVi'));
      return null;
    }
    const contentEnRaw =
      form.useEnglishDetail && !isSectionContentEmpty(form.contentEn) ? form.contentEn : null;
    const contentViBase = normalizeSectionContentForSave(form.contentVi);
    const contentEnBase = contentEnRaw ? normalizeSectionContentForSave(contentEnRaw) : null;
    /**
     * Root cause cũ: logo đối tác bị tách theo locale (VI/EN), nên có trường hợp ảnh catalog hiện
     * nhưng logo không hiện ở locale còn lại. Logo đối tác giờ dùng chung cho cả hai bản.
     */
    const sharedPartnerLogos =
      contentViBase.partnerLogos.length > 0
        ? contentViBase.partnerLogos
        : (contentEnBase?.partnerLogos ?? []);
    const contentVi = { ...contentViBase, partnerLogos: sharedPartnerLogos };
    const contentEn = contentEnRaw
      ? (() => {
          const en = contentEnBase!;
          return {
            ...en,
            partnerLogos: sharedPartnerLogos,
          };
        })()
      : null;
    /** Đồng bộ cột DB với Hero VI — API / cache có thể dùng không cần parse JSON. */
    const catalogPills = heroStatsLinesToSavedArray(form.contentVi.heroStats).slice(0, 3);
    return {
      slug: form.slug.trim(),
      sortOrder: Number(form.sortOrder) || 0,
      published: form.published,
      listTitleVi: form.listTitleVi.trim(),
      listExcerptVi: form.listExcerptVi.trim(),
      listTitleEn: form.listTitleEn.trim() || undefined,
      listExcerptEn: form.listExcerptEn.trim() || undefined,
      listImageUrl: form.listImageUrl.trim() || undefined,
      catalogPills,
      contentVi,
      contentEn,
    };
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = parsePayload();
    if (!payload) return;
    try {
      if (isEditMode && editingId) {
        await serviceApi.update(editingId, payload);
      } else {
        await serviceApi.create(payload);
      }
      toast.success(t('toast.saveSuccess'));
      await load();
      setEditingId(null);
      setForm(emptyForm('0'));
      closeModal();
    } catch {
      toast.error(t('toast.saveError'));
    }
  };

  const handleDelete = async (s: ServiceDetailRecord) => {
    if (!window.confirm(t('confirmDelete', { slug: s.slug }))) return;
    try {
      await serviceApi.delete(s.id);
      toast.success(t('toast.deleteSuccess'));
      if (editingId === s.id) {
        setEditingId(null);
        setForm(emptyForm('0'));
        closeModal();
      }
      await load();
    } catch {
      toast.error(t('toast.deleteError'));
    }
  };

  const previewHref = useMemo(() => {
    const slug = form.slug.trim();
    if (!slug) return null;
    return `/${locale}/services/${slug}`;
  }, [form.slug, locale]);

  const draftHeaderVi = form.listTitleVi.trim() || tForm('modalDraftTitle');
  const draftHeaderEn =
    form.listTitleEn.trim() || form.listTitleVi.trim() || tForm('modalDraftTitle');

  const setDetailTabEn = () => {
    setForm((f) => ({ ...f, useEnglishDetail: true }));
    setDetailTab('en');
  };

  const uploadCatalogCardImage = useCallback(
    async (file: File) => {
      try {
        return await uploadServiceImage(file, 'services/catalog');
      } catch (e) {
        const msg =
          e instanceof Error && e.message === 'IMAGE_TOO_LARGE'
            ? t('toast.uploadImageTooLarge')
            : t('toast.uploadImageError');
        toast.error(msg);
        throw e;
      }
    },
    [t]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={load}
            className="p-3 border border-gray-300 hover:bg-gray-50 rounded-md transition"
            aria-label={t('actions.refreshAria')}
          >
            <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800"
          >
            <Plus size={18} />
            {t('actions.add')}
          </button>
        </div>
      </div>

      <div className="max-w-4xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800">
          {t('table.list')}
        </h3>
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 border-b border-gray-300">
              <tr>
                <th className="text-left p-3 font-bold text-gray-900">{t('table.slug')}</th>
                <th className="text-left p-3 font-bold text-gray-900 hidden sm:table-cell">
                  {t('table.listViTitle')}
                </th>
                <th className="text-center p-3 font-bold text-gray-900 w-24">
                  {t('table.published')}
                </th>
                <th className="w-28 p-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-b border-gray-200 hover:bg-slate-50/90">
                  <td className="p-3 font-mono text-xs font-medium text-gray-900">{s.slug}</td>
                  <td className="p-3 font-medium text-gray-900 hidden sm:table-cell max-w-[200px] truncate">
                    {s.listTitleVi}
                  </td>
                  <td className="p-3 text-center text-sm font-semibold text-gray-900">
                    {s.published ? '✓' : '—'}
                  </td>
                  <td className="p-2">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(s)}
                        className="text-xs font-semibold text-[#1f4fa0] hover:underline"
                      >
                        {t('table.edit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s)}
                        className="inline-flex items-center justify-center gap-1 text-xs text-red-600 hover:bg-red-50 rounded px-1 py-0.5"
                        aria-label={t('table.deleteAria', { slug: s.slug })}
                      >
                        <Trash2 size={12} aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && !loading ? (
            <p className="p-6 text-sm font-medium text-gray-800 text-center">{t('table.empty')}</p>
          ) : null}
        </div>
      </div>

      {portalMounted && modalOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[110] flex items-stretch justify-center bg-slate-900/40 backdrop-blur-[2px] sm:items-center sm:p-3"
              onClick={closeModal}
              role="presentation"
            >
              <form
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-svc-modal-title"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSave}
                className="flex h-full min-h-0 w-full max-w-[min(100vw,96rem)] flex-col overflow-hidden bg-[#f4f7ff] shadow-[0_0_0_1px_rgba(15,23,42,0.06)] sm:h-[min(100dvh-1.5rem,calc(100dvh-1rem))] sm:max-h-[calc(100dvh-1rem)] sm:rounded-xl sm:ring-1 sm:ring-slate-200/80"
              >
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 py-2.5 shadow-sm sm:rounded-t-xl sm:px-4 sm:py-3">
                  <h3
                    id="admin-svc-modal-title"
                    className="min-w-0 flex-1 truncate text-sm font-bold text-gray-900 sm:text-base"
                  >
                    {isEditMode ? tForm('panelEdit') : tForm('panelCreate')}
                  </h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                    aria-label={tForm('closeModalAria')}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="shrink-0 space-y-3 border-b border-slate-200 bg-slate-50/95 px-3 py-3 sm:px-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-4">
                    <div className="flex min-w-0 flex-col gap-4">
                      <label className="flex min-w-0 flex-col gap-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-gray-600">
                            {tForm('slug')}
                          </span>
                          {previewHref ? (
                            <Link
                              href={previewHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#1f4fa0] hover:underline sm:text-xs"
                            >
                              <ExternalLink size={14} className="shrink-0" aria-hidden />
                              {tForm('preview')}
                            </Link>
                          ) : null}
                        </div>
                        <input
                          required
                          value={form.slug}
                          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                          className={`${formInputClass} font-mono text-xs`}
                          placeholder={tForm('slugPlaceholder')}
                        />
                      </label>
                      <label className="flex w-full max-w-[10rem] flex-col gap-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-gray-600">
                          {tForm('sortOrder')}
                        </span>
                        <input
                          type="number"
                          value={form.sortOrder}
                          onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))}
                          className={`${sortOrderInputClass} font-mono text-xs`}
                        />
                      </label>
                      <label className="flex min-w-0 cursor-pointer items-start gap-2.5 rounded-lg border border-transparent py-0.5 sm:items-center">
                        <input
                          type="checkbox"
                          checked={form.published}
                          onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                          className="mt-0.5 shrink-0 rounded border-gray-300 sm:mt-0"
                        />
                        <span className="text-xs font-semibold leading-snug text-gray-900">
                          {tForm('published')}
                        </span>
                      </label>
                    </div>
                    <div className="flex min-w-0 flex-col gap-3 sm:items-end">
                      <div className="flex w-full rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-semibold shadow-sm sm:w-auto">
                        <button
                          type="button"
                          onClick={() => setDetailTab('vi')}
                          className={`rounded-md px-2.5 py-1.5 transition ${detailTab === 'vi' ? 'bg-[#001a41] text-white' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          {tForm('detailTabVi')}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            form.useEnglishDetail ? setDetailTab('en') : setDetailTabEn()
                          }
                          className={`rounded-md px-2.5 py-1.5 transition ${detailTab === 'en' ? 'bg-[#001a41] text-white' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          {tForm('detailTabEn')}
                        </button>
                      </div>
                      <label className="flex cursor-pointer items-start gap-2 sm:items-center">
                        <input
                          type="checkbox"
                          checked={form.useEnglishDetail}
                          onChange={(e) => {
                            const on = e.target.checked;
                            setForm((f) => ({ ...f, useEnglishDetail: on }));
                            if (!on) setDetailTab('vi');
                          }}
                          className="mt-0.5 shrink-0 rounded border-gray-300 sm:mt-0"
                        />
                        <span className="text-xs font-medium leading-snug text-gray-800">
                          {tForm('useEnglishDetail')}
                        </span>
                      </label>
                    </div>
                  </div>
                  <p className="border-t border-slate-200/80 pt-3 text-left text-[11px] leading-relaxed text-slate-600 sm:text-xs">
                    {adminPageCopy.englishDetailHelp}
                  </p>
                </div>

                <div
                  ref={modalScrollRef}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
                >
                  <div className="border-b border-slate-200/80 bg-[#f4f7ff] px-3 py-4 sm:px-5">
                    <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-wide text-slate-600 sm:text-left">
                      {tForm('catalogShellCaption')}
                    </p>
                    <div className="mx-auto flex max-w-[min(100%,92rem)] flex-wrap justify-center gap-5 sm:gap-6">
                      <div className="flex w-full justify-center sm:w-[23rem] sm:max-w-[23rem] sm:flex-none">
                        <ServiceCatalogCard
                          mode="edit"
                          labels={{
                            ...catalogEditLabelsBase,
                            eyebrow: tForm('catalogEyebrowVi'),
                            titlePlaceholder: tForm('detail.placeholders.catalogTitleVi'),
                          }}
                          title={form.listTitleVi}
                          excerpt={form.listExcerptVi}
                          imageUrl={form.listImageUrl}
                          catalogPills={padHeroStatsThree(form.contentVi.heroStats)}
                          onCatalogPillsChange={(lines) =>
                            setForm((f) => ({
                              ...f,
                              contentVi: {
                                ...f.contentVi,
                                heroStats: catalogPillLinesToHeroStats(lines),
                              },
                            }))
                          }
                          onTitleChange={(listTitleVi) => setForm((f) => ({ ...f, listTitleVi }))}
                          onExcerptChange={(listExcerptVi) =>
                            setForm((f) => ({ ...f, listExcerptVi }))
                          }
                          onImageUrlChange={(listImageUrl) =>
                            setForm((f) => ({ ...f, listImageUrl }))
                          }
                          onCardImageUpload={uploadCatalogCardImage}
                        />
                      </div>
                      <div className="flex w-full justify-center sm:w-[23rem] sm:max-w-[23rem] sm:flex-none">
                        <ServiceCatalogCard
                          mode="edit"
                          labels={{
                            ...catalogEditLabelsBase,
                            eyebrow: tForm('catalogEyebrowEn'),
                            titlePlaceholder: tForm('detail.placeholders.catalogTitleEn'),
                          }}
                          title={form.listTitleEn}
                          excerpt={form.listExcerptEn}
                          imageUrl={form.listImageUrl}
                          catalogPills={padHeroStatsThree(form.contentEn.heroStats)}
                          onCatalogPillsChange={(lines) =>
                            setForm((f) => ({
                              ...f,
                              contentEn: {
                                ...f.contentEn,
                                heroStats: catalogPillLinesToHeroStats(lines),
                              },
                            }))
                          }
                          onTitleChange={(listTitleEn) => setForm((f) => ({ ...f, listTitleEn }))}
                          onExcerptChange={(listExcerptEn) =>
                            setForm((f) => ({ ...f, listExcerptEn }))
                          }
                          onImageUrlChange={(listImageUrl) =>
                            setForm((f) => ({ ...f, listImageUrl }))
                          }
                          onCardImageUpload={uploadCatalogCardImage}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pb-8">
                    {detailTab === 'vi' ? (
                      <ServiceDetailView
                        pageHeaderTitle={draftHeaderVi}
                        content={form.contentVi}
                        uiLang="vi"
                        hidePageHeader
                        adminEdit={{
                          onChange: (fn) => setForm((f) => ({ ...f, contentVi: fn(f.contentVi) })),
                        }}
                        rootClassName="min-h-0 bg-[#f4f7ff]"
                      />
                    ) : (
                      <ServiceDetailView
                        pageHeaderTitle={draftHeaderEn}
                        content={{
                          ...form.contentEn,
                          partnerLogos: mergePartnerLogosForAdminDetail(
                            form.contentEn,
                            form.contentVi
                          ),
                        }}
                        uiLang="en"
                        hidePageHeader
                        adminEdit={{
                          onChange: (fn) =>
                            setForm((f) => {
                              const mergedBase = {
                                ...f.contentEn,
                                partnerLogos: mergePartnerLogosForAdminDetail(
                                  f.contentEn,
                                  f.contentVi
                                ),
                              };
                              const next = fn(mergedBase);
                              if (enHasOwnPartnerLogos(f.contentEn)) {
                                return { ...f, contentEn: next };
                              }
                              return {
                                ...f,
                                contentVi: { ...f.contentVi, partnerLogos: next.partnerLogos },
                                contentEn: { ...next, partnerLogos: [] },
                              };
                            }),
                        }}
                        rootClassName="min-h-0 bg-[#f4f7ff]"
                      />
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 border-t border-slate-200 bg-white px-3 py-3 shadow-[0_-8px_28px_rgba(0,26,65,0.08)] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:rounded-b-xl sm:px-4">
                  <p className="text-center text-[11px] leading-snug text-slate-600 sm:text-left">
                    {t('modalSaveHint')}
                  </p>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-lg bg-[#001a41] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#0c2860]"
                    >
                      <Save size={18} />
                      {isEditMode ? tForm('saveUpdate') : tForm('saveCreate')}
                    </button>
                  </div>
                </div>
              </form>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
