import { getTranslations } from 'next-intl/server';
import HomePageClient from './HomePageClient';
import type { Metadata } from 'next';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const ts = await getTranslations({ locale, namespace: 'seo' });
  const description = t('about.desc1').replace(/\s+/g, ' ').trim().slice(0, 160);

  const documentTitle = ts('defaultTitle');

  return {
    title: { absolute: documentTitle },
    description,
    alternates: {
      languages: buildLanguageAlternates(''),
    },
    openGraph: {
      title: documentTitle,
      description,
      url: absoluteUrl(locale, ''),
    },
    twitter: {
      title: documentTitle,
      description,
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}
