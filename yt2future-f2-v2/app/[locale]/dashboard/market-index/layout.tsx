import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

/** Cùng nội dung với /dashboard — gộp chỉ mục về một URL chuẩn. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: absoluteUrl(locale, '/dashboard'),
    },
    robots: { index: false, follow: true },
  };
}

export default function MarketIndexSegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
