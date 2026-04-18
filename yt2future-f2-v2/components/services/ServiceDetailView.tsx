'use client';

import React, { useId, useMemo, useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useLocale, useTranslations } from 'next-intl';
import { getAdminServicesPageCopy } from '@/features/services/admin/adminServicesPageCopy';
import { uploadServiceImage } from '@/features/services/uploadServiceImage';
import {
  BadgeCheck,
  Building2,
  CircleCheck,
  Clock3,
  HandCoins,
  Loader2,
  Play,
  Plus,
  Trash2,
  TrendingUp,
  Upload,
  X,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { SectionContent } from '@/features/services/types';
import {
  FALLBACK_INTRO_MP4,
  FALLBACK_INTRO_WEBM,
  resolveIntroVideo,
  youtubeEmbedUrl,
  youtubePosterUrl,
} from '@/features/services/introVideoUrl';
import {
  getPartnerLogoItemsFromLogos,
  isLikelyPartnerLogoUrl,
  normalizePartnerLogoUrl,
} from '@/features/services/partnerLogosDisplay';
import type { PartnerLogo } from '@/features/services/types';

const adminInpHero =
  'w-full rounded-lg border border-white/25 bg-white/10 px-2 py-1.5 text-inherit placeholder:text-white/40 focus:border-yellow-300/60 focus:outline-none focus:ring-1 focus:ring-yellow-300/40';
const adminInpHeroSm = `${adminInpHero} text-sm sm:text-base md:text-xl`;
const adminInpHeroLg = `${adminInpHero} text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight`;
const adminTaHero = `${adminInpHero} min-h-[4.5rem] text-xs sm:text-sm md:text-base leading-relaxed`;
const adminChipInp =
  'min-w-0 flex-1 rounded-lg border border-white/25 bg-white/10 px-2 py-1.5 text-[11px] sm:text-xs font-semibold text-blue-50 placeholder:text-white/35 focus:border-yellow-300/50 focus:outline-none';
const adminInpLight =
  'w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-400/30';
const adminTaLight = `${adminInpLight} min-h-[3.5rem] leading-relaxed`;

type Props = {
  pageHeaderTitle: string;
  content: SectionContent;
  /** Nhãn UI (Bước / Step, Đóng video, …) bám theo ngôn ngữ nội dung đang hiển thị */
  uiLang: 'vi' | 'en';
  /** Chỉnh nội dung trực tiếp trên layout (admin / modal) */
  adminEdit?: {
    onChange: (update: (prev: SectionContent) => SectionContent) => void;
  };
  /** Ví dụ `min-h-0` khi nằm trong modal cuộn */
  rootClassName?: string;
  /** Ẩn breadcrumb đầu trang (modal admin đã có thanh riêng) */
  hidePageHeader?: boolean;
  /**
   * Trang chi tiết SSR (`/services/[slug]`): snapshot từ server — trùng với HTML đã render,
   * tránh hydration failed khi client tự tính lại `trim`/lọc URL khác một chút.
   */
  publicPartnerLogos?: PartnerLogo[];
  publicPartnersPlaceholderVisible?: boolean;
};

export default function ServiceDetailView({
  pageHeaderTitle,
  content,
  uiLang,
  adminEdit,
  rootClassName,
  hidePageHeader = false,
  publicPartnerLogos: publicPartnerLogosProp,
  publicPartnersPlaceholderVisible: publicPartnersPlaceholderVisibleProp,
}: Props) {
  const edit = Boolean(adminEdit);
  const patch = (fn: (prev: SectionContent) => SectionContent) => {
    adminEdit?.onChange(fn);
  };

  const isVi = uiLang === 'vi';
  const [videoOpen, setVideoOpen] = useState(false);
  const tCatalog = useTranslations('investment_page');
  const tDetail = useTranslations('admin.servicesPage.form.detail');
  const rawLocale = useLocale();
  const adminCopy = useMemo(() => getAdminServicesPageCopy(rawLocale), [rawLocale]);
  const partnerUploadInputPrefix = useId();
  const [uploadingPartnerRow, setUploadingPartnerRow] = useState<number | null>(null);
  const ph = (key: string) => tDetail(`placeholders.${key}` as never);
  const introVideo = useMemo(
    () => resolveIntroVideo(content.introVideoUrl),
    [content.introVideoUrl]
  );
  const partnerLogos = useMemo(() => content.partnerLogos ?? [], [content.partnerLogos]);
  const derivedPartnerLogos = useMemo(
    () => getPartnerLogoItemsFromLogos(partnerLogos),
    [partnerLogos]
  );
  const partnerLogoItems =
    publicPartnerLogosProp !== undefined ? publicPartnerLogosProp : derivedPartnerLogos;

  const partnersSubtitleTrim = content.partnersSubtitle?.trim() ?? '';
  const partnersPlaceholderTrim = content.partnersPlaceholder?.trim() ?? '';
  const showPublicPartnersPlaceholder =
    publicPartnersPlaceholderVisibleProp !== undefined
      ? publicPartnersPlaceholderVisibleProp
      : Boolean(partnersPlaceholderTrim) && partnerLogoItems.length === 0;

  const root = rootClassName ?? 'min-h-screen bg-[#f4f7ff]';

  return (
    <div className={root}>
      {!hidePageHeader ? (
        <PageHeader
          parent={{ label: tCatalog('title'), href: '/services' }}
          title={pageHeaderTitle}
        />
      ) : null}

      <main
        className={`max-w-360 mx-auto px-3 sm:px-4 md:px-10 xl:px-12 space-y-5 sm:space-y-6 md:space-y-8 ${hidePageHeader ? 'py-4 sm:py-6 md:py-8' : 'py-6 sm:py-8 md:py-12'}`}
      >
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#001a41] via-[#13356f] to-[#1f4fa0] p-4 sm:p-6 md:p-8 lg:p-9 text-white shadow-2xl shadow-blue-900/20">
          <div className="absolute -top-12 -right-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/15 to-transparent" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
            {edit ? (
              <div className="lg:col-span-12">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-yellow-200/90">
                  {tDetail('sectionHero')}
                </p>
              </div>
            ) : null}
            <div className="lg:col-span-7 min-w-0">
              <div className="w-full max-w-2xl xl:max-w-[44rem]">
                {edit ? (
                  <input
                    value={content.heroTag}
                    onChange={(e) => patch((p) => ({ ...p, heroTag: e.target.value }))}
                    className={`${adminInpHeroSm} font-extrabold uppercase tracking-[0.12em] text-yellow-300`}
                    placeholder={ph('heroTag')}
                    spellCheck={false}
                  />
                ) : (
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl uppercase tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.2em] font-extrabold text-yellow-300 leading-snug">
                    {content.heroTag}
                  </p>
                )}
                {edit ? (
                  <input
                    value={content.heroTitle}
                    onChange={(e) => patch((p) => ({ ...p, heroTitle: e.target.value }))}
                    className={`${adminInpHeroLg} mt-2 sm:mt-3 tracking-tight`}
                    placeholder={ph('heroTitle')}
                    spellCheck={false}
                  />
                ) : (
                  <h1 className="mt-2 sm:mt-3 text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15] sm:leading-tight text-pretty max-w-full">
                    {content.heroTitle}
                  </h1>
                )}
                {edit ? (
                  <textarea
                    value={content.heroDescription}
                    onChange={(e) => patch((p) => ({ ...p, heroDescription: e.target.value }))}
                    className={`${adminTaHero} mt-3 sm:mt-4 text-blue-100/95`}
                    rows={4}
                    placeholder={ph('heroDescription')}
                    spellCheck={false}
                  />
                ) : (
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-blue-100/95 leading-relaxed sm:leading-relaxed text-justify hyphens-auto break-words max-w-full">
                    {content.heroDescription}
                  </p>
                )}
                <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-2.5">
                  {content.heroStats.map((item, hi) => (
                    <div
                      key={`hs-${hi}`}
                      className="inline-flex w-full sm:w-auto items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 sm:py-1.5"
                    >
                      {edit ? (
                        <>
                          <input
                            value={item}
                            onChange={(e) =>
                              patch((p) => ({
                                ...p,
                                heroStats: p.heroStats.map((x, j) =>
                                  j === hi ? e.target.value : x
                                ),
                              }))
                            }
                            className={adminChipInp}
                            placeholder={ph('heroStatChip')}
                            spellCheck={false}
                          />
                          <button
                            type="button"
                            className="shrink-0 rounded-md p-1 text-white/70 hover:bg-white/15 hover:text-white"
                            aria-label={tDetail('removeLine')}
                            onClick={() =>
                              patch((p) => ({
                                ...p,
                                heroStats: p.heroStats.filter((_, j) => j !== hi),
                              }))
                            }
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      ) : (
                        <span className="inline-flex w-full sm:w-auto items-center justify-center sm:justify-start px-2 py-1.5 text-[11px] sm:text-xs font-semibold text-blue-50 leading-snug text-center sm:text-left">
                          {item}
                        </span>
                      )}
                    </div>
                  ))}
                  {edit ? (
                    <button
                      type="button"
                      onClick={() => patch((p) => ({ ...p, heroStats: [...p.heroStats, ''] }))}
                      className="inline-flex items-center justify-center gap-1 rounded-full border border-dashed border-white/35 px-3 py-2 text-[11px] font-semibold text-white/85 hover:bg-white/10"
                    >
                      <Plus size={14} />
                      {tDetail('addLine')}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 min-w-0 space-y-2">
              {edit ? (
                <p className="text-[10px] font-bold uppercase tracking-wide text-blue-200/90 lg:text-right">
                  {tDetail('sectionVideo')}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="w-full group rounded-xl sm:rounded-2xl border border-white/20 bg-black/25 p-1.5 sm:p-2 hover:bg-black/35 transition text-left focus:outline-none focus:ring-2 focus:ring-yellow-300/80"
              >
                <div className="relative overflow-hidden rounded-xl aspect-video bg-black">
                  {introVideo.kind === 'youtube' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={youtubePosterUrl(introVideo.id)}
                      alt=""
                      className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : introVideo.kind === 'direct' ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                    >
                      <source src={introVideo.url} />
                    </video>
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                    >
                      <source src={FALLBACK_INTRO_WEBM} type="video/webm" />
                      <source src={FALLBACK_INTRO_MP4} type="video/mp4" />
                    </video>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                  <div className="absolute left-2 right-2 sm:left-3 sm:right-3 bottom-2 sm:bottom-3 flex items-end justify-between gap-2 sm:gap-3">
                    <div className="min-w-0 pr-1">
                      {edit ? (
                        <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                          <input
                            value={content.videoPreviewLabel}
                            onChange={(e) =>
                              patch((p) => ({ ...p, videoPreviewLabel: e.target.value }))
                            }
                            className="w-full rounded border border-white/20 bg-black/40 px-1.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-yellow-300 placeholder:text-yellow-200/40"
                            placeholder={ph('videoPreviewLabel')}
                            spellCheck={false}
                          />
                          <textarea
                            value={content.videoPreviewHint}
                            onChange={(e) =>
                              patch((p) => ({ ...p, videoPreviewHint: e.target.value }))
                            }
                            className="w-full resize-none rounded border border-white/15 bg-black/35 px-1.5 py-0.5 text-[10px] sm:text-xs text-slate-200 placeholder:text-slate-400"
                            rows={2}
                            placeholder={ph('videoPreviewHint')}
                            spellCheck={false}
                          />
                        </div>
                      ) : (
                        <>
                          <p className="text-[10px] sm:text-xs font-bold text-yellow-300 uppercase tracking-wider truncate sm:overflow-visible sm:whitespace-normal sm:text-wrap">
                            {content.videoPreviewLabel}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-200 leading-snug line-clamp-2 sm:line-clamp-none">
                            {content.videoPreviewHint}
                          </p>
                        </>
                      )}
                    </div>
                    <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur text-white group-hover:scale-105 transition">
                      <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.25} />
                    </span>
                  </div>
                </div>
              </button>
              {edit ? (
                <label className="block text-[10px] font-medium text-blue-100/90">
                  <span className="mb-0.5 block opacity-90">{tDetail('introVideoUrl')}</span>
                  <input
                    value={content.introVideoUrl}
                    onChange={(e) => patch((p) => ({ ...p, introVideoUrl: e.target.value }))}
                    className={`${adminInpHero} font-mono text-[11px]`}
                    placeholder={ph('introVideoUrl')}
                    spellCheck={false}
                  />
                </label>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 md:p-7">
          {edit ? (
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              {tDetail('sectionFit')}
            </p>
          ) : null}
          <SectionTitle
            icon={<BadgeCheck size={20} />}
            title={content.fitTitle}
            edit={edit}
            onTitleChange={(v) => patch((p) => ({ ...p, fitTitle: v }))}
            titlePlaceholder={edit ? ph('fitTitle') : undefined}
          />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="flex flex-col gap-4">
              {edit ? (
                <input
                  value={content.fitBuyerLabel}
                  onChange={(e) => patch((p) => ({ ...p, fitBuyerLabel: e.target.value }))}
                  className={`${adminInpLight} font-bold text-[#001a41] border-l-4 border-[#1f4fa0] pl-3`}
                  placeholder={ph('fitBuyerLabel')}
                  spellCheck={false}
                />
              ) : (
                <h3 className="text-xs sm:text-sm font-bold text-[#001a41] border-l-4 border-[#1f4fa0] pl-3">
                  {content.fitBuyerLabel}
                </h3>
              )}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
                <ul className="space-y-3">
                  {content.fitBuyer.map((item, i) => (
                    <li
                      key={`fb-${i}`}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <CircleCheck size={14} className="mt-0.5 sm:mt-1 shrink-0 text-emerald-600" />
                      {edit ? (
                        <div className="flex min-w-0 flex-1 gap-1">
                          <textarea
                            value={item}
                            onChange={(e) =>
                              patch((p) => ({
                                ...p,
                                fitBuyer: p.fitBuyer.map((x, j) => (j === i ? e.target.value : x)),
                              }))
                            }
                            className={`${adminTaLight} flex-1`}
                            rows={2}
                            placeholder={ph('fitBullet')}
                            spellCheck={false}
                          />
                          <button
                            type="button"
                            className="shrink-0 self-start rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-red-600"
                            aria-label={tDetail('removeLine')}
                            onClick={() =>
                              patch((p) => ({
                                ...p,
                                fitBuyer: p.fitBuyer.filter((_, j) => j !== i),
                              }))
                            }
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="flex-1 text-justify">{item}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {edit ? (
                  <button
                    type="button"
                    onClick={() => patch((p) => ({ ...p, fitBuyer: [...p.fitBuyer, ''] }))}
                    className="mt-3 inline-flex items-center gap-1 rounded-lg border border-dashed border-slate-300 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-white"
                  >
                    <Plus size={14} />
                    {tDetail('addLine')}
                  </button>
                ) : null}
              </div>
              <div className="rounded-xl bg-gradient-to-br from-[#001a41] via-[#1b3d77] to-[#2856a3] p-4 md:p-5 text-white mt-auto">
                <p className="text-xs uppercase tracking-wider text-yellow-300 font-bold">
                  {isVi ? 'Điểm nhấn nhanh' : 'Quick highlight'}
                </p>
                {edit ? (
                  <textarea
                    value={content.fitBuyerHighlight}
                    onChange={(e) => patch((p) => ({ ...p, fitBuyerHighlight: e.target.value }))}
                    className="mt-3 w-full rounded-lg border border-white/20 bg-white/10 px-2 py-2 text-xs sm:text-sm leading-relaxed text-blue-100 placeholder:text-white/35 focus:border-yellow-300/50 focus:outline-none"
                    rows={4}
                    placeholder={ph('fitHighlight')}
                    spellCheck={false}
                  />
                ) : (
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-blue-100 text-justify">
                    {content.fitBuyerHighlight}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {edit ? (
                <input
                  value={content.fitSellerLabel}
                  onChange={(e) => patch((p) => ({ ...p, fitSellerLabel: e.target.value }))}
                  className={`${adminInpLight} font-bold text-[#001a41] border-l-4 border-[#1f4fa0] pl-3`}
                  placeholder={ph('fitSellerLabel')}
                  spellCheck={false}
                />
              ) : (
                <h3 className="text-xs sm:text-sm font-bold text-[#001a41] border-l-4 border-[#1f4fa0] pl-3">
                  {content.fitSellerLabel}
                </h3>
              )}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
                <ul className="space-y-3">
                  {content.fitSeller.map((item, i) => (
                    <li
                      key={`fs-${i}`}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <CircleCheck size={14} className="mt-0.5 sm:mt-1 shrink-0 text-emerald-600" />
                      {edit ? (
                        <div className="flex min-w-0 flex-1 gap-1">
                          <textarea
                            value={item}
                            onChange={(e) =>
                              patch((p) => ({
                                ...p,
                                fitSeller: p.fitSeller.map((x, j) =>
                                  j === i ? e.target.value : x
                                ),
                              }))
                            }
                            className={`${adminTaLight} flex-1`}
                            rows={2}
                            placeholder={ph('fitBullet')}
                            spellCheck={false}
                          />
                          <button
                            type="button"
                            className="shrink-0 self-start rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-red-600"
                            aria-label={tDetail('removeLine')}
                            onClick={() =>
                              patch((p) => ({
                                ...p,
                                fitSeller: p.fitSeller.filter((_, j) => j !== i),
                              }))
                            }
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="flex-1 text-justify">{item}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {edit ? (
                  <button
                    type="button"
                    onClick={() => patch((p) => ({ ...p, fitSeller: [...p.fitSeller, ''] }))}
                    className="mt-3 inline-flex items-center gap-1 rounded-lg border border-dashed border-slate-300 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-white"
                  >
                    <Plus size={14} />
                    {tDetail('addLine')}
                  </button>
                ) : null}
              </div>
              <div className="rounded-xl bg-gradient-to-br from-[#001a41] via-[#1b3d77] to-[#2856a3] p-4 md:p-5 text-white mt-auto">
                <p className="text-xs uppercase tracking-wider text-yellow-300 font-bold">
                  {isVi ? 'Điểm nhấn nhanh' : 'Quick highlight'}
                </p>
                {edit ? (
                  <textarea
                    value={content.fitSellerHighlight}
                    onChange={(e) => patch((p) => ({ ...p, fitSellerHighlight: e.target.value }))}
                    className="mt-3 w-full rounded-lg border border-white/20 bg-white/10 px-2 py-2 text-xs sm:text-sm leading-relaxed text-blue-100 placeholder:text-white/35 focus:border-yellow-300/50 focus:outline-none"
                    rows={4}
                    placeholder={ph('fitHighlight')}
                    spellCheck={false}
                  />
                ) : (
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-blue-100 text-justify">
                    {content.fitSellerHighlight}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 md:p-7">
          {edit ? (
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              {tDetail('sectionBenefits')}
            </p>
          ) : null}
          <SectionTitle
            icon={<HandCoins size={20} />}
            title={content.benefitsTitle}
            edit={edit}
            onTitleChange={(v) => patch((p) => ({ ...p, benefitsTitle: v }))}
            titlePlaceholder={edit ? ph('benefitsTitle') : undefined}
          />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {content.benefitGroups.map((group, gi) => (
              <article
                key={`bg-${gi}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5 hover:border-[#1f4fa0]/30 hover:shadow-md transition"
              >
                {edit ? (
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-500">
                      {tDetail('benefitGroupLabel')} {gi + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        patch((p) => ({
                          ...p,
                          benefitGroups: p.benefitGroups.filter((_, j) => j !== gi),
                        }))
                      }
                      className="rounded p-1 text-slate-400 hover:bg-white hover:text-red-600"
                      aria-label={tDetail('removeGroup')}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : null}
                {edit ? (
                  <input
                    value={group.title}
                    onChange={(e) =>
                      patch((p) => ({
                        ...p,
                        benefitGroups: p.benefitGroups.map((g, j) =>
                          j === gi ? { ...g, title: e.target.value } : g
                        ),
                      }))
                    }
                    className={`${adminInpLight} mb-2 font-bold text-[#001a41]`}
                    placeholder={ph('benefitGroupTitle')}
                    spellCheck={false}
                  />
                ) : (
                  <h3 className="text-xs sm:text-sm font-bold text-[#001a41]">{group.title}</h3>
                )}
                <ul className="mt-3 space-y-2">
                  {group.items.map((item, ii) => (
                    <li
                      key={`bgi-${gi}-${ii}`}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <CircleCheck size={14} className="mt-0.5 sm:mt-1 shrink-0 text-sky-600" />
                      {edit ? (
                        <div className="flex min-w-0 flex-1 gap-1">
                          <textarea
                            value={item}
                            onChange={(e) =>
                              patch((p) => ({
                                ...p,
                                benefitGroups: p.benefitGroups.map((g, j) =>
                                  j === gi
                                    ? {
                                        ...g,
                                        items: g.items.map((x, k) =>
                                          k === ii ? e.target.value : x
                                        ),
                                      }
                                    : g
                                ),
                              }))
                            }
                            className={`${adminTaLight} flex-1`}
                            rows={2}
                            placeholder={ph('benefitItem')}
                            spellCheck={false}
                          />
                          <button
                            type="button"
                            className="shrink-0 self-start rounded p-1 text-slate-400 hover:bg-white hover:text-red-600"
                            aria-label={tDetail('removeLine')}
                            onClick={() =>
                              patch((p) => ({
                                ...p,
                                benefitGroups: p.benefitGroups.map((g, j) =>
                                  j === gi ? { ...g, items: g.items.filter((_, k) => k !== ii) } : g
                                ),
                              }))
                            }
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="flex-1 text-justify">{item}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {edit ? (
                  <button
                    type="button"
                    onClick={() =>
                      patch((p) => ({
                        ...p,
                        benefitGroups: p.benefitGroups.map((g, j) =>
                          j === gi ? { ...g, items: [...g.items, ''] } : g
                        ),
                      }))
                    }
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#1f4fa0] hover:underline"
                  >
                    <Plus size={14} />
                    {tDetail('addLine')}
                  </button>
                ) : null}
              </article>
            ))}
          </div>
          {edit ? (
            <button
              type="button"
              onClick={() =>
                patch((p) => ({
                  ...p,
                  benefitGroups: [...p.benefitGroups, { title: '', items: [] }],
                }))
              }
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-[#1f4fa0]/40"
            >
              <Plus size={16} />
              {tDetail('addGroup')}
            </button>
          ) : null}
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 md:p-7">
          {edit ? (
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              {tDetail('sectionContext')}
            </p>
          ) : null}
          <SectionTitle
            icon={<Clock3 size={20} />}
            title={content.contextTitle}
            edit={edit}
            onTitleChange={(v) => patch((p) => ({ ...p, contextTitle: v }))}
            titlePlaceholder={edit ? ph('contextTitle') : undefined}
          />
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 space-y-3">
              {content.contextNarrative.map((item, index) => (
                <div key={`cn-${index}`} className="relative pl-6">
                  <span className="absolute left-0 top-1 inline-flex h-4 w-4 rounded-full bg-[#1f4fa0]" />
                  {index < content.contextNarrative.length - 1 ? (
                    <span className="absolute left-[7px] top-6 h-[calc(100%-12px)] w-[2px] bg-slate-200" />
                  ) : null}
                  {edit ? (
                    <div className="flex gap-1 pl-0">
                      <textarea
                        value={item}
                        onChange={(e) =>
                          patch((p) => ({
                            ...p,
                            contextNarrative: p.contextNarrative.map((x, j) =>
                              j === index ? e.target.value : x
                            ),
                          }))
                        }
                        className={adminTaLight}
                        rows={3}
                        placeholder={ph('contextNarrativeLine')}
                        spellCheck={false}
                      />
                      <button
                        type="button"
                        className="shrink-0 self-start rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                        aria-label={tDetail('removeLine')}
                        onClick={() =>
                          patch((p) => ({
                            ...p,
                            contextNarrative: p.contextNarrative.filter((_, j) => j !== index),
                          }))
                        }
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                      {item}
                    </p>
                  )}
                </div>
              ))}
              {edit ? (
                <button
                  type="button"
                  onClick={() =>
                    patch((p) => ({ ...p, contextNarrative: [...p.contextNarrative, ''] }))
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-dashed border-slate-300 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Plus size={14} />
                  {tDetail('addLine')}
                </button>
              ) : null}
            </div>
            <div className="lg:col-span-5 rounded-xl border border-rose-200 bg-rose-50 p-4 md:p-5">
              <h3 className="text-xs sm:text-sm font-bold text-rose-700 mb-3">
                {isVi ? 'Tác động thực tế' : 'Real impacts'}
              </h3>
              <ul className="space-y-2">
                {content.contextImpacts.map((item, i) => (
                  <li
                    key={`ci-${i}`}
                    className="flex items-start gap-2 text-xs sm:text-sm text-rose-900"
                  >
                    <CircleCheck size={14} className="mt-0.5 sm:mt-1 shrink-0 text-rose-600" />
                    {edit ? (
                      <div className="flex min-w-0 flex-1 gap-1">
                        <textarea
                          value={item}
                          onChange={(e) =>
                            patch((p) => ({
                              ...p,
                              contextImpacts: p.contextImpacts.map((x, j) =>
                                j === i ? e.target.value : x
                              ),
                            }))
                          }
                          className={`${adminTaLight} flex-1 border-rose-200`}
                          rows={2}
                          placeholder={ph('contextImpact')}
                          spellCheck={false}
                        />
                        <button
                          type="button"
                          className="shrink-0 self-start rounded p-1 text-rose-300 hover:bg-rose-100 hover:text-red-700"
                          aria-label={tDetail('removeLine')}
                          onClick={() =>
                            patch((p) => ({
                              ...p,
                              contextImpacts: p.contextImpacts.filter((_, j) => j !== i),
                            }))
                          }
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <span className="flex-1 text-justify">{item}</span>
                    )}
                  </li>
                ))}
              </ul>
              {edit ? (
                <button
                  type="button"
                  onClick={() =>
                    patch((p) => ({ ...p, contextImpacts: [...p.contextImpacts, ''] }))
                  }
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rose-800 hover:underline"
                >
                  <Plus size={14} />
                  {tDetail('addLine')}
                </button>
              ) : null}
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
            {edit ? (
              <textarea
                value={content.contextCoreLine}
                onChange={(e) => patch((p) => ({ ...p, contextCoreLine: e.target.value }))}
                className="w-full rounded-lg border border-indigo-200 bg-white px-2 py-2 text-xs sm:text-sm font-semibold text-indigo-800 placeholder:text-indigo-300 focus:border-indigo-400 focus:outline-none"
                rows={3}
                placeholder={ph('contextCoreLine')}
                spellCheck={false}
              />
            ) : (
              <p className="text-xs sm:text-sm font-semibold text-indigo-800 text-justify leading-relaxed">
                {content.contextCoreLine}
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 md:p-7">
          {edit ? (
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              {tDetail('sectionProcess')}
            </p>
          ) : null}
          <SectionTitle
            icon={<TrendingUp size={20} />}
            title={content.processTitle}
            edit={edit}
            onTitleChange={(v) => patch((p) => ({ ...p, processTitle: v }))}
            titlePlaceholder={edit ? ph('processTitle') : undefined}
          />
          {edit ? (
            <textarea
              value={content.processIntro}
              onChange={(e) => patch((p) => ({ ...p, processIntro: e.target.value }))}
              className={`${adminTaLight} mt-3`}
              rows={3}
              placeholder={ph('processIntro')}
              spellCheck={false}
            />
          ) : (
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              {content.processIntro}
            </p>
          )}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.processSteps.map((step, index) => (
              <div
                key={`ps-${index}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 relative overflow-hidden"
              >
                <span className="absolute -right-4 -top-4 h-14 w-14 rounded-full bg-yellow-200/40" />
                <p className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.12em] text-yellow-600">
                  {isVi ? `Bước ${index + 1}` : `Step ${index + 1}`}
                </p>
                {edit ? (
                  <div className="mt-3 flex gap-1">
                    <textarea
                      value={step}
                      onChange={(e) =>
                        patch((p) => ({
                          ...p,
                          processSteps: p.processSteps.map((x, j) =>
                            j === index ? e.target.value : x
                          ),
                        }))
                      }
                      className={`${adminTaLight} flex-1`}
                      rows={4}
                      placeholder={ph('processStep')}
                      spellCheck={false}
                    />
                    <button
                      type="button"
                      className="shrink-0 self-start rounded p-1 text-slate-400 hover:bg-white hover:text-red-600"
                      aria-label={tDetail('removeLine')}
                      onClick={() =>
                        patch((p) => ({
                          ...p,
                          processSteps: p.processSteps.filter((_, j) => j !== index),
                        }))
                      }
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                    {step}
                  </p>
                )}
              </div>
            ))}
          </div>
          {edit ? (
            <button
              type="button"
              onClick={() => patch((p) => ({ ...p, processSteps: [...p.processSteps, ''] }))}
              className="mt-3 inline-flex items-center gap-1 rounded-lg border border-dashed border-slate-300 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              <Plus size={14} />
              {tDetail('addLine')}
            </button>
          ) : null}
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 md:p-7">
          {edit ? (
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              {tDetail('sectionPartners')}
            </p>
          ) : null}
          <SectionTitle
            icon={<Building2 size={20} />}
            title={content.partnersTitle}
            edit={edit}
            onTitleChange={(v) => patch((p) => ({ ...p, partnersTitle: v }))}
            titlePlaceholder={edit ? ph('partnersTitle') : undefined}
          />
          {edit ? (
            <textarea
              value={content.partnersSubtitle}
              onChange={(e) => patch((p) => ({ ...p, partnersSubtitle: e.target.value }))}
              className={`${adminTaLight} mt-2 font-semibold text-slate-600`}
              rows={2}
              placeholder={ph('partnersSubtitle')}
              spellCheck={false}
            />
          ) : partnersSubtitleTrim ? (
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600 text-justify">
              {content.partnersSubtitle}
            </p>
          ) : null}
          {edit ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-950 via-[#001a41] to-[#14366f] shadow-[0_18px_50px_-28px_rgba(0,26,65,0.75)]">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-yellow-300">
                    {adminCopy.partnerLogosSectionTitle}
                  </p>
                  <p className="mt-1 max-w-2xl text-xs leading-relaxed text-blue-100/85">
                    {adminCopy.partnerLogosIntro}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    patch((p) => ({
                      ...p,
                      partnerLogos: [...(p.partnerLogos ?? []), { name: '', logoUrl: '' }],
                    }))
                  }
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-yellow-300/60 bg-yellow-300 px-3.5 py-2 text-xs font-black text-[#001a41] shadow-sm hover:bg-yellow-200"
                >
                  <Plus size={16} strokeWidth={2.5} />
                  {adminCopy.addPartnerLogo}
                </button>
              </div>

              {partnerLogos.length === 0 ? (
                <div className="m-4 rounded-2xl border border-dashed border-white/25 bg-white/10 px-4 py-8 text-center sm:m-5">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-yellow-300 ring-1 ring-white/15">
                    <Building2 size={24} />
                  </div>
                  <p className="mx-auto mb-4 max-w-md text-sm leading-relaxed text-blue-100">
                    {adminCopy.partnerLogosEmpty}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      patch((p) => ({ ...p, partnerLogos: [{ name: '', logoUrl: '' }] }))
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-[#001a41] shadow-sm hover:bg-blue-50"
                  >
                    <Plus size={18} />
                    {adminCopy.partnerLogosAddFirst}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
                  {partnerLogos.map((partner, index) => {
                    const rowFileId = `${partnerUploadInputPrefix}-p-${index}`;
                    const name = partner.name ?? '';
                    const logoUrl = partner.logoUrl ?? '';
                    const previewUrl = normalizePartnerLogoUrl(logoUrl);
                    const canPreview = isLikelyPartnerLogoUrl(logoUrl);
                    return (
                      <div
                        key={index}
                        className="group overflow-hidden rounded-2xl border border-white/12 bg-white shadow-[0_12px_30px_-20px_rgba(15,23,42,0.8)]"
                      >
                        <div className="flex h-28 items-center justify-center bg-[radial-gradient(circle_at_30%_10%,rgba(250,204,21,0.20),transparent_32%),linear-gradient(135deg,#f8fafc,#e2e8f0)] p-4">
                          {canPreview ? (
                            <img
                              src={previewUrl}
                              alt={name}
                              referrerPolicy="no-referrer"
                              className="max-h-20 max-w-full rounded-lg object-contain transition duration-200 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 text-slate-400">
                              <Building2 size={24} />
                            </div>
                          )}
                        </div>
                        <div className="space-y-3 p-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-600">
                              {isVi ? 'Đối tác' : 'Partner'} {index + 1}
                            </span>
                            <button
                              type="button"
                              className="shrink-0 rounded-full border border-red-100 bg-red-50 p-1.5 text-red-600 hover:bg-red-100"
                              aria-label={tDetail('removeLine')}
                              onClick={() =>
                                patch((p) => ({
                                  ...p,
                                  partnerLogos: (p.partnerLogos ?? []).filter(
                                    (_, j) => j !== index
                                  ),
                                }))
                              }
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <input
                            value={name}
                            onChange={(e) =>
                              patch((p) => ({
                                ...p,
                                partnerLogos: (p.partnerLogos ?? []).map((x, j) =>
                                  j === index ? { ...x, name: e.target.value } : x
                                ),
                              }))
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#1f4fa0] focus:outline-none focus:ring-2 focus:ring-[#1f4fa0]/20"
                            placeholder={isVi ? 'Ten doi tac' : 'Partner name'}
                            spellCheck={false}
                          />
                          <input
                            value={logoUrl}
                            onChange={(e) =>
                              patch((p) => ({
                                ...p,
                                partnerLogos: (p.partnerLogos ?? []).map((x, j) =>
                                  j === index ? { ...x, logoUrl: e.target.value } : x
                                ),
                              }))
                            }
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-800 placeholder:text-slate-400 focus:border-[#1f4fa0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f4fa0]/20"
                            placeholder={
                              adminCopy.partnerLogoUrlPlaceholder || ph('partnerLogoUrl')
                            }
                            spellCheck={false}
                          />
                          {!canPreview && logoUrl.trim() ? (
                            <p className="text-[10px] font-semibold leading-snug text-amber-700">
                              URL chưa hợp lệ. Dùng `https://...`, `/...` hoặc domain kiểu
                              `res.cloudinary.com/...`.
                            </p>
                          ) : null}
                        </div>
                        <input
                          id={rowFileId}
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          disabled={uploadingPartnerRow !== null}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setUploadingPartnerRow(index);
                            try {
                              const nextUrl = await uploadServiceImage(file, 'services/partners');
                              patch((p) => ({
                                ...p,
                                partnerLogos: (p.partnerLogos ?? []).map((x, j) =>
                                  j === index ? { ...x, logoUrl: nextUrl } : x
                                ),
                              }));
                            } catch (err) {
                              const code = err instanceof Error ? err.message : '';
                              toast.error(
                                code === 'IMAGE_TOO_LARGE'
                                  ? adminCopy.toastUploadImageTooLarge
                                  : adminCopy.toastUploadImageError
                              );
                            } finally {
                              setUploadingPartnerRow(null);
                              e.target.value = '';
                            }
                          }}
                        />
                        <label
                          htmlFor={rowFileId}
                          className={`mx-3 mb-3 inline-flex w-[calc(100%-1.5rem)] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#001a41] px-3 py-2.5 text-xs font-black text-white shadow-sm hover:bg-[#0c2860] ${uploadingPartnerRow !== null ? 'pointer-events-none opacity-60' : ''}`}
                        >
                          {uploadingPartnerRow === index ? (
                            <Loader2 size={14} className="animate-spin" aria-hidden />
                          ) : (
                            <Upload size={14} aria-hidden />
                          )}
                          {adminCopy.partnerRowUploadButton}
                        </label>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() =>
                      patch((p) => ({
                        ...p,
                        partnerLogos: [...(p.partnerLogos ?? []), { name: '', logoUrl: '' }],
                      }))
                    }
                    className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/10 px-4 py-8 text-sm font-black text-white/85 transition hover:bg-white/15"
                  >
                    <Plus size={14} />
                    {adminCopy.addPartnerLogo}
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {!edit && partnerLogoItems.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 px-4 py-7 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.08)] sm:px-8 sm:py-9">
              <ul
                className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-3 sm:gap-4"
                role="list"
                aria-label={isVi ? 'Đối tác' : 'Partners'}
              >
                {partnerLogoItems.map((partner, i) => (
                  <li
                    key={`partner-logo-${i}-${partner.logoUrl.slice(0, 56)}`}
                    className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-lg border border-slate-200/80 bg-white p-3 text-center shadow-sm"
                  >
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      referrerPolicy="no-referrer"
                      className="max-h-14 max-w-full object-contain sm:max-h-16"
                      loading="lazy"
                    />
                    {partner.name ? (
                      <span className="line-clamp-2 text-xs font-bold leading-snug text-slate-800">
                        {partner.name}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {edit ? (
            <details className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 shadow-sm">
              <summary className="cursor-pointer select-none text-xs font-black uppercase tracking-[0.14em] text-slate-700">
                {isVi ? 'Ghi chú khi chưa có logo' : 'Placeholder (no logos yet)'}
              </summary>
              <div className="mt-3">
                <textarea
                  value={content.partnersPlaceholder}
                  onChange={(e) => patch((p) => ({ ...p, partnersPlaceholder: e.target.value }))}
                  className={`${adminTaLight} w-full`}
                  rows={3}
                  placeholder={ph('partnersPlaceholder')}
                  spellCheck={false}
                />
              </div>
            </details>
          ) : showPublicPartnersPlaceholder ? (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/90 px-5 py-6 text-center sm:px-8 sm:py-7">
              <p className="mx-auto max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                {content.partnersPlaceholder}
              </p>
            </div>
          ) : null}
        </section>
      </main>

      {videoOpen ? (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={() => setVideoOpen(false)}
          role="button"
          tabIndex={-1}
        >
          <div className="mx-auto w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition"
                aria-label={isVi ? 'Đóng video' : 'Close video'}
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-black">
              {introVideo.kind === 'youtube' ? (
                <iframe
                  src={youtubeEmbedUrl(introVideo.id, true)}
                  title={content.videoPreviewLabel}
                  className="aspect-video w-full min-h-[50vh] max-h-[80vh] sm:min-h-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : introVideo.kind === 'direct' ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-contain"
                >
                  <source src={introVideo.url} />
                </video>
              ) : (
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-contain"
                >
                  <source src={FALLBACK_INTRO_WEBM} type="video/webm" />
                  <source src={FALLBACK_INTRO_MP4} type="video/mp4" />
                </video>
              )}
            </div>
            <div className="mt-2 text-center text-xs text-slate-300">
              {isVi ? 'Nhấn ra ngoài vùng video để thu nhỏ' : 'Click outside the video to close'}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  edit,
  onTitleChange,
  titlePlaceholder,
}: {
  icon: React.ReactNode;
  title: string;
  edit?: boolean;
  onTitleChange?: (v: string) => void;
  /** Gợi ý khi để trống tiêu đề section (chỉ admin) */
  titlePlaceholder?: string;
}) {
  return (
    <h2 className="flex items-start sm:items-center gap-2.5 sm:gap-3 text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] font-black uppercase tracking-[0.05em] sm:tracking-[0.06em] text-[#001a41]">
      <span className="text-[#1f4fa0] shrink-0 mt-0.5 sm:mt-0">{icon}</span>
      {edit && onTitleChange ? (
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent font-black uppercase tracking-[0.05em] sm:tracking-[0.06em] text-[#001a41] placeholder:text-slate-400 focus:outline-none focus:ring-0 border-b border-dashed border-slate-300 focus:border-[#1f4fa0]"
          placeholder={titlePlaceholder ?? '…'}
          spellCheck={false}
        />
      ) : (
        <span className="leading-snug min-w-0">{title}</span>
      )}
    </h2>
  );
}
