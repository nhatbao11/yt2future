'use client';

import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { serviceApi } from '@/features/services/api/serviceApi';
import { ServiceCatalogCard } from '@/features/services/ServiceCatalogCard';
import { pickCatalogPillsForCard, pickListCard } from '@/features/services/pickServiceLocale';
import type { ServiceListItem } from '@/features/services/types';

const listContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.03 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 32 },
  },
};

export default function ServicesListClient() {
  const t = useTranslations('investment_page');
  const tList = useTranslations('services_list');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [items, setItems] = useState<ServiceListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    serviceApi
      .listPublished()
      .then((res) => {
        if (!cancelled) setItems(res.services ?? []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const shell = (bodyClass: string, body: React.ReactNode) => (
    <div className={`flex min-h-screen flex-col ${bodyClass}`}>
      <PageHeader title={t('title')} />
      {body}
    </div>
  );

  if (loading) {
    return shell(
      'bg-[#f4f7ff]',
      <div className="flex grow flex-col items-center justify-center gap-4 py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#001a41] border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">{tList('loading')}</p>
      </div>
    );
  }

  if (error) {
    return shell(
      'bg-[#f4f7ff]',
      <div className="flex grow items-center justify-center px-4 py-24">
        <p className="max-w-lg text-center text-sm font-medium leading-relaxed text-red-800">
          {tList('loadError')}
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return shell(
      'bg-[#f4f7ff]',
      <main className="mx-auto max-w-360 grow px-6 py-20 text-center md:px-12">
        <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-slate-700 md:text-base">
          {tList('empty')}
        </p>
      </main>
    );
  }

  const cardLabels = {
    eyebrow: tList('cardEyebrow'),
    lead: tList('cardLeadLabel'),
    outline: tList('cardOutlineLabel'),
    cta: tList('cardCta'),
    teaserHint: tList('cardTeaserHint'),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7ff]">
      <PageHeader title={t('title')} />

      <main className="mx-auto w-full max-w-360 grow px-3 pb-10 pt-6 sm:px-5 sm:pb-12 sm:pt-8 md:px-8 md:pb-14 md:pt-10">
        <header className="flex justify-center px-2 pb-8 sm:pb-10 md:pb-12">
          <p id="services-catalog-lead" className="sr-only">
            {tList('intro')}
          </p>
          <h1 className="sr-only" aria-describedby="services-catalog-lead">
            {tList('sectionTitle')}
          </h1>
          <span className="inline-flex max-w-full items-center gap-3 rounded-full border border-yellow-400/45 bg-gradient-to-r from-[#001a41] via-[#0c2860] to-[#13356f] px-7 py-3.5 text-center text-[11px] font-extrabold uppercase tracking-[0.22em] text-yellow-300 shadow-[0_10px_36px_-8px_rgba(0,26,65,0.55)] ring-1 ring-inset ring-white/10 sm:gap-3.5 sm:px-9 sm:py-4 sm:text-xs sm:tracking-[0.26em] md:px-10 md:py-[1.125rem]">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_14px_3px_rgba(250,204,21,0.65)] ring-2 ring-yellow-200/50"
              aria-hidden
            />
            <span className="leading-snug">{tList('heroEyebrow')}</span>
          </span>
        </header>

        <motion.ul
          variants={reduceMotion ? undefined : listContainer}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? false : 'show'}
          className="mx-auto flex w-full max-w-[min(100%,92rem)] flex-wrap justify-center gap-5 sm:gap-6 md:gap-7"
        >
          {items.map((svc) => {
            const { title, excerpt } = pickListCard(locale, svc);
            const displayTitle = title.trim() || svc.slug;
            const mediaUrl = svc.listImageUrl?.trim();
            const catalogPills = pickCatalogPillsForCard(locale, svc);

            return (
              <motion.li
                key={svc.id}
                variants={reduceMotion ? undefined : listItem}
                className="box-border flex w-full justify-center sm:w-[23rem] sm:max-w-[23rem] sm:flex-none"
              >
                <ServiceCatalogCard
                  mode="public"
                  href={`/${locale}/services/${svc.slug}`}
                  labels={cardLabels}
                  title={displayTitle}
                  excerpt={excerpt}
                  imageUrl={mediaUrl}
                  catalogPills={catalogPills}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </main>
    </div>
  );
}
