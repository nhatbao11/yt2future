import { getTranslations } from 'next-intl/server';
import SectorPageClient from './SectorPageClient';
import type { Metadata } from 'next';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sector_page' });

  const title = t('title');
  const description = t('metaDescription');

  return {
    title,
    description,
    alternates: {
      languages: buildLanguageAlternates('/sector'),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, '/sector'),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function SectorPage() {
  return <SectorPageClient />;
}
