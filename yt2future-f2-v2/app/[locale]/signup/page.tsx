import Image from 'next/image';
import SuccessRedirect from '@/components/partials/SuccessRedirect';
import SignupPageClient from './SignupPageClient';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });
  const title = t('signUp.title');
  const description =
    locale === 'vi'
      ? 'Đăng ký tài khoản YT2Future để làm thành viên và truy cập nội dung đầy đủ.'
      : 'Create a YT2Future account to join as a member and unlock full content.';
  return {
    title,
    description,
    robots: { index: false, follow: true },
  };
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error: errorMessage, success: successMessage } = await searchParams;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 font-sans">
      {/* Component chạy ngầm: Đợi 2s rồi chuyển hướng nếu có success */}
      <SuccessRedirect success={successMessage} />

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bgSign.jpg"
          alt="Signup background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      {/* SIGNUP CARD */}
      <SignupPageClient errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
}
