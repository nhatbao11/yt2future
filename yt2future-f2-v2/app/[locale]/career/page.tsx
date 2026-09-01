import { getTranslations } from 'next-intl/server';
import CareerPageClient from './CareerPageClient';
import type { Metadata } from 'next';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'career_page' });

  const title = t('title');
  const description = t('hero_subtitle');

  return {
    title,
    description,
    alternates: {
      languages: buildLanguageAlternates('/career'),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, '/career'),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function CareerPage() {
  return <CareerPageClient />;
}
