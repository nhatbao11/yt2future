'use client';

import React from 'react';
import type { SectionContent } from '@/features/services/types';

const input =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/25';
const textarea = `${input} py-2.5 leading-relaxed`;
const label = 'text-xs font-bold uppercase tracking-wide text-slate-700';
const btn =
  'rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-semibold text-gray-800 hover:bg-gray-50';
const btnDanger =
  'rounded-md border border-red-200 bg-white px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-50';

type TDetail = (key: string) => string;

function updateAt<T>(arr: T[], i: number, v: T): T[] {
  const next = [...arr];
  next[i] = v;
  return next;
}

function StringListEditor({
  items,
  onChange,
  rows = 2,
  t,
}: {
  items: string[];
  onChange: (next: string[]) => void;
  rows?: number;
  t: TDetail;
}) {
  return (
    <div className="space-y-2">
      {items.map((line, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            value={line}
            onChange={(e) => onChange(updateAt(items, i, e.target.value))}
            rows={rows}
            className={textarea}
          />
          <button
            type="button"
            className={btnDanger}
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            {t('removeLine')}
          </button>
        </div>
      ))}
      <button type="button" className={btn} onClick={() => onChange([...items, ''])}>
        {t('addLine')}
      </button>
    </div>
  );
}

function Field({
  id,
  labelText,
  value,
  onChange,
  multiline,
  rows = 3,
}: {
  id: string;
  labelText: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={`${label} block`}>
        {labelText}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={textarea}
        />
      ) : (
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} className={input} />
      )}
    </div>
  );
}

function Section({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm open:shadow-md"
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className="cursor-pointer select-none text-sm font-bold text-[#001a41]">
        {title}
      </summary>
      <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">{children}</div>
    </details>
  );
}

type Props = {
  idPrefix: string;
  value: SectionContent;
  onChange: (next: SectionContent) => void;
  t: TDetail;
};

