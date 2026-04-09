import { getTranslations } from 'next-intl/server';
import InvestmentPageClient from '../investment/InvestmentPageClient';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'investment_page' });

  const title = t('title') + ' | YT2Future';
  const description =
    locale === 'vi'
      ? 'Giải pháp sản phẩm dịch vụ tài trợ thương mại dành cho doanh nghiệp tại YT2Future.'
      : 'Trade-finance products and service solutions for enterprises at YT2Future.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function ServicesPage() {
  return <InvestmentPageClient />;
}
