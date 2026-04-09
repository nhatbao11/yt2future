import Image from 'next/image';
import SigninPageClient from './SigninPageClient';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });
  const title = t('signIn.title');
  const description =
    locale === 'vi'
      ? 'Đăng nhập tài khoản YT2Future để truy cập báo cáo và tính năng dành cho thành viên.'
      : 'Sign in to your YT2Future account for reports and member features.';
  return {
    title,
    description,
    robots: { index: false, follow: true },
  };
}

export default async function SigninPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string; logout?: string }>;
}) {
  const { error: errorMessage } = await searchParams;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 font-sans">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bgSign.jpg"
          alt="Signin background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 bg-white p-6 md:p-10 rounded-lg shadow-2xl w-full max-w-120 border border-slate-100">
        <SigninPageClient errorMessage={errorMessage} />
      </div>
    </div>
  );
}
