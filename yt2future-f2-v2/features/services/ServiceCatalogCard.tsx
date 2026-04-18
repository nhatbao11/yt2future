'use client';

import React, { useId, useState } from 'react';
import Link from '@/components/common/Link';
import { ArrowUpRight, Loader2, Upload } from 'lucide-react';

/** Kích thước / bố cục trùng thẻ catalog trên `/services` */
export const SERVICE_CATALOG_CARD_CLASS =
  'flex h-full min-h-[28rem] w-full max-w-[23rem] flex-col overflow-hidden sm:min-h-[31rem]';

export type ServiceCatalogCardLabels = {
  eyebrow: string;
  lead: string;
  outline: string;
  cta: string;
  teaserHint?: string;
  /** Chỉ dùng ở `mode: "edit"`: placeholder khi chưa có URL ảnh */
  emptyCardImageEditHint?: string;
  /** Chỉ `mode: "edit"`: gợi ý nội dung */
  titlePlaceholder?: string;
  excerptPlaceholder?: string;
  /** Chỉ `mode: "edit"`: placeholder từng dòng pill (tối đa 3) */
  pillLinePlaceholder?: string;
  imageUrlPlaceholder?: string;
  /** Chỉnh ảnh thẻ: nút tải lên Cloudinary */
  imageUploadButton?: string;
  imageUrlOrUploadHint?: string;
};

type PublicProps = {
  mode: 'public';
  href: string;
  labels: ServiceCatalogCardLabels;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  /** Tối đa 3 chuỗi hiển thị dạng pill (cùng một bộ cho mọi locale). */
  catalogPills: string[];
};

type EditProps = {
  mode: 'edit';
  labels: ServiceCatalogCardLabels;
  title: string;
  excerpt: string;
  imageUrl: string;
  /** Luôn 3 ô (có thể rỗng); lưu DB sau khi trim và lọc rỗng. */
  catalogPills: string[];
  onCatalogPillsChange: (next: string[]) => void;
  onTitleChange: (v: string) => void;
  onExcerptChange: (v: string) => void;
  onImageUrlChange: (v: string) => void;
  /** Tải file ảnh → Cloudinary → trả về URL lưu DB */
  onCardImageUpload?: (file: File) => Promise<string>;
};

export type ServiceCatalogCardProps = PublicProps | EditProps;

function CardChrome({
  children,
  footer,
  outerClassName,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
  outerClassName: string;
}) {
  return (
    <div
      className={`${SERVICE_CATALOG_CARD_CLASS} relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_32px_-12px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/[0.05] ${outerClassName}`}
    >
      <div
        className="h-1 w-full shrink-0 bg-gradient-to-r from-amber-400 via-slate-500 to-slate-800"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-slate-400/[0.12] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-amber-400/[0.09] blur-2xl"
        aria-hidden
      />
      {children}
      {footer}
    </div>
  );
}

function ExcerptBlock({
  excerpt,
  edit,
}: {
  excerpt: string;
  edit?: { onChange: (v: string) => void; placeholder?: string };
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/85 bg-gradient-to-br from-white via-stone-50/90 to-slate-100/80 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:px-4 sm:py-3.5">
      <div
        className="absolute bottom-3 left-0 top-3 w-1 rounded-full bg-gradient-to-b from-amber-400 to-slate-700"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-1 top-0 font-serif text-5xl leading-none text-slate-900/[0.08]"
        aria-hidden
      >
        {'\u201c'}
      </span>
      {edit ? (
        <textarea
          value={excerpt}
          onChange={(e) => edit.onChange(e.target.value)}
          rows={6}
          placeholder={edit.placeholder}
          className="relative z-[1] min-h-[7.5rem] w-full resize-y bg-transparent pl-2.5 text-justify text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          spellCheck={false}
        />
      ) : (
        <p className="relative pl-2.5 text-justify text-sm leading-relaxed text-slate-600">
          <span className="line-clamp-[12] sm:line-clamp-[15]">{excerpt}</span>
        </p>
      )}
    </div>
  );
}