export default function ServiceSectionContentForm({ idPrefix, value: c, onChange, t }: Props) {
  const p = (suffix: string) => `${idPrefix}-${suffix}`;

  const patch = (partial: Partial<SectionContent>) => onChange({ ...c, ...partial });

  return (
    <div className="space-y-3">
      <Section title={t('sectionHero')} defaultOpen>
        <Field
          id={p('heroTag')}
          labelText={t('heroTag')}
          value={c.heroTag}
          onChange={(heroTag) => patch({ heroTag })}
        />
        <Field
          id={p('heroTitle')}
          labelText={t('heroTitle')}
          value={c.heroTitle}
          onChange={(heroTitle) => patch({ heroTitle })}
        />
        <Field
          id={p('heroDescription')}
          labelText={t('heroDescription')}
          value={c.heroDescription}
          onChange={(heroDescription) => patch({ heroDescription })}
          multiline
          rows={4}
        />
        <div className="space-y-1">
          <span className={label}>{t('heroStats')}</span>
          <StringListEditor
            items={c.heroStats}
            onChange={(heroStats) => patch({ heroStats })}
            t={t}
            rows={2}
          />
        </div>
      </Section>

      <Section title={t('sectionContext')}>
        <Field
          id={p('contextTitle')}
          labelText={t('contextTitle')}
          value={c.contextTitle}
          onChange={(contextTitle) => patch({ contextTitle })}
        />
        <div className="space-y-1">
          <span className={label}>{t('contextNarrative')}</span>
          <StringListEditor
            items={c.contextNarrative}
            onChange={(contextNarrative) => patch({ contextNarrative })}
            t={t}
            rows={3}
          />
        </div>
        <div className="space-y-1">
          <span className={label}>{t('contextImpacts')}</span>
          <StringListEditor
            items={c.contextImpacts}
            onChange={(contextImpacts) => patch({ contextImpacts })}
            t={t}
            rows={2}
          />
        </div>
        <Field
          id={p('contextCoreLine')}
          labelText={t('contextCoreLine')}
          value={c.contextCoreLine}
          onChange={(contextCoreLine) => patch({ contextCoreLine })}
          multiline
          rows={3}
        />
      </Section>

      <Section title={t('sectionFit')}>
        <Field
          id={p('fitTitle')}
          labelText={t('fitTitle')}
          value={c.fitTitle}
          onChange={(fitTitle) => patch({ fitTitle })}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id={p('fitSellerLabel')}
            labelText={t('fitSellerLabel')}
            value={c.fitSellerLabel}
            onChange={(fitSellerLabel) => patch({ fitSellerLabel })}
          />
          <Field
            id={p('fitBuyerLabel')}
            labelText={t('fitBuyerLabel')}
            value={c.fitBuyerLabel}
            onChange={(fitBuyerLabel) => patch({ fitBuyerLabel })}
          />
        </div>
        <div className="space-y-1">
          <span className={label}>{t('fitSeller')}</span>
          <StringListEditor
            items={c.fitSeller}
            onChange={(fitSeller) => patch({ fitSeller })}
            t={t}
            rows={2}
          />
        </div>
        <div className="space-y-1">
          <span className={label}>{t('fitBuyer')}</span>
          <StringListEditor
            items={c.fitBuyer}
            onChange={(fitBuyer) => patch({ fitBuyer })}
            t={t}
            rows={2}
          />
        </div>
        <Field
          id={p('fitSellerHighlight')}
          labelText={t('fitSellerHighlight')}
          value={c.fitSellerHighlight}
          onChange={(fitSellerHighlight) => patch({ fitSellerHighlight })}
          multiline
          rows={3}
        />
        <Field
          id={p('fitBuyerHighlight')}
          labelText={t('fitBuyerHighlight')}
          value={c.fitBuyerHighlight}
          onChange={(fitBuyerHighlight) => patch({ fitBuyerHighlight })}
          multiline
          rows={3}
        />
      </Section>

      <Section title={t('sectionBenefits')}>
        <Field
          id={p('benefitsTitle')}
          labelText={t('benefitsTitle')}
          value={c.benefitsTitle}
          onChange={(benefitsTitle) => patch({ benefitsTitle })}
        />
        <div className="space-y-4">
          {c.benefitGroups.map((g, gi) => (
            <div key={gi} className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-gray-700">
                  {t('benefitGroupLabel')} {gi + 1}
                </span>
                <button
                  type="button"
                  className={btnDanger}
                  onClick={() =>
                    patch({ benefitGroups: c.benefitGroups.filter((_, j) => j !== gi) })
                  }
                >
                  {t('removeGroup')}
                </button>
              </div>
              <Field
                id={p(`bg-${gi}-title`)}
                labelText={t('benefitGroupTitle')}
                value={g.title}
                onChange={(title) =>
                  patch({
                    benefitGroups: c.benefitGroups.map((x, j) => (j === gi ? { ...x, title } : x)),
                  })
                }
              />
              <div className="space-y-1">
                <span className={label}>{t('benefitGroupItems')}</span>
                <StringListEditor
                  items={g.items}
                  onChange={(items) =>
                    patch({
                      benefitGroups: c.benefitGroups.map((x, j) =>
                        j === gi ? { ...x, items } : x
                      ),
                    })
                  }
                  t={t}
                  rows={2}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className={btn}
            onClick={() => patch({ benefitGroups: [...c.benefitGroups, { title: '', items: [] }] })}
          >
            {t('addGroup')}
          </button>
        </div>
      </Section>

      <Section title={t('sectionProcess')}>
        <Field
          id={p('processTitle')}
          labelText={t('processTitle')}
          value={c.processTitle}
          onChange={(processTitle) => patch({ processTitle })}
        />
        <Field
          id={p('processIntro')}
          labelText={t('processIntro')}
          value={c.processIntro}
          onChange={(processIntro) => patch({ processIntro })}
          multiline
          rows={3}
        />
        <div className="space-y-1">
          <span className={label}>{t('processSteps')}</span>
          <StringListEditor
            items={c.processSteps}
            onChange={(processSteps) => patch({ processSteps })}
            t={t}
            rows={3}
          />
        </div>
      </Section>

      <Section title={t('sectionPartners')}>
        <Field
          id={p('partnersTitle')}
          labelText={t('partnersTitle')}
          value={c.partnersTitle}
          onChange={(partnersTitle) => patch({ partnersTitle })}
        />
        <Field
          id={p('partnersSubtitle')}
          labelText={t('partnersSubtitle')}
          value={c.partnersSubtitle}
          onChange={(partnersSubtitle) => patch({ partnersSubtitle })}
        />
        <Field
          id={p('partnersPlaceholder')}
          labelText={t('partnersPlaceholder')}
          value={c.partnersPlaceholder}
          onChange={(partnersPlaceholder) => patch({ partnersPlaceholder })}
          multiline
          rows={2}
        />
      </Section>

      <Section title={t('sectionVideo')}>
        <Field
          id={p('introVideoUrl')}
          labelText={t('introVideoUrl')}
          value={c.introVideoUrl}
          onChange={(introVideoUrl) => patch({ introVideoUrl })}
        />
        <Field
          id={p('videoPreviewLabel')}
          labelText={t('videoPreviewLabel')}
          value={c.videoPreviewLabel}
          onChange={(videoPreviewLabel) => patch({ videoPreviewLabel })}
        />
        <Field
          id={p('videoPreviewHint')}
          labelText={t('videoPreviewHint')}
          value={c.videoPreviewHint}
          onChange={(videoPreviewHint) => patch({ videoPreviewHint })}
          multiline
          rows={2}
        />
      </Section>
    </div>
  );
}
