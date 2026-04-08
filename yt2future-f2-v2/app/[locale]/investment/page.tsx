import { getTranslations } from 'next-intl/server';
import InvestmentPageClient from './InvestmentPageClient';
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
      ? 'Danh mục sản phẩm dịch vụ tài chính dành cho doanh nghiệp tại YT2Future.'
      : 'Enterprise financial products and service offerings at YT2Future.';

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

export default function InvestmentPage() {
  return <InvestmentPageClient />;
}