const PILL_CLASS =
  'w-full min-w-0 rounded-full border border-white/15 bg-gradient-to-r from-[#001029] via-[#001a41] to-[#0c2860] px-3 py-2 text-center text-[11px] font-medium leading-snug text-white shadow-sm ring-1 ring-inset ring-white/10 sm:text-xs';

function CatalogPillsStrip({
  ariaLabel,
  pills,
  edit,
}: {
  ariaLabel: string;
  pills: string[];
  edit?: {
    onChange: (next: string[]) => void;
    linePlaceholder?: string;
  };
}) {
  const slots = edit ? ([0, 1, 2] as const).map((i) => pills[i] ?? '') : [];
  const display = edit
    ? []
    : pills
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3);

  if (!edit && display.length === 0) return null;

  return (
    <div className="mt-3 border-t border-slate-200/80 pt-3">
      <div className="rounded-xl bg-white px-0 py-1" role="group" aria-label={ariaLabel}>
        {edit ? (
          <div className="flex flex-col gap-2">
            {slots.map((line, idx) => (
              <input
                key={idx}
                type="text"
                value={line}
                onChange={(e) => {
                  const next = [...slots];
                  next[idx] = e.target.value;
                  edit.onChange(next);
                }}
                className={`${PILL_CLASS} caret-white placeholder:text-white/45 focus:border-white/35 focus:outline-none focus:ring-2 focus:ring-white/25`}
                placeholder={edit.linePlaceholder ?? '…'}
                spellCheck={false}
              />
            ))}
          </div>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {display.map((line, idx) => (
              <li key={`${idx}-${line.slice(0, 40)}`} className={PILL_CLASS} title={line}>
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MediaStrip({
  imageUrl,
  displayTitle,
  edit,
  emptyEditHint,
}: {
  imageUrl?: string | null;
  displayTitle: string;
  edit?: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    onUploadFile?: (file: File) => Promise<string>;
    uploadButtonLabel?: string;
    urlHint?: string;
  };
  emptyEditHint?: string;
}) {
  const fileInputId = useId();
  const [uploading, setUploading] = useState(false);

  if (edit) {
    const url = edit.value.trim();
    return (
      <div className="shrink-0 space-y-1.5 px-5 sm:px-6">
        <div className="relative h-[6.75rem] overflow-hidden rounded-xl ring-1 ring-slate-200/70 sm:h-28">
          {url ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- URL tùy ý */}
              <img
                src={url}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/25 to-transparent" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100 px-2 text-center text-[10px] font-medium text-slate-500">
              {emptyEditHint ?? '—'}
            </div>
          )}
        </div>
        {edit.onUploadFile ? (
          <div className="flex flex-wrap items-center gap-2">
            <input
              id={fileInputId}
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file || !edit.onUploadFile) return;
                setUploading(true);
                try {
                  const nextUrl = await edit.onUploadFile(file);
                  edit.onChange(nextUrl);
                } finally {
                  setUploading(false);
                  e.target.value = '';
                }
              }}
            />
            <label
              htmlFor={fileInputId}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#001a41] bg-white px-2.5 py-1 text-[11px] font-bold text-[#001a41] hover:bg-slate-50 ${uploading ? 'pointer-events-none opacity-60' : ''}`}
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {edit.uploadButtonLabel ?? 'Upload'}
            </label>
          </div>
        ) : null}
        {edit.urlHint ? (
          <p className="text-[10px] leading-snug text-slate-500">{edit.urlHint}</p>
        ) : null}
        <input
          type="text"
          value={edit.value}
          onChange={(e) => edit.onChange(e.target.value)}
          className="w-full rounded-lg border border-dashed border-slate-300 bg-white px-2 py-1.5 font-mono text-[11px] text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-400/40"
          placeholder={edit.placeholder ?? 'https://…'}
          spellCheck={false}
        />
      </div>
    );
  }
  const url = imageUrl?.trim();
  if (!url) return null;
  return (
    <div className="shrink-0 px-5 sm:px-6">
      <div className="relative h-[6.75rem] overflow-hidden rounded-xl ring-1 ring-slate-200/70 sm:h-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={displayTitle}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/25 to-transparent" />
      </div>
    </div>
  );
}

