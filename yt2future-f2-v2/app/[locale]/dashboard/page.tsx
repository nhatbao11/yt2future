import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { absoluteUrl, buildLanguageAlternates } from '@/lib/seo';
import MarketIndexDashboard from './market-index/page';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dashboard' });
  const title = t('title');
  const description =
    locale === 'vi'
      ? 'Theo dõi VN-Index, VN30 và hợp đồng tương lai VN30F1M: biểu đồ, dữ liệu lịch sử và chỉ số thị trường Việt Nam.'
      : 'Track VN-Index, VN30 and VN30F1M: charts and Vietnamese equity index data.';

  return {
    title,
    description,
    alternates: {
      languages: buildLanguageAlternates('/dashboard'),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, '/dashboard'),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function DashboardPage() {
  return <MarketIndexDashboard />;
}
