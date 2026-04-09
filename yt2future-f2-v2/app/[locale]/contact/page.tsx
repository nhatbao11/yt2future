import { getTranslations } from 'next-intl/server';
import ContactPageClient from './ContactPageClient';
import type { Metadata } from 'next';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const title = t('pageTitle');
  const description = t('getInTouch') + ' ' + t('getInTouchHighlight') + '. ' + t('desc');

  return {
    title,
    description,
    alternates: {
      languages: buildLanguageAlternates('/contact'),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, '/contact'),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
