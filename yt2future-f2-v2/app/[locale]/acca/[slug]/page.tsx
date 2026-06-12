import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ServiceDetailView from '@/components/services/ServiceDetailView';
import { getPartnerLogoItemsFromLogos } from '@/features/services/partnerLogosDisplay';
import { pickDetailPresentation, pickListCard } from '@/features/services/pickServiceLocale';
import type { ServiceDetailRecord } from '@/features/services/types';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';
import { STATIC_ACCA_COURSES } from '@/features/acca/staticAccaData';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'investment_page' });
  const fallbackTitle = t('title');

  // Check static ACCA courses first
  const staticCourse = STATIC_ACCA_COURSES.find((c) => c.slug === slug);
  if (staticCourse) {
    const { title, excerpt } = pickListCard(locale, staticCourse);
    return {
      title,
      description: excerpt,
      alternates: {
        languages: buildLanguageAlternates(`/acca/${slug}`),
      },
      openGraph: {
        title,
        description: excerpt,
        url: absoluteUrl(locale, `/acca/${slug}`),
      },
      twitter: { title, description: excerpt },
    };
  }

  return { title: fallbackTitle };
}

export default async function AccaCourseDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  // Find static ACCA course
  const course = STATIC_ACCA_COURSES.find((c) => c.slug === slug);
  if (!course) {
    notFound();
  }

  const { content, uiLang } = pickDetailPresentation(locale, course);
  const { title: headerTitle } = pickListCard(locale, course);
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
