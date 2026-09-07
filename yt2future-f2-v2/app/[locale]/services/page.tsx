import { getTranslations } from 'next-intl/server';
import ServicesListClient from './ServicesListClient';
import type { Metadata } from 'next';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services_page' });

  const title = t('pageTitle');
  const description = t('heroDescription');

  return {
    title,
    description,
    alternates: {
      languages: buildLanguageAlternates('/services'),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, '/services'),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function ServicesPage() {
  return <ServicesListClient />;
}
