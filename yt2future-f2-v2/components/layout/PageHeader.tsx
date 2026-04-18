'use client';
import Link from '@/components/common/Link';

import { useTranslations } from 'next-intl';

export type PageHeaderParent = {
  label: string;
  /** Đường dẫn không locale; `Link` sẽ thêm locale. */
  href: string;
};

interface PageHeaderProps {
  title: string;
  /** Cấp giữa: ví dụ Sản phẩm dịch vụ → `/services` trước tên trang chi tiết. */
  parent?: PageHeaderParent;
}

export default function PageHeader({ title, parent }: PageHeaderProps) {
  const t = useTranslations('nav');

  return (
    <div className="w-full bg-[#001a41] py-3 md:py-4">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/50 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em]">
          <Link href="/" className="hover:text-yellow-500 transition-colors duration-200">
            {t('home')}
          </Link>

          <span className="text-white/20 select-none font-light">/</span>

          {parent ? (
            <>
              <Link
                href={parent.href}
                className="hover:text-yellow-500 transition-colors duration-200"
              >
                {parent.label}
              </Link>
              <span className="text-white/20 select-none font-light">/</span>
            </>
          ) : null}

          <span className="text-yellow-500">{title}</span>
        </nav>
      </div>
    </div>
  );
}
