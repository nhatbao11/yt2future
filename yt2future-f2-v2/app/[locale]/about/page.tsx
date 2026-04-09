import { getTranslations } from 'next-intl/server';
import AboutPageClient from './AboutPageClient';
import type { Metadata } from 'next';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const title = t('pageTitle');
  const description = t('tagline') + '. ' + t('headline');

  return {
    title,
    description,
    alternates: {
      languages: buildLanguageAlternates('/about'),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, '/about'),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
