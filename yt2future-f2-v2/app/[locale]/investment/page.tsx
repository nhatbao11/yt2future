import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'investment_page' });

  const title = t('title');
  const description =
    locale === 'vi'
      ? 'Danh mục sản phẩm dịch vụ tài chính dành cho doanh nghiệp tại YT2Future.'
      : 'Enterprise financial products and service offerings at YT2Future.';

  return {
    title,
    description,
    robots: { index: false, follow: true },
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

export default async function InvestmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/services`);
}
