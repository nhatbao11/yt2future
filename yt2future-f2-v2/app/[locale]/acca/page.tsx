import AccaPageClient from './AccaPageClient';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'vi' ? 'Đào tạo ACCA thực chiến' : 'ACCA Professional Training';
  const description =
    locale === 'vi'
      ? 'Chương trình đào tạo ACCA thực chiến chất lượng cao tại YT Insight. Học chủ động cùng chuyên gia Big 4.'
      : 'High-quality ACCA practical training programs at YT Insight. Learn actively with Big 4 experts.';

  return {
    title,
    description,
    alternates: {
      languages: buildLanguageAlternates('/acca'),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, '/acca'),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function AccaPage() {
  return <AccaPageClient />;
}
