import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ServiceDetailView from '@/components/services/ServiceDetailView';
import { getPartnerLogoItemsFromLogos } from '@/features/services/partnerLogosDisplay';
import { pickDetailPresentation, pickListCard } from '@/features/services/pickServiceLocale';
import type { ServiceDetailRecord } from '@/features/services/types';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';
import { getServerPublicApiBase } from '@/lib/serverPublicApi';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'investment_page' });
  const fallbackTitle = t('title');

  try {
    const base = getServerPublicApiBase();
    const res = await fetch(`${base}/services/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return { title: fallbackTitle };
    }
    const data = (await res.json()) as { success?: boolean; service?: ServiceDetailRecord };
    if (!data.success || !data.service) {
      return { title: fallbackTitle };
    }
    const { title, excerpt } = pickListCard(locale, data.service);
    return {
      title,
      description: excerpt,
      alternates: {
        languages: buildLanguageAlternates(`/services/${slug}`),
      },
      openGraph: {
        title,
        description: excerpt,
        url: absoluteUrl(locale, `/services/${slug}`),
      },
      twitter: { title, description: excerpt },
    };
  } catch {
    return { title: fallbackTitle };
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const base = getServerPublicApiBase();
  const res = await fetch(`${base}/services/${encodeURIComponent(slug)}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    notFound();
  }
  const data = (await res.json()) as { success?: boolean; service?: ServiceDetailRecord };
  if (!data.success || !data.service) {
    notFound();
  }
  const service = data.service;
  const { content, uiLang } = pickDetailPresentation(locale, service);
  const { title: headerTitle } = pickListCard(locale, service);
  /** Cùng logic với trang client — truyền snapshot để tránh hydration mismatch (HTML cache / khác trim). */
  const publicPartnerLogos = getPartnerLogoItemsFromLogos(content.partnerLogos);
  const publicPartnersPlaceholderVisible = Boolean(content.partnersPlaceholder?.trim());

  return (
    <ServiceDetailView
      pageHeaderTitle={headerTitle}
      content={content}
      uiLang={uiLang}
      publicPartnerLogos={publicPartnerLogos}
      publicPartnersPlaceholderVisible={publicPartnersPlaceholderVisible}
    />
  );
}
