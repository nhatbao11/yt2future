import { getTranslations } from 'next-intl/server';
import ClientImpactPageClient from './ClientImpactPageClient';
import type { Metadata } from 'next';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'client_impact_page' });

  const title = t('title');
  const description = t('hero_subtitle');

  return {
    title,
    description,
    alternates: {
      languages: buildLanguageAlternates('/client-impact'),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, '/client-impact'),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function ClientImpactPage() {
  return <ClientImpactPageClient />;
}
