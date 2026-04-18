import { getTranslations } from 'next-intl/server';
import ServicesListClient from './ServicesListClient';
import type { Metadata } from 'next';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'investment_page' });
  const tList = await getTranslations({ locale, namespace: 'services_list' });

  const title = t('title');
  const description = tList('metaDescription');

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
