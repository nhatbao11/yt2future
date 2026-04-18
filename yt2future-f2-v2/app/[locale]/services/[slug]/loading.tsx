'use client';

import { useTranslations } from 'next-intl';

/**
 * Hiển thị khi đang tải trang chi tiết dịch vụ (điều hướng từ /services hoặc link khác).
 */
export default function ServiceDetailLoading() {
  const t = useTranslations('services_list');

  return (
    <div className="flex min-h-[min(100dvh,48rem)] flex-col items-center justify-center gap-6 bg-[#f4f7ff] px-6 py-20">
      <div className="relative h-16 w-16" role="status" aria-live="polite" aria-busy="true">
        <span className="sr-only">{t('detailLoading')}</span>
        <span className="absolute inset-0 rounded-full border-4 border-[#001a41]/15" aria-hidden />
        <span
          className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#001a41] border-r-[#eab308]"
          aria-hidden
        />
      </div>
      <p className="text-sm font-medium tracking-wide text-slate-600">{t('detailLoading')}</p>
    </div>
  );
}