export function ServiceCatalogCard(props: ServiceCatalogCardProps) {
  const labels = props.labels;
  const footerBar = (
    <div className="mt-auto flex shrink-0 items-center justify-center gap-2 border-t border-slate-200/80 bg-gradient-to-r from-[#001029] via-[#001a41] to-[#0c2860] px-5 py-3.5 text-white ring-1 ring-inset ring-white/10 sm:px-6">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-yellow-300/95">
        {labels.cta}
      </span>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-yellow-400" strokeWidth={2.25} aria-hidden />
    </div>
  );

  const body = (
    <>
      <div className="relative shrink-0 bg-gradient-to-b from-stone-50/90 via-white to-white px-5 pb-3 pt-5 text-center sm:px-6 sm:pb-4 sm:pt-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
          {labels.eyebrow}
        </p>
        {props.mode === 'public' ? (
          <h3 className="mx-auto mt-2 max-w-[19rem] text-pretty text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
            {props.title}
          </h3>
        ) : (
          <input
            value={props.title}
            onChange={(e) => props.onTitleChange(e.target.value)}
            className="mx-auto mt-2 block w-full max-w-[19rem] bg-transparent text-center text-xl font-bold leading-tight text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:text-2xl"
            placeholder={labels.titlePlaceholder ?? '…'}
            spellCheck={false}
          />
        )}
      </div>

      <MediaStrip
        imageUrl={props.mode === 'public' ? props.imageUrl : undefined}
        displayTitle={props.title}
        edit={
          props.mode === 'edit'
            ? {
                value: props.imageUrl,
                onChange: props.onImageUrlChange,
                placeholder: labels.imageUrlPlaceholder,
                onUploadFile: props.onCardImageUpload,
                uploadButtonLabel: labels.imageUploadButton,
                urlHint: labels.imageUrlOrUploadHint,
              }
            : undefined
        }
        emptyEditHint={props.mode === 'edit' ? labels.emptyCardImageEditHint : undefined}
      />

      <div className="relative flex min-h-0 flex-1 flex-col px-5 pb-2 pt-3 sm:px-6 sm:pt-4">
        {labels.teaserHint ? <p className="sr-only">{labels.teaserHint}</p> : null}
        <p className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {labels.lead}
        </p>
        <ExcerptBlock
          excerpt={props.excerpt}
          edit={
            props.mode === 'edit'
              ? { onChange: props.onExcerptChange, placeholder: labels.excerptPlaceholder }
              : undefined
          }
        />
        <CatalogPillsStrip
          ariaLabel={labels.outline}
          pills={props.catalogPills}
          edit={
            props.mode === 'edit'
              ? {
                  onChange: props.onCatalogPillsChange,
                  linePlaceholder: labels.pillLinePlaceholder,
                }
              : undefined
          }
        />
      </div>
    </>
  );

  if (props.mode === 'public') {
    return (
      <Link
        href={props.href}
        className={`group outline-none transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_22px_48px_-14px_rgba(15,23,42,0.14)] focus-visible:ring-2 focus-visible:ring-slate-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f7ff]`}
      >
        <CardChrome footer={footerBar} outerClassName="">
          {body}
        </CardChrome>
      </Link>
    );
  }

  return (
    <CardChrome
      footer={footerBar}
      outerClassName="ring-2 ring-amber-200/50 ring-offset-2 ring-offset-amber-50/30"
    >
      {body}
    </CardChrome>
  );
}
